console.log("i am ready");
var allFighters = [{ name: "Mace Windu", hp: 150, atk: 8, counter: 25, alive: true, picked: false },
{ name: "Kylo Ren", hp: 100, atk: 6, counter: 10, alive: true, picked: false }];
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
var populateFighters = function(){
    $.each(allFighters, function(i, fighter){
        $("#char-selection").append('<div class="col-2 character" value='+ i + '><p>' + allFighters[i].name + "</p></div>");

    })
}

$(document).ready(function(){
populateFighters();
    
$(".character").on("click", function(){
    debugger
    console.log("my value is" + $(this).attr("value"));
    if (!fighterSelected){
        debugger
        var index= parseInt($(this).attr("value"));
        playerFighter.setindexofFighter(index);
        playerFighter.setplayerAtk();
        playerFighter.setplayerHP();
        $("#player > div > img").attr("src", ("assets/images/") + allFighters[index].name.split(' ').join('')+ ".jpg");
        fighterSelected = true;
    }
});

});