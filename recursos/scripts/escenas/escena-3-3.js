Juego.Escena_3_3 = function (game) {
	
};

Juego.Escena_3_3.prototype = {
	create: function () {
		this.fondo = this.add.sprite(-60, 0, 'livingBiologicosFondo'); // Agregar fondo
		game.world.setBounds(0, 0, 960, 540); // Configurar tamaño de juego
		this.foco = true; // Capacidad de apretar botones, o interactuar con lo que depende de este objeto
		this.ultimoClick = ""; // Guardar ultimo objeto clickeado
		this.puedeSalir == false; // Si puede salir de habitacion, para no saltarse dialogo
		
		// Comienzo creacion objetos
		
		
		// Fin creacion objetos
		
		this.transicion = new Transicion(2000, "entrar", this.listo, this);
		this.UI = new UI(this); // Agregar UI
	},
	
	listo: function () { // Cuando termina la transicion
		this.foco = true;
		this.alarma = game.time.events.add(Phaser.Timer.SECOND * 1, this.crearDialogo, this);
		this.transicion = null;
	},
	
	update: function () {
		this.UI.update(this.camara); // Actualizar UI
	},
	
	crearDialogo: function () {
		this.dialogo = new Dialogo(this, datosJSON.escena_3_3.dialogos.dialogo1); // Crear dialogo
		this.foco = false;
	},
	
	eliminarDialogo: function () {
		this.dialogo.eliminar();
		this.dialogo = null;
		this.decision = new Decision(this, "Escena-3-3"); // Crear decision
		this.foco = false;
	},
	
	terminarDecision: function (respuesta) {
		this.decision.eliminar();
		this.decision = null;
		
		if (respuesta == true) this.transicion = new Transicion(1000, "salir", this.decididoSi, this);
		else this.transicion = new Transicion(1000, "salir", this.decididoNo, this);
	},
	
	decididoNo: function () {
		this.limpiar();
		game.state.start('Final');
	},
	
	decididoSi: function () {
		this.limpiar();
		game.state.start('MesesMasTarde2');
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