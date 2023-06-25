const { getAllVillains, getVillainBySlug, addNewVillain } = require('../models/models')

const getAllVillainsController = async (request, response) => {
  try {
    const allVillains = await getAllVillains()

    return response.send(allVillains)
  } catch (error) {
    return response.sendStatus(500)
  }
}

const getVillainBySlugController = async (request, response) => {
  try {
    const { slug } = request.params
    const foundVillain = await getVillainBySlug(slug)

    if (!foundVillain.slug) {
      return response.sendStatus(404)
    }

    return response.send(foundVillain)
  } catch (error) {
    return response.sendStatus(500)
  }
}

const addNewVillainController = async (request, response) => {
  const { name, movie, slug } = request.body

  if (!name || !movie || !slug) return response.status(400).send('All fields are required to add a villain')

  const newVillain = { name, movie, slug }

  const addedVillain = await addNewVillain(newVillain)

  return response.status(201).send(addedVillain)
}



module.exports = { getAllVillainsController, getVillainBySlugController, addNewVillainController }
