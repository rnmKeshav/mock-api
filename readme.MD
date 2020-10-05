# Mock-API
An easy and configurable mock server.

## Features
 - [x] A fake REST API data server :smiley:
 - [x] Acts as proxy server. Can forward request and fetch data from other data services :relieved:

### Points
 1. Helps in `POST` request to your server from anywhere, even from `localhost`
 2. Fixes `CORS` issue.
 3. We can make request to authenticated API.

### Install

```
npm install git@github.com:rnmKeshav/mock-api.git
```

### Setup

Step 1:

To run mock-api you will need a config file. This can be created with running below command in terminal 
```
npx mock-api-init
```

Step 2:
```
npx mock-api
```

<h6 align="center">or</h6>

Add npm script in your `package.json` file.
```
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "mock-api": "mock-api"
}
```

Run `mock-api` from terminal.

```
npm run mock-api
```

### Testing

Open browser and hit `http://localhost:3002/photos/1`
