const Sequelize = require('sequelize')
const { villainsTemplate } = require('./villainsTemplate')

const connection = new Sequelize('k_disneyVillainsDB', 'k_villains_user', 'disneyVillains', { host: '173.230.134.130', dialect: 'mysql' })

const villainsModel = villainsTemplate(connection, Sequelize)

module.exports = { villainsModel }
