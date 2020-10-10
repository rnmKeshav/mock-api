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

### How mock-api works
_This package usage express to create a proxy server. It takes your request, checks request method and url passes it through some middleware. It is these middleware which calls `route.beforeRequest` before making request and pick `route.payload`(more on this later) to make api call to your service. Middleware also puts response from your service(provided `hostname` in config/route) to `routes.response_data` and calls `routes.beforeResponse()` before sending response back to client. Middleware usage config file to create and manipulate request/response._ 


## config file details

To run `mock-api`, config(`mock-api.config.js`) file is mandatory. This config file gets created by running `npx mock-api-setup` but can also be created manually. This is plain javascript file which exports an object.

#mock-api.config.js

```
let config = {
  port: 3002,
  forward: {
    hostname: "https://jsonplaceholder.typicode.com/",  // hostname where request will be forwarded. This will be fallback for custom route.
    headers: {  // headers to be sent in all requests.
      cookie: "Hello=world;sdn=1", // cookie you would like to send as header when making request to your server(mentioned in hostname)
      host: "jsonplaceholder.typicode.com",
      accept: "application/json",
      referer: "https://jsonplaceholder.typicode.com/",
      "accept-encoding": "gzip"
    }
  },
  routes: [{  // custom routes if you want to modify request payload or response data. This can also be used to override request/response default data(headers/status) mentioned above in config.forward
    enable_forward: true, // true means request would be forwarded to routes.request.hostname if mentioned otherwise fallback to config.forward.hostname. false means api would be returning route.response.response_data
    request: {  // request object details. 
      path: "/search/users",  // route path for which this object will come into force.
      method: "GET",
      headers: {  // This will override config.forward.headers
        Host: "api.github.com"
      },
      hostname:"https://api.github.com/", // This will override config.forward.hostname
      payload: {},  // Payload to send to server for this API call
      beforeRequest: function () {
        // This gets called before network request
        // This method can change request object.
      }
    },
    response: {
      headers: {  // Can be used to override response header.
        "custom_response_header": "custom_response_header_value"
      },
      status: "", // Can be used to override response status code
      response_data: {},  // This is where response data is placed when API call succeeds.
      beforeResponse: function () {
        // This method gets called after network request
        // This method can change response object
      }
    }
  }]
}

module.exports = config;
```

Property | Type | Details | Default
-------- | ------- | ------- | -------
port | Number | Port on which mock-api server runs. | 3002
forward | Object | An object which contain details about request where data will be forwarded. Details of this object can be found below. | { }
routes | Array | An array which holds detail of each route where you want to do some manipulation in request or response object. | [ ]


### forward object details
An object which help build request object to send to different service. 

Property | Type | Details | Default
------- | ------- | -------- | --------
hostname | String | hostname of the url where you want to forward all your request to. | "https://jsonplaceholder.typicode.com/"
headers | Object | An object which contains any headers data you want to send in your request. This can be used to send `cookie` to an authentication protected API | { }


### route object details

`route` property of config(`mock-api.config.js`) is an array of object which contains individual route details.
An object which you can use to let `mock-api` know you want to perform some manipulation with request or response data.

Property | Type | Details | Default
------- | ------- | ------- | -------
enable_forward | Boolean | This flag tells `mock-api` that should it forward the request for mentioned `path` or not. | True
request | Object | This object tells request details which will be used for `request.path` url. We can use this object to modify POST payload, query params, headers sent to service etc. | { }  
response | Object | This object tells response details which will be used for `request.path` url. We can use this object to modify response data, response headers, status codes etc. | { }

