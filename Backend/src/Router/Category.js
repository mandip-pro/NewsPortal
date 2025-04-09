import express from 'express'
import CategoryController from '../Controller/CategoryController.js'
const categoryRoute=express.Router()
const categoryInstance=new CategoryController()

categoryRoute.get('/',categoryInstance.get)
categoryRoute.get('/:name',categoryInstance.getByName)
categoryRoute.post('/',categoryInstance.post)
categoryRoute.delete('/:id',categoryInstance.delete)
categoryRoute.put('/:id',categoryInstance.put)

export default categoryRoute