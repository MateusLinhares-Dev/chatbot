# Layered Architecture
### pt-br

# Objetivo

- O chatbot em questão irá utilizar arquitetura Layered Architecture para dividir camadas distintas e suas responsabilidades.

## por que ?

- O motivo de usar esse padrão de design é que podemos dividir as responsabilidades, sabendo que o chatbot irá atuar em diferentes camadas e torna o código escalável e modular.

## organização:
/src
   /DTO               -> camada de contrato (Objeto de transferência de dados)
    
  /controllers        -> camada de interface (chama services)
    conversationController.js
  /services           -> camada de negócio (lógica principal)
    conversationService.js
  /messaging          -> camada de infraestrutura (fila RabbitMQ)
    publisher.js
    consumer.js
  /routes             -> rotas Express
    botRoutes.js
  app.js              -> entrada (Express, setup)
