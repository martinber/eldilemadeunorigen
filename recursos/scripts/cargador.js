Juego.Cargador = function (game) {
	this.terminado = false; // No estamos listos
};

Juego.Cargador.prototype = {
	preload: function () {
		// Colocar fondo y barra de carga
		this.fondo = this.add.tileSprite(0, 0, canvasWidth, canvasHeight, 'fondo');
		this.barra = this.add.sprite(canvasWidth / 2, canvasHeight / 2, 'cargadorBarra');
		this.barra.x = canvasWidth / 2 - this.barra.width / 2; // Centrar, no puedo usar anclas acá porque o si no se centra el sprite mientras se va completando
		this.textoCargando = this.add.bitmapText(canvasWidth / 2, canvasHeight / 2 + 45, 'fuenteJuan','Cargando...', 50);
		this.textoCargando.x = canvasWidth / 2 - this.textoCargando.textWidth / 2; // Centrar, no puedo usar anclas acá
		
		this.load.setPreloadSprite(this.barra); // Configurar la barra como barra de carga
		
		// Cargar lo necesario para el juego
		this.load.image('menuFondo', 'recursos/menu/menuFondo.jpg');
		this.load.atlas('menuBoton', 'recursos/menu/boton.png', 'recursos/menu/boton.json');
		this.load.atlas('botonSilenciar1', 'recursos/menu/botonSilenciar1.png', 'recursos/menu/botonSilenciar.json');
		this.load.atlas('botonSilenciar2', 'recursos/menu/botonSilenciar2.png', 'recursos/menu/botonSilenciar.json');
		
		this.load.atlas('botonCerrar', 'recursos/escenas/general/botonCerrar.png', 'recursos/escenas/general/botonCerrar.json');
		this.load.atlas('botonSi', 'recursos/escenas/general/botonSi.png', 'recursos/escenas/general/botonSi.json');
		this.load.atlas('botonNo', 'recursos/escenas/general/botonNo.png', 'recursos/escenas/general/botonNo.json');
		
		this.load.audio('musicaMenu', ['recursos/sonidos/musicaMenu.mp3', 'recursos/sonidos/musicaMenu.ogg']);
		this.load.audio('musicaJuego', ['recursos/sonidos/musicaJuego.mp3', 'recursos/sonidos/musicaJuego.ogg']);
		this.load.audio('musicaFinal', ['recursos/sonidos/musicaFinal.mp3', 'recursos/sonidos/musicaFinal.ogg']);
		
		this.load.audio('puertaAbriendose', ['recursos/sonidos/puertaAbriendose.mp3', 'recursos/sonidos/puertaAbriendose.ogg']);
		this.load.audio('puertaCerrandose', ['recursos/sonidos/puertaCerrandose.mp3', 'recursos/sonidos/puertaCerrandose.ogg']);
		this.load.audio('timbre1', ['recursos/sonidos/timbre1.mp3', 'recursos/sonidos/timbre1.ogg']);
		
		this.load.image('dialogoFondo', 'recursos/escenas/general/dialogo.png');
		this.load.image('foto', 'recursos/escenas/general/foto.png');
		this.load.image('UIFondo', 'recursos/escenas/general/UI.png');
		this.load.text('datosJSON', 'recursos/datos.json');

		this.load.image('armario', 'recursos/escenas/armario.png');
		this.load.image('armarioAbierto', 'recursos/escenas/armarioAbierto.png');
		this.load.image('mesa', 'recursos/escenas/mesa.png');
		this.load.image('mesaEscritorio', 'recursos/escenas/mesaEscritorio.png');
		this.load.image('puerta1', 'recursos/escenas/puerta1.png');
		this.load.image('puerta1Abierta', 'recursos/escenas/puerta1Abierta.png');
		this.load.image('puerta2', 'recursos/escenas/puerta2.png');
		this.load.image('puerta2Abierta', 'recursos/escenas/puerta2Abierta.png');
		this.load.image('puerta3', 'recursos/escenas/puerta3.png');
		this.load.image('puerta3Abierta', 'recursos/escenas/puerta3Abierta.png');
		this.load.image('puertaAbuelo', 'recursos/escenas/puertaAbuelo.png');
		this.load.image('puertaAbueloAbierta', 'recursos/escenas/puertaAbueloAbierta.png');
		this.load.image('puertaBiologicos', 'recursos/escenas/puertaBiologicos.png');
		this.load.image('puertaBiologicosAbierta', 'recursos/escenas/puertaBiologicosAbierta.png');
		this.load.image('silla', 'recursos/escenas/silla.png');
		this.load.image('sillaFrente', 'recursos/escenas/sillaFrente.png');
		this.load.image('sillaEscritorio', 'recursos/escenas/sillaEscritorio.png');
		
		this.load.image('pasilloFondo', 'recursos/escenas/fondos/pasillo.jpg');
		this.load.image('bosqueFondo', 'recursos/escenas/fondos/bosque.jpg');
		this.load.image('cocinaFondo', 'recursos/escenas/fondos/cocina.jpg');
		this.load.image('livingBiologicosFondo', 'recursos/escenas/fondos/livingBiologicosConGente.jpg');
		this.load.image('piezaFondo', 'recursos/escenas/fondos/pieza.jpg');
		this.load.image('frenteCasaFondo', 'recursos/escenas/fondos/frenteCasa.jpg');
		this.load.image('frenteAbueloFondo', 'recursos/escenas/fondos/frenteAbuelo.jpg');
		this.load.image('frenteBiologicosFondo', 'recursos/escenas/fondos/frenteBiologicos.jpg');
		this.load.image('piezaPadresFondo', 'recursos/escenas/fondos/piezaPadres.jpg');

		this.load.spritesheet('personaje', 'recursos/escenas/general/personaje.png', 120, 290, 2);// 2 cuadros de 120x290px cada uno
		this.load.spritesheet('MACaminando', 'recursos/escenas/general/MACaminando.png', 87, 304, 2);// 2 cuadros de 120x290px cada uno
		this.load.spritesheet('PACaminando', 'recursos/escenas/general/PACaminando.png', 84, 304, 2);// 2 cuadros de 120x290px cada uno
		
		this.load.image('AParadoCostado', 'recursos/escenas/general/AParadoCostado.png');
		this.load.image('ASentadoCostado', 'recursos/escenas/general/ASentadoCostado.png');
		this.load.image('ESentadaFrente', 'recursos/escenas/general/ESentadaFrente.png');
		this.load.image('MASentadaCostado', 'recursos/escenas/general/MASentadaCostado.png');
		this.load.image('MBParadaCostado', 'recursos/escenas/general/MBParadaCostado.png');
		this.load.image('MBSentadaFrente', 'recursos/escenas/general/MBSentadaFrente.png');
		this.load.image('PASentadoCostado', 'recursos/escenas/general/PASentadoCostado.png');
		this.load.image('PBSentadoFrente', 'recursos/escenas/general/PBSentadoFrente.png');
		
		this.load.image('iconoE', 'recursos/escenas/general/iconosPersonajes/e.png');
		this.load.image('iconoA', 'recursos/escenas/general/iconosPersonajes/a.png');
		this.load.image('iconoMA', 'recursos/escenas/general/iconosPersonajes/ma.png');
		this.load.image('iconoPA', 'recursos/escenas/general/iconosPersonajes/pa.png');
		this.load.image('iconoMB', 'recursos/escenas/general/iconosPersonajes/mb.png');
		this.load.image('iconoPB', 'recursos/escenas/general/iconosPersonajes/pb.png');
	},
	create: function () {
		// Al terminar de cargar mostrar la barra entera
		this.barra.cropEnabled = false;
		
		datosJSON = JSON.parse(game.cache.getText('datosJSON')); // Leer JSON de datos
	},
	update: function () {
		// Esperar a que se decodifique la musica
		if (this.cache.isSoundDecoded('musicaMenu') && this.terminado == false) {
			this.terminado = true; // Terminamos
			this.game.state.start('Menu'); // Ir al menu
		}
	}
};
 
