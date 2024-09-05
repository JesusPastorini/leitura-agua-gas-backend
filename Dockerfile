FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

# Definir a variável de ambiente GEMINI_API_KEY
ARG GEMINI_API_KEY
ENV GEMINI_API_KEY=$GEMINI_API_KEY

CMD ["node", "dist/index.js"]
