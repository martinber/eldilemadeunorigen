Juego.Escena1 = function (game) {
	
};

Juego.Escena1.prototype = {
	create: function () {
		this.fondo = this.add.sprite(0, 0, 'escena1Fondo'); // Agregar fondo
		this.personaje = new Personaje(0, 395); // Agregar personaje
		this.UI = new UI(); // Agregar UI
		this.camara = new Camara(this.personaje); // Agregar camara
		game.world.setBounds(0, 0, 2000, 2000); // Configurar tamaño de juego, que es mayor que el de la camara, si no, la camara no puede moverse
	},
	update: function () {
		this.personaje.update(); // Actualizar personaje
		
		if (Juego.mouse.isDown) {
			if (Juego.mouse.worldX > this.personaje.x && Juego.mouse.worldY > this.personaje.y && Juego.mouse.worldX < this.personaje.x + this.personaje.w && Juego.mouse.worldY < this.personaje.y + this.personaje.h) {
				this.personaje.eliminar();
				this.personaje = null;
			}
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
	},
	quitGame: function (pointer) {
		this.personaje = null;
		this.fondo = null;
		this.game.state.start('Menu');
	}
};