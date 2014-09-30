Teclas = function () {
	// Definir teclas
	this.arriba = game.input.keyboard.addKey(Phaser.Keyboard.UP);
	this.abajo = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	this.izquierda = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	this.derecha = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
}

Personaje = function (x, y) {
	// Posicionar personaje como lo indica el constructor
	this.x = x;
	this.y = y;
	
	// Definir las coordenadas másximas y mínimas que puede tener X
	this.xMin = -1;
	this.xMax = -1;
	
	// Obtener su tamaño de las imágenes
	this.w = game.cache.getImage('personaje').width;
	this.h = game.cache.getImage('personaje').height;
	
	this.sprite = game.add.sprite(0, 390, 'personaje'); // Agregar el sprite
	this.sprite.anchor.setTo(.5, 1); // Establecer su origen (ancla)
	
	this.puedeMoverse = true;
	this.movimiento = null; // Declarar variable que guarda los tweens (movimientos)
	this.velocidad = .2; // Velocidad de caminata, 0,2 pixeles por milisegundo
	
	// Definir las animaciones
	this.sprite.animations.add('personajeCaminando', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
}
Personaje.prototype = {	
	update: function () { // Debe ser llamado continuamente
		// Actualizar posición a partir de posición de sprite, porque los tweens mueven a los sprites, no a los objetos
		this.x = this.sprite.x;
		this.y = this.sprite.y;
		
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
	
	limitarX: function (xMin, xMax) { // Definir las coordenadas másximas y mínimas que puede tener X
		this.xMin = xMin;
		this.xMax = xMax;
	},
	
	moverX: function (xPos, especial, callback, contexto) { // Mover a posicion, solo mover en X
		if (this.puedeMoverse) {
			var x = xPos;
			// Limitar posición
			if (this.xMin != -1 && x < this.xMin) x = this.xMin;
			if (this.xMax != -1 && x > this.xMax) x = this.xMax;
			
			if (x == this.x) return; // Si no se va a mover, salir de la función
			
			if (this.movimiento != null && this.movimiento.isRunning) this.movimiento.stop(); // Parar movimientos anteriores si estan corriendo
			this.movimiento = game.add.tween(this.sprite); // Inicializar movimientos
			this.duracion = Math.abs(x - this.sprite.x) / this.velocidad; // Calcular duracion de movimiento a partir de la distancia
			
			this.movimiento.to({x: x, y: this.sprite.y}, this.duracion, Phaser.Easing.Linear.None, true, 0 , false); // Mover
			
			this.sprite.animations.play('personajeCaminando'); // Animar personaje
			if (x > this.sprite.x) { // Si nos vamos a mover a la derecha
				this.sprite.scale.x = 1; // El personaje mira a la derecha
			}
			else if (x < this.sprite.x) {
				this.sprite.scale.x = -1; // El personaje mira a la izquierda
			}
			if (especial != null) {
				if (especial == "callback") this.movimiento.onComplete.add(callback, contexto);
			}
		}
	},
	
	eliminar: function () { // Liberar espacio
		game.tweens.remove(this.movimiento);
		this.movimiento = null;
		this.sprite.destroy();
		this.sprite = null;
		this.x = null;
		this.y = null;
		this.h = null;
		this.w = null;
		this.xMin = null;
		this.xMax = null;
		this.velocidad = null;
		this.puedeMoverse = null;
		this.duracion = null;
	}
}

UI = function (escena) { // Objeto que se encarga de manejar la interfaz, algo así como un HUD
	// Posicion en pantalla
	this.x = 0;
	this.y = 440;
	this.escena = escena; // Guardar cuál es la escena
	
	//this.fondo = game.add.sprite(this.x, this.y, 'UIFondo'); // Dibujar fondo
	//this.fondo.fixedToCamera = true; // Fondo fijado a la cámara
	
	this.botonVolver = game.add.button(canvasWidth - 20, canvasHeight - 20, 'boton', this.volver, this, 'boton2', 'boton1', 'boton3'); // x, y, imagen, accion, objeto, imagenHover, imagen, imagenClick
	this.botonVolver.anchor.setTo(1, 1); // Establecer su origen (ancla)
	this.botonVolver.fixedToCamera = true; // Fijar a cámara
}
UI.prototype = {
	update: function () { // Llamar constantemente

	},
	volver: function () { // Volver al menu
		if (this.escena.foco == true) {
			this.escena.volver();
		}
	},
	eliminar: function () { // Liberar espacio
		//this.fondo.destroy();
		//this.fondo = null;
		this.botonVolver.destroy();
		this.botonVolver = null;
		this.x = null;
		this.y = null;
	}
}

Camara = function (objetivo) {
	// Declarar variables
	this.x = 0;
	this.y = 0;
	this.w = game.camera.width;
	this.h = game.camera.height;
	
	this.objetivo = objetivo; // El objetivo debe tener variables x e y, la cámara sigue al objetivo
}
Camara.prototype = {
	update: function () {
		// Calcular para que el personaje quede al medio, la camara solo se mueve horizontalmente
		// No uso las funciones predeterminadas de la camara por si quiero un movimiento mas avanzado despues
		this.x = this.objetivo.sprite.x - this.w / 2;
		// No hay que preocuparse por si la camara se sale del juego, Phaser lo arregla si se sale de los limites de game.world
		game.camera.setPosition(this.x, this.y); // Actualizar la camara
	},
	eliminar: function () { // Liberar espacio
		this.x = null;
		this.y = null;
		this.h = null;
		this.w = null;
		this.objetivo = null;
	}
}

Dialogo = function (creador, datosDialogo) { // Objeto que se encarga de mostrar los dialogos
	// Posicion en pantalla
	this.x = 0;
	this.y = 0;
	
	// Declarar tamaño
	this.w = canvasWidth;
	this.h = canvasHeight;
	
	// Declarar alarmas
	this.alarmaAvance = null;
	this.alarmaNuevaLinea = null;
	
	this.creador = creador; // Necesario para que luego borre a este objeto
	
	this.texto = new Array(); // Inicializar array que contiene las líneas de texto visibles
	this.linea = 0; // Línea actual, la que se anima
	
	this.datosDialogo = datosDialogo; // Obtener información sobre la escena
	this.fondo = game.add.sprite(this.x, this.y, 'dialogoFondo'); // Dibujar fondo
	this.fondo.fixedToCamera = true; // Fondo fijado a la cámara
	
	// Agregar boton
	this.boton = game.add.button(this.x + (this.w - 10), this.y + 10, 'boton', this.cerrar, this, 'boton2', 'boton1', 'boton3'); // x, y, imagen, accion, objeto, imagenHover, imagen, imagenClick
	this.boton.anchor.setTo(1, 0); // Establecer su origen (ancla)
	this.boton.fixedToCamera = true;
	
	this.nuevaLinea(); // Empezar a dibujar una línea de texto
}
Dialogo.prototype = {
	update: function (camara) { // Llamar constantemente

	},
	avanzar: function () { // Llamado periodicamente para ir agregando letras
		if (this.texto[this.linea].text.length < this.datosDialogo[this.linea].texto.length) { // Si no se termino de escribir la linea
			this.texto[this.linea].setText(this.datosDialogo[this.linea].texto.substr(0, this.texto[this.linea].text.length + 1)); // Agregar una letra a la línea
		}
		else {
			// Crear una línea dentro de un segundo
			this.alarmaNuevaLinea = game.time.events.add(Phaser.Timer.SECOND, this.nuevaLinea, this);
			this.linea += 1;
		}
	},
	nuevaLinea: function () {
		if (this.linea < this.datosDialogo.length) { // Si no terminó el diálogo
			this.texto[this.linea] = game.add.bitmapText(50, 50 + 64 * this.linea, 'fuenteJuan', "", 64); // Crear línea nueva
			this.texto[this.linea].fixedToCamera = true; // Fijarla a la cámara
			this.alarmaAvance = game.time.events.repeat(80, this.datosDialogo[this.linea].texto.length, this.avanzar, this); // Avanzar tantas veces como letras tiene la línea
		}
	},
	cerrar: function () {
		this.creador.eliminarDialogo();;
	},
	eliminar: function () { // Liberar espacio
		this.fondo.destroy();
		this.x = null;
		this.y = null;
		this.h = null;
		this.w = null;
		this.camara = null;
		this.dialogos = null;
		this.datosDialogo = null;
		for (var i = 0; i < this.texto.length; i++) {
			this.texto[i].destroy();
		}
		game.time.events.remove(this.alarmaNuevaLinea);
		game.time.events.remove(this.alarmaAvance);
		this.texto = null;
		this.boton.destroy();
	}
}