const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const {
  describe, it, afterEach, before
} = require('mocha')

const { getAllVillainsController, getVillainBySlugController, addNewVillainController } = require('../../controllers/controllers')
const { villainsModel } = require('../../models/index')

const { villainsMock, singleVillainMock, invalidVillain } = require('./villains.mocks')

chai.use(sinonChai)
const { expect } = chai

describe('Integration Tests - villains', () => {
  let stubbedSend
  let sandbox
  let stubbedFindAll
  let stubbedFindOne
  let stubbedCreate
  let stubbedStatus
  let response
  let stubbedSendStatus

  before(() => {
    sandbox = sinon.createSandbox()
    stubbedSend = sandbox.stub()
    stubbedFindAll = sandbox.stub(villainsModel, 'findAll')
    stubbedFindOne = sandbox.stub(villainsModel, 'findOne')
    stubbedCreate = sandbox.stub(villainsModel, 'create')
    stubbedStatus = sandbox.stub()
    stubbedSendStatus = sandbox.stub()
    response = {
      send: stubbedSend,
      status: stubbedStatus,
      sendStatus: stubbedSendStatus
    }
  })

  afterEach(() => {
    sandbox.reset()
  })

  describe('getAllVillainsController', () => {
    it('retrieves a list of Disney villains from the database, then returns that list in res.send()', async () => {
      stubbedFindAll.returns(villainsMock)

      await getAllVillainsController({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(villainsMock)
    })
    it('returns a 500 error when database is unable to retrieve villains', async () => {
      stubbedFindAll.throws('ERROR')

      await getAllVillainsController({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSendStatus).to.have.been.calledWith(500)
    })
  })

  describe('getVillainBySlugController', () => {
    it('finds the associated villain by slug then calls res.send with that villain', async () => {
      stubbedFindOne.returns(singleVillainMock)

      const request = { params: { slug: 'prince-john' } }

      await getVillainBySlugController(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'prince-john' } })
      expect(stubbedSend).to.have.been.calledWith(singleVillainMock)
    })
    it('Villain is not found in the database, and returns a 500 error', async () => {
      stubbedFindOne.throws('ERROR!')

      const request = { params: { slug: 'not-found' } }

      await getVillainBySlugController(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'not-found' } })
      expect(stubbedSendStatus).to.have.been.calledWith(500)
    })
    it('Villain is not found in the database, and returns a 404 error', async () => {
      stubbedFindOne.returns({})

      const request = { params: { slug: 'not-found' } }

      await getVillainBySlugController(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'not-found' } })
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })
  })

  describe('addNewVillainController', () => {
    it('accepts new villain and saves it, sends 201 status', async () => {
      stubbedCreate.returns(singleVillainMock)
      stubbedStatus.returns({ send: stubbedSend })

      const request = { body: singleVillainMock }

      await addNewVillainController(request, response)

      expect(stubbedCreate).to.have.been.calledWith(singleVillainMock)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedSend).to.have.been.calledWith(singleVillainMock)
    })
    it('Lets the user know they did not impute a valid new villain', async () => {
      stubbedStatus = sinon.stub().returns({ send: stubbedSend })

      response = { status: stubbedStatus }
      const request = { body: invalidVillain }

      await addNewVillainController(request, response)

      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedSend).to.have.been.calledWith('All fields are required to add a villain')
    })
  })
})
