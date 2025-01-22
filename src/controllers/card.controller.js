import { pool } from '../config/db.config.js'

export const cardController = {
    listCards: async (req, res) => {
        try {
            const { rows } = await pool.query('SELECT * FROM cards ORDER BY idx_card ASC;')

            if (rows.length === 0) {
                return res.status(200).json({
                    state: 'Success', 
                    data: [], 
                    message: 'No cards found'
                })
            }

            return res.status(200).json({
                state: 'Success', 
                data: rows, 
                message: 'Successfully obtained cards'
            })
        } catch (err) {
            res.status(500).json({
                state: 'Failed', 
                data: null, 
                message: `Error ${err.message}`
            })
        }
    }, 
    getCard: async (req, res) => {
        try {
            const { id } = req.params

            if (id === 'undefined' || id === 'null') throw new Error('Incomplete parameters')
            const { rows } = await pool.query(`SELECT * FROM cards WHERE id_card = ${id};`)

            if (rows.length === 0) {
                return res.status(200).json({
                    state: 'Success', 
                    data: [], 
                    message: 'No card found'
                })
            }
            
            return res.status(200).json({
                state: 'Success', 
                data: rows, 
                message: 'Successfully obtained card'
            })
        } catch (err) {
            res.status(500).json({
                state: 'Failed', 
                data: null, 
                message: `Error ${err.message}`
            })
        }
    }, 
    getCardsByBoard: async (req, res) => {
        try {
            const { id_board } = req.params
            if (id_board === 'undefined' || id_board === 'null') throw new Error('Incomplete parameters')
            
            const { rows } = await pool.query(`SELECT * FROM cards WHERE id_board = ${id_board} ORDER BY idx_card ASC;`)
            if (rows.length === 0) {
                return res.status(200).json({
                    state: 'Success', 
                    data: [], 
                    message: 'No cards found'
                })
            }
            
            return res.status(200).json({
                state: 'Success', 
                data: rows, 
                message: 'Successfully obtained cards by board'
            })
        } catch (err) {
            res.status(500).json({
                state: 'Failed', 
                data: null, 
                message: `Error ${err.message}`
            })
        }
    }, 
    createCard: async (req, res) => {
        try {
            const { name, idBoard } = req.body
            if (!name || !idBoard) throw new Error('Incomplete parameters')
            
            const exist = await pool.query(`SELECT * FROM cards WHERE name_card = '${name}' AND id_board = ${idBoard};`)
            if (exist.rows.length > 0) throw new Error('Card already exists')
            
            let query = ''
            const maxResult = await pool.query(`SELECT MAX(idx_card) AS max_idx FROM cards WHERE id_board = ${idBoard};`)
            if (!maxResult.rows[0].max_idx && maxResult.rows[0].max_idx !== 0) {
                query = `INSERT INTO cards (name_card, id_board) VALUES ('${name}', ${idBoard}) RETURNING *;`
            } else {
                query = `INSERT INTO cards (name_card, id_board, idx_card) VALUES ('${name}', ${idBoard}, ${maxResult.rows[0].max_idx + 1}) RETURNING *;`
            }

            const { rows, rowCount } = await pool.query(query)
            if (rowCount === 0) throw new Error('Card could not be created')
            
            return res.status(201).json({
                state: 'Success', 
                data: rows[0], 
                message: 'Successfully created card'
            })
        } catch (err) {
            res.status(500).json({
                state: 'Failed', 
                data: null, 
                message: `Error ${err.message}`
            })
        }
    }, 
    updateNameCard: async (req, res) => {
        try {
            const { id } = req.params
            const { name, idBoard } = req.body
            if (id === 'undefined' || id === 'null' || !name) throw new Error('Incomplete parameters')
            
            const exist = await pool.query(`SELECT * FROM cards WHERE name_card = '${name}' AND id_board = ${idBoard};`)
            if (exist.rows.length > 0) throw new Error('Card already exists')
            
            const { rows, rowCount } = await pool.query(`UPDATE cards SET name_card = '${name}' WHERE id_card = ${id} RETURNING *;`)
            if (rowCount === 0) throw new Error('Card could not be updated')
            
            return res.status(200).json({
                state: 'Success', 
                data: rows[0], 
                message: 'Successfully updated card'
            })
        } catch (err) {
            res.status(500).json({
                state: 'Failed', 
                data: null, 
                message: `Error ${err.message}`
            })
        }
    }, 
    updateIndexCard: async (req, res) => {
        try {
            const { id } = req.params
            const { index } = req.body
            if (id === 'undefined' || id === 'null' || (!index && index !== 0)) throw new Error('Incomplete parameters')

            const { rows, rowCount } = await pool.query(`UPDATE cards SET idx_card = ${index} WHERE id_card = ${id} RETURNING *;`)
            if (rowCount === 0) throw new Error('Card could not be updated')
            
            return res.status(200).json({
                state: 'Success', 
                data: rows[0], 
                message: 'Successfully updated card'
            })
        } catch (error) {
            res.status(500).json({ 
                state: 'Failed', 
                data: null, 
                message: `Error ${err.message}`
            })
        }
    }, 
    deleteCard: async (req, res) => {
        try {
            const { id } = req.params
            if (id === 'undefined' || id === 'null') throw new Error('Incomplete parameters')
            
            const { rows, rowCount } = await pool.query(`DELETE FROM cards WHERE id_card = ${id} RETURNING *;`)
            if (rowCount === 0) throw new Error('Card could not be deleted')
            
            return res.status(200).json({
                state: 'Success', 
                data: rows[0], 
                message: 'Successfully deleted card'
            })
        } catch (err) {
            res.status(500).json({
                state: 'Failed', 
                data: null, 
                message: `Error ${err.message}`
            })
        }
    }
}