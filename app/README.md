# Projeto Front-end com React

Este é um projeto front-end desenvolvido em ReactJS. Ele faz parte de um sistema maior, sendo responsável pela interface do usuário.

## Configuração do Cliente (ReactJS)

Siga as instruções abaixo para configurar e executar o cliente em sua máquina local:

1. Clone o repositório do projeto do cliente em sua máquina.
2. Navegue até o diretório do projeto e abra um terminal.

3. Execute o seguinte comando para instalar as dependências necessárias:
   ```
   npm install
   ```

4. Configure a URL da API fornecida pelo servidor no arquivo `.env`. Certifique-se de fornecer a URL correta para garantir a comunicação correta com o servidor.

5. Execute o seguinte comando para iniciar o cliente:
   ```
   npm start
   ```

## Estrutura do Projeto

O projeto ReactJS possui a seguinte estrutura de diretórios e arquivos:

- **src/components**: Este diretório contém os componentes reutilizáveis da aplicação. Esses componentes podem ser utilizados em várias partes do sistema para garantir a consistência visual e funcional.
- **src/pages**: Aqui estão localizadas as páginas da aplicação, como a página de login, cadastro e acompanhamento. Cada página é composta por um conjunto de componentes e lida com as funcionalidades específicas relacionadas a essa página.
- **src/services**: Neste diretório, encontram-se os serviços responsáveis por realizar as requisições à API do servidor. Eles fornecem métodos para enviar e receber dados, permitindo a integração adequada entre o front-end e o back-end.
- **src/utils**: Este diretório contém utilitários diversos utilizados na aplicação, como funções auxiliares, formatação de dados e constantes.
- **src/App.js**: Arquivo principal da aplicação ReactJS. Aqui, são definidos os roteamentos e os componentes de layout que serão exibidos em todas as páginas.
- **src/index.js**: Ponto de entrada da aplicação ReactJS. Este arquivo é responsável por renderizar o componente principal (App) na página HTML.

Sinta-se à vontade para explorar e modificar o projeto de acordo com suas necessidades. Esperamos que esta aplicação front-end desenvolvida em ReactJS seja útil para você!