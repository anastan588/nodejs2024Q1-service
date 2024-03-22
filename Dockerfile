FROM node:20-alpine3.18
EXPOSE ${PORT}
WORKDIR /app
COPY package.json .
COPY  . .
RUN npm install --omit=dev
RUN npx prisma generate
CMD ["npm", "run", "start:prisma"]