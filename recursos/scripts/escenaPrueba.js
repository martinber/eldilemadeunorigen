Juego.EscenaPrueba = function (game) {
	
};

Juego.EscenaPrueba.prototype = {
	create: function () {
		this.fondo = this.add.sprite(0, 0, 'escena1Fondo'); // Agregar fondo
		this.UI = new UI(this); // Agregar UI
		game.world.setBounds(0, 0, 2000, 2000); // Configurar tamaño de juego, que es mayor que el de la camara, si no, la camara no puede moverse
		
		// Agregar a Luigi
		this.luigi = this.add.sprite(800, 395, 'luigi');
		this.luigi.anchor.setTo(.5, 1); // Establecer su origen (ancla)
		this.luigi.inputEnabled = true; // Habilitar chequeos de click
		this.luigi.events.onInputDown.add(this.clickEnLuigi, this); // Llamar la función al hacerle click
		
		// Agregar puerta
		this.puerta = this.add.sprite(600, 395, 'puerta');
		this.puerta.anchor.setTo(.5, 1); // Establecer su origen (ancla)
		this.puerta.inputEnabled = true; // Habilitar chequeos de click
		this.puerta.events.onInputDown.add(this.clickEnPuerta, this); // Llamar la función al hacerle click
		
		this.personaje = new Personaje(0, 395); // Agregar personaje, al final para que se vea arriba
		
		this.personaje.limitarX(200, 2000); // Limitar posición del personaje
		this.vecesHabladasConLuigi = 0;
		this.foco = false; // Capacidad de apretar botones, o interactuar con lo que depende de este objeto
		this.ultimoClick = ""; // Guardar ultimo objeto clickeado
		
		this.camara = new Camara(this.personaje); // Agregar camara
		game.input.onDown.add(this.click, this); // Llamar la función al hacer click
		
		this.transicion = new Transicion(1000, "entrar", this.listo, this);
	},
	
	listo: function () {
		this.foco = true;
	},
	
	update: function () {
		this.personaje.update(); // Actualizar personaje
		this.camara.update(); // Actualizar camara
		this.UI.update(this.camara); // Actualizar UI
	},
	
	click: function (pointer) {
		if (this.foco == true) {
			this.personaje.moverX(pointer.worldX, null); // Mover personaje
		}
	},
	
	crearDialogo: function () { // No pude hacer que tween.onComplete.add() llame a esta función con argumentos, como argumento uso this.ultimoClick que debe ser seteado anteriormente
		if (this.ultimoClick == "luigi") {
			if (this.vecesHabladasConLuigi == 0) this.dialogo = new Dialogo(this, datosJSON.escenaPrueba.dialogos.luigi); // Crear dialogo
			else this.dialogo = new Dialogo(this, datosJSON.escenaPrueba.dialogos.luigi2); // Crear dialogo 2
			this.vecesHabladasConLuigi += 1;
			this.foco = false;
		}
	},
	
	eliminarDialogo: function () {
		this.dialogo.eliminar();
		this.dialogo = null;
		this.foco = true;
	},
	
	clickEnLuigi: function() {
		if (this.foco == true) {
			this.personaje.moverX(this.luigi.x, "callback", this.crearDialogo, this, "luigi"); // Mover personaje, ya se deberia estar moviendo gracias a la funcion click() pero necesito agregarle argumentos
			// (posX, accion, funcion, contexto, argumentos)
			this.ultimoClick = "luigi";
		}
	},
	
	clickEnPuerta: function() {
		if (this.foco == true) {
			this.personaje.moverX(this.puerta.x, "callback", this.puerta1, this); // Mover personaje, ya se deberia estar moviendo gracias a la funcion click() pero necesito agregarle argumentos
			// (posX, accion, funcion, contexto)
			this.ultimoClick = "puerta";
		}
	},
	
	puerta1: function() {
		this.transicion = new Transicion(1000, "salir", this.avanzarEscena, this);
	},
	
	avanzarEscena: function() {
		this.limpiar();
		game.state.start('Escena1'); // Ir a escena
	},
	
	limpiar: function () { // Limpiar recursos
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
		this.luigi.destroy();
		this.luigi = null;
		this.vecesHabladasConLuigi = null;
	}
};