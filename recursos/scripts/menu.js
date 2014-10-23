Juego.Menu = function (game) {
	this.musica = null;
	this.boton = null;
	this.titulo = null;
};

Juego.Menu.prototype = {
	create: function () {
		this.musica = this.add.audio('musicaMenu'); // Configurar musica
		this.musica.play("", 0, 1, true); // Reproducir musica, repitiendo
		
		// Dibujar el menu
		this.fondo = this.add.tileSprite(0, 0, canvasWidth * 2, canvasHeight * 2, 'fondo');
		
		// Agregar boton
		this.boton = this.add.button(100, 150, 'menuBoton', this.comenzarJuego, this, 'boton2', 'boton1', 'boton3'); // x, y, imagen, accion, objeto, imagenHover, imagen, imagenClick
		this.boton.input.useHandCursor = true;
		
		this.botonAyuda = this.add.button(110, 330, 'botonAyuda', this.ayuda, this, 'boton2', 'boton1', 'boton3'); // x, y, imagen, accion, objeto, imagenHover, imagen, imagenClick
		this.botonAyuda.input.useHandCursor = true;
		
		this.botonSilenciar = this.add.button(canvasWidth - 30, canvasHeight - 30, 'botonSilenciar1', this.silenciar, this, 'boton2', 'boton1', 'boton3'); // x, y, imagen, accion, objeto, imagenHover, imagen, imagenClick
		this.botonSilenciar.anchor.setTo(1, 1);
		this.botonSilenciar.input.useHandCursor = true;
		
		this.textoTitulo = this.add.bitmapText(50, 50, 'fuenteJuan','El Dilema de un Origen', 64);
		
		this.transicion = new Transicion(2000, "entrar", this.listo, this);
	},

	listo: function () {
		
	},
	
	silenciar: function () {
		if (this.botonSilenciar.key == 'botonSilenciar2') {
			this.botonSilenciar.key = 'botonSilenciar1';
			sonido = true;
			game.sound.volume = 1;
		}
		else if (this.botonSilenciar.key == 'botonSilenciar1') {
			this.botonSilenciar.key = 'botonSilenciar2';
			sonido = false;
			game.sound.volume = 0;
		}
		this.botonSilenciar.frameName = 'boton2';
	},
	
	update: function () {

	},
	
	comenzarJuego: function (pointer) { // Se ejecuta al presionar boton correspondiente
		this.transicion = new Transicion(1000, "salir", this.avanzarEscena, this, true);
	},
	
	ayuda: function () {
		if (this.botonSilenciar.visible == true) {
			this.sprite = game.add.sprite(300, 0, 'ayuda');
			// Agregar boton
			this.botonCerrar = game.add.button(900, 50, 'botonCerrar', this.cerrarAyuda, this, 'boton2', 'boton1', 'boton3'); // x, y, imagen, accion, objeto, imagenHover, imagen, imagenClick
			this.botonCerrar.anchor.setTo(.5, .5); // Establecer su origen (ancla)
			this.botonCerrar.fixedToCamera = true;
			this.botonCerrar.input.useHandCursor = true;
			this.botonCerrar.angle = -10;
			this.tweenBoton = game.add.tween(this.botonCerrar).to({angle: 10}, 300, Phaser.Easing.Quadratic.InOut, true, 0, Number.MAX_VALUE, true); // Animar boton de cerrar
			
			this.botonSilenciar.visible = false;
		}
	},
	
	cerrarAyuda: function () {
		this.sprite.destroy();
		this.botonCerrar.destroy();
		
		this.botonSilenciar.visible = true;
	},
	
	avanzarEscena: function () {
		this.musica.stop(); // Parar la musica
		this.musica.destroy();
		this.musica = null;
		this.game.state.start('Escena1'); // Ir a la escena 1
	}
}; 
