<template lang="html">
  <div>

    <div class="container">
      <div class="leftpane">
        <h1>Player 1 + 3 Area</h1>
        <player v-for="(player, indeex) in playersArray" :key="indeex" :player="player"/>
        </div>
      <div class="middlepane">Dungeon Area
      <hero-card class="herocards" v-for="(hero, index) in heroCards" :key="index" :hero="hero"/>
      <dungeon-card class="dungeoncards" v-for="(dungeon, indexx) in dungeonCards" :key="indexx" :dungeon="dungeon"/>
      <monster-card class="monstercards" v-for="(monster, index) in monsterCards" :key="index" :monster="monster"/>

      <img width="300" src="../assets/images/RandomCards.jpeg" />

<ul style="list-style-type:none;">
  <li><button class="myButton" type="button" name="button">Take a Monster</button></li>
  <li><button class="myButton" type="button" name="button">Add Monster to Dungeon</button></li>
  <li><button class="myButton" type="button" name="button">Discard Monster (Sacrifice Hero Item)</button></li>
  <li><button class="myButton" type="button" name="button">Pass</button></li>
  <li><button class="myButton" type="button" name="button">Next Player</button></li>
</ul>
      </div>
    </div>
  </div>

</template>

<script>
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
      dungeonCards: [{'name':''}]

    }
  },
  components: {
    'hero-card': heroCard,
    'monster-card': monsterCard,
    'dungeon-card':dungeonCard,
    'player': playersArray

  },
  mounted(){

    GameService.getGame()
    .then(game => {this.heroCards = game[0].cards
      this.monsterCards = game[2].cards
      this.playersArray = game[1].players
    })


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
  display:inline-flex;
  padding-right: 3px;
  padding-left: 3px;
  /* border: 3px solid#8AC007; */
  text-align: center;

}
.monstercards{
  /* background-color: lightblue; */
  font-family: fantasy;
  display: inline-grid;
  padding-right: 5px;
  padding-left: 5px;
  position:static;
  bottom: 10px;
  /* border: 3px solid #8AC007; */
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




</style>
