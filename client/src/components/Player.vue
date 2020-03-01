<template lang="html">
  <div class="main" >
      <h1>{{player.name}}</h1>
      <p>Lives: {{player.life}}</p>
      <p>Wins: {{player.win}}</p>
      <p>Passed Status: {{player.pass}}</p>
    <hr>
    <!-- <h5 v-if="player.type">{{player.type}}</h5> -->
    <!-- <h5 v-if="player.hitpoints">Hitpoints: {{player.hitpoints}}</h5> -->
    <!-- <img v-if="player.img" width="100" :src='require(`../assets/${player.img}`)'/> -->
    <!-- <p v-if="player.img">{{player.img}}</p> -->
  </div>

</template>

<script>

import { eventBus } from '../main.js'
import GameService from '@/services/GameService.js'

export default {
  name: 'player',
  props: ['player'],

}
</script>

<style lang="css" scoped>

.main {
  background-image: url('https://i.pinimg.com/originals/ae/0f/ed/ae0fedf47b5f90534236602c64d541ef.png');
  color: white
}

</style>
