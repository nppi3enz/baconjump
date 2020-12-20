// Global Variables
var
  game = new Phaser.Game(400, 600, Phaser.AUTO, 'game'),
  Main = function () {},
  gameOptions = {
    playSound: true,
    playMusic: true
  },
  score = 0,
  musicPlayer;

Main.prototype = {

  preload: function () {
    game.load.image('stars',    'assets/images/bg_loading.jpg');
    game.load.image('loading',  'assets/images/loading.png');
    game.load.image('brand',    'assets/images/logo.png');
    game.load.image('bggame',    'assets/images/bg-game.jpg');


    game.load.script('polyfill',   'lib/polyfill.js');
    game.load.script('utils',   'lib/utils.js');
    game.load.script('splash',  'states/Splash.js');

    game.load.image('bird', 'assets/images/bacon.png');
    game.load.image('pipe', 'assets/images/pipe.png');
    game.load.audio('jump', 'assets/bgm/jump.wav');
    game.load.audio('bgm', 'assets/bgm/bgm.mp3');
    
  },

  create: function () {
    game.state.add('Splash', Splash);
    game.state.start('Splash');
  }

};

game.state.add('Main', Main);
game.state.start('Main');
