fightMonster(){
  // debugger;
  if (this.weapons.includes(this.dungeonsc.weakness)){
    this.dungeonCards.splice(0, 1)
    this.dungeonsc = []

    let health = this.totalHealth
    this.fight()
    if(this.totalHealth > 0 ){
      this.totalHealth = health
    }
    if(this.dungeonCards.length == 0 ){
      this.activePlayer.win += 1
    }
    if(this.activePlayer.win ==2 ){
      // win game
    }
    // this.resetGame()
  } else {

    this.totalHealth -= this.dungeonsc.strength
    const result = this.dungeonCards.splice(0, 1)
    this.dungeonsc = []
    if (this.totalHealth <= 0){

      if(this.activePlayer.life == 2){
        this.activePlayer.life = 1

        this.resetGame()
      }
      if(this.activePlayer.life == 1){
        let player = this.activePlayer
        let index = this.playersArray.indexOf(player)
        this.playersArray.splice(index, 1)
        this.resetGame()
      }

      // this.passedPlayers.push(player)
      // this.resetGame()
      // this.activePlayer = this.playersArray[0]
    }
  }
