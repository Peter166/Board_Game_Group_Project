<template lang="html">
  <div>
    <hero-card class="herocards" v-for="(hero, index) in heroCards" :key="index" :hero="hero"/>
    <dungeon-card class="dungeoncards" v-for="(dungeon, indexx) in dungeonCards" :key="indexx" :dungeon="dungeon"/>
    <player class="player" v-for="(player, indexxx) in playersArray" :key="indexxx" :player="player"/>


    <monster-card class="monstercards" v-for="(monster, indexxxx) in monsterCards" :key="indexxxx" :monster="monster"/>
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
      dungeonCards: {name:'HIDDEN CARD'}

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
.herocards{
  /* background-color: darkred; */
  font-family: fantasy;
  display: inline-grid;
  padding-right: 5px;
  padding-left: 5px;
  /* border: 3px solid #8AC007; */
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

  border: 3px solid black;
  text-align: center;
}
</style>
