<template lang="html">
  <div>
    <button class="myButton" type="button" v-if="gameStarted !== true"  v-on:click="startGame">Start the Game!</button>
    <div class="start-game"  v-if="gameStarted">


      <div class="container">
        <div class="leftpane" >
          <player v-for="(player, indeex) in playersArray" :key="indeex" :player="player"/>
          <h1 class="active-player-display">its {{this.activePlayer.name}}'s turn</h1>
        </div>
        <div class="middlepane">
          <hero-card class="herocards" v-for="(hero, index) in heroCards" :key="index" :hero="hero"/>
          <div>

            <div class="dungeoncards">

              <dungeon-card  />
              <img v-if="this.dungeonCards.length > 0" width="300" src="../assets/images/DungeonCard.jpeg" />

              <dungeon-display :value="(monster, index1)" :key="index1" :dungeonsc="dungeonsc"/>
              <button class="fightButton" type="button" v-if="this.fightStarted == true" v-on:click="fightMonster">Fight Monster</button>
            </div>

            <div   class="alignMonsters">
              <monster-card class="monstercards" v-for="(monster, index) in monsterCards" :key="index" :monster="monster"/>
              <picked-monster class="pickedMonster" :value="(pickedMonster, indeeex)" :key="indeeex" :pickedMonster="pickedMonster"/>
            </div>

            <img width="300" src="../assets/images/RandomCards-V3.png" />

            <ul style="list-style-type:none;">
              <li><button class="myButton" type="button" v-on:click="pickMonster">Take a Monster</button></li>
              <li><button class="myButton" type="button" v-if="this.monsterWasPicked" v-on:click="addToDungeon">Add Monster to Dungeon</button></li>
              <li><button class="myButton" type="button" v-on:click="discardMonster">Discard Monster (Sacrifice Hero Item)</button></li>
              <li><button class="myButton" type="button" v-on:click="playerPass">Pass</button></li>
              <li><button class="myButton" type="button" v-on:click="nextPlayer">Next Player</button></li>
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
      StartMonsterCards: null,
      StartHeroCards: null,
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
      dungeonsc: []

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
        return this.monsterWasPicked = true
      }
    },

    fightMonster(){
      if (this.weapons.includes(this.dungeonsc.weakness)){
        this.dungeonCards.splice(0, 1)
        debugger;
        this.dungeonsc = []
      }else {
        const total= Number(this.totalHealth)
        const lost = Number(this.dungeonsc.strength)
        this.totalHealth = total - lost
        const result = this.dungeonCards.splice(0, 1)
        this.dungeonsc = []
      }


      if(this.totalHealth <= 0){

        this.activePlayer.life -= 1
        this.dungeonCards = []
        if(this.activePlayer.life <= 0){
          this.playersArray = []

          // let player = this.activePlayer
          // player
          // let index = this.playersArray.indexOf(player)
          // this.playersArray.splice(index, 1)
          this.activePlayer = 0
          this.resetGameLose()

        }

        const result = this.dungeonCards.splice(0, 1)



      } else {
        this.fight()
      }






    },

    addToDungeon(){
      if(this.monsterWasAdded === false && this.monsterWasPicked === true && this.discardMonsterActivated == false){
        let result =  this.dungeonCards.push(this.pickedMonster)
        this.pickedMonster = []
        return this.monsterWasAdded = true
      }
    },

    discardMonster(){
      if(this.monsterWasPicked === true){
        this.pickedMonster = []
        this.discardMonsterActivated = true
      }
    },

    startGame(){
      this.activePlayer = this.playersArray[0]
      this.gameStarted = true
    },

    resetBoard(){
      this.pickedMonster = null,
      this.selectedHero = null,
      this.monsterWasPicked = false,
      this.monsterWasAdded = false,
      this.discardMonsterActivated = false,
      this.heroToDelete = null
      this.fightStarted = false
    },

    assigndungeonsc(){
      debugger;
      if (this.dungeonCards.length !== 0){
      const monster = this.dungeonCards[0]
      this.dungeonsc = monster
    } else {
      this.dungeonsc = []
    }

    },


    fight(){
      this.fightStarted = true
      // if(this.activePlayer.life === 0){
      //   let player = this.activePlayer
      //   let index = this.playersArray.indexOf(player)
      //   this.playersArray.splice(index, 1)
      //   this.activePlayer = []


      if (this.dungeonCards.length == 0 && this.totalHealth > 0){

        this.dungeonsc = []
        const points= Number(this.activePlayer.win)
        const  totalpoints = points + 1
        this.activePlayer.win = totalpoints
      }


      if (this.activePlayer.win === 2){
        console.log('You won');
        this.resetGameWin()
      }

      //WIN CONDITION




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
    }





  }
}







</script>

<style lang="css" scoped>


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
  width: 30%;
  height: 100%;
  float: left;
  background-color: darkgrey;
  background-size: cover;
}

.middlepane {
  width: 70%;
  height: 100%;
  float: left;
  background-image: url('https://ak9.picdn.net/shutterstock/videos/13298939/thumb/1.jpg');
  border-collapse: collapse;
}

.herocards{
  font-family: fantasy;
  display: inline-block;
  padding-right: 3px;
  padding-left: 3px;
  text-align: center;

}

.dungeoncards{
  background-color: black;
  color: white;
  font-family: fantasy;
  text-align: center;
  border: 3px solid #8AC007;
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
  text-align: right;
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
  font-family: fantasy;
  background-color: red;
}

</style>
