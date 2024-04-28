const express = require('express')
const app = express()
const morgan = require('morgan')

morgan.token('body', function (request, response) {return JSON.stringify(request.body)})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const info = () => {
    const peoplePhonebook = persons.length
    const time = Date()

    return (
        `<p>Phonebook has info for ${peoplePhonebook}</p>
        <p>${time}</p>`
    )
}

app.get('/', (request, response) => {
    response.send('<h1>Ejercicio Parte 3</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (resquest, response) => {
    response.send(info())
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    const generateId = () => {
        const maxId = notes.length > 0
            ? Math.max(...persons.map(p => p.id))
            : 0
        return maxId + 1
    }

    if (!body.name) {
        return response.status(400).json({
            error: 'no name'
        })
    }
    
    if (!body.number) {
        return response.status(400).json({
            error: 'no number'
        })
    }

    for (let i = 0; i < persons.length; i++) {
        if (persons[i].name === body.name) {
            return response.status(400).json({
                error: 'name must be unique'
            })
        }
    }
    
    const newPerson = {
        id: Math.round(Math.random() * (100000 - 1) + 1),
        name: body.name,
        number: body.number
    }
    
    persons = persons.concat(newPerson)
    
    response.json(newPerson)  
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})