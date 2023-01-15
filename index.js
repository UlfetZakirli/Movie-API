import { createMovie, getMovie, getMovies, updateMovie, deleteMovie } from './controller/movies.js';
import express from 'express'
import 'colors'

const app = express()
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Welcome to Index Page')
})

app.get('/movies', getMovies)

app.get('/movies/:id', getMovie)

app.post('/movies', createMovie)

app.put('/movies/:id', updateMovie)

app.delete('/movies/:id', deleteMovie)


const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server running port: http://localhost:${port}`.blue.bold))