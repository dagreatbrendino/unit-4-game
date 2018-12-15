// $(document).ready(function(){
    console.log("i am ready");
    var allFighters = [{ name: "Mace Windu", hp: 150, atk: 8, counter: 25, alive: true, picked: false }, 
    { name: "Kylo Ren", hp: 100, atk: 6, counter: 10, alive: true, picked: false }];
    var fighterSelected = false;

    var playerFighter = {
        playerHP: 1,
        setplayerHP: function (indexofFighter) {
            this.playerHP = allFighters[indexofFighter].hp;
        },
        playerAtk: 1,
        setplayerAtk: function (indexofFighter) {
            this.playerAtk = allFighters[indexofFighter].atk;
        },
        dying: false,

        attack: function () {
            //Subtract current pAtk from defenders health
            //if the enemies hp is below zero, change the value of killed in the enemy object to true
            pfHP += baseAtK;
        },
        die: function (dying) {
            if (dying) {
                // cause the game to end
            }
        }
    }

    var enemySelected = false;
    var enemyFighter = {
        
        enemyHP: 1,
        setenemyHP: function (indexofFighter) {
            this.enemyHP = allFighters[indexofFighter].hp;
        },
        enemyAtk: 1,
        setenemyAtk: function (indexofFighter) {
            this.enemyAtk = allFighters[indexofFighter].counter;
        },
        counterAtk: function () {
            //subtract enemies counter attack from players hp
            //if the player's hp has fallen below zero, change the value of dying in the player object to true
        },
        kill: function (killed) {
            if (killed) {
                //remove the enemy from the dom
                enemySelected = false;
            }
        }
    }

// })
