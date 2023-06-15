import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import fileUpload from 'express-fileupload';
import helmet from 'helmet';
import path from 'node:path';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { routes } from './routes';

const app = express();

// Configurando cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  app.use(cors());
  next();
});

app.use(cors());

app.use(helmet());

dotenv.config();

// Definindo json como padrão
app.use(express.json());

const statics = path.join(__dirname, './public');

app.get('/static/:file', (req, res) => {
  const file = req.params.file;
  res.sendFile(path.join(statics, file));
});

app.use('/static', express.static(statics));

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

// Configuração do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Cadastro e acompanhamento de massa corporal',
      version: '1.0.0',
      description: 'API para cadastro e acompanhamento de massa corporal',
    },
    servers: [
      {
        url: 'https://dull-pear-shrimp.cyclic.app/', // Altere a URL conforme necessário
      },
      {
        url: 'https://api-projeto-pw2.cyclic.app', // Altere a URL conforme necessário
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Altere o caminho das suas rotas conforme necessário
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Configuração das suas rotas
app.use(routes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`🚀 Server started on port:${process.env.PORT}`);
});
