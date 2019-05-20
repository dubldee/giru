# giru

### The easiest to use, dependency free HTTP logger middleware for NodeJS!

Simply install the logger via npm:

```
npm install giru --save
```

Use the logger in your project:

```js
app.use(require('giru')())
```

giru will log all requests sent to your server and depending on the status code, giru will display it as a bad request (red text) or a successful request (normal text)

![giru! giru!](https://i.ibb.co/1vXYP6Q/Giru.png)