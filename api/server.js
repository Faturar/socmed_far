import express from 'express'
import bodyParser from 'body-parser'

// route
import route from './routes/posts.routes.js'

const app = express()
const port = 3001

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json('Hello World')
})

// Post Route
route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})