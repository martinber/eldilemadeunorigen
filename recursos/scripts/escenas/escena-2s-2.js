Juego.Escena_2s_2 = function (game) {
	
};

Juego.Escena_2s_2.prototype = {
	create: function () {
		this.fondo = this.add.sprite(0, 0, 'bosqueFondo'); // Agregar fondo
		this.UI = new UI(this); // Agregar UI
		game.world.setBounds(0, 0, 960, 540); // Configurar tamaño de juego
		this.foco = true; // Capacidad de apretar botones, o interactuar con lo que depende de este objeto
		this.ultimoClick = ""; // Guardar ultimo objeto clickeado
		this.puedeSalir == false; // Si puede salir de habitacion, para no saltarse dialogo
		
		// Comienzo creacion objetos
		
		this.personaje = new Personaje(0, 526); // Agregar personaje, al final para que se vea arriba
		this.personaje.limitarX(60, 900); // Limitar posición del personaje
		
		// Fin creacion objetos
		
		this.camara = new Camara(this.personaje); // Agregar camara
		game.input.onDown.add(this.click, this); // Llamar la función al hacer click
		this.transicion = new Transicion(1000, "entrar", this.listo, this);
	},
	
	listo: function () { // Cuando termina la transicion
		this.foco = true;
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
	}
};