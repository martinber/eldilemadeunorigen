Juego.Final = function (game) {
	
};

Juego.Final.prototype = {
	create: function () {
		this.transicion = new Transicion(1, "entrar", this.listo, this);
		this.alarmaAvance = null;
		
		this.datos = datosJSON.final.texto;
		
		this.texto = game.add.bitmapText(100, 50, 'fuenteMartinBlanco', "", 60); // Crear línea nueva
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
			this.alarmaTransicion = game.time.events.add(Phaser.Timer.SECOND * 5, this.transicionFin, this);
		}
	},
	
	fin: function () {
		this.limpiar();
		game.state.start('Creditos'); // Ir a menu
	},
	
	transicionFin: function () {
		this.tween = game.add.tween(game.camera).to({y: canvasHeight}, 4000, Phaser.Easing.Quadratic.In, true, 0); // Animar
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