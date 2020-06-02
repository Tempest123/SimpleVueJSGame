new Vue ({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {

        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns=[];
        },

        attack: function() {
            var damange =  this.calculateDamage(3, 10);
            this.monsterHealth -= damange;

            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits monster for ' + damange
            });

            if( this.checkWin()) {
                return;
            }          

            this.monsterAttacks();
        },

        specialAttack: function() {

            var damange = this.calculateDamage(10, 20);
            this.monsterHealth -= damange;

            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits monster hard for ' + damange
            });

            if( this.checkWin()) {
                return;
            }

            this.monsterAttacks();
            
        },

        heal: function() {

            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals 10 units'
            });

            if(this.playerHealth <= 90) {
                this.playerHealth += 10;
            }
            else {
                this.playerHealth = 100;
            }
            
            this.monsterAttacks();
        },

        giveUp: function() {

            this.gameIsRunning = false;

        },

        monsterAttacks() {

            var damange = this.calculateDamage(5, 12);
            this.playerHealth -= damange;

            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits player for ' + damange
            });

            if( this.checkWin()) {
                return;
            }   

            this.checkWin();
        },

        calculateDamage: function(max, min) {

            return Math.max(Math.floor(Math.random() * max) + 1, min);

        },

        checkWin: function() {
            
            if(this.monsterHealth <= 0) {
                if(confirm("You won! New Game?")) {
                    this.startGame();
                }
                else {
                    this.gameIsRunning = false;
                }              
              return true;
            }
            else if (this.playerHealth <= 0) {
                if(confirm("You Lost! New Game?")) {
                    this.startGame();
                }
                else {
                    this.gameIsRunning = false;
                }              
              return true;
            }
        }

    }
});