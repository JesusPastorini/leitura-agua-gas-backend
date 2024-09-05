# 🚰📊 Leitura Individualizada de Consumo de Água e Gás - Backend

Este é o backend de um serviço que gerencia a leitura individualizada de consumo de água e gás. Utilizamos inteligência artificial (IA) para extrair as medidas diretamente das imagens enviadas pelo cliente! 🧠✨

## 🧑‍💻 Tecnologias Utilizadas

- **Node.js**
- **Express**
- **MongoDB**: Banco de dados NoSQL utilizado para armazenar as leituras de consumo.
- **Mongoose**
- **TypeScript**
- **Docker**
- **Google Gemini API**: Utilizada para a análise de imagens e extração dos valores de leitura a partir de fotos de medidores.
- **dotenv**


## 📋 Funcionalidades

### 🛠️ **Endpoints Implementados**

## 1. POST /upload  
   Recebe uma imagem em base64, consulta a API do Gemini, e retorna a leitura do medidor.

   **Requisitos**:
   - Valida o tipo de dados (incluindo a imagem em base64).
   - Verifica se já existe uma leitura para o mês atual daquele tipo.
   - Integra com a API do Gemini para extrair o valor da imagem.

  ## 2. PATCH /confirm

  Responsável por confirmar ou corrigir o valor lido pelo LLM.

  Esse endpoint deve:
  - Validar o tipo de dados dos parâmetros enviados.
  - Verificar se o código de leitura informado existe.
  - Verificar se o código de leitura já foi confirmado.
  - Salvar no banco de dados o novo valor informado.

  
  ## 3. GET /<customer_code>/list
  Este endpoint retorna uma lista das medidas realizadas por um determinado cliente. Ele pode opcionalmente receber o parâmetro `measure_type` para filtrar por tipo de medida (WATER ou GAS).

  
**Exemplo de Response Body:**

- **200**: Operação realizada com sucesso
  ```json
  {
    "customer_code": "123456",
    "measures": [
      {
        "measure_uuid": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        "measure_datetime": "2023-09-01T10:00:00Z",
        "measure_type": "WATER",
        "has_confirmed": true,
        "image_url": "https://example.com/temporary-image-url"
      },
      {
        "measure_uuid": "a1b2c3d4-58cc-4372-a567-0e02b2c3d479",
        "measure_datetime": "2023-08-01T10:00:00Z",
        "measure_type": "GAS",
        "has_confirmed": false,
        "image_url": "https://example.com/temporary-image-url"
      }
    ]
  }

