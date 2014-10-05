// Dimensiones del juego
canvasWidth = 960;
canvasHeight = 540;

var game = new Phaser.Game(canvasWidth, canvasHeight, Phaser.AUTO, 'divJuego');

// Agregar estados
game.state.add('Inicio', Juego.Inicio);
game.state.add('Cargador', Juego.Cargador);
game.state.add('Menu', Juego.Menu);
game.state.add('EscenaPrueba', Juego.EscenaPrueba);
game.state.add('Escena1', Juego.Escena1);

game.state.add('Creditos', Juego.Creditos);
// Comenzar estado
game.state.start('Inicio'); 