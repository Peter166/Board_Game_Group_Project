<template lang="html">
  <div >
    <button class="myButton" type="button" v-if="gameStarted !== true"  v-on:click="startGame">Start the Game!</button>
    <div class="start-game"  v-if="gameStarted">


      <div class="container">
        <div class="middlepane">
          <div class="leftpane" >
            <player v-for="(player, indeex) in playersArray" :key="indeex" :player="player"/>
            <ul style="list-style-type:none;" class="active-player-display">
            <li><p>It's {{this.activePlayer.name}}'s turn</p></li>
            <li><img src="https://media0.giphy.com/media/cAlVwwtUVYp43vQABJ/giphy.webp?cid=790b7611fdac7dddbfea1ca95b6d7d53dfda5282661cdd80&rid=giphy.webp" height="250px" ></li>
          </ul>
          </div>
          <hero-card class="herocards" v-for="(hero, index) in heroCards" :key="index" :hero="hero"/>
          <div>

            <div class="dungeoncards">

              <dungeon-card  />
              <h2 class="whiteText" v-if="this.fightStarted">Hero have: {{this.totalHealth}} life left </h2>
              <h2 v-if="this.dungeonCards.length == 0 || this.dungeonCards.length > 1" class="whiteText">{{this.dungeonCards.length}} Monster's In Dungeon! </h2>
              <h2 v-if="this.dungeonCards.length == 1 " class="whiteText">{{this.dungeonCards.length}} Monster In Dungeon! </h2>
              <img v-if="this.dungeonCards.length > 0" width="300" src="../assets/images/DungeonCard.jpeg" />

              <dungeon-display :value="(monster, index1)" :key="index1" :dungeonsc="dungeonsc"/>
              <button class="myButton" type="button" v-if="this.fightStarted == true" v-on:click="fightMonster"> ⚔️Fight Monster ⚔️</button>
              <button class="myButton" type="button" v-if="this.fightStarted == true && this.weapons.includes('Vorpal Axe') && this.axeUsed == false" v-on:click="useAxe"> ☠️ Use Axe (Auto Kill) ☠️</button>
            </div>

            <div class="alignMonsters">
              <monster-card class="monstercards" v-for="(monster, index) in monsterCards" :key="index" :monster="monster"/>
              <picked-monster class="pickedMonster" :value="(pickedMonster, indeeex)" :key="indeeex" :pickedMonster="pickedMonster"/>
            </div>

            <img class="PickingCards" width="400" src="../assets/images/RandomCards-V3.png" />

            <ul style="list-style-type:none;">
              <li><button id="pickButton" class="myButton" type="button" v-if="this.pickedMonster == null" v-on:click="pickMonster" align="left">Take a Monster</button></li>
              <li><button class="myButton" type="button" v-if="showPickedMonsterActionButtons" v-on:click="addToDungeon">Add Monster to Dungeon</button></li>
              <li><button class="myButton" type="button" v-if="showPickedMonsterActionButtons" v-on:click="discardMonster">Discard Monster (Sacrifice Hero Item)</button></li>
              <li><button class="myButton" type="button" v-if="this.pickedMonster == null" v-on:click="playerPass">Pass</button></li>
              <li><button class="myButton" type="button" v-if="this.monsterWasPicked && this.monsterWasAdded || this.discardMonsterActivated" v-on:click="nextPlayer">Next Player</button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PickedMonster from "./PickedMonster.vue";
import playersArray from "./Player.vue";
import GameService from "../services/GameService.js";
import dungeonCard from "./DungeonCard.vue";
import monsterCard from "./MonsterCard.vue";
import heroCard from "./HeroCard.vue";
import DungeonDisplay from "./DungeonDisplay.vue"
import {eventBus} from '../main.js';
export default {
  name: 'game-grid',
  data(){
    return{
      heroCards: null,
      monsterCards: null,
      playersArray: null,
      dungeonCards: [],
      pickedMonster: null,
      selectedHero: null,
      monsterWasPicked: false,
      monsterWasAdded: false,
      discardMonsterActivated: false,
      heroToDelete: null,
      gameStarted: false,
      activePlayer: null,
      passedPlayers: [],
      totalHealth: 0,
      fightStarted: false,
      weapons: [],
      dungeonsc: [],
      axeUsed: false,
      potionUsed: false,
      // turnOffAdd: false,
      // turnOffDiscard: false,
      showPickedMonsterActionButtons: false



    }
  },
  components: {
    'hero-card': heroCard,
    'monster-card': monsterCard,
    'dungeon-card':dungeonCard,
    'player': playersArray,
    'picked-monster': PickedMonster,
    'dungeon-display': DungeonDisplay,

  },
  mounted(){

    GameService.getGame()
    .then(game => {this.heroCards = game[0].cards
      this.monsterCards = game[2].cards
      this.playersArray = game[1].players
    })

    eventBus.$on('selected-hero', (hero)=> {
      this.selectedHero = hero;
      let index =this.heroCards.indexOf(hero)
      return this.heroCards.splice(index, 1)

    })

    eventBus.$on('hero-to-delete', (hero)=> {
      if( this.heroToDelete === null && this.monsterWasPicked === true && this.discardMonsterActivated == true){
        this.heroToDelete = hero;
        let index = this.heroCards.indexOf(hero)
        return this.heroCards.splice(index, 1)
      }
    })

  },
  methods:{
    resetGameWin(){
      GameService.getGame()
      .then(game => {this.heroCards = game[0].cards
        this.monsterCards = game[2].cards
      })
      this.resetBoard()
      // this.playersArray.push(this.activePlayer)
      for(let player of this.passedPlayers){
        this.playersArray.push(player)
      }
      this.dungeonCards = []
      this.passedPlayers = []
      this.totalHealth = 0
      this.fightStarted= false
      this.weapons = []
      this.dungeonsc = []
      this.activePlayer = this.playersArray[0]


    },

    resetGameLose(){

      GameService.getGame()
      .then(game => {this.heroCards = game[0].cards
        this.monsterCards = game[2].cards
      })
      this.resetBoard()


      for(let player of this.passedPlayers){
        this.playersArray.push(player)
      }

      this.dungeonCards = []
      this.passedPlayers = []
      this.totalHealth = 0
      this.fightStarted= false
      this.weapons = []
      this.dungeonsc = []
      this.activePlayer = this.playersArray[0]

    },


    pickMonster(){
      if(this.pickedMonster == null){
        let  array =  this.monsterCards
        let result =array[Math.floor(Math.random()*array.length)];
        this.pickedMonster = result
        let index = this.monsterCards.indexOf(result)
        this.monsterCards.splice(index, 1)
        this.showPickedMonsterActionButtons = true;
        this.monsterWasPicked = true;
      }
    },

    fightMonster(){
      if (this.weapons.includes(this.dungeonsc.weakness)){
        this.dungeonCards.splice(0, 1)
        this.dungeonsc = []

      }else {
        const total= Number(this.totalHealth)
        const lost = Number(this.dungeonsc.strength)
        this.totalHealth = total - lost
        const result = this.dungeonCards.splice(0, 1)
        this.dungeonsc = []
      }

      if(this.totalHealth <= 0 && this.weapons.includes("Healing Potion") && this.potionUsed == false){
        this.potionUsed = true
        this.totalHealth=4;
        let weapon = null
        for (let hero of this.heroCards){
          if (hero.type === 'Healing Potion'){
            weapon = hero
          }
        }
        const index = this.heroCards.indexOf(weapon)
        this.heroCards.splice(index, 1)


        let wepp = null
        for(let wep of this.weapons){
          if (wep === 'Healing Potion'){
            wepp = wep
          }
        }
        const weppIndex = this.weapons.indexOf(wepp)
          this.weapons.splice(weppIndex, 1)


        this.fight()
      }
      else if(this.totalHealth <= 0){

        this.activePlayer.life -= 1
        window.confirm(`${this.activePlayer.name} was defeated by Dungeon!!`);
        const resultt = this.totalHealth = 0
        this.dungeonCards = []
        if(this.activePlayer.life == 0){
          window.confirm(`${this.activePlayer.name} Was Killed!!`);
          this.playersArray = []
          const resultt = this.totalHealth = 0
          this.resetGameLose()

        }
        this.resetGameLose()



      } else {
        this.fight()
      }






    },

    addToDungeon(){
      if(this.monsterWasAdded === false && this.monsterWasPicked === true && this.discardMonsterActivated == false){
        let result =  this.dungeonCards.push(this.pickedMonster)
        this.pickedMonster = []
        this.monsterWasAdded = true
        // this.turnOffDiscard = true
        this.showPickedMonsterActionButtons = false;
      }
    },

    discardMonster(){
      if(this.monsterWasPicked === true){
        this.pickedMonster = []
        this.discardMonsterActivated = true
        // this.turnOffAdd = true
        this.showPickedMonsterActionButtons = false;
      }
    },

    startGame(){
      this.activePlayer = this.playersArray[0]
      this.gameStarted = true
    },

    resetBoard(){
      this.totalHealth = 0
      this.pickedMonster = null
      this.selectedHero = null
      this.monsterWasPicked = false
      this.monsterWasAdded = false
      this.discardMonsterActivated = false
      this.heroToDelete = null
      this.fightStarted = false
      this.axeUsed = false
      this.potionUsed = false
    },

    assigndungeonsc(){

      if (this.dungeonCards.length !== 0){
        const monster = this.dungeonCards[0]
        this.dungeonsc = monster
      } else {
        this.dungeonsc = []
      }

    },


    fight(){
      this.fightStarted = true

      if (this.dungeonCards.length == 0 && this.totalHealth > 0){

        this.dungeonsc = []
        const points= Number(this.activePlayer.win)
        const  totalpoints = points + 1
        window.confirm(`${this.activePlayer.name} Gain One Win!!!`);
        this.activePlayer.win = totalpoints
        const resultt = this.totalHealth = 0

        this.resetGameWin()
      }


      if (this.activePlayer.win === 2){
        window.confirm(`${this.activePlayer.name} Won The game!!`);
        const resultt =  this.totalHealth = 0
        this.resetGameWin()
      }



      if (this.totalHealth == 0){

        for (let hero of this.heroCards){
          let points = hero.hitpoints
          this.totalHealth += points
          let weapon = hero.type
          this.weapons.push(weapon)
          this.assigndungeonsc()

        }
      } else {
        this.assigndungeonsc()
      }

    },

    playerPass(){
      this.resetBoard()
      let player = this.activePlayer
      let index = this.playersArray.indexOf(player)
      this.playersArray.splice(index, 1)
      this.passedPlayers.push(player)
      this.activePlayer = this.playersArray[0]

      if (this.playersArray.length === 1 ){
        this.fight()
      }
    },
    nextPlayer(){

      let player = this.activePlayer
      let index = this.playersArray.indexOf(player)
      this.playersArray.splice(index, 1)
      // this.playersArray.push(player)
      this.activePlayer = this.playersArray[0]
      this.playersArray.push(player)
      this.resetBoard()
    },
    useAxe(){

      this.dungeonCards.splice(0, 1)
      let weapon = null
      for (let hero of this.heroCards){
        if (hero.type === 'Vorpal Axe'){
          weapon = hero
        }
        // return weapon
      }

      const index = this.heroCards.indexOf(weapon)
      this.heroCards.splice(index, 1)

      this.axeUsed = true


      let wepp = null
      for(let wep of this.weapons){
        if (wep === 'Vorpal Axe'){
          wepp = wep
        }
      }
      const weppIndex = this.weapons.indexOf(wepp)
        this.weapons.splice(weppIndex, 1)



      this.fight()
    }





  }

}







</script>

<style lang="css" scoped>

ul {
  float: left;
}
body, html {
  width: 100%;
  height: 100%;
  margin: 0;
}

.container {
  width: 100%;
  height: 100%;
}

.leftpane {
  height: 100%;
  width: 15%;
  float: left;
  background-image: url('https://ak9.picdn.net/shutterstock/videos/13298939/thumb/1.jpg');
  /* border: solid;
  border-width: 6px;
  border-style: inset;
  border-color: #8AC007; */
  border-right:  20px solid transparent;
  border-image: url("../assets/images/CelticBorderV.gif") 30 round;
}

.middlepane {
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url('https://ak9.picdn.net/shutterstock/videos/13298939/thumb/1.jpg');
  text-align: center;
}

.herocards{
  display: inline-block;
  padding-right: 3px;
  padding-left: 3px;
  text-align: center;
  padding-bottom: 30px;

}

.dungeoncards{
  background-image: url("../assets/images/DungeonDisplay.png");
  background-size: cover;
  background-repeat: no-repeat;
  color: white;
  font-family: fantasy;
  text-align: center;
  border: 20px solid transparent;
  border-image: url("../assets/images/CelticBorder.gif") 30 round;
}

.monstercards{
  text-align: left;
  padding-right: 50px;
}

.myButton {
  box-shadow: 0px 1px 0px 0px #1c1b18;
  background:linear-gradient(to bottom, #eae0c2 5%, #ccc2a6 100%);
  background-color:#eae0c2;
  border-radius:15px;
  border:2px solid #333029;
  cursor:pointer;
  color:#505739;
  font-family:Arial;
  font-size:14px;
  font-weight:bold;
  padding:12px 16px;
  text-decoration:none;
  text-shadow:0px 1px 0px #ffffff;
  text-align: center;
}
.myButton:hover {
  background:linear-gradient(to bottom, #ccc2a6 5%, #eae0c2 100%);
  background-color:#ccc2a6;
}
.myButton:active {
  position:relative;
  top:1px;
}

.alignMonsters{
  position: fixed;
  right: 100px;
  top: 300px;
}

.active-player-display {
  font-size: 70px;
  padding: 20px;
  color: #8AC007;
  text-align: center;
  text-shadow: 0px 0px 6px rgba(255,255,255,0.7);
}

.PickingCards{
  float: left;
  padding-left: 50px;
  padding-top:  50px;
}
.whiteText{
  color: white;
}

</style>
