import express from 'express'
import userAuth from '../middelwares/authMiddleware.js'
import { updateUserController } from '../controllers/userController.js'

const router = express.Router()

router.put('/update-user',userAuth,updateUserController)

export default router