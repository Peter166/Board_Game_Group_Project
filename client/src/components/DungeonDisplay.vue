<template lang="html">
  <div >
 <img class="picked" v-if="dungeonsc.img" width="300" :src='require(`../assets/${dungeonsc.img}`)'/>
  </div>




</template>

<script>

import { eventBus } from '../main.js'
import GameService from '@/services/GameService.js'

export default {
  name: 'dungeon-display',
  props: ['dungeonsc']
}
</script>

<style lang="css" scoped>

.picked {
  border-radius: 30px;
}
</style>
