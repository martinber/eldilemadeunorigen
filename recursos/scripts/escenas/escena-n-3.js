Juego.Escena_n_3 = function (game) {
	
};

Juego.Escena_n_3.prototype = {
	create: function () {
		this.fondo = this.add.sprite(0, 0, 'frenteBiologicosFondo'); // Agregar fondo
		
		game.world.setBounds(0, 0, 960, 540); // Configurar tamaño de juego
		this.foco = true; // Capacidad de apretar botones, o interactuar con lo que depende de este objeto
		this.ultimoClick = ""; // Guardar ultimo objeto clickeado
		this.puedeSalir = false; // Si puede salir de habitacion, para no saltarse dialogo
		
		// Comienzo creacion objetos
		
		this.timbre = this.add.audio('timbre1'); // Configurar sonido
		
		this.puerta = this.add.sprite(770, 435, 'puertaBiologicos');
		this.puerta.anchor.setTo(.5, 1); // Establecer su origen (ancla)
		this.puertaAbierta = this.add.sprite(770, 435, 'puertaBiologicosAbierta');
		this.puertaAbierta.anchor.setTo(.5, 1); // Establecer su origen (ancla)
		this.puertaAbierta.alpha = 0;
		
		this.puerta.inputEnabled = true; // Habilitar chequeos de click
		this.puerta.events.onInputDown.add(this.clickEnPuerta, this); // Llamar la función al hacerle click
		
		this.personaje = new Personaje(60, 470); // Agregar personaje, al final para que se vea arriba
		this.personaje.limitarX(60, 900); // Limitar posición del personaje
		
		// Fin creacion objetos
		
		this.camara = new Camara(this.personaje); // Agregar camara
		game.input.onDown.add(this.click, this); // Llamar la función al hacer click
		this.transicion = new Transicion(1000, "entrar", this.listo, this);
		this.UI = new UI(this); // Agregar UI
	},
	
	listo: function () { // Cuando termina la transicion
		this.foco = true;
		this.transicion = null;
	},
	
	update: function () {
		this.personaje.update(); // Actualizar personaje
		this.camara.update(); // Actualizar camara
		this.UI.update(this.camara); // Actualizar UI
	},
	
	click: function (pointer) { // Al hacer click en cualquier lado
		if (this.foco == true) {
			this.personaje.moverX(pointer.worldX, null); // Mover personaje
		}
	},
	
	clickEnPuerta: function() {
		if (this.foco == true) {
			this.personaje.moverX(this.puerta.x, "callback", this.fPuerta, this); // Mover personaje, ya se deberia estar moviendo gracias a la funcion click() pero necesito agregarle argumentos
			// (posX, accion, funcion, contexto)
			this.foco = false;
		}
	},
	
	fPuerta: function() {
		this.timbre.play(); // Reproducir sonido
		this.personaje.moverX(this.personaje.x - 70, "callback", this.girarPersonaje, this);
		this.alarma = game.time.events.add(Phaser.Timer.SECOND * 5, this.atenderPuerta, this);
	},
	
	girarPersonaje: function () {
		this.personaje.sprite.scale.x = 1;
	},
	
	atenderPuerta: function () {
		this.puerta.alpha = 0;
		this.puertaAbierta.alpha = 1;
		
		this.MA = game.add.sprite(this.puerta.x, this.puerta.y, 'personaje'); // Agregar abuelo
		this.MA.anchor.setTo(.5, 1); // Establecer su origen (ancla)
		this.MA.scale.x = -1;
		
		this.alarma = game.time.events.add(Phaser.Timer.SECOND * 2, this.crearDialogo, this);
	},
	
	crearDialogo: function () { // No pude hacer que tween.onComplete.add() llame a esta función con argumentos, como argumento uso this.ultimoClick que debe ser seteado anteriormente
		this.dialogo = new Dialogo(this, datosJSON.escena_n_3.dialogos.dialogo1); // Crear dialogo
		this.foco = false;
	},
	
	eliminarDialogo: function () {
		this.dialogo.eliminar();
		this.dialogo = null;
		this.alarma = game.time.events.add(Phaser.Timer.SECOND * 1, this.cerrarPuerta, this);
	},
	
	cerrarPuerta: function () {
		this.puerta.alpha = 1;
		this.puertaAbierta.alpha = 0;
		this.MA.destroy();
		this.MA = null;
		if (this.transicion == null) this.transicion = new Transicion(1000, "salir", this.avanzarEscena, this);
	},
	
	avanzarEscena: function() {
		this.limpiar();
		game.state.start('Escena-n-4'); // Ir a escena
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