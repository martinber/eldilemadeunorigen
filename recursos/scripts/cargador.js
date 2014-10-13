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
		this.load.bitmapFont('fuenteMartinBlanco', 'recursos/fuentes/fuenteMartinBlanco.png', 'recursos/fuentes/fuenteMartin.xml');
		this.load.image('menuFondo', 'recursos/menu/menuFondo.jpg');
		this.load.atlas('menuBoton', 'recursos/menu/boton.png', 'recursos/menu/boton.json');
		this.load.atlas('boton', 'recursos/escenas/general/boton.png', 'recursos/escenas/general/boton.json');
		this.load.atlas('botonCerrar', 'recursos/escenas/general/botonCerrar.png', 'recursos/escenas/general/botonCerrar.json');
		this.load.atlas('botonSi', 'recursos/escenas/general/botonSi.png', 'recursos/escenas/general/botonSi.json');
		this.load.atlas('botonNo', 'recursos/escenas/general/botonNo.png', 'recursos/escenas/general/botonNo.json');
		this.load.audio('menuMusica', ['recursos/menu/menuMusica.mp3', 'recursos/menu/menuMusica.ogg']);
		
		this.load.image('dialogoFondo', 'recursos/escenas/general/dialogo.png');
		this.load.image('UIFondo', 'recursos/escenas/general/UI.png');
		this.load.text('datosJSON', 'recursos/datos.json');
		
		this.load.image('puerta', 'recursos/escenas/general/puerta.png');
		this.load.image('luigi', 'recursos/escenas/general/luigi.png');
		this.load.image('cajaFotos', 'recursos/escenas/cajaFotos.png');
		this.load.image('armario', 'recursos/escenas/armario.png');
		this.load.image('armarioAbierto', 'recursos/escenas/armarioAbierto.png');
		this.load.image('mesa', 'recursos/escenas/mesa.png');
		this.load.image('mesaEscritorio', 'recursos/escenas/mesaEscritorio.png');
		this.load.image('puerta1', 'recursos/escenas/puerta1.png');
		this.load.image('puerta1Abierta', 'recursos/escenas/puerta1Abierta.png');
		this.load.image('puerta2', 'recursos/escenas/puerta2.png');
		this.load.image('puerta3', 'recursos/escenas/puerta3.png');
		this.load.image('puerta3Abierta', 'recursos/escenas/puerta3Abierta.png');
		this.load.image('silla', 'recursos/escenas/silla.png');
		this.load.image('sillaFrente', 'recursos/escenas/sillaFrente.png');
		this.load.image('sillaEscritorio', 'recursos/escenas/sillaEscritorio.png');
		
		this.load.spritesheet('personaje', 'recursos/escenas/general/personaje.png', 120, 290, 2);// 2 cuadros de 120x290px cada uno
		
		this.load.image('pasilloFondo', 'recursos/escenas/fondos/pasillo.jpg');
		this.load.image('bosqueFondo', 'recursos/escenas/fondos/bosque.jpg');
		this.load.image('cocinaFondo', 'recursos/escenas/fondos/cocina.jpg');
		this.load.image('livingBiologicosFondo', 'recursos/escenas/fondos/livingBiologicos.jpg');
		this.load.image('piezaFondo', 'recursos/escenas/fondos/pieza.jpg');
		this.load.image('piezaPadresFondo', 'recursos/escenas/fondos/piezaPadres.jpg');

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
		if (this.cache.isSoundDecoded('menuMusica') && this.terminado == false) {
			this.terminado = true; // Terminamos
			this.game.state.start('Menu'); // Ir al menu
		}
	}
};
 
