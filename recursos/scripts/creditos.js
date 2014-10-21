Juego.Creditos = function (game) {
	
};

Juego.Creditos.prototype = {
	create: function () {
		this.transicion = new Transicion(1, "entrar", this.listo, this);
		this.alarmaAvance = null;
		this.alarmaNuevaLinea = null;
		game.world.setBounds(0, 0, 960, 2000);
		
		this.texto = new Array(); // Inicializar array que contiene las líneas de texto visibles
		this.linea = 0; // Línea actual, la que se anima
		this.renglones = 0; // Tiene en cuenta los \n
		this.datos = datosJSON.creditos.texto;
		
		this.nuevaLinea(); // Empezar a dibujar una línea de texto
		
	},
	
	listo: function () {
		
	},
	
	update: function () {

	},

	avanzar: function () { // Llamado periodicamente para ir agregando letras
		if (this.texto[this.linea].text.length < this.datos[this.linea].length) { // Si no se termino de escribir la linea
			this.texto[this.linea].setText(this.datos[this.linea].substr(0, this.texto[this.linea].text.length + 1)); // Agregar una letra a la línea
		}
		else {
			// Crear una línea dentro de un segundo
			
			this.alarmaNuevaLinea = game.time.events.add(Phaser.Timer.SECOND, this.nuevaLinea, this);
			this.linea += 1;
		}
	},
	nuevaLinea: function () {
		if (this.linea < this.datos.length) { // Si no terminó el diálogo
			this.texto[this.linea] = game.add.bitmapText(100, 50 + 40 * this.linea, 'fuenteJuanBlanco', "", 40); // Crear línea nueva
			this.alarmaAvance = game.time.events.repeat(80, this.datos[this.linea].length, this.avanzar, this); // Avanzar tantas veces como letras tiene la línea
			
			if (this.tween != null && this.tween.isRunning) this.tween.stop(); // Parar movimientos anteriores si estan corriendo
			if (this.linea > 8) this.tween = game.add.tween(game.camera).to({y: game.camera.y + 40}, 2000, Phaser.Easing.Quadratic.InOut, true, 0); // animar
		}
		else {
			if (this.tween != null && this.tween.isRunning) this.tween.stop(); // Parar movimientos anteriores si estan corriendo
			if (this.linea > 8) this.tween = game.add.tween(game.camera).to({y: game.camera.y + canvasHeight}, 4000, Phaser.Easing.Quadratic.In, true, 0); // Animar
			this.tween.onComplete.add(this.fin, this); // Llamar funcion fin() al terminar
		}
	},
	
	fin: function () {
		this.limpiar();
		game.state.start('Menu'); // Ir a menu
	},
	
	limpiar: function () { // Liberar espacio
		this.tween = null;
		for (var i = 0; i < this.texto.length; i++) {
			this.texto[i].destroy();
		}
		this.texto = null;
		game.time.events.remove(this.alarmaNuevaLinea);
		game.time.events.remove(this.alarmaAvance);
		this.alarmaAvance = null;
		this.alarmaNuevaLinea = null;
		this.linea = null;
		this.renglones = null;
		this.datos = null;
		Juego.musica.stop(); // Parar la musica
		Juego.musica.destroy();
	}
};