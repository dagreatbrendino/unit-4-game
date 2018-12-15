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
            $("#info").append("<p>You have defeated " + allFighters[enemyFighter.indexofEnemy].name + ", you can now take on a new opponent</p>");
            this.playerAtk += allFighters[this.indexofFighter].atk;
            $("#defender > div > .healthpoints").text("");
        }
        else{
            $("#info").append("<p>You attacked " + allFighters[enemyFighter.indexofEnemy].name + " for " + this.playerAtk + " damage. </p>");
            $("#defender > div > .healthpoints").text(enemyFighter.enemyHP);
        }
        
        this.playerAtk += allFighters[this.indexofFighter].atk;
    },
    die: function () {
        if (this.dying) {
            // cause the game to end
            alert("you have died")
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
        playerFighter.playerHP -= this.enemyAtk;
        //if the player's hp has fallen below zero, change the value of dying in the player object to true
        if(playerFighter.playerHP <=0){
            playerFighter.dying=true;
            $("#info").append("<p>You have been defeated!!!</p>");
            $("#player > div > .healthpoints").text("");
        }
        else{
            $("#info").append("<p>" + allFighters[this.indexofEnemy].name + " attacked you back for " + this.enemyAtk + " damage. </p>");
            $("#player > div > .healthpoints").text(playerFighter.playerHP);
        }
    },
    killed: false,
    kill: function () {
        if (this.killed) {
            //remove the enemy from the dom
            
            alert("you have killed the enemy")
            enemySelected = false;
            $("#defender > div > img").attr("src", "assets/images/placeholder.jpg");
            $("#instructions").text("Choose the defender!")
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
            $("#player > div > img").attr("src", ("assets/images/") + allFighters[index].name.split(' ').join('') + ".jpg"); //changing the image for the selected fighter
            $("#player > div > .healthpoints").text(playerFighter.playerHP);
            fighterSelected = true;
            // fightersLeft.splice(index,1);
            $(this).remove();//Selection can no longer be made
            $("#instructions").text("Choose the defender!")
        }
        //If the player has already chosen their character and they click on a different character, if they are not currently fighting an enemy, the enemy fighter object
        //will have it's values reassigned to the values of the character the player clicked on. The player will not be able to select another enemy until they have defeated
        //the current enemy
        else if (!enemySelected){
            enemyFighter.killed = false;
            var index = parseInt($(this).attr("value"));//grabing the value attribute assigned when the character elements were first added to the dom
            enemyFighter.setindexofEnemy(index);
            enemyFighter.setenemyAtk();
            enemyFighter.setenemyHP();
            $("#defender > div > img").attr("src", ("assets/images/") + allFighters[index].name.split(' ').join('') + ".jpg");//changing the image for the selected enemy
            $("#defender > div > .healthpoints").text(enemyFighter.enemyHP);
            enemySelected = true;
            $(this).remove();//Selection can no longer be made
            $("#instructions").text("Defeat the defender!")
            $("#info").empty();
        }
    });
    $("#attack").on("click",function(){
        //If the player has chosen their character and the defender 
        if(enemySelected && fighterSelected){
            //The player fighter attacks the enemy fighter
            $("#info").empty();
            playerFighter.attack();
            
            //The enemy fighter is checked to see if it should be killed
            enemyFighter.kill();
            //If the enemy is still alive, it will counter attack the player
            if(!enemyFighter.killed){
                enemyFighter.counterAtk();   
                //The player character will be checked to see if it should die
                playerFighter.die();
            }
        }
        
    });

});