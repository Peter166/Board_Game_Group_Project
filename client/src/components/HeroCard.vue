<template lang="html">
  <div class="hero-display">

    <!-- <h3>{{hero.name}}</h3> -->
    <!-- <h5 v-if="hero.type">{{hero.type}}</h5> -->
    <!-- <h5 v-if="hero.hitpoints">Hitpoints: {{hero.hitpoints}}</h5> -->
    <form class="hero" method="post">
      <button v-on:click="handleClickImg" type="button" class="button"><img  v-if="this.hero.name != 'Barbarian'" width="100" :src='require(`../assets/${hero.img}`)'/></button>

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
    handleClickImg: function(){
      eventBus.$emit('hero-to-delete',this.hero)
    }
  }
}
</script>

<style lang="css" scoped>
.button{
  padding: 0;
  border: none;
  background: none;
}
.hero {
  display: inline-block;
}

</style>
