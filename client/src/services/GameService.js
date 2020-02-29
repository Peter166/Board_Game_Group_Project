const baseURL = 'http://localhost:3000/api/dungeon/'


export default {
  getGame(){
    return fetch(baseURL)
    .then(res => res.json())
  },


  createUser(payload){
    return fetch(baseURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(res => res.json())
  }
}
