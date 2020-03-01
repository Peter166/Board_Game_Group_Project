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

export default {
  name: 'dungeon-card',
  props: ['dungeon']
}
</script>

<style lang="css" scoped>

</style>
