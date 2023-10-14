import express from 'express'
import { route } from './routes/routes'

const app = express()

app.use(express.json())
app.use(route)

const port = 3333

app.listen(port, () => {
    console.log(`Http server running in port: ${port}`)
})