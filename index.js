import express from 'express'
import { parse } from 'twemoji-parser'
import axios from 'axios'
import path from 'path'

const app = express()

const __filename = new URL(import.meta.url).pathname
const __dirname = path.dirname(__filename)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/:emoji', async (req, res) => {
  try {
    const emoji = parse(req.params.emoji)
    const response = await axios.get(emoji[0].url)
    res.set({ 'Content-Type': 'image/svg+xml' })
    res.send(response.data)
  } catch (error) {
    res.status(404).send('Emoji not found')
  }
})

app.listen(8080, () => {
  console.log('Server listening on port 8080!')
})