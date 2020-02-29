<template lang="html">
  <div >

    <!-- <h3>{{hero.name}}</h3> -->
    <!-- <h5 v-if="hero.type">{{hero.type}}</h5> -->
    <!-- <h5 v-if="hero.hitpoints">Hitpoints: {{hero.hitpoints}}</h5> -->
    <img v-if="hero.img" width="100" :src='require(`../assets/${hero.img}`)'/>
    <!-- <p v-if="hero.img">{{hero.img}}</p> -->
  </div>

</template>

<script>

import { eventBus } from '../main.js'
import GameService from '@/services/GameService.js'

export default {
  name: 'hero-card',
  props: ['hero'],

}
</script>

<style lang="css" scoped>

</style>
