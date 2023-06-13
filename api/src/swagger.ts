import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { routes } from './routes';

const app = express();

// Configuração do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Nome da sua API',
      version: '1.0.0',
      description: 'Descrição da sua API',
    },
    servers: [
      {
          url: 'http://localhost:8080', // Altere a URL conforme necessário
      },
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

app.listen(process.env.PORT || 8080, () => {
    console.log(`🚀 Server started on port:${process.env.PORT}`);
});
