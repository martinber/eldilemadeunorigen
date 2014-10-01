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
		this.load.atlas('boton', 'recursos/escenas/UI/boton.png', 'recursos/escenas/UI/boton.json');
		this.load.audio('menuMusica', ['recursos/menu/menuMusica.mp3', 'recursos/menu/menuMusica.ogg']);
		
		this.load.image('escena1Fondo', 'recursos/escenas/fondos/escenaPrueba.jpg');
		this.load.image('UIFondo', 'recursos/escenas/fondos/UI.jpg');
		this.load.image('puerta', 'recursos/escenas/puerta.png');
		this.load.image('dialogoFondo', 'recursos/escenas/fondos/dialogo.png');
		this.load.text('datosJSON', 'recursos/datos.json');
		this.load.image('luigi', 'recursos/escenas/luigi.png');
		
		this.load.spritesheet('personaje', 'recursos/escenas/personaje.png', 120, 290, 2);// 2 cuadros de 120x290px cada uno
		this.load.image('pasilloFondo', 'recursos/escenas/fondos/pasillo.jpg');
		this.load.image('bosqueFondo', 'recursos/escenas/fondos/bosque.jpg');
	},
	create: function () {
		// Al terminar de cargar mostrar la barra entera
		this.barra.cropEnabled = false;
		
		datosJSON = JSON.parse(game.cache.getText('datosJSON')); // Leer JSON de datos
	},
	update: function () {
		// Esperar a que se decodifique la musica
		if (this.cache.isSoundDecoded('menuMusica') && this.terminado == false) {
			this.terminado = true; // Terminamos
			this.game.state.start('Menu'); // Ir al menu
		}
	}
};
 
