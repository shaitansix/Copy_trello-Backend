import { completeTask } from '../../../client-2/src/services/tasks.js'
import { pool } from '../config/db.config.js'

export const taskController = {
    listTasks: async (req, res) => {
        try {
            const { rows } = await pool.query('SELECT * FROM tasks ORDER BY idx_task ASC;')

            return res.status(200).json({
                state: 'Success', 
                data: rows, 
                message: 'Successfully obtained tasks'
            })
        } catch (err) {
            res.status(500).json({
                state: 'Failed', 
                data: null, 
                message: `Error: ${err.message}`
            })
        }
    }, 
    getTask: async (req, res) => {
        try {
            const { id } = req.params
            if (id === 'undefined' || id === 'null') throw new Error('Incomplete parameters')
            
            const { rows } = await pool.query(`SELECT * FROM tasks WHERE id_task = ${id};`)
            if (rows.length === 0) throw new Error('Task not found')

            return res.status(200).json({
                state: 'Success',
                data: rows,
                message: 'Successfully obtained task'
            })
        } catch (err) {
            res.status(500).json({
                state: 'Failed', 
                data: null, 
                message: `Error: ${err.message}`
            })
        }
    }, 
    getTasksByCard: async (req, res) => {
        try {
            const { id_card } = req.params
            if (id_card === 'undefined' || id_card === 'null') throw new Error('Incomplete parameters')
            
            const { rows } = await pool.query(`SELECT * FROM tasks WHERE id_card = ${id_card} ORDER BY idx_task ASC;`)
            if (rows.length === 0) throw new Error('The card has no tasks')

            return res.status(200).json({
                state: 'Success',
                data: rows,
                message: 'Successfully obtained tasks'
            })
        } catch (err) {
            res.status(500).json({
                state: 'Failed', 
                data: null, 
                message: `Error: ${err.message}`
            })
        }
    }, 
    createTask: async (req, res) => {
        try {
            const { title,  description, idCard } = req.body
            if (!title || !idCard) throw new Error('Incomplete parameters')
            
            let query = ''
            const maxResult = await pool.query(`SELECT MAX(idx_task) AS max_idx FROM tasks WHERE id_card = ${idCard};`)
            if (!maxResult.rows[0].max_idx && maxResult.rows[0].max_idx !== 0) {
                query = `INSERT INTO tasks (title_task, description, id_card) VALUES ('${title}', '${description}', ${idCard}) RETURNING *;`
            } else {
                query = `INSERT INTO tasks (title_task, description, id_card, idx_task) VALUES ('${title}', '${description}', ${idCard}, ${maxResult.rows[0].max_idx + 1}) RETURNING *;`
            }

            const { rows, rowCount } = await pool.query(query)
            if (rowCount === 0) throw new Error('Task could not be created')

            return res.status(201).json({
                state: 'Success',
                data: rows[0],
                message: 'Successfully created task'
            })
        } catch (err) {
            res.status(500).json({
                state: 'Failed', 
                data: null, 
                message: `Error: ${err.message}`
            })
        }
    }, 
    updateIndexTask: async (req, res) => {
        try {
            const { id } = req.params
            const { index } = req.body
            if (id === 'undefined' || id === 'null' || `${index}` === 'undefined' || `${index}` === 'null') throw new Error('Incomplete parameters')

            const { rows, rowCount } = await pool.query(`UPDATE tasks SET idx_task = ${index} WHERE id_task = ${id} RETURNING *;`)
            if (rowCount === 0) throw new Error('Task could not be updated')
            
            return res.status(200).json({
                state: 'Success', 
                data: rows[0], 
                message: 'Successfully updated task'
            })
        } catch (error) {
            res.status(500).json({ 
                state: 'Failed', 
                data: null, 
                message: `Error ${err.message}`
            })
        }
    }, 
    completeTask: async (req, res) => {
        try {
            const { id } = req.params
            const { fulfilled } = req.body
            if (id === 'undefined' || id === 'null') throw new Error('Incomplete parameters')

            const { rows, rowCount } = await pool.query(`UPDATE tasks SET fulfilled = ${fulfilled} WHERE id_task = ${id} RETURNING *;`)
            if (rowCount === 0) throw new Error('Task could not be completed')
            
            return res.status(200).json({
                state: 'Success',
                data: rows[0], 
                message: 'Successfully updated task'
            })
        } catch (err) {
            res.status(500).json({
                state: 'Failed', 
                data: null, 
                message: `Error: ${err.message}`
            })
        }
    }, 
    updateDataTask: async (req, res) => {
        try {
            const { id } = req.params
            const { title, fulfilled, expDate, description } = req.body
            if (id === 'undefined' || id === 'null' || !title) throw new Error('Incomplete parameters')
            
            let query = ''
            if (expDate) {
                query = `UPDATE tasks SET title_task = '${title}', fulfilled = ${fulfilled}, exp_date = '${expDate}', description = '${description}' WHERE id_task = ${id} RETURNING *;`
            } else {
                query = `UPDATE tasks SET title_task = '${title}', fulfilled = ${fulfilled}, exp_date = null, description = '${description}' WHERE id_task = ${id} RETURNING *;`
            }
            
            const { rows, rowCount } = await pool.query(query)
            if (rowCount === 0) throw new Error('Task could not be updated')

            return res.status(200).json({
                state: 'Success',
                data: rows[0], 
                message: 'Successfully updated task'
            })
        } catch (err) {
            res.status(500).json({
                state: 'Failed', 
                data: null, 
                message: `Error: ${err.message}`
            })
        }
    }, 
    updatePositionTask: async (req, res) => {
        try {
            const { id } = req.params
            const { idCard, index } = req.body
            if (id === 'undefined' || id === 'null' || !idCard || `${index}` === 'undefined' || `${index}` === 'null') throw new Error('Incomplete parameters')
            
            const taskSelected = (await pool.query(`SELECT * FROM tasks WHERE id_task = ${id};`)).rows[0]
            if (taskSelected.id_card === idCard && taskSelected.idx_task === index) {
                return res.status(200).json({
                    state: 'Success',
                    data: null, 
                    message: 'Task position is the same'
                })
            }

            let query = ''
            if (taskSelected.id_card === idCard) {
                let tasksDest = (await pool.query(`SELECT * FROM tasks WHERE id_card = ${idCard} ORDER BY idx_task ASC;`)).rows

                let newIndex = index
                if (index === -1) newIndex = tasksDest.length
                taskSelected.idx_task = newIndex

                tasksDest.splice(newIndex, 0, taskSelected)
                tasksDest = tasksDest.filter((taskObj) => !(taskObj.id_task === taskSelected.id_task && taskObj.idx_task !== newIndex))

                for (let i = 0; i < tasksDest.length; i++) {
                    query += `UPDATE tasks SET idx_task = ${i} WHERE id_task = ${tasksDest[i].id_task};\n`
                }
            } else {
                const tasksOrigin = (await pool.query(`SELECT * FROM tasks WHERE id_card = ${taskSelected.id_card} AND id_task != ${id} ORDER BY idx_task ASC;`)).rows
                const tasksDest = (await pool.query(`SELECT * FROM tasks WHERE id_card = ${idCard} AND id_task != ${id} ORDER BY idx_task ASC;`)).rows
            
                let newIndex = index
                if (index === -1) newIndex = tasksDest.length
                tasksDest.splice(newIndex, 0, taskSelected)

                query += `UPDATE tasks SET id_card = ${idCard} WHERE id_task = ${id};`
                for (let i = 0; i < tasksOrigin.length; i++) {
                    query += `UPDATE tasks SET idx_task = ${i} WHERE id_task = ${tasksOrigin[i].id_task};\n`
                }
                for (let i = 0; i < tasksDest.length; i++) {
                    query += `UPDATE tasks SET idx_task = ${i} WHERE id_task = ${tasksDest[i].id_task};\n`
                }
            }

            const { rowCount } = await pool.query(query)
            if (rowCount === 0) throw new Error('Task could not be updated')

            return res.status(200).json({
                state: 'Success',
                data: null, 
                message: 'Successfully updated task'
            })
        } catch (err) {
            res.status(500).json({
                state: 'Failed', 
                data: null, 
                message: `Error: ${err.message}`
            })
        }
    }, 
    deleteTask: async (req, res) => {
        try {
            const { id } = req.params
            if (id === 'undefined' || id === 'null') throw new Error('Incomplete parameters')
            
            const { rows, rowCount } = await pool.query(`DELETE FROM tasks WHERE id_task = ${id} RETURNING *;`)
            if (rowCount === 0) throw new Error('Task could not be deleted')

            return res.status(200).json({
                state: 'Success',
                data: rows[0],
                message: 'Successfully deleted task'
            })
        } catch (err) {
            res.status(500).json({
                state: 'Failed', 
                data: null, 
                message: `Error: ${err.message}`
            })
        }
    }
}