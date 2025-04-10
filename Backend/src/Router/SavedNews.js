import express from 'express'
import SavedNewsController from '../Controller/SavedNewsController.js'
import RouteMiddlewere from '../middlewere/RouteMiddlewere.js'

const savedNewsRoute=express.Router()
const savedNewsInstance=new SavedNewsController()


savedNewsRoute.get('/',RouteMiddlewere.check,savedNewsInstance.get)
savedNewsRoute.post('/:id',RouteMiddlewere.check,savedNewsInstance.post)
savedNewsRoute.delete('/:id',savedNewsInstance.delete)
export default savedNewsRoute