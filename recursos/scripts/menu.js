Juego.Menu = function (game) {
	this.musica = null;
	this.boton = null;
	this.titulo = null;
};

Juego.Menu.prototype = {
	create: function () {
		this.musica = this.add.audio('menuMusica'); // Configurar musica
		//this.musica.play(); // Reproducir musica
		
		// Dibujar el menu
		this.add.sprite(0, 0, 'menuFondo');
		this.boton = this.add.button(100, 150, 'menuBoton', this.comenzarJuego, this, 'menuBoton2', 'menuBoton1', 'menuBoton2');
		
		this.textoTitulo = this.add.bitmapText(50, 50, 'fuenteMartinBlanco','Jueguito ISLGSM', 64);
	},

	update: function () {
		
	},
	comenzarJuego: function (pointer) { // Se ejecuta al presionar boton correspondiente
		this.musica.stop(); // Parar la musica
		this.game.state.start('Escena1'); // Ir a la escena 1
	}
}; 
