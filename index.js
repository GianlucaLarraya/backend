const express = require('express')
const morgan = require ('morgan')
const cors = require('cors')

const app = express()

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

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/api/persons', (request, response) => {
    response.json(persons)
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

  app.get('/info', (request,response) => {
    const responseText = `<p>Phonebook has info for ${persons.length} people </p> <p>${new Date()}</p>`
    response.send(responseText)
    
  })

  const generateId = () => {
    const newId = Math.random() * 100
    return newId 
    }
    
  app.post('/api/persons', morgan(':method :url :status :res[content-length] - :response-time ms :body'), (request, response) => {
    const body = request.body
    
    if (!body.name ) {
      return response.status(400).json({ 
      error: 'name is missing' 
      })
    }

    if (!body.number ) {
      return response.status(400).json({ 
      error: 'number is missing' 
      })
    }

    const nameRepeated = persons.find(person => person.name === body.name)
    console.log(nameRepeated)

    if (nameRepeated) {
      return response.status(400).json({ 
      error: 'name must be unique' 
      })
    }
    

    const person = {
      id: generateId(),
      name: body.name,
      number: body.number,
    }
    
    persons = persons.concat(person)
    
    response.json(person)

    morgan.token('body', req => {
      return JSON.stringify(req.body)
    })
  })

  app.delete('/api/persons/:id', morgan(':method :url'), (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
      
    response.status(204).end()
      })

  app.put('/api/persons/:id', morgan(':method :url'), (request, response) => {
    const body = request.body
    const id = Number(request.params.id)
    personsex = persons.filter(person => person.id !== id)

    const person = {
      id: generateId(),
      name: body.name,
      number: body.number,
    }

    response.json(person)

    persons = personsex.concat(person)



    response.status(204).end()

  })


  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })