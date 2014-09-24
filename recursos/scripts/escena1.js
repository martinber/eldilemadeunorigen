Juego.Escena1 = function (game) {
	
};

Juego.Escena1.prototype = {
	create: function () {
		this.fondo = this.add.sprite(0, 0, 'escena1Fondo'); // Agregar fondo
		this.personaje = new Personaje(0, 395); // Agregar personaje
		this.luigi = this.add.sprite(1000, 395, 'luigi');
		this.luigi.anchor.setTo(.5, 1); // Establecer su origen (ancla)
		this.luigi.inputEnabled = true;
		this.luigi.input.useHandCursor = true; //if you want a hand cursor
		this.luigi.events.onInputDown.add(this.clickEnLuigi, this);
		
		this.UI = new UI(); // Agregar UI
		this.camara = new Camara(this.personaje); // Agregar camara
		game.world.setBounds(0, 0, 2000, 2000); // Configurar tamaño de juego, que es mayor que el de la camara, si no, la camara no puede moverse
		//this.dialogo = new Dialogo(datosJSON.escena1);
	},
	update: function () {
		this.personaje.update(); // Actualizar personaje
		
		if (Juego.mouse.isDown) {
			//if (Juego.mouse.worldX > this.personaje.x && Juego.mouse.worldY > this.personaje.y && Juego.mouse.worldX < this.personaje.x + this.personaje.w && Juego.mouse.worldY < this.personaje.y + this.personaje.h) {
			//alert(this.personaje.x + " " + this.personaje.y + " " + this.personaje.w + " " + this.personaje.h + " " + Juego.mouse.worldX + " " + Juego.mouse.worldY + " ");
			
			/*if (es un boton) {
			
			}
			else if (es una casa) {
				
			}
			else if (es una cosa) {
				
			}
			else{
				Mover personaje
			}
			*/
			
			this.personaje.moverX(Juego.mouse.worldX);
		}
		
		
		this.camara.update();
		//this.dialogo.update(this.camara);
		this.UI.update(this.camara);
	},
	clickEnLuigi: function() {
		this.dialogo = new Dialogo(datosJSON.escena1);
	},
	quitGame: function (pointer) {
		this.personaje.eliminar();
		if (this.dialogo != null) {
			this.dialogo.eliminar();
			this.dialogo = null;
		}
		this.personaje = null;
		this.fondo = null;
		this.game.state.start('Menu');
	}
};