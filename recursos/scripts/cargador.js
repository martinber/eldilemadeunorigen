Juego.Cargador = function (game) {
	this.terminado = false; // No estamos listos
};

Juego.Cargador.prototype = {
	preload: function () {
		// Colocar fondo y barra de carga
		this.fondo = this.add.sprite(0, 0, 'cargadorFondo');
		this.barra = this.add.sprite(0, 0, 'cargadorBarra');
		this.textoCargando = this.add.bitmapText(50, 50, 'fuenteJuan','Cargando...', 50);
		
		this.load.setPreloadSprite(this.barra); // Configurar la barra como barra de carga
		
		// Cargar lo necesario para el juego
		this.load.bitmapFont('fuenteMartinBlanco', 'recursos/fuentes/fuenteMartinBlanco.png', 'recursos/fuentes/fuenteMartin.xml');
		this.load.image('menuFondo', 'recursos/menu/menuFondo.png');
		this.load.atlas('menuBoton', 'recursos/menu/boton.png', 'recursos/menu/boton.json');
		this.load.audio('menuMusica', ['recursos/menu/menuMusica.mp3', 'recursos/menu/menuMusica.ogg']);
		
		this.load.image('escena1Fondo', 'recursos/escenas/fondos/escena1.jpg');
		this.load.image('UIFondo', 'recursos/escenas/fondos/UI.jpg');
		this.load.image('dialogoFondo', 'recursos/escenas/fondos/dialogo.png');
		this.load.text('datosJSON', 'recursos/datos.json');
		// 18 cuadros de 84x128px cada uno
		this.load.spritesheet('personaje', 'recursos/escenas/personaje.png', 84, 128, 8);
	},
	create: function () {
		// Al terminar de cargar mostrar la barra entera
		datosJSON = JSON.parse(game.cache.getText('datosJSON'));
		this.barra.cropEnabled = false;
	},
	update: function () {
		// Esperar a que se decodifique la musica
		if (this.cache.isSoundDecoded('menuMusica') && this.terminado == false) {
			this.terminado = true; // Terminamos
			this.game.state.start('Menu'); // Ir al menu
		}
	}
};
 
