<template lang="html">
  <div>

    <div class="container">
      <div class="leftpane">
        <h1>Player 1 + 3 Area</h1></div>
      <div class="middlepane">Dungeon Area
      <hero-card class="herocards" v-for="(hero, index) in heroCards" :key="index" :hero="hero"/>
      <dungeon-card class="dungeoncards" v-for="(dungeon, index) in dungeonCards" :key="index" :dungeon="dungeon"/>
      <monster-card class="monstercards" v-for="(monster, index) in monsterCards" :key="index" :monster="monster"/>
      </div>
    </div>
  </div>

</template>

<script>
import GameService from "../services/GameService.js";
import dungeonCard from "./DungeonCard.vue";
import monsterCard from "./MonsterCard.vue";
import heroCard from "./HeroCard.vue";
import {eventBus} from '../main.js';
export default {
  name: 'game-grid',
  data(){
    return{
      fromServer: null,
      heroCards: null,
      monsterCards: null,
      dungeonCards: {name:'HIDDEN CARD'}

    }
  },
  components: {
    'hero-card': heroCard,
    'monster-card': monsterCard,
    'dungeon-card':dungeonCard

  },
  mounted(){

    GameService.getGame()
    .then(game => {this.heroCards = game[0].cards
      this.monsterCards = game[1].cards
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
}
</style>
