<template lang="html">
<div>
  <game-grid />

</div>
</template>

<script>
import gameGrird from './components/GameGrid.vue'
export default {
  name: 'app',
  
  components: {
    "game-grid": gameGrird
  }
}


</script>

<style lang="css" scoped>
</style>
