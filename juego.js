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
game.state.add('Escena2', Juego.Escena2);
game.state.add('Escena3', Juego.Escena3);
game.state.add('Escena4', Juego.Escena4);

game.state.add('Escena-1s-1', Juego.Escena_1s_1);

game.state.add('Escena-2s-1', Juego.Escena_2s_1);
game.state.add('Escena-2s-2', Juego.Escena_2s_2);
game.state.add('Escena-2s-3', Juego.Escena_2s_3);
game.state.add('Escena-2s-4', Juego.Escena_2s_4);
game.state.add('Escena-2s-5', Juego.Escena_2s_5);
game.state.add('Escena-2s-6', Juego.Escena_2s_6);

game.state.add('Escena-n-1', Juego.Escena_n_1);
game.state.add('Escena-n-2', Juego.Escena_n_2);
game.state.add('Escena-n-3', Juego.Escena_n_3);
game.state.add('Escena-n-4', Juego.Escena_n_4);

game.state.add('Escena-3-1', Juego.Escena_3_1);
game.state.add('Escena-3-2', Juego.Escena_3_2);
game.state.add('Escena-3-3', Juego.Escena_3_3);

game.state.add('Escena-4s-1', Juego.Escena_4s_1);

game.state.add('Final', Juego.Final);
game.state.add('Creditos', Juego.Creditos);

// Comenzar estado
game.state.start('Inicio'); 

