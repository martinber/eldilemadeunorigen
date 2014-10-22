Juego.Escena3 = function (game) {
	
};

Juego.Escena3.prototype = {
	create: function () {
		this.fondo = this.add.sprite(0, 0, 'pasilloFondo'); // Agregar fondo
		
		game.world.setBounds(0, 0, 1333, 540); // Configurar tamaño de juego
		this.foco = true; // Capacidad de apretar botones, o interactuar con lo que depende de este objeto
		this.ultimoClick = ""; // Guardar ultimo objeto clickeado
		this.puedeSalir == false; // Si puede salir de habitacion, para no saltarse dialogo
		
		// Comienzo creacion objetos
		
		this.puertaAbriendose = this.add.audio('puertaAbriendose'); // Configurar sonido
		
		this.puerta1 = this.add.sprite(1147, 42, 'puerta1');
		this.puerta1Abierta = this.add.sprite(1147, 42, 'puerta1Abierta');
		this.puerta1Abierta.alpha = 0;
		this.puerta1.inputEnabled = true; // Habilitar chequeos de click
		this.puerta1.events.onInputDown.add(this.clickEnPuerta1, this); // Llamar la función al hacerle click
		
		this.puerta2 = this.add.sprite(700, 110, 'puerta2');
		this.puerta2.inputEnabled = true; // Habilitar chequeos de click
		this.puerta2.events.onInputDown.add(this.clickEnPuerta2, this); // Llamar la función al hacerle click
		
		this.personaje = new Personaje(0, 526); // Agregar personaje, al final para que se vea arriba
		this.personaje.limitarX(60, 1250); // Limitar posición del personaje
		
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
	
	clickEnPuerta1: function () { // Al hacer click en cualquier lado
		if (this.foco == true) {
			this.personaje.moverX(1200, "callback", this.fPuerta1, this);
		}
	},
	
	clickEnPuerta2: function () { // Al hacer click en cualquier lado
		if (this.foco == true) {
			this.personaje.moverX(750, "callback", this.fPuerta2, this);
		}
	},
	
	fPuerta1: function () {
		this.puerta1.alpha = 0;
		this.puerta1Abierta.alpha = 1;
		this.puertaAbriendose.play(); // Reproducir sonido
		if (this.transicion == null) this.transicion = new Transicion(1000, "salir", this.avanzarEscena, this)
	},
	
	fPuerta2: function () {
		this.UI.decir("Acá no guardamos las fotos", "E");
	},
	
	avanzarEscena: function() {
		this.limpiar();
		game.state.start('Escena4'); // Ir a escena
	},
	
	limpiar: function () { // Salir de la escena
		// Liberar espacio
		this.personaje.eliminar();
		this.personaje = null;
		this.fondo.destroy();
		this.fondo = null;
		this.UI.eliminar();
		this.UI = null;
		this.camara.eliminar();
		this.camara = null;
		this.puertaAbriendose.destroy();
		this.puertaAbriendose = null;
	}
};