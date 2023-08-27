import { Router } from "express"
import { Person } from "../models/Person"

export const personRouter = Router()

personRouter.post('/', async (request, response) => {
    //req.body
    const { name, salary, approved } = request.body

    if (!name) {
        return response.status(422).json({ error: 'O nome é obrigatório!' })
    }

    const person = {
        name,
        salary,
        approved
    }

    try {

        await Person.create(person)

        response.status(201).json({ message: 'Pessoa inserida no sistema' })

    } catch (error) {
        response.status(500).json({ error: error })
    }
})

personRouter.get('/', async (request, response) => {
    try {

        const people = await Person.find()

        response.status(200).json(people)

    } catch (error) {
        response.status(500).json({ error: error })
    }
})

personRouter.get('/:id', async (request, response) => {
    const id = request.params.id

    try {
        // findONe({ _id: id})
        const person = await Person.findById(id)

        if (!person) {
            return response.status(422).json({ message: 'O usuário não foi encontrado' })

        }
        response.status(200).json(person)

    } catch (error) {
        response.status(500).json({ error: error })
    }
})

// Update - atualização de dados (PUT, PATch)

personRouter.patch('/:id', async (request, response) => {
    const id = request.params.id // se alterar em cima altera o parâmetro

    const { name, salary, approved } = request.body

    const person = {
        name,
        salary,
        approved
    }

    try {

        await Person.findByIdAndUpdate(id, person)


        response.status(200).json(person)

    } catch (error) {
        response.status(500).json({ error: error })
    }
})

personRouter.delete('/:id', async (request, response) => {
    const id = request.params.id

    const person = await Person.findById(id)

    if (!person) {
        return response.status(422).json({ message: 'O usuário não foi encontrado' })
    }

    try {

        await Person.findByIdAndDelete(id)

        response.status(200).json({ message: 'Usuário deletado' })

    } catch (error) {
        response.status(500).json({ error: error })
    }
})