Juego.Escena1 = function (game) {
	
};

Juego.Escena1.prototype = {
	create: function () {
		this.fondo = this.add.sprite(0, 0, 'bosqueFondo'); // Agregar fondo
		this.UI = new UI(this); // Agregar UI
		game.world.setBounds(0, 0, 960, 540); // Configurar tamaño de juego
		
		// Agregar a Luigi
		this.luigi = this.add.sprite(800, 526, 'luigi');
		this.luigi.anchor.setTo(.5, 1); // Establecer su origen (ancla)
		this.luigi.inputEnabled = true; // Habilitar chequeos de click
		this.luigi.events.onInputDown.add(this.clickEnLuigi, this); // Llamar la función al hacerle click
		//
		
		this.personaje = new Personaje(0, 526); // Agregar personaje, al final para que se vea arriba
		this.personaje.limitarX(60, 900); // Limitar posición del personaje
		this.foco = true; // Capacidad de apretar botones, o interactuar con lo que depende de este objeto
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
			this.dialogo = new Dialogo(this, datosJSON.escena1.dialogos.dialogo1); // Crear dialogo
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
		this.luigi.destroy();
		this.luigi = null;
	}
};