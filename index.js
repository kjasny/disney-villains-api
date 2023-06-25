const express = require('express')
const app = express()

const { getAllVillainsController, getVillainBySlugController, addNewVillainController } = require('./controllers/controllers')

app.get('/villains', getAllVillainsController)

app.get('/villains/:slug', getVillainBySlugController)

app.post('/villains', express.json(), addNewVillainController)


app.listen(1337, () => {
  console.log('listening on http://localhost:1337')
})
