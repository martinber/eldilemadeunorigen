Juego.Escena2 = function (game) {
	
};

/*
 * Sentar personaje
 * Cambiar Imagenes padres
 * 
 * 
 */

Juego.Escena2.prototype = {
	create: function () {
		this.fondo = this.add.sprite(-50, 0, 'piezaFondo'); // Agregar fondo
		game.world.setBounds(0, 0, 960, 540); // Configurar tamaño de juego
		this.foco = true; // Capacidad de apretar botones, o interactuar con lo que depende de este objeto
		this.ultimoClick = ""; // Guardar ultimo objeto clickeado
		this.puedeSalir == false; // Si puede salir de habitacion, para no saltarse dialogo
		
		// Comienzo creacion objetos
		
		this.silla = this.add.sprite(850, 500, 'sillaEscritorio');
		this.silla.anchor.setTo(.5, 1); // Establecer su origen (ancla)
		
		this.mesa = this.add.sprite(700, 500, 'mesaEscritorio');
		this.mesa.anchor.setTo(.5, 1); // Establecer su origen (ancla)
		
		this.personaje = new Personaje(300, 526); // Agregar personaje, al final para que se vea arriba
		this.personaje.limitarX(60, 900); // Limitar posición del personaje
		
		// Fin creacion objetos
		
		game.input.onDown.add(this.click, this); // Llamar la función al hacer click
		this.transicion = new Transicion(1000, "entrar", this.listo, this);
		this.UI = new UI(this); // Agregar UI
	},
	
	listo: function () { // Cuando termina la transicion
		this.foco = false;
		this.alarma = game.time.events.add(Phaser.Timer.SECOND * 2, this.mostrarLlamado, this);
	},
	
	mostrarLlamado: function () {
		this.UI.decir("Acá traemos las fotos", "MA");
		this.alarma = game.time.events.add(Phaser.Timer.SECOND * 5, this.irASentarse, this);
	},
	
	irASentarse: function () {
		this.personaje.moverX(this.silla.x, "callback", this.sentarse, this); // Mover personaje
		
		this.MA = game.add.sprite(-100, 526, 'personaje'); // Agregar madre
		this.MA.anchor.setTo(.5, 1); // Establecer su origen (ancla)
		this.MA.animations.add('personajeCaminando', [0, 1], 10, true);
		this.MA.animations.play('personajeCaminando'); // Animar personaje
		this.MATween = game.add.tween(this.MA).to({x: 500}, 4000, Phaser.Easing.Linear.None, true, 0);
		
		this.PA = game.add.sprite(-140, 526, 'personaje'); // Agregar madre
		this.PA.anchor.setTo(.5, 1); // Establecer su origen (ancla)
		this.PA.animations.add('personajeCaminando', [0, 1], 10, true);
		this.PA.animations.play('personajeCaminando'); // Animar personaje
		this.PATween = game.add.tween(this.PA).to({x: 460}, 4000, Phaser.Easing.Linear.None, true, 0);
		this.PATween.onComplete.add(this.crearDialogo, this); // Creardialogo al terminar
		
		this.UI.traerAlFrente();
	},
	
	sentarse: function () {
		this.personaje.eliminar();
		this.personaje = null;
		
		this.personajeSentado = this.add.sprite(this.silla.x, this.silla.y, 'personaje');
		this.personajeSentado.anchor.setTo(.5, 1); // Establecer su origen (ancla)
		
		this.UI.traerAlFrente();
	},
	
	update: function () {
		if (this.personaje != null) this.personaje.update(); // Actualizar personaje
		this.UI.update(this.camara); // Actualizar UI
		if (this.personaje != null) {
			if (this.personaje.x < 60) this.transicion = new Transicion(1000, "salir", this.avanzarEscena, this)
		}
	},
	
	click: function (pointer) { // Al hacer click en cualquier lado
		if (this.foco == true) {
			if (this.personaje != null) this.personaje.moverX(pointer.worldX, null); // Mover personaje
		}
	},
	
	crearDialogo: function () {
		this.PA.animations.stop();
		this.MA.animations.stop();
		this.dialogo = new Dialogo(this, datosJSON.escena2.dialogos.dialogo1); // Crear dialogo
	},
	
	eliminarDialogo: function () {
		this.dialogo.eliminar();
		this.dialogo = null;
		
		this.PATween = game.add.tween(this.PA).to({x: -140}, 4000, Phaser.Easing.Linear.None, true, 0);
		this.MATween = game.add.tween(this.MA).to({x: -100}, 4000, Phaser.Easing.Linear.None, true, 0);
		this.PATween.onComplete.add(this.padresIdos, this);
		this.MA.animations.play('personajeCaminando'); // Animar personaje
		this.PA.animations.play('personajeCaminando'); // Animar personaje
		this.MA.scale.x = -1; // Espejar
		this.PA.scale.x = -1; // Espejar
	},
	
	padresIdos: function () {
		this.alarma = game.time.events.add(Phaser.Timer.SECOND * 5, this.terminadoDePegarFotos, this);
	},
	
	terminadoDePegarFotos: function () {
		this.foco = true;
		this.UI.decir("Terminé, tendría que guardar las fotos", "E");
		this.personajeSentado.destroy();
		this.personajeSentado = null;
		this.MA.destroy();
		this.MA = null;
		this.PA.destroy();
		this.PA = null;
		this.personaje = new Personaje(this.silla.x, this.silla.y); // Agregar personaje, al final para que se vea arriba
		this.personaje.limitarX(0, this.silla.x); // Limitar posición del personaje
		
		this.UI.traerAlFrente();
	},
	
	avanzarEscena: function() {
		this.limpiar();
		game.state.start('Escena3'); // Ir a escena
	},
	
	limpiar: function () { // Salir de la escena
		// Liberar espacio
		this.fondo.destroy();
		this.fondo = null;
		this.personaje.eliminar();
		this.personaje = null;
		if (this.dialogo != null) {
			this.dialogo.eliminar();
			this.dialogo = null;
		}
		this.UI.eliminar();
		this.UI = null;
		this.silla.destroy();
		this.silla = null;
		this.mesa.destroy();
		this.mesa = null;
	}
};