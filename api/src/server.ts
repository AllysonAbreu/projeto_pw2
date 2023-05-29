import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import fileUpload from 'express-fileupload';
import helmet from 'helmet';
import path from 'node:path';
import { routes } from './routes';


const app = express();

app.use(helmet());

app.use(cors());

dotenv.config();

//Configurando cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
})

//Definindo json como padrão
app.use(express.json());

const statics = path.join(__dirname, './public');

app.get('/static/:file', (req, res) => {
    const file = req.params.file;
    res.sendFile(path.join(statics, file));
})

app.use('/static', express.static(statics));

app.use(
    fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
    })
)

//Configurando rotas da API
app.use(routes);

app.listen(process.env.PORT || 8080, () => {
    console.log(`🚀 Server started on port:${process.env.PORT}`);
});

app.get('/home', (req, res) => {
    return res.status(200).send('Server rodando na porta 8080.');
});