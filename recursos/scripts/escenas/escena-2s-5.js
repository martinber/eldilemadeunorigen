Juego.Escena_2s_5 = function (game) {
	
};

Juego.Escena_2s_5.prototype = {
	create: function () {
		this.fondo = this.add.sprite(0, 0, 'frenteAbueloFondo'); // Agregar fondo
		
		game.world.setBounds(0, 0, 960, 540); // Configurar tamaño de juego
		this.foco = true; // Capacidad de apretar botones, o interactuar con lo que depende de este objeto
		this.ultimoClick = ""; // Guardar ultimo objeto clickeado
		this.puedeSalir == false; // Si puede salir de habitacion, para no saltarse dialogo
		
		// Comienzo creacion objetos
		
		this.nota = this.add.sprite(canvasWidth - 10, 10, 'notaFlecha');
		this.nota.anchor.setTo(1, 0);
		
		this.puerta = this.add.sprite(300, 400, 'puertaAbuelo');
		this.puerta.anchor.setTo(.5, 1); // Establecer su origen (ancla)
		
		this.personaje = new Personaje(300, 526); // Agregar personaje, al final para que se vea arriba
		this.personaje.limitarX(30, 900); // Limitar posición del personaje
		
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
		
		if (this.personaje.x < 60 && this.transicion == null) this.transicion = new Transicion(1000, "salir", this.avanzarEscena, this);
	},
	
	avanzarEscena: function() {
		this.limpiar();
		game.state.start('Escena-2s-6'); // Ir a escena
	},
	
	click: function (pointer) { // Al hacer click en cualquier lado
		if (this.foco == true) {
			this.personaje.moverX(pointer.worldX, null); // Mover personaje
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
	}
};