var Juego = {};

Juego.Inicio = function (game) {
};

Juego.Inicio.prototype = {
	init: function () {
		this.input.maxPointers = 1; // No es necesario multitouch
		this.stage.disableVisibilityChange = true; // Pausar juego al perder foco
		Juego.teclas = new Teclas(); // Inicializar controlador de teclado
		
		if (this.game.device.desktop) { //Si se juega desde una PC
			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.scale.setMinMax(640, 360, 960, 540); // Escalar juego como  minimo 480x260 y como maximo 1024x768
			this.scale.setScreenSize(true);
			this.scale.refresh();
		}
		else { // Si se juega desde el celular
			
			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.scale.setMinMax(640, 360, 960, 540); // Escalar juego como  minimo 480x260 y como maximo 1024x768
			this.scale.forceLandscape = true; // Forzar pantalla en horizontal
			this.scale.pageAlignHorizontally = true;
			this.scale.setScreenSize(true);
			this.scale.refresh();
		}
	},
	
	preload: function () {
		// Cargar lo necesario para el cargador
		this.load.image('cargadorFondo', 'recursos/cargador/cargadorFondo.png');
		this.load.image('cargadorBarra', 'recursos/cargador/cargadorBarra.png');
		this.load.bitmapFont('fuenteJuan', 'recursos/fuentes/fuenteJuan.png', 'recursos/fuentes/fuenteJuan.xml');
	},
	
	create: function () {
		// Ir al cargador
		this.game.state.start('Cargador');
	}
};
