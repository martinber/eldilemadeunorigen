Juego.Escena1 = function (game) {
	
};

/*
 * Agregar Personajes
 * 
 * 
 * 
 */

Juego.Escena1.prototype = {
	create: function () {
		Juego.musica = this.add.audio('musicaJuego'); // Configurar musica
		Juego.musica.play("", 0, 1, true); // Reproducir musica, repitiendo
		
		this.fondo = this.add.sprite(0, 0, 'cocinaFondo'); // Agregar fondo
		game.world.setBounds(0, 0, 960, 540); // Configurar tamaño de juego
		this.foco = true; // Capacidad de apretar botones, o interactuar con lo que depende de este objeto
		this.ultimoClick = ""; // Guardar ultimo objeto clickeado
		this.puedeSalir == false; // Si puede salir de habitacion, para no saltarse dialogo
		
		// Comienzo creacion objetos
		
		this.silla1 = this.add.sprite(300, 500, 'silla');
		this.silla1.anchor.setTo(.5, 1); // Establecer su origen (ancla)
		this.silla1.scale.x = -1; // Espejar
		
		this.PA = this.add.sprite(350, 500, 'PASentadoCostado');
		this.PA.anchor.setTo(.5, 1); // Establecer su origen (ancla)
		
		this.silla2 = this.add.sprite(680, 500, 'silla');
		this.silla2.anchor.setTo(.5, 1); // Establecer su origen (ancla)
		
		this.MA = this.add.sprite(650, 500, 'MASentadaCostado');
		this.MA.anchor.setTo(.5, 1); // Establecer su origen (ancla)
		
		this.silla3 = this.add.sprite(500, 450, 'sillaFrente');
		this.silla3.anchor.setTo(.5, 1); // Establecer su origen (ancla)
		
		this.E = this.add.sprite(500, 445, 'ESentadaFrente');
		this.E.anchor.setTo(.5, 1); // Establecer su origen (ancla)
		
		this.mesa = this.add.sprite(500, 500, 'mesa');
		this.mesa.anchor.setTo(.5, 1); // Establecer su origen (ancla)
		
		// Fin creacion objetos
		
		game.input.onDown.add(this.click, this); // Llamar la función al hacer click
		this.transicion = new Transicion(2000, "entrar", this.listo, this, true);
		this.UI = new UI(this); // Agregar UI
	},
	
	listo: function () { // Cuando termina la transicion
		this.foco = true;
		this.alarma = game.time.events.add(Phaser.Timer.SECOND * 3, this.crearDialogo, this);
		this.transicion = null;
	},
	
	update: function () {
		this.UI.update(this.camara); // Actualizar UI
	},
	
	click: function (pointer) { // Al hacer click en cualquier lado
		if (this.foco == true) {

		}
	},
	
	crearDialogo: function () {
		this.dialogo = new Dialogo(this, datosJSON.escena1.dialogos.dialogo1); // Crear dialogo
		this.foco = false;
	},
	
	eliminarDialogo: function () {
		this.dialogo.eliminar();
		this.dialogo = null;
		this.foco = true;
		if (this.transicion == null) this.transicion = new Transicion(2000, "salir", this.avanzarEscena, this);
	},
	
	avanzarEscena: function() {
		this.limpiar();
		game.state.start('Escena2'); // Ir a escena
	},
	
	limpiar: function () { // Salir de la escena
		// Liberar espacio
		this.fondo.destroy();
		this.fondo = null;
		this.mesa.destroy();
		this.mesa = null;
		this.silla1.destroy();
		this.silla1 = null;
		this.silla2.destroy();
		this.silla2 = null;
		this.silla3.destroy();
		this.silla3 = null;
		this.E.destroy();
		this.E = null;
		this.MA.destroy();
		this.MA = null;
		this.PA.destroy();
		this.PB = null;
		if (this.dialogo != null) {
			this.dialogo.eliminar();
			this.dialogo = null;
		}
		this.UI.eliminar();
		this.UI = null;
	}
};