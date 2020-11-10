# Task-Website
NodeJS Express Mongod

### In Package.json the scripts below allow for shortcuts
```
npm start
npm run dev
```
```javascript
"scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
 }
```

**Setup Babel with JSX in src folder to output to public/scripts folder**
```
npm install babel-cli@6 babel-preset-react-app@3
npx babel --watch src --out-dir ./public/scripts --presets react-app/prod
```