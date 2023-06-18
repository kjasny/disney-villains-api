const { villainsModel } = require('./index')

const getAllVillains = async () => {
  const allVillains = await villainsModel.findAll()

  return allVillains
}

const getVillainBySlug = async (slug) => {
  const foundVillain = await villainsModel.findOne({ where: { slug } })

  return foundVillain
}

const addNewVillain = async (newVillain) => {
  const addedVillain = await villainsModel.create(newVillain)

  return addedVillain
}



module.exports = { getAllVillains, addNewVillain, getVillainBySlug }
