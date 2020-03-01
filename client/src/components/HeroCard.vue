<template lang="html">
  <div >

    <!-- <h3>{{hero.name}}</h3> -->
    <!-- <h5 v-if="hero.type">{{hero.type}}</h5> -->
    <!-- <h5 v-if="hero.hitpoints">Hitpoints: {{hero.hitpoints}}</h5> -->
    <form class="hero" method="post">
    <img v-on:click="handleClick"  type="button" v-if="this.hero.name != 'Barbarian'" width="100" :src='require(`../assets/${hero.img}`)'/>
    <img  v-if="this.hero.name === 'Barbarian'" width="150" :src='require(`../assets/${hero.img}`)'/>
    <div v-if="this.discardMonsterActivated">

    <button v-if="this.hero.name != 'Barbarian'" :value="hero" v-on:click="handleClick" type="button">Sacrifice</button>
    </div>
    </form>
  </div>

</template>

<script>

import { eventBus } from '../main.js'
import GameService from '@/services/GameService.js'

export default {
  name: 'hero-card',
  props: ['hero', 'discardMonsterActivated'],
  data(){
    return{
      discardMonsterActivated: false
    }
  },
  methods: {
    handleClick: function(){
      eventBus.$emit('selected-hero',this.hero)
    },
    handleClick: function(){
      eventBus.$emit('hero-to-delete',this.hero)
    }
  }
}
</script>

<style lang="css" scoped>

.hero {
  display: inline-block;
}

</style>
