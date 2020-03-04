<template lang="html">
  <div >
    <img class="picked" v-if="pickedMonster && pickedMonster.img" width="300" :src='require(`../assets/${pickedMonster.img}`)'/>

  </div>

</template>

<script>

import { eventBus } from '../main.js'
import GameService from '@/services/GameService.js'

export default {
  name: 'picked-monster',
  props: ['pickedMonster'],

}
</script>

<style lang="css" scoped>

.picked {
  border-radius: 30px;
}

</style>
