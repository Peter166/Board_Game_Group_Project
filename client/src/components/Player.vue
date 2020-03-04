<template lang="html">
  <div class="main" >
      <h1>{{player.name}}</h1>
      <h2>Lives: {{player.life}} Wins: {{player.win}}</h2>
      <hr>
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
  color: white;
  text-align: center;
  text-shadow: 0 0 3px brown;
}


</style>
