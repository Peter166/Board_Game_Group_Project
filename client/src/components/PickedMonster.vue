<template lang="html">
  <div >
    <img class="picked" v-if="pickedMonster.img" width="500" :src='require(`../assets/${pickedMonster.img}`)'/>

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
  border-radius: 40px;
    float: right;
    padding-right: 50px;
    padding-top:  50px;
}

</style>
