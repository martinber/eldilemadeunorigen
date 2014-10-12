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
		// Agregar boton
		this.boton = this.add.button(100, 150, 'boton', this.comenzarJuego, this, 'boton2', 'boton1', 'boton3'); // x, y, imagen, accion, objeto, imagenHover, imagen, imagenClick
		
		this.textoTitulo = this.add.bitmapText(50, 50, 'fuenteMartinBlanco','El Dilema de un Origen', 64);
		
		this.transicion = new Transicion(2000, "entrar", this.listo, this);
	},

	listo: function () {
		
	},
	
	update: function () {
		
	},
	comenzarJuego: function (pointer) { // Se ejecuta al presionar boton correspondiente
		this.musica.stop(); // Parar la musica
		this.game.state.start('Escena-3-3'); // Ir a la escena 1
	}
}; 
