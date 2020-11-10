# Task-Website
NodeJS Express Mongod

### In Package.json the scripts below allow for shortcuts
```javascript
"scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
 }
```
 * `npm start` - Starts npm server
 * `npm run build` - Start npm development server reloads with changes
 * `npm run-script build` - Compiles typescript to javascript and puts in public/scripts

### Used these dependencies to compile typescript to JS enabling usage of React
```
"ts-loader": "~7.0.1",
"typescript": "~3.8.3",
"webpack": "~4.42.1",
"webpack-cli": "~3.3.11"
```
