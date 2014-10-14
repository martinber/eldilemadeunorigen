Juego.Escena4 = function (game) {
	
};

Juego.Escena4.prototype = {
	create: function () {
		this.fondo = this.add.sprite(0, 0, 'piezaPadresFondo'); // Agregar fondo
		game.world.setBounds(0, 0, 960, 540); // Configurar tamaño de juego
		this.foco = true; // Capacidad de apretar botones, o interactuar con lo que depende de este objeto
		this.ultimoClick = ""; // Guardar ultimo objeto clickeado
		this.puedeSalir == false; // Si puede salir de habitacion, para no saltarse dialogo
		
		// Comienzo creacion objetos
		
		this.armario = this.add.sprite(260, 70, 'armario');
		this.armario.inputEnabled = true; // Habilitar chequeos de click
		this.armario.events.onInputDown.add(this.clickEnArmario, this); // Llamar la función al hacerle click
		
		this.armarioAbierto = this.add.sprite(220, 65, 'armarioAbierto');
		this.armarioAbierto.alpha = 0;
		
		this.personaje = new Personaje(930, 515); // Agregar personaje, al final para que se vea arriba
		this.personaje.limitarX(60, 930); // Limitar posición del personaje
		this.personaje.sprite.scale.x = -1;
		
		// Fin creacion objetos
		
		this.camara = new Camara(this.personaje); // Agregar camara
		game.input.onDown.add(this.click, this); // Llamar la función al hacer click
		this.transicion = new Transicion(1000, "entrar", this.listo, this);
		this.UI = new UI(this); // Agregar UI
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
	
	
	clickEnArmario: function () {
		if (this.foco == true) {
			this.personaje.moverX(335, "callback", this.fArmario, this);
		}
	},
	
	fArmario: function () {
		this.armario.alpha = 0;
		this.armarioAbierto.alpha = 1;
		this.personaje.sprite.scale.x = 1;
		this.UI.decir("Y esta otra foto?", "E");
		this.alarma = game.time.events.add(Phaser.Timer.SECOND * 6.1, this.mostrarFoto, this);
		this.foco = false;
	},
	
	mostrarFoto: function () {
		this.foto = new Foto(this, "escena4");
		this.UI.traerAlFrente();
		this.UI.decir("No conozco a estas personas", "E");
	},
	
	eliminarFoto: function () {
		this.foto.eliminar();
		this.foto = null;
		
		this.decision = new Decision(this, "Escena4"); // Crear decision
		this.foco = false;
	},
	
	terminarDecision: function (respuesta) {
		this.decision.eliminar();
		this.decision = null;
		
		this.limpiar();
		if (respuesta == true) game.state.start('Escena-1s-1');
		else game.state.start('MesesMasTarde1');
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