import { Router } from 'express'
import { taskController } from '../controllers/task.controller.js'

const router = Router()

router.get('/tasks', taskController.listTasks)
router.get('/task/:id', taskController.getTask)
router.get('/:id_card/tasks', taskController.getTasksByCard)
router.post('/task', taskController.createTask)
router.put('/task/position/:id', taskController.updatePositionTask)
router.put('/task/data/:id', taskController.updateDataTask)
router.put('/task/complete/:id', taskController.completeTask)
router.put('/task/idx/:id', taskController.updateIndexTask)
router.delete('/task/:id', taskController.deleteTask)

export default router