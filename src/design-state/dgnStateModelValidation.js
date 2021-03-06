'use strict'

const dgnStateMetamodel = require('./dgnStateSchema.js')
const printChat = require('../core/printChat.js')
// checks if the instance is correct

module.exports = function moduleValidation (cy) {
  // valid component connections
  const sensorArray = dgnStateMetamodel.sensorArray
  const modelArray = dgnStateMetamodel.modelArray
  const eventArray = dgnStateMetamodel.eventArray

  function componentValidation (cy, component, componentArray) {
    cy.nodes().map(node => {
      // checks if node is the desired component
      if (node.data().info.concept === component) {
        // stores the neighboring nodes of the component
        const neighborNodes = node.neighborhood().add(node)
        const neigborObject = neighborNodes.data().info.concept
        Object.keys(neigborObject).map(() => {
          // every neighbor node is added to the array arrWrong
          arrWrong.push(neigborObject)
          // if the neighbor is a valid connection it is removed from the array
          if (componentArray.includes(neigborObject) === true) {
            arrWrong.pop(neigborObject)
          }
        })
      }
    })
    result = `${arrWrong}`
    // if result is not empty print the wrong component
    if (result !== '') {
      result = `• ${component} has wrong connections`
      printChat(result)
    }
  }
  // decleration of arrays
  let result = '' // posted on the nodeInfo div
  let arrWrong = [] // stores wrong connection of nodes

  componentValidation(cy, 'sensor', sensorArray)
  componentValidation(cy, 'model', modelArray)
  componentValidation(cy, 'event', eventArray)

  // if the string is empty, the module is correct
  if (result === '') {
    printChat('model instance is valid\n👍')
  }
}
