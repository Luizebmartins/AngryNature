const express = require('express')
const router = express.Router()
const phenomenonService = require('../services/phenomenonService')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

router.post('/fenomeno/cadastro', ensureAuthenticated, async (req, res, next) => {
    try {
        const response = await phenomenonService.create(req.body)
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
})

router.post('/fenomeno/consulta', ensureAuthenticated, async (req, res, next) => {
    try {
        const response = await phenomenonService.filter(req.body)
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
})

router.get('/fenomeno/lista', ensureAuthenticated, async (req, res, next) => {
    try {
        const response = await phenomenonService.read()
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
})

router.get('/fenomeno/consulta/:usuario/:id', ensureAuthenticated, async (req, res, next) => {
    try {
        const response = await phenomenonService.filterForUser(req.params.usuario, req.params.id)
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
})

router.put('/fenomeno/atualiza/:id', ensureAuthenticated, async(req, res, next) => {
    try {
        const response = await phenomenonService.update(req.params.id, req.body)
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
})

router.delete('/fenomeno/deleta/:id', ensureAuthenticated, async (req, res, next) => {
    try {
        await phenomenonService.remove(req.params.id)
        res.status(201).end()
    } catch (error) {
        next(error)
    }
})


module.exports = router