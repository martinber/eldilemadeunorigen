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
	
	this.sprite = game.add.sprite(this.x, this.y, 'personaje'); // Agregar el sprite
	this.sprite.anchor.setTo(.5, 1); // Establecer su origen (ancla)
	
	this.puedeMoverse = true;
	this.movimiento = null; // Declarar variable que guarda los tweens (movimientos)
	this.velocidad = .2; // Velocidad de caminata, 0,2 pixeles por milisegundo
	
	// Definir las animaciones
	this.sprite.animations.add('personajeCaminando', [0, 1], 10, true);
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
	this.w = canvasWidth;
	this.h = 100;
	this.escena = escena; // Guardar cuál es la escena
	
	this.fondo = game.add.sprite(this.x + this.w - 100, this.y, 'UIFondo'); // Dibujar fondo
	this.fondo.fixedToCamera = true; // Fondo fijado a la cámara
	
	this.botonVolver = game.add.button(canvasWidth - 20, canvasHeight - 20, 'boton', this.volver, this, 'boton2', 'boton1', 'boton3'); // x, y, imagen, accion, objeto, imagenHover, imagen, imagenClick
	this.botonVolver.anchor.setTo(1, 1); // Establecer su origen (ancla)
	this.botonVolver.fixedToCamera = true; // Fijar a cámara
}
UI.prototype = {
	update: function () { // Llamar constantemente

	},
	volver: function () { // Volver al menu
		if (this.escena.foco == true) {
			this.escena.limpiar();
			game.state.start('Final'); // Ir a escena
		}
	},
	
	decir: function (string, autor) {
		if (this.moverFondo != null) {
			if (this.moverFondo.isRunning == true || this.mostrarTexto.isRunning == true || this.quitarTexto.isRunning == true || this.quitarFondo.isRunning == true) return;
		}
		
		this.texto = game.add.bitmapText(this.x + 50, this.y + 20, 'fuenteJuan', string, 60); // Crear línea nueva
		this.texto.alpha = 0;
		this.texto.fixedToCamera = true;
		this.icono = game.add.sprite(this.x + 10, this.y + 20, "icono" + autor)
		this.icono.alpha = 0;
		this.icono.fixedToCamera = true;
		
		this.moverFondo = game.add.tween(this.fondo.cameraOffset).to({x: this.x}, 1000, Phaser.Easing.Quadratic.InOut, false, 0);
		this.mostrarTexto = game.add.tween(this.texto).to({alpha: 1}, 500, Phaser.Easing.Quadratic.InOut, false, 0);
		this.mostrarIcono = game.add.tween(this.icono).to({alpha: 1}, 500, Phaser.Easing.Quadratic.InOut, false, 0);
		this.quitarTexto = game.add.tween(this.texto).to({alpha: 0}, 500, Phaser.Easing.Quadratic.InOut, false, 3000);
		this.quitarIcono = game.add.tween(this.icono).to({alpha: 0}, 500, Phaser.Easing.Quadratic.InOut, false, 3000);
		this.quitarFondo = game.add.tween(this.fondo.cameraOffset).to({x: this.x + this.w - 100}, 1000, Phaser.Easing.Quadratic.InOut, false, 0);
		
		this.moverFondo.chain(this.mostrarTexto, this.mostrarIcono)
		this.mostrarTexto.chain(this.quitarTexto, this.quitarIcono);
		this.quitarTexto.chain(this.quitarFondo);
		this.moverFondo.start();
	},
	
	traerAlFrente: function () {
		this.fondo.bringToTop();
		this.botonVolver.bringToTop();
		if (this.icono != null) this.icono.bringToTop();
		if (this.texto != null) game.world.bringToTop(this.texto);
	},
	
	eliminar: function () { // Liberar espacio
		this.fondo.destroy();
		this.fondo = null;
		this.botonVolver.destroy();
		this.botonVolver = null;
		if (this.icono != null) this.icono.destroy;
		this.icono = null;
		if (this.texto != null) this.texto.destroy;
		this.texto = null;
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
	this.iconos = new Array(); // Inicializar array que contiene los iconos
	this.linea = 0; // Línea actual, la que se anima
	this.renglones = 0 // Tiene en cuenta los \n
	this.maxRenglones = 11;
	
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
			if (this.cantRenglones(this.datosDialogo[this.linea].texto) + this.renglones > this.maxRenglones) {
				this.nuevaPantalla(); // Si superamos el maximo de renglones empezamos uan nueva pantalla
			}
			
			this.iconos[this.linea] = game.add.sprite(50, 50 + 40 * this.renglones, "icono" + this.datosDialogo[this.linea].personaje)
			//this.iconos[this.linea].anchor.setTo(0, 0);
			this.texto[this.linea] = game.add.bitmapText(100, 50 + 40 * this.renglones, 'fuenteJuan', "", 40); // Crear línea nueva
			this.texto[this.linea].fixedToCamera = true; // Fijarla a la cámara
			this.alarmaAvance = game.time.events.repeat(80, this.datosDialogo[this.linea].texto.length, this.avanzar, this); // Avanzar tantas veces como letras tiene la línea
			
			this.renglones += this.cantRenglones(this.datosDialogo[this.linea].texto);
		}
	},
	cantRenglones: function (string) { // Contar cantidad de renglones del texto buscando los \n
		return string.split(/\r\n|\r|\n/).length;
	},
	cerrar: function () {
		this.creador.eliminarDialogo();
	},
	nuevaPantalla: function () {
		this.renglones = 0;
		for (var i = 0; i < this.texto.length; i++) {
			this.texto[i].destroy();
		}
		for (var i = 0; i < this.iconos.length; i++) {
			this.iconos[i].destroy();
		}
	},
	eliminar: function () { // Liberar espacio
		this.fondo.destroy();
		this.x = null;
		this.y = null;
		this.h = null;
		this.w = null;
		this.dialogos = null;
		this.datosDialogo = null;
		for (var i = 0; i < this.texto.length; i++) {
			this.texto[i].destroy();
		}
		for (var i = 0; i < this.iconos.length; i++) {
			this.iconos[i].destroy();
		}
		game.time.events.remove(this.alarmaNuevaLinea);
		game.time.events.remove(this.alarmaAvance);
		this.texto = null;
		this.boton.destroy();
	}
}

Transicion = function (tiempo, funcion, callback, contexto) { // Objeto que crea una transición a negro
	if (funcion == "entrar") {
		game.world.alpha = 0;
		this.tween = game.add.tween(game.world).to({alpha: 1}, tiempo, Phaser.Easing.Quadratic .In, true, 0); // animar
		this.tween.onComplete.add(callback, contexto);
	}
	if (funcion == "salir") {
		game.world.alpha = 1;
		this.tween = game.add.tween(game.world).to({alpha: 0}, tiempo, Phaser.Easing.Quadratic .In, true, 0); // animar
		this.tween.onComplete.add(callback, contexto);
	}
}
Transicion.prototype = {
	eliminar: function () { // Liberar espacio

	}
}

Foto = function (creador, id) { // Objeto que crea una transición a negro
	// Posicion en pantalla
	this.x = 0;
	this.y = 0;
	
	// Declarar tamaño
	this.w = canvasWidth;
	this.h = canvasHeight;
	
	this.creador = creador; // Necesario para que luego borre a este objeto
	
	this.sprite = game.add.sprite(this.x, this.y, 'dialogoFondo'); // Dibujar fondo
	this.sprite.fixedToCamera = true; // Fondo fijado a la cámara
	
	// Agregar boton
	this.boton = game.add.button(this.x + (this.w - 10), this.y + 10, 'boton', this.cerrar, this, 'boton2', 'boton1', 'boton3'); // x, y, imagen, accion, objeto, imagenHover, imagen, imagenClick
	this.boton.anchor.setTo(1, 0); // Establecer su origen (ancla)
	this.boton.fixedToCamera = true;
}
Foto.prototype = {
	cerrar: function () {
		this.creador.eliminarFoto();
	},
	eliminar: function () { // Liberar espacio
		this.sprite.destroy();
		this.x = null;
		this.y = null;
		this.h = null;
		this.w = null;
		this.boton.destroy();
	}
}

Decision = function (creador, id) { // Objeto que crea una transición a negro
	// Posicion en pantalla
	this.x = 0;
	this.y = 0;
	
	// Declarar tamaño
	this.w = canvasWidth;
	this.h = canvasHeight;
	
	this.creador = creador; // Necesario para que luego borre a este objeto
	
	this.fondo = game.add.graphics(0, 0);
	this.fondo.lineStyle(0);
	this.fondo.fixedToCamera = true;
    this.fondo.beginFill(0x000000, 0.9);
	this.fondo.drawRect(this.x, this.y, this.w, this.h);
	
	if (id == "Escena4") this.texto = game.add.bitmapText(canvasWidth / 2, 100, 'fuenteMartinBlanco', "¿Debería Estefanía preguntarle a los padres sobre la foto?", 40);
	if (id == "Escena-1s-1") this.texto = game.add.bitmapText(canvasWidth / 2, 100, 'fuenteMartinBlanco', "¿Debería Estefanía preguntarle al abuelo sobre la foto?", 40);
	if (id == "Escena-3-3") this.texto = game.add.bitmapText(canvasWidth / 2, 100, 'fuenteMartinBlanco', "¿Debería Estefanía ir a vivir con sus verdaderos padres?", 40);
	
	// Agregar botones
	this.botonSi = game.add.button(100, 200, 'botonSi', this.si, this, 'boton2', 'boton1', 'boton3'); // x, y, imagen, accion, objeto, imagenHover, imagen, imagenClick
	this.botonSi.anchor.setTo(1, 0); // Establecer su origen (ancla)
	this.botonSi.fixedToCamera = true;
	
	this.botonNo = game.add.button(100, 250, 'botonNo', this.no, this, 'boton2', 'boton1', 'boton3'); // x, y, imagen, accion, objeto, imagenHover, imagen, imagenClick
	this.botonNo.anchor.setTo(1, 0); // Establecer su origen (ancla)
	this.botonNo.fixedToCamera = true;
}
Decision.prototype = {
	si: function () {
		this.creador.terminarDecision(true);
	},
	
	no: function () {
		this.creador.terminarDecision(false);
	},
	
	eliminar: function () { // Liberar espacio
		this.x = null;
		this.y = null;
		this.h = null;
		this.w = null;
		this.botonSi.destroy();
		this.botonNo.destroy();
		this.texto.destroy();
		this.fondo.destroy();
	}
}