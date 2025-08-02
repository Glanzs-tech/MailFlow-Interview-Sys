FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build the app
RUN npm run build

# Use serve to host the build folder
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "80"]
