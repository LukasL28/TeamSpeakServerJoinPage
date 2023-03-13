FROM node:19.7.0 AS build
ENV NODE_ENV=production
WORKDIR /build
RUN npm install --global gulp-cli
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --only=dev
COPY . .
RUN npm run build

FROM node:19.7.0
ENV NODE_ENV=production
WORKDIR /app
EXPOSE 8080
COPY --from=build /build/dist /app/dist
COPY --from=build /build/backend /app/server
WORKDIR /app/server
RUN npm install --omit=dev
CMD [ "npm", "start" ]