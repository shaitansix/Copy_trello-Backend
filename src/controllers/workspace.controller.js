import { pool } from '../config/db.config.js'

export const workspaceController = {
    listWorkspaces: async (req, res) => {
        try {
            const { rows } = await pool.query('SELECT * FROM workspaces ORDER BY id_workspace ASC;')

            if (rows.length === 0) { 
                return res.status(200).json({
                    state: 'Success', 
                    data: [], 
                    message: 'No workspaces found'
                })
            }

            return res.status(200).json({
                state: 'Success', 
                data: rows, 
                message: 'Successfully obtained workspaces'
            })
        } catch (err) {
            res.status(500).json({
                state: 'Failed', 
                data: null, 
                message: `Error: ${err.message}`
            })
        }
    }, 
    getWorkspace: async (req, res) => {
        try {
            const { id } = req.params

            if (id === 'undefined' || id === 'null') throw new Error('Incomplete parameters')
            const { rows } = await pool.query(`SELECT * FROM workspaces WHERE id_workspace = ${id};`)

            if (rows.length === 0) {
                return res.status(200).json({
                    state: 'Success', 
                    data: [], 
                    message: 'No workspace found'
                })
            }

            return res.status(200).json({
                state: 'Success', 
                data: rows, 
                message: 'Successfully obtained workspace'
            })
        } catch (err) {
            res.status(500).json({
                state: 'Failed', 
                data: null, 
                message: `Error: ${err.message}`
            })
        }
    }, 
    createWorkspace: async (req, res) => {
        try {
            const { name } = req.body
            if (!name) throw new Error('Incomplete parameters')

            const exist = await pool.query(`SELECT * FROM workspaces WHERE name_workspace = '${name}';`)
            if (exist.rows.length > 0) throw new Error('Workspace already exists')
            
            const { rows, rowCount } = await pool.query(`INSERT INTO workspaces (name_workspace) VALUES ('${name}') RETURNING *;`)
            if (rowCount === 0) throw new Error('Workspace could not be created')

            return res.status(201).json({
                state: 'Success', 
                data: rows[0], 
                message: 'Successfully created workspace'
            })
        } catch (err) {
            res.status(500).json({
                state: 'Failed', 
                data: null, 
                message: `Error: ${err.message}`
            })
        }
    }, 
    updateWorkspace: async (req, res) => {
        try {
            const { id } = req.params
            const { name } = req.body
            if (id === 'undefined' || id === 'null' || !name) throw new Error('Incomplete parameters')
            
            const { rowCount, rows } = await pool.query(`UPDATE workspaces SET name_workspace = '${name}' WHERE id_workspace = ${id} RETURNING *;`)
            if (rowCount === 0) throw new Error('Workspace could not be updated')

            return res.status(200).json({
                state: 'Success', 
                data: rows[0], 
                message: 'Successfully updated workspace'
            })
        } catch (err) {
            res.status(500).json({
                state: 'Failed', 
                data: null, 
                message: `Error: ${err.message}`
            })
        }
    }, 
    deleteWorkspace: async (req, res) => {
        try {
            const { id } = req.params
            if (id === 'undefined' || id === 'null') throw new Error('Incomplete parameters')
            
            const { rowCount, rows } = await pool.query(`DELETE FROM workspaces WHERE id_workspace = ${id} RETURNING *;`)
            if (rowCount === 0) throw new Error('Workspace could not be deleted')

            return res.status(200).json({
                state: 'Success', 
                data: rows[0], 
                message: 'successfully deleted workspace'
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