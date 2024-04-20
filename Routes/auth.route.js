import express from "express";
import { login, logout, signUp } from "../Controllers/auth.controller.js";

const router = express.Router()

router.post('/', login)
router.post('/signup', signUp)
router.post('/logout', logout)

export default router