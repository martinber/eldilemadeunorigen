width = 960;
height = 540;

var game = new Phaser.Game(width, height, Phaser.AUTO, 'divJuego');//, { preload: preload, create: create, update: update });

// Agregar estados
game.state.add('Inicio', Juego.Inicio);
game.state.add('Cargador', Juego.Cargador);
game.state.add('Menu', Juego.Menu);
game.state.add('Escena1', Juego.Escena1);
// Comenzar estado
game.state.start('Inicio'); 
