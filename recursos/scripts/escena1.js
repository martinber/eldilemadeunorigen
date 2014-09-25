Juego.Escena1 = function (game) {
	
};

Juego.Escena1.prototype = {
	create: function () {
		this.fondo = this.add.sprite(0, 0, 'escena1Fondo'); // Agregar fondo
		this.personaje = new Personaje(0, 395); // Agregar personaje
		this.UI = new UI(); // Agregar UI
		this.camara = new Camara(this.personaje); // Agregar camara
		game.world.setBounds(0, 0, 2000, 2000); // Configurar tamaño de juego, que es mayor que el de la camara, si no, la camara no puede moverse
		
		// Agregar a Luigi
		this.luigi = this.add.sprite(1000, 395, 'luigi');
		this.luigi.anchor.setTo(.5, 1); // Establecer su origen (ancla)
		this.luigi.inputEnabled = true; // Habilitar chequeos de click
		this.luigi.events.onInputDown.add(this.clickEnLuigi, this); // Llamar la función al hacerle click
		
		this.personaje.limitarX(200, 800); // Limitar posición del personaje
		
		this.vecesHabladasConLuigi = 0;
		
		game.input.onDown.add(this.click, this); // Llamar la función al hacer click
	},
	
	update: function () {
		this.personaje.update(); // Actualizar personaje
		this.camara.update(); // Actualizar camara
		this.UI.update(this.camara); // Actualizar UI
	},
	
	clickEnLuigi: function() {
		if (this.vecesHabladasConLuigi == 0) this.dialogo = new Dialogo(this, datosJSON.escena1.dialogos.luigi); // Crear dialogo
		else this.dialogo = new Dialogo(this, datosJSON.escena1.dialogos.luigi2); // Crear dialogo 2
		this.vecesHabladasConLuigi += 1;
		this.personaje.puedeMoverse = false;
	},
	
	click: function (pointer) {
		this.personaje.moverX(pointer.worldX); // Mover personaje
	},
	
	eliminarDialogo: function () {
		this.dialogo.eliminar();
		this.dialogo = null;
		this.personaje.puedeMoverse = true;
	},
	
	quitGame: function (pointer) { // Salir de la escena
		// Liberar espacio
		this.fondo.destroy();
		this.fondo = null;
		if (this.dialogo != null) {
			this.dialogo.eliminar();
			this.dialogo = null;
		}
		this.personaje.eliminar();
		this.personaje = null;
		this.UI.eliminar();
		this.UI = null;
		this.camara.eliminar();
		this.camara = null;
		this.luigi.destroy();
		this.luigi = null;
		this.vecesHabladasConLuigi = null;
		
		this.game.state.start('Menu'); // Ir al menu
	}
};