<template lang="html">
  <div >

    <!-- <h1 v-if="dungeon.name">{{dungeon.name}}</h1> -->
    <!-- <img width="300" src="../assets/images/DungeonCard.jpeg" /> -->
    <!-- <p>:src="img/profile/${item.photo}"</p> -->
    <!-- <img :src="'./asserts/' + `${dungeon.img}`"> -->
    <!-- <img  v-bind:src="dungeon.img" width="20"> -->
    <!-- <img :src="'../assets/' + dungeon.name +'.jpg'" width="200"/> -->
    <!-- <h5 v-if="dungeon.type">{{dungeon.type}}</h5> -->
    <!-- <h5 v-if="dungeon.hitpoints">Hitpoints: {{dungeon.hitpoints}}</h5> -->
    <!-- <img :src="dungeon.img" height="100" />
    <p v-if="dungeon.img">{{dungeon.img}}</p> -->
  </div>

</template>

<script>

import { eventBus } from '../main.js'
import GameService from '@/services/GameService.js'
import GameGrid from './GameGrid.vue'

export default {
  name: 'dungeon-card',
  props: ['dungeon', 'game-grid'],

  methods:{
    dungeonIsEmptyAndTotalHealthIsValid(){
      if (GameGrid.dungeonCards.length == 0 && GameGrid.totalHealth > 0){

        GameGrid.dungeonsc = []
        const points= Number(GameGrid.activePlayer.win)
        const  totalpoints = points + 1

        GameGrid.activePlayer.win = totalpoints
        GameGrid.resetGameWin()
      }
    },
  }
}
</script>

<style lang="css" scoped>

</style>
