Juego.Escena_2s_4 = function (game) {
	
};

Juego.Escena_2s_4.prototype = {
	create: function () {
		this.fondo = this.add.sprite(0, 0, 'cocinaFondo'); // Agregar fondo
		game.world.setBounds(0, 0, 960, 540); // Configurar tamaño de juego
		this.foco = true; // Capacidad de apretar botones, o interactuar con lo que depende de este objeto
		this.ultimoClick = ""; // Guardar ultimo objeto clickeado
		this.puedeSalir == false; // Si puede salir de habitacion, para no saltarse dialogo
		
		// Comienzo creacion objetos
		
		
		// Fin creacion objetos
		
		game.input.onDown.add(this.click, this); // Llamar la función al hacer click
		this.transicion = new Transicion(2000, "entrar", this.listo, this);
		this.UI = new UI(this); // Agregar UI
	},
	
	listo: function () { // Cuando termina la transicion
		this.foco = true;
		this.alarma = game.time.events.add(Phaser.Timer.SECOND * 1, this.crearDialogo, this);
		this.transicion = null;
	},
	
	update: function () {
		if (this.UI != null) this.UI.update(this.camara); // Actualizar UI
	},
	
	click: function (pointer) { // Al hacer click en cualquier lado
		if (this.foco == true) {

		}
	},
	
	crearDialogo: function () {
		this.dialogo = new Dialogo(this, datosJSON.escena_2s_4.dialogos.dialogo1); // Crear dialogo
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
		game.state.start('Escena-2s-5'); // Ir a escena
	},
	
	limpiar: function () { // Salir de la escena
		// Liberar espacio
		this.fondo.destroy();
		this.fondo = null;
		
		if (this.dialogo != null) {
			this.dialogo.eliminar();
			this.dialogo = null;
		}
		this.UI.eliminar();
		this.UI = null;
	}
};