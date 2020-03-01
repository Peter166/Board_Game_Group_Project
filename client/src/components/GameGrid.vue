<template lang="html">
  <div>

    <div class="container">
      <div class="leftpane">
        <h1>Player 1 + 3 Area</h1>
        <player v-for="(player, indeex) in playersArray" :key="indeex" :player="player"/>
      </div>
      <div class="middlepane">
        <hero-card class="herocards" v-for="(hero, index) in heroCards" :key="index" :hero="hero"/>
        <div class="dungeoncards">
          <dungeon-card  />
          <img v-if="this.dungeonCards.length > 0" width="300" src="../assets/images/DungeonCard.jpeg" />
        </div>

        <div class="alignMonsters">
          <monster-card class="monstercards" v-for="(monster, index) in monsterCards" :key="index" :monster="monster"/>
          <picked-monster class="pickedMonster" :value="(pickedMonster, indeeex)" :key="indeeex" :pickedMonster="pickedMonster"/>
        </div>

        <img width="300" src="../assets/images/RandomCards.jpeg" />

        <ul style="list-style-type:none;">
          <li><button class="myButton" type="button" v-on:click="pickMonster">Take a Monster</button></li>
          <li><button class="myButton" type="button" v-if="this.monsterWasPicked" v-on:click="addToDungeon">Add Monster to Dungeon</button></li>
          <li><button class="myButton" type="button" v-on:click="discardMonster">Discard Monster (Sacrifice Hero Item)</button></li>
          <li><button class="myButton" type="button" name="button">Pass</button></li>
          <li><button class="myButton" type="button" name="button">Next Player</button></li>
        </ul>
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
      heroToDelete: null

    }
  },
  components: {
    'hero-card': heroCard,
    'monster-card': monsterCard,
    'dungeon-card':dungeonCard,
    'player': playersArray,
    'picked-monster': PickedMonster,


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
      debugger;
      this.heroToDelete = hero;
      let index = this.heroToDelete.indexOf(hero)
      return this.heroToDelete.splice(index, 1)

    })

  },
  methods:{
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

    addToDungeon(){
      if(this.monsterWasAdded == false){
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
  border-right: black 3px;
}

.middlepane {
  width: 70%;
  height: 100%;
  float: left;
  background-image: url('https://ak9.picdn.net/shutterstock/videos/13298939/thumb/1.jpg');
  border-collapse: collapse;
}

.herocards{
  /* background-color: darkred; */
  font-family: fantasy;
  display: inline-block;
  padding-right: 3px;
  padding-left: 3px;
  /* border: 3px solid#8AC007; */
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
  /* display:inline-block; */
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
/* .pickedMonster{
border-style: double;
position: fixed;
right: 20px;
top: 20px;
} */

.alignMonsters{
  position: fixed;
  right: 100px;
  top: 300px;
}


</style>


/* .monstercards{
  /* background-color: lightblue; */
  font-family: fantasy;
  display: inline-grid;
  padding-right: 5px;
  padding-left: 5px;
  position:static;
  bottom: 10px;
  /* border: 3px solid #8AC007; */
  text-align: center;
} */
