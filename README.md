# jadi-backend
## Project setup
```
npm install
```

Edit `app/config/config.json` with correct DB credentials.
Copy `.env.exapmple to .env` and change it if necessary.

### Run
```
node server.js
```
OR
```
docker build -t jadibackend:1.0 .
docker run -p 8080:8080 -d jadibackend:1.0
```
