<template lang="html">
  <div >

    <!-- <h3>{{hero.name}}</h3> -->
    <!-- <h5 v-if="hero.type">{{hero.type}}</h5> -->
    <!-- <h5 v-if="hero.hitpoints">Hitpoints: {{hero.hitpoints}}</h5> -->
    <img v-if="hero.img" width="100" :src='require(`../assets/${hero.img}`)'/>
    <form method="post">
      <button :value="hero" v-on:click="handleClick" type="button">Sacrifice</button>
    </form>
  </div>

</template>

<script>

import { eventBus } from '../main.js'
import GameService from '@/services/GameService.js'

export default {
  name: 'hero-card',
  props: ['hero'],
  methods: {
    handleClick: function(){
      eventBus.$emit('selected-hero',this.hero)
    }
  }
}
</script>

<style lang="css" scoped>

</style>
