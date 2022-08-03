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
npm i --save-dev @rnmkeshav/mock-api
```

### Setup

Step 1:

To run mock-api you will need a config file. This can be created with running below command in terminal 
```
npx mock-api-setup
```

Step 2:

Run following command from terminal to start mock-api server
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

Run following command from terminal to start mock-api 

```
npm run mock-api
```

### Testing

Open browser and hit 

 - Test 1:

`http://localhost:3002/photos/1`

The above URL fetches data from `https://jsonplaceholder.typicode.com` API server which is default configured in your `mock-api.config.js` file. All the request will goto default server until it is overriden by custom route.

- Test 2:

`http://localhost:3002/search/users`

The above URL fetches data from `https://api.github.com/` which is mentioned in custom routes of `mock-api.config.js` file.

### How mock-api works
_This package usage `express` to create a proxy server. It takes your request, checks request method and url passes it through some middleware. It is these middleware which calls `route.beforeRequest` before making request and pick `route.payload`(more on this later) to make api call to your service. Middleware also puts response from your service(provided `hostname` in config/route) to `routes.response_data` and calls `routes.beforeResponse()` before sending response back to client. Middleware usage config file to create and manipulate request/response._ 


## config file details

To run `mock-api`, config(`mock-api.config.js`) file is mandatory. This config file gets created by running `npx mock-api-setup` but can also be created manually. This is plain javascript file which exports an object.

**You will be manipulating this file to achieve all your desired result and fake/forward api responses.**

#mock-api.config.js

```
let config = {
  port: 3002,
  forward: {
    hostname: "https://jsonplaceholder.typicode.com", // hostname where request will be forwarded. This will be fallback for custom route.
    headers: { // headers to be sent in all requests.
      cookie: "pelUUID=96d2cfa0-e0ce-4795-beb3-917c5c1dd79c; _ga=GA1.2.1683668930.1598687051; _gcl_au=1.1.1869798560.1598687054; _fbp=fb.1.1598706524131.962812492;hl=en; pelUUID=174edf11de59da-068985a51643be-5b7f7327-5294d-174edf11de690c; __cfruid=e14408ee99e3a9ae0b2b1bcdfe71dda5c137e3a4-1601719873; WZRK_G=9746059b128d44d1bc23bec757dfb5c3; _gat=1; _gat_fabric=1; WZRK_S_8W6-695-WK5Z=%7B%22p%22%3A9%2C%22s%22%3A1601719832%2C%22t%22%3A1601720622%7D; modal_login=true", // cookie you would like to send as header when making request to your server(mentioned in hostname)
      host: "jsonplaceholder.typicode.com",
      accept: "application/json",
      referer: "https://jsonplaceholder.typicode.com/",
      "accept-encoding": "gzip"
    }
  },
  routes: [{  // custom routes if you want to modify request payload or response data. This can also be used to override request/response default data(headers/status) mentioned above in `config.forward`
    enable_forward: true, // true means request would be forwarded to routes.request.hostname if mentioned otherwise fallback to config.forward.hostname. false means api would be returning route.response.response_data
    request: {  // request object details. 
      path: "/search/users",  // route path for which this object will come into force.
      method: "GET",
      headers: {  // This will override config.forward.headers
        Host: "api.github.com"
      },
      hostname:"https://api.github.com/", // This will override config.forward.hostname
      query: {
        q: "rnmkeshav"
      },
      payload: {},  // Payload to send to server for this API call
      beforeRequest: function ({params, body}) {
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
  }, {  // To see this in action, make a POST request to `http://localhost:3002/api/users` with {"name":"morpheus","job":"leader"} as request payload 
    enable_forward: true, 
    request: {
      path: "/api/users",
      method: "POST",
      hostname: "https://reqres.in/",
      payload: {},
      headers: {
        skip_req_headers: true, //headers which gets sent automatically from client/browser
        skip_forward_all_headers: true, //headers which gets sent in forward all request. `config.forward.headers`
        // host: "https://reqres.in",
        accept: "application/json",
        // referer: "https://reqres.in/",
        // "accept-encoding": "gzip",
        // 'Content-type': "application/json"
      }
    }
  }]
}

module.exports = config;
```

### Config object detail
This is the main object which gets exported from `mock-api.config.js` 
 > In this document, this object is also referred as `config` object

Property | Type | Details | Default
-------- | ------- | ------- | -------
port | Number | Port on which mock-api server runs. | 3002
forward | Object | An object which contain details about request where data will be forwarded. Details of this object can be found below. | { }
routes | Array | An array which holds detail of each route where you want to do some manipulation in request or response object. | [ ]


### Forward object details
An object which help build request object to send to different service. This is **forward all** object. All the route coming to `mock-api` server will be getting forwarded according to this object rule. 
 > In this document this object is also referred as `config.forward` object  

Property | Type | Details | Default
------- | ------- | -------- | --------
hostname | String | hostname of the url where you want to forward all your request to. | "https://jsonplaceholder.typicode.com/"
headers | Object | An object which contains any headers data you want to send in your request. This can be used to send `cookie` to an authentication protected API | { }


### route object details

This makes custom route request. `route` property of config(`mock-api.config.js`) is an array of object which contains individual route details.
An object which you can use to let `mock-api` know you want to perform some manipulation with request or response data.

 > In this document this object is also referred as `config.route` object

Property | Type | Details | Default
------- | ------- | ------- | -------
enable_forward | Boolean | This flag tells `mock-api` that should it forward the request for mentioned `path` or not. | False
request | Object | This object tells request details which will be used for `request.path` url. We can use this object to modify POST payload, query params, headers sent to service etc. | { }  
response | Object | This object tells response details which will be used for `request.path` url. We can use this object to modify response data, response headers, status codes etc. | { }

#### Route's request object

By default all request adheres `config.forward` object to construct request's hostname, headers etc. This object overrides default behavior and tells `mock-api` to use this object to construct a custom request object for mentioned `path`.

 > In this document this object is also referred as `config.route.request` object

Property | Type | Details | Default
------- | ------- | ------- | -------
path | String | A url path for which you want to manipulate your request or response and create a custom request. Same as express.js [path](https://expressjs.com/en/guide/routing.html) | ""
method | String | Method for custom request's path | GET
headers | Object | Header object which will be sent when you make request to this custom request's `path` | `config.forward.headers`
hostname | String | Hostname for custom request. This when specified overrides `config.forward.hostname` | undefined
payload | Object | This object gets merged with your client's(browser) POST request's body to construct final payload and sent to mentioned `path` in custom request. | { }
query | Object | Query param to send with request | { }
beforeRequest | Function | A function which has access to current route object(`config.route.request`) using `this` and gets called before sending request to your `path` in custom request. This function also provides access to route's request params and request's payload body | noop


#### Route's response object

This object is used to manipulate response for custom route of `path` mentioned `config.route.request`

 > In this document this object is also referred as `config.route.request` object

 Property | Type | Details | Default
 ------- | ------- | ------- | -------
 headers | Object | This is used to manipulate response headers. This object merges and overrides response headers coming from service/API | { }
 status | Overrides response's status code | ""
 response_data | Response data you want from this request. This object gets populated as soon as `mock-api` gets response from your custom request server. | { }
 beforeResponse | Function | A callback function which gets called after `mock-api` gets response from your custom request. This function gets called after populating data in `response_data` with parameters as request's `params` and `body`.  | noop

#### Route's request header object

We can send specific headers for each different route with this object. We can also use this object to override headers sent from browser automatically. 

Header priority: Request Headers < Forward All headers < Custom headers

```
  let headers = Object.assign({}, req_headers, config_headers, custom_headers);
```

Header group | code_variable_name | Description
------ | ------ | ------
Request Headers | req_headers | The headers which gets sent from client/browser while making request to `mock-api` server. 
Forward All headers | config_headers | The headers which gets sent from config file to all requests which match `forward` route of `config` object. This is same as `config.forward.headers`
Custom headers | custom_headers | This is the header object which you write for each specific route. This is same as `config.route.request.headers` object. This object has highest priority for individua route.


#### Customising route's request header object

There are times when we want to skip headers from certain group like `Request Headers` or `Forward All headers` etc. You can use the following header keys in custom request's header to skip the group.

Example 1: You don't want to send headers client/broswer is sending to be forwarded to your request server. 

Example 2: When you have customised a route which matches the `config.forward` object but you don't want to send headers mentioned in `config.forward.headers` object

Header Key | Description | Type | Default
------ | ------ | ------ | ------
skip_req_headers | This will skip headers sent from client/browser. No headers from client/browser will be sent to request server | Boolean | false
skip_forward_all_headers | This will skip headers sent from `config.forward.headers` object. The header from client/browser will still to to request server. | Boolean | false


 > If you want to send only the header defined for route in `config.route.request.headers` then make both `skip_req_headers` and `skip_forward_all_headers` as `true` 


#### Examples
[Example 1](https://github.com/rnmKeshav/mock-api-example/tree/master/forward-all)

[Example 2](https://github.com/rnmKeshav/mock-api-example/tree/master/forward-custom)


## For Developers

### Method 1

- Install mock-api in your existing repository with following command

```
npm install --save-dev https://github.com/rnmKeshav/mock-api/tree/{your_branch_name}
```

- Add script in package.json to run mock-api 

```
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "mock-api": "mock-api",
  "mock-api-setup": "mock-api-setup"
},
```

- Run setup script

```
npm run mock-api-setup
```

- Run mock-api server

```
npm run mock-api
```

### Method 2

- Step 1:

Clone this repo 

- Step 2:

Navigate to `mock-api/examples/custom` folder

- Step 3

Run `npm run mock-api` in terminal

- Step 4

Run `mock-api/examples/custom/index.html` with live server to make requests.