import { Router } from 'express'
import { workspaceController } from '../controllers/workspace.controller.js'

const router = Router()

router.get('/workspaces', workspaceController.listWorkspaces)
router.get('/workspace/:id', workspaceController.getWorkspace)
router.post('/workspace', workspaceController.createWorkspace)
router.put('/workspace/:id', workspaceController.updateWorkspace)
router.delete('/workspace/:id', workspaceController.deleteWorkspace)

export default router