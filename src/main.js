import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { corsOptions } from './config/cors.config.js'
import workspaceRoutes from './routes/workspace.routes.js'
import boardRoutes from './routes/board.routes.js'
import cardRoutes from './routes/card.routes.js'
import taskRoutes from './routes/task.routes.js'
import { PORT } from './config/env.config.js'

const app = express()

app.use(cors(corsOptions))
app.use(express.json())
app.use(morgan('dev'))
app.use('/my_trello', workspaceRoutes)
app.use('/my_trello', boardRoutes)
app.use('/my_trello', cardRoutes)
app.use('/my_trello', taskRoutes)

app.get('*', (req, res) => res.status(404).send('Route not found'))
app.listen(PORT || 3000, () => {
    console.log(`Server running on port ${PORT || 3000}`)
})