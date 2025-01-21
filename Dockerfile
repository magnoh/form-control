FROM node:20-alpine as builder
WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force \ 
    && npm install

COPY . .
RUN npm run build

FROM node:18-alpine AS runtime
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public

USER node
