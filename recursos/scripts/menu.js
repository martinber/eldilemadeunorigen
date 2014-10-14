Juego.Menu = function (game) {
	this.musica = null;
	this.boton = null;
	this.titulo = null;
};

Juego.Menu.prototype = {
	create: function () {
		this.musica = this.add.audio('menuMusica'); // Configurar musica
		this.musica.play(); // Reproducir musica
		
		// Dibujar el menu
		this.fondo = this.add.tileSprite(0, 0, canvasWidth * 2, canvasHeight * 2, 'fondo');
		
		// Agregar boton
		this.boton = this.add.button(100, 150, 'menuBoton', this.comenzarJuego, this, 'boton2', 'boton1', 'boton3'); // x, y, imagen, accion, objeto, imagenHover, imagen, imagenClick
		
		this.boton = this.add.button(canvasWidth - 30, canvasHeight - 30, 'botonSilenciar1', this.silenciar, this, 'boton2', 'boton1', 'boton3'); // x, y, imagen, accion, objeto, imagenHover, imagen, imagenClick
		this.boton.anchor.setTo(1, 1);
		
		this.silenciar();
		
		this.textoTitulo = this.add.bitmapText(50, 50, 'fuenteJuan','El Dilema de un Origen', 64);
		
		this.transicion = new Transicion(2000, "entrar", this.listo, this);
	},

	listo: function () {
		
	},
	
	silenciar: function () {
		if (this.boton.key == 'botonSilenciar2') {
			this.boton.key = 'botonSilenciar1';
			sonido = true;
			game.sound.volume = 1;
		}
		else if (this.boton.key == 'botonSilenciar1') {
			this.boton.key = 'botonSilenciar2';
			sonido = false;
			game.sound.volume = 0;
		}
		this.boton.frameName = 'boton2';
	},
	
	update: function () {

	},
	comenzarJuego: function (pointer) { // Se ejecuta al presionar boton correspondiente
		this.musica.stop(); // Parar la musica
		this.game.state.start('Final'); // Ir a la escena 1
	}
}; 
