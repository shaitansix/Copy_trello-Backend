import { Router } from 'express'
import { cardController } from '../controllers/card.controller.js'

const router = Router()

router.get('/cards', cardController.listCards)
router.get('/card/:id', cardController.getCard)
router.get('/:id_board/cards', cardController.getCardsByBoard)
router.post('/card', cardController.createCard)
router.put('/card/name/:id', cardController.updateNameCard)
router.put('/card/idx/:id', cardController.updateIndexCard)
router.delete('/card/:id', cardController.deleteCard)

export default router