import { pool } from '../config/db.config.js'

export const boardController = {
    listBoards: async (req, res) => {
        try {
            const { rows } = await pool.query('SELECT * FROM boards OREDER BY id_board ASC;')

            if (rows.length === 0) {
                return res.status(200).json({
                    state: 'Success', 
                    data: [], 
                    message: 'No boards found'
                })
            }

            return res.status(200).json({
                state: 'Success', 
                data: rows, 
                message: 'Successfully obtained boards'
            })
        } catch (err) {
            res.status(500).json({
                state: 'Failed', 
                data: null, 
                message: `Error: ${err.message}`
            })
        }
    }, 
    getBoard: async (req, res) => {
        try {
            const { id } = req.params
            if (id === 'undefined' || id === 'null') throw new Error('Incomplete parameters')
            
            const { rows } = await pool.query(`SELECT * FROM boards WHERE id_board = ${id};`)
            if (rows.length === 0) {
                return res.status(200).json({
                    state: 'Success', 
                    data: [], 
                    message: 'No board found'
                })
            }

            return res.status(200).json({
                state: 'Success', 
                data: rows, 
                message: 'Successfully obtained board'
            })
        } catch (err) {
            res.status(500).json({
                state: 'Failed', 
                data: null, 
                message: `Error: ${err.message}`
            })
        }
    }, 
    getBoardsByWorkspace: async (req, res) => {
        try {
            const { id_workspace } = req.params
            if (id_workspace === 'undefined' || id_workspace === 'null') throw new Error('Incomplete parameters')
            
            const { rows } = await pool.query(`SELECT * FROM boards WHERE id_workspace = ${id_workspace} ORDER BY id_board ASC;`)
            if (rows.length === 0) {
                return res.status(200).json({
                    state: 'Success', 
                    data: [], 
                    message: 'No boards found'
                })
            }

            return res.status(200).json({
                state: 'Success', 
                data: rows, 
                message: 'Successfully obtained boards by workspace'
            })
        } catch (err) { 
            res.status(500).json({
                state: 'Failed', 
                data: null, 
                message: `Error: ${err.message}`
            })
        }
    }, 
    createBoard: async (req, res) => {
        try {
            const { name, idWorkspace } = req.body
            if (!name || !idWorkspace) throw new Error('Incomplete parameters')
            
            const exist = await pool.query(`SELECT * FROM boards WHERE name_board = '${name}' AND id_workspace = ${idWorkspace};`)
            if (exist.rows.length > 0) throw new Error('Board already exists')
            
            const { rows, rowCount } = await pool.query(`INSERT INTO boards (name_board, id_workspace) VALUES ('${name}', ${idWorkspace}) RETURNING *;`)
            if (rowCount === 0) throw new Error('Board could not be created')

            return res.status(201).json({
                state: 'Success', 
                data: rows[0], 
                message: 'Successfully created board' 
            })
        } catch (err) {
            return res.status(500).json({
                state: 'Failed', 
                data: null, 
                message: `Error: ${err.message}`
            })
        }
    }, 
    updateBoard: async (req, res) => {
        try {
            const { id } = req.params
            const { name, idWorkspace } = req.body
            if (id === 'undefined' || id === 'null' || !name || !idWorkspace) throw new Error('Incomplete parameters')

            const exist = await pool.query(`SELECT * FROM boards WHERE name_board = '${name}' AND id_workspace = ${idWorkspace};`)
            if (exist.rows.length > 0) throw new Error('Board already exists')
            
            const { rows, rowCount } = await pool.query(`UPDATE boards SET name_board = '${name}' WHERE id_board = ${id} RETURNING *;`)
            if (rowCount === 0) throw new Error('Board could not be updated')

            return res.status(200).json({
                state: 'Success', 
                data: rows[0], 
                message: 'Successfully updated board'
            })
        } catch (err) {
            res.status(500).json({
                state: 'Failed', 
                data: null, 
                message: `Error: ${err.message}`
            })
        }
    }, 
    deleteBoard: async (req, res) => {
        try {
            const { id } = req.params
            if (id === 'undefined' || id === 'null') throw new Error('Incomplete parameters')
            
            const { rows, rowCount } = await pool.query(`DELETE FROM boards WHERE id_board = ${id} RETURNING *;`)
            if (rowCount === 0) throw new Error('Board could not be deleted')

            return res.status(200).json({
                state: 'Success',
                data: rows[0], 
                message: 'Successfully deleted board'
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