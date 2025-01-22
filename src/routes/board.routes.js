import { Router } from 'express'
import { boardController } from '../controllers/board.controller.js'

const router = Router()

router.get('/boards', boardController.listBoards)
router.get('/board/:id', boardController.getBoard)
router.get('/:id_workspace/boards', boardController.getBoardsByWorkspace)
router.post('/board', boardController.createBoard)
router.put('/board/:id', boardController.updateBoard)
router.delete('/board/:id', boardController.deleteBoard)

export default router