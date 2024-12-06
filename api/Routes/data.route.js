import { dispatch, get, post } from "../Controllers/data.cotroller.js"
import express from 'express'

const router = express.Router()

router.get('/', get)
router.post('/', post)
router.post('/delete/:id', dispatch)

export default router