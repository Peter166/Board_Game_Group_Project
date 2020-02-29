<template lang="html">
  <div >

    <!-- <h3>{{monster.name}}</h3>
    <h5>Strength: {{monster.strength}}</h5>
    <h5 v-if="monster.weakness">Weakness:</h5>
    <h5 v-if="monster.weakness">{{monster.weakness}}</h5>
    <h5 v-if="monster.weakness == null">NO</h5>
    <h5 v-if="monster.weakness == null">Weaknesses!</h5> -->
    <!-- <img v-if="monster.img" width="100" :src='require(`../assets/${monster.img}`)'/> -->
  </div>




</template>

<script>

import { eventBus } from '../main.js'
import GameService from '@/services/GameService.js'

export default {
  name: 'monster-card',
  props: ['monster']
}
</script>

<style lang="css" scoped>


</style>
