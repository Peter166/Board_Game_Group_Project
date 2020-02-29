<template lang="html">
  <div>
    <hero-card class="herocards" v-for="(hero, index) in heroCards" :key="index" :hero="hero"/>
    <dungeon-card class="dungeoncards" v-for="(dungeon, index) in dungeonCards" :key="index" :dungeon="dungeon"/>



    <monster-card class="monstercards" v-for="(monster, index) in monsterCards" :key="index" :monster="monster"/>
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
