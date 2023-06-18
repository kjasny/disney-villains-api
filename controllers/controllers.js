const { getAllVillains, getVillainBySlug, addNewVillain } = require('../models/models')

const getAllVillainsController = async (request, response) => {
  const allVillains = await getAllVillains()

  return response.send(allVillains)
}

const getVillainBySlugController = async (request, response) => {
  const { slug } = request.params
  const foundVillain = await getVillainBySlug(slug)

  if (!foundVillain) {
    return response.status(404).send('Villain not found')
  }

  return response.send(foundVillain)
}

const addNewVillainController = async (request, response) => {
  const { name, movie, slug } = request.body

  if (!name || !movie || !slug) return response.status(400).send('All fields are required to add a villain')

  const newVillain = { name, movie, slug }

  const addedVillain = await addNewVillain(newVillain)

  return response.send(addedVillain)
}



module.exports = { getAllVillainsController, getVillainBySlugController, addNewVillainController }
