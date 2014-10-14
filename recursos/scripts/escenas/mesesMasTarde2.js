Juego.MesesMasTarde2 = function (game) {
	
};

Juego.MesesMasTarde2.prototype = {
	create: function () {
		this.transicion = new Transicion(1, "entrar", this.listo, this);
		this.alarmaAvance = null;
		game.world.setBounds(0, 0, 960, 1000);
		
		this.datos = "Meses más tarde...";
		
		this.texto = game.add.bitmapText(100, 50, 'fuenteJuanBlanco', "", 60); // Crear línea nueva
		this.alarmaAvance = game.time.events.repeat(120, this.datos.length, this.avanzar, this); // Avanzar tantas veces como letras tiene la línea
	},
	
	listo: function () {
		
	},
	
	update: function () {

	},

	avanzar: function () { // Llamado periodicamente para ir agregando letras
		if (this.texto.text.length < this.datos.length) { // Si no se termino de escribir la linea
			this.texto.setText(this.datos.substr(0, this.texto.text.length + 1)); // Agregar una letra a la línea
		}
		else {
			this.alarmaTransicion = game.time.events.add(Phaser.Timer.SECOND * 3, this.transicionFin, this);
		}
	},
	
	fin: function () {
		this.limpiar();
		game.state.start('Escena-4s-1'); // Ir a menu
	},
	
	transicionFin: function () {
		this.tween = game.add.tween(game.camera).to({y: canvasHeight}, 2000, Phaser.Easing.Quadratic.In, true, 0); // Animar
		this.tween.onComplete.add(this.fin, this); // Llamar funcion fin() al terminar
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
	}
};