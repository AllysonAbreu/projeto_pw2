import express, {Request,Response} from 'express'

const app = express()

app.listen(8080, () => {
    console.log('Server listening on port 8080.')
})

app.use(express.json())

app.get('/home', (req,res) => {
    return res.status(200)
            .send('Server rodando na porta 8080.')
})