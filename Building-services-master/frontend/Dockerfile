FROM node:18-alpine as deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci || npm install

FROM node:18-alpine as builder
WORKDIR /app
# Accept API URL at build-time; default still points to backend service name
ARG REACT_APP_API_URL=http://backend:3000
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM nginx:1.25-alpine as runner
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


