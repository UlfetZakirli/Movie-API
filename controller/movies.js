import { v4 as uuid } from "uuid"
import Joi from 'joi'

let movies = [
    {
        id: uuid(),
        name: 'The Wizard of Oz',
        imdb_score: 8.3,
        genre: [
            {
                name: "Adventure",
            },
            {
                name: 'Musical'
            },
            {
                name: 'Fantasy'
            }
        ]
    },
    {
        id: uuid(),
        name: 'The Strong and Bold',
        imdb_score: 9.1,
        genre: [
            {
                name: "Action",
            },
            {
                name: 'Family'
            },
            {
                name: 'Fantasy'
            }
        ]
    },
]


const validateMovie = (movies) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        imdb_score: Joi.number().min(1).max(10).required(),
        genre: Joi.array().items(Joi.object().keys({
            name: Joi.string().min(3).max(30).required()
        })).required()
    })
    return schema.validate(movies)
}

export const getMovies = (req, res) => {
    res.send(movies)
}

export const getMovie = (req, res) => {
    const { id } = req.params
    const movie = movies.find((movie) => movie.id === id)
    if (!movie) {
        return res.status(404).send('The movie with the given ID was not found :(')
    }
    res.send(movie)
}

export const createMovie = (req, res) => {

    const { error } = validateMovie(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }

    const { name, imdb_score, genre } = req.body
    const newMovie = {
        id: uuid(),
        name,
        imdb_score,
        genre
    }
    movies.push(newMovie)
    res.send('Movie added successfully')
}

export const updateMovie = (req, res) => {
    const { id } = req.params
    const movie = movies.find((movie) => movie.id == id)
    if (!movie) {
        return res.status(404).send('The movie with the given ID was not found :(')
    }
    const { error } = validateMovie(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const { name, imdb_score, genre } = req.body
    movie.name = name
    movie.imdb_score = imdb_score
    movie.genre = genre
    res.send('The movie updated successfully')

}

export const deleteMovie = (req, res) => {
    const { id } = req.params
    const movie = movies.find((movie) => movie.id === id)
    if (!movie) return res.status(400).send('The movie with the given ID was not found :(')
    // movies = movies.filter((movie) => movie.id !== id)
    //OR
    // const index = movies.findIndex((movie) => movie.id === id)
    //OR
    const index = movies.indexOf(movie)
    movies.splice(index, 1)

    res.send('The movie deleted successfully')
}