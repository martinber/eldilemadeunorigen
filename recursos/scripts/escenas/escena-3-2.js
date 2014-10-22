Juego.Escena_3_2 = function (game) {
	
};

Juego.Escena_3_2.prototype = {
	create: function () {
		this.fondo = this.add.sprite(0, 0, 'frenteBiologicosFondo'); // Agregar fondo
		
		game.world.setBounds(0, 0, 960, 540); // Configurar tamaño de juego
		this.foco = true; // Capacidad de apretar botones, o interactuar con lo que depende de este objeto
		this.ultimoClick = ""; // Guardar ultimo objeto clickeado
		this.puedeSalir == false; // Si puede salir de habitacion, para no saltarse dialogo
		
		// Comienzo creacion objetos
		game.sound.volume = 1;
		this.timbre = this.add.audio('timbre1'); // Configurar sonido
		this.timbre.play(); // Reproducir sonido
		
		this.puerta = this.add.sprite(770, 435, 'puertaBiologicos');
		this.puerta.anchor.setTo(.5, 1); // Establecer su origen (ancla)
		this.puertaAbierta = this.add.sprite(770, 435, 'puertaBiologicosAbierta');
		this.puertaAbierta.anchor.setTo(.5, 1); // Establecer su origen (ancla)
		this.puertaAbierta.alpha = 0;
		
		this.personaje = new Personaje(530, 470); // Agregar personaje
		this.personaje.limitarX(60, 900); // Limitar posición del personaje
		
		this.MA = game.add.sprite(650, 470, 'MACaminando'); // Agregar madre
		this.MA.anchor.setTo(.5, 1); // Establecer su origen (ancla)
		
		this.PA = game.add.sprite(600, 470, 'PACaminando'); // Agregar madre
		this.PA.anchor.setTo(.5, 1); // Establecer su origen (ancla)
		
		// Fin creacion objetos
		
		this.camara = new Camara(this.personaje); // Agregar camara
		this.transicion = new Transicion(1000, "entrar", this.listo, this);
		this.UI = new UI(this); // Agregar UI
	},
	
	listo: function () { // Cuando termina la transicion
		this.alarma = game.time.events.add(Phaser.Timer.SECOND * 4, this.atenderPuerta, this);
		this.transicion = null;
	},
	
	update: function () {
		this.personaje.update(); // Actualizar personaje
		this.camara.update(); // Actualizar camara
		this.UI.update(this.camara); // Actualizar UI
	},
	
	avanzarEscena: function() {
		this.limpiar();
		game.state.start('Escena-3-3'); // Ir a escena
	},
	
	atenderPuerta: function () {
		this.puerta.alpha = 0;
		this.puertaAbierta.alpha = 1;
		
		this.MB = game.add.sprite(this.puerta.x, this.puerta.y, 'MBParadaCostado');
		this.MB.anchor.setTo(.5, 1); // Establecer su origen (ancla)
		
		this.alarma = game.time.events.add(Phaser.Timer.SECOND * 2, this.crearDialogo, this);
	},
	
	crearDialogo: function () { // No pude hacer que tween.onComplete.add() llame a esta función con argumentos, como argumento uso this.ultimoClick que debe ser seteado anteriormente
		this.dialogo = new Dialogo(this, datosJSON.escena_3_2.dialogos.dialogo1); // Crear dialogo
	},
	
	eliminarDialogo: function () {
		this.dialogo.eliminar();
		this.dialogo = null;
		if (this.transicion == null) this.transicion = new Transicion(1000, "salir", this.avanzarEscena, this);
	},
	
	limpiar: function () { // Salir de la escena
		// Liberar espacio
		this.personaje.eliminar();
		this.personaje = null;
		this.fondo.destroy();
		this.fondo = null;
		if (this.dialogo != null) {
			this.dialogo.eliminar();
			this.dialogo = null;
		}
		this.UI.eliminar();
		this.UI = null;
		this.camara.eliminar();
		this.camara = null;
		this.timbre.destroy();
		this.timbre = null;
	}
};