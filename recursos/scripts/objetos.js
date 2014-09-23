Teclas = function () {
	// Definir teclas
	this.arriba = game.input.keyboard.addKey(Phaser.Keyboard.UP);
	this.abajo = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	this.izquierda = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	this.derecha = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
}

// Para mouse crear un mouse usar: Mouse = game.input.mousePointer;
// Usar worldX y worldY para posicion
// Usar isDown para ver si se apreto

Personaje = function (x, y) {
	// Posicionar personaje como lo indica el constructor
	/*this.x = x;
	this.y = y;
	
	this.objetivo = x; // A donde esta moviendose, ahora, a su posicion*/
	
	this.w = game.cache.getImage('personaje').width;
	this.h = game.cache.getImage('personaje').height;
	
	this.sprite = game.add.sprite(0, 390, 'personaje'); // Agregar el sprite
	this.sprite.anchor.setTo(.5, 1); // Establecer su origen (ancla)
	
	this.movimiento = null;
	this.velocidad = .2; // velocidad de caminata, 0,2 pixeles por milisegundo
	
	// Definir las animaciones
	this.sprite.animations.add('personajeCaminando', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
}
Personaje.prototype = {	
	update: function () { // Debe ser llamado continuamente
		// Mover personaje
		/*if (Juego.teclas.derecha.isDown) {
			this.x += 3;
			this.sprite.animations.play('personajeCaminando');
			this.sprite.scale.x = 1;
		}
		else if (Juego.teclas.izquierda.isDown) {
			this.x -= 3;
			this.sprite.animations.play('personajeCaminando');
			this.sprite.scale.x = -1;
		}
		else {
			this.sprite.animations.stop();
			this.sprite.frame = 0;
		}
		
		// Impedir que se vaya fuera de la habitación
		if (this.x < 0) this.x = 0;
		if (this.x > 1200) this.x = 1200;
		
		// Actualizar posición del sprite
		this.sprite.x = this.x;
		this.sprite.y = this.y;*/
		
		// Si no existe movimiento, o si el movimiento esta parado, parar las animaciones
		if (this.movimiento == null) {
			this.sprite.animations.stop(); // Parar animaciones si no existe movimiento
			this.sprite.frame = 0;
		}
		else if (!this.movimiento.isRunning) {
			this.sprite.animations.stop(); // Parar animaciones si no se esta moviendo
			this.sprite.frame = 0;
		}
	},
	
	eliminar: function () { // Liberar espacio
		this.sprite.destroy();
		/*this.x = null;
		this.y = null;*/
	},
	
	moverX: function (xPos) { // Mover a posicion, solo mover en X
		this.objetivo = xPos;
		if (this.movimiento != null && this.movimiento.isRunning) this.movimiento.stop(); // Parar movimientos anteriores si estan corriendo
		this.movimiento = game.add.tween(this.sprite); // Inicializar animaciones
		this.duracion = Math.abs(xPos - this.sprite.x) / this.velocidad;
		this.movimiento.to({x: xPos, y: this.sprite.y}, this.duracion, Phaser.Easing.Linear.None, true, 0 , false);
		this.sprite.animations.play('personajeCaminando'); // Animar personaje
		if (xPos > this.sprite.x) { // Si nos vamos a mover a la derecha
			this.sprite.scale.x = 1; // El personaje mira a la derecha
		}
		else {
			this.sprite.scale.x = -1; // El personaje mira a la izquierda
		}
	}
}

UI = function () { // Objeto que se encarga de manejar la interfaz, algo así como un HUD
	// Posicion en pantalla
	this.x = 0;
	this.y = 400;
	
	this.fondo = game.add.sprite(this.x, this.y, 'UIFondo');
}
UI.prototype = {
	update: function () { // Llamar constantemente
		
	}
}

Camara = function (objetivo) {
	this.x = 0;
	this.y = 0;
	this.w = game.camera.width;
	this.h = game.camera.height;
	
	this.objetivo = objetivo; // El objetivo debe tener variables x e y
}
Camara.prototype = {
	update: function () {
		// Calcular para que el personaje quede al medio, aunque la camara solo de mueve horizontalmente
		// No uso las funciones predeterminadas de la camara para cambiar algo si el UI lo necesita, o si quiero un movimiento mas avanzado tener todo en el mismo objeto
		this.x = this.objetivo.sprite.x - this.w / 2;
		// No hay que preocuparse por si la camara se sale del juego, Phaser lo arregla si se sale de los limites de game.world
		game.camera.setPosition(this.x, this.y); // Actualizar la camara
	}
}