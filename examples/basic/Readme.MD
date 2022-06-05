The configuration here can be used to forward all the requests from mock-api server(`http://localhost:3002/`) to `jsonplaceholder` api server.

### Setup

Step 1:

To run mock-api you will need a config file. This can be created with running below command in terminal 
```
npx mock-api-setup
```

Step 2:
```
npx mock-api
```

<h6 align="center">or</h6>

Add npm script in your `package.json` file.
```
"scripts": {
  "mock-api": "mock-api"
}
```

Run `mock-api` from terminal.

```
npm run mock-api
```

### Testing

Open browser and hit `http://localhost:3002/photos/1`

For more details on other `jsonplaceholder` API's you call check https://jsonplaceholder.typicode.com/


### Info

Since `mock-api.config.js` is a javascript file, you can import custom functions or write your own javascript into it. The only manadatory part is to export a `config` object.