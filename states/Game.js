var Game = function(game) {};

Game.prototype = {

  preload: function () {
    // this.optionCount = 1;
    // game.load.image('bird', 'assets/images/bird.png');
    game.add.sprite(-30, 0, 'bggame');
    
    
  },

  addMenuOption: function(text, callback) {
    var optionStyle = { font: '30pt TheMinion', fill: 'white', align: 'center', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var txt = game.add.text(game.world.centerX, game.world.centerY, text, optionStyle);
    txt.anchor.setTo(0.5);
    txt.stroke = "rgba(0,0,0,0";
    txt.strokeThickness = 4;
    var onOver = function (target) {
      target.fill = "#FEFFD5";
      target.stroke = "rgba(200,200,200,0.5)";
      txt.useHandCursor = true;
    };
    var onOut = function (target) {
      target.fill = "white";
      target.stroke = "rgba(0,0,0,0)";
      txt.useHandCursor = false;
    };
    //txt.useHandCursor = true;
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);
    txt.events.onInputOver.add(onOver, this);
    txt.events.onInputOut.add(onOut, this);

    this.optionCount ++;
  },

  create: function () {
    this.jumpSound = game.add.audio('jump');
    // if (music.name !== "intro" && gameOptions.playMusic) {
        music.stop();
        music = game.add.audio('bgm');
        music.loop = true;
        music.play();
    //   }

    this.stage.disableVisibilityChange = false;
    this.stage.backgroundColor = '#ffbe8a';
    this.jumpSound = game.add.audio('jump');

    score = 0;
    this.level = 1;
    this.labelScore = game.add.text(20, 20, "0", { font: "normal 40px Jelly Donuts", fill: "#253064" });

    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.bird = game.add.sprite(50, 300, 'bird');
    this.bird.anchor.setTo(-0.2, 0.5);
    game.physics.arcade.enable(this.bird);


    this.bird.body.gravity.y = 2000;
    var spaceKey = game.input.keyboard.addKey(
        Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);

    this.pipes = game.add.group(); 

    this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

  },
  update: function() {
    if(score > 120) {
        this.level = 11;
    } else if(score > 110) {
        this.level = 10;
    } else if(score > 100) {
        this.level = 9;
    } else if(score > 90) {
        this.level = 8;
    } else if(score > 80) {
        this.level = 7;
    } else if(score > 65) {
        this.level = 6;
    } else if(score > 40) {
        this.level = 5;
    } else if(score > 20) {
        this.level = 4;
    } else if(score > 10) {
        this.level = 3;
    } else if(score > 5) {
        this.level = 2;
    } else {
        this.level = 1;
    }

    if (this.bird.y < 0 || this.bird.y > 600)
        this.restartGame();

    if (this.bird.angle < 20)
        this.bird.angle += 1;

    game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);
  },
  addOnePipe: function(x, y) {
    var pipe = game.add.sprite(x, y, 'pipe');
    this.pipes.add(pipe);
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -200;
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
  },
  addRowOfPipes: function() {
    score = score + 1;
    this.labelScore.text = score;

    var numHoles = 7;
    switch(this.level){
        case 1: numHoles = 5; break;
        case 2: numHoles = 4; break;
        case 3: numHoles = 3; break;
        case 4: numHoles = 2; break;
        case 5: numHoles = 2; break;
        // case 6: numHoles = 1; break;
        // case 7: numHoles = 1; break;
        default: numHoles = Math.floor(Math.random() * 5) + 1; break;
    }
    var hole = Math.floor(Math.random() * (11-numHoles) ) ;

    for (var i = 0; i <= 11; i++) {

        if (i != hole) {
            this.addOnePipe(400, i * 50);
        } else {
            i += numHoles;
        }
    }
  },
  jump: function() {
    this.jumpSound.play();
    if (this.bird.alive == false)
        return;
    game.add.tween(this.bird).to({angle: -20}, 100).start();
    this.bird.body.velocity.y = -550;
  },
  restartGame: function() {
    this.game.state.start("GameOver", {score: this.score});
  },
  hitPipe: function() {
    if (this.bird.alive == false)
        return;
    this.bird.alive = false;
    game.time.events.remove(this.timer);
    this.pipes.forEach(function(p){
        p.body.velocity.x = 0;
    }, this);

  },
  actionOnClick: function() {
    this.bird.body.gravity.y = 1000;
    var spaceKey = this.input.keyboard.addKey(
                    Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);
  },

};
