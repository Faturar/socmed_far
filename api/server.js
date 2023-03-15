import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url';
import path from 'path'
import {dirname} from 'path'

// route
import route from './app/routes/routes.js'

const app = express()
const port = 3001

// const whitelist = ['http://localhost:3000']
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

app.use(cors())
// app.use(cors(corsOptions))

// Json encode
app.use(express.json()); // must
app.use(express.urlencoded({ extended: true }))

// Static file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/static', express.static(path.join(__dirname, 'public')))

// home route
app.get('/', (req, res) => {
    res.json('Socmed api')
})

// Post Route
route(app)

app.listen(port, () => {
  console.log(`Sever running on port ${port}`)
})