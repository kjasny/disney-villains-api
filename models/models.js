const { villainsModel } = require('./index')

const getAllVillains = async () => {
  try {
    const allVillains = await villainsModel.findAll()

    return allVillains
  } catch (error) {
    throw new Error('ERROR!')
  }
}

const getVillainBySlug = async (slug) => {
  try {
    const foundVillain = await villainsModel.findOne({ where: { slug } })

    return foundVillain
  } catch (error) {
    throw new Error('Database error')
  }
}

const addNewVillain = async (newVillain) => {
  const addedVillain = await villainsModel.create(newVillain)

  return addedVillain
}



module.exports = { getAllVillains, addNewVillain, getVillainBySlug }
