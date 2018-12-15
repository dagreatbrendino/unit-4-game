console.log("i am ready");
var allFighters = [{ name: "Mace Windu", hp: 150, atk: 8, counter: 25, alive: true, picked: false },
{ name: "Kylo Ren", hp: 100, atk: 6, counter: 10, alive: true, picked: false },
{ name: "Boba Fett", hp: 140, atk: 8, counter: 5, alive: true, picked: false}];
//Fighters left is intialized to be the same as all fighters. Items will be removed from this index as they are picked/defeated
// var fightersLeft =  [{ name: "Mace Windu", hp: 150, atk: 8, counter: 25, alive: true, picked: false },
// { name: "Kylo Ren", hp: 100, atk: 6, counter: 10, alive: true, picked: false }];

var fighterSelected = false;

var playerFighter = {
    indexofFighter: 0,
    setindexofFighter: function (index) {
        this.indexofFighter = index;
    },
    playerHP: 1,
    setplayerHP: function () {
        this.playerHP = allFighters[this.indexofFighter].hp;
    },
    playerAtk: 1,
    setplayerAtk: function () {
        this.playerAtk = allFighters[this.indexofFighter].atk;
    },
    dying: false,

    attack: function () {
        //Subtract current pAtk from defenders health
        enemyFighter.enemyHP -= this.playerAtk
        //if the enemies hp is below zero, change the value of killed in the enemy object to true
        if (enemyFighter.enemyHP <= 0) {
            enemyFighter.killed = true;
        }

        this.playerAtk += allFighters[this.indexofFighter].atk;
    },
    die: function (dying) {
        if (dying) {
            // cause the game to end
        }
    }
}

var enemySelected = false;
var enemyFighter = {
    indexofEnemy: 0,
    enemyHP: 1,
    setindexofEnemy: function (index) {
        this.indexofEnemy = index;
    },
    setenemyHP: function () {
        this.enemyHP = allFighters[this.indexofEnemy].hp;
    },
    enemyAtk: 1,
    setenemyAtk: function () {
        this.enemyAtk = allFighters[this.indexofEnemy].counter;
    },
    counterAtk: function () {
        //subtract enemies counter attack from players hp
        //if the player's hp has fallen below zero, change the value of dying in the player object to true
    },
    killed: false,
    kill: function (killed) {
        if (killed) {
            //remove the enemy from the dom
            enemySelected = false;
        }
    }

}
//This function will add a character to the dom for every charater in the array passed to it
var populateFighters = function(arr){
    $.each(arr, function(i, fighter){
        $("#char-selection").append('<div class="col-2 character" value='+ i + '><p>' + arr[i].name + "</p></div>");

    })
}

$(document).ready(function () {
    populateFighters(allFighters);
    //When one of the character icons is clicked this function will be called
    $(".character").on("click", function () {
        //If the player has not yet chosen their character, the player character object will have its values reassigned to the same values as the character the player clicked on
        //after that the player will no longer be able to select a fighter
        if (!fighterSelected) {
            debugger
            var index = parseInt($(this).attr("value"));
            playerFighter.setindexofFighter(index);
            playerFighter.setplayerAtk();
            playerFighter.setplayerHP();
            $("#player > div > img").attr("src", ("assets/images/") + allFighters[index].name.split(' ').join('') + ".jpg");
            fighterSelected = true;
            // fightersLeft.splice(index,1);
            $(this).remove();
        }
        //If the player has already chosen their character and they click on a different character, if they are not currently fighting an enemy, the enemy fighter object
        //will have it's values reassigned to the values of the character the player clicked on. The player will not be able to select another enemy until they have defeated
        //the current enemy
        else if (!enemySelected){
            var index = parseInt($(this).attr("value"));
            enemyFighter.setindexofEnemy(index);
            enemyFighter.setenemyAtk();
            enemyFighter.setenemyHP();
            $("#defender > div > img").attr("src", ("assets/images/") + allFighters[index].name.split(' ').join('') + ".jpg");
            enemySelected = true;
            $(this).remove();
        }
    });

});