# Mock-api
An easy and configurable mock-server.

## Features
 - [x] A fake REST API data server :smirk:
 - [x] Can configure response status :smiley:
 - [x] Can modify response data according to request :confused: 
 - [x] Can forward request and fetch data from other data services :relieved:

### Points
 1. As a frontend developer, we mostly care how we `make our request`, `what data to send` and what's the response of it i.e) what was `response data`, `status code` etc. to handle post request process which is mostly whether `error occurred` or was the `request successful`. We might not care if the data got inserted into the database or not.

 2. We often want to `run our code in local machine with production data`. This can be because of various reasons like debugging, fixing bugs, development when back-end team is unavailable to provide response structure etc.

## What you will need to run `mock-api`
 1. **installation**
 2. **A Route file**
 3. A config file to tell `mock-api` about it's configuration and other parameters

> mock-api in the background runs an express server. It takes routes provided to construct paths and some configurations (like port) to setup and run the server.  

#### Install mock-api server

#### Route file
A simple `javascript` file to hold all information about routes you are trying to mock.
This file exports an `array of objects`. Each object consists of information about particular route.
Example:
```javascript
#routes.js
module.exports = [
  {
    request: { // Details regarding API request you are making
      path: "/users",
      method: "get"
    },
    response: { // Details regarding API response for requested path we want   
      data: {
        id: 5145606,
        account_id: "12345",
        email: "keshav.xxx@gmail.com",
        name: "Keshav Kumar",
        phone_number: "+919008xx1555",
        country: "IN"
      }
    }
  }
]
```
We will discuss about route file and it's object structure later.

#### Config file
A `javascript` file to hold all configurations required to run the server. This file exports an object, the properties of which is used to customize `mock-api` server. This is not mandatory until you are using forwarding feature.

Since this is a javascript file, you can import any external JS library or write your own code in this file. Only mandatory part is to export a javascript config object. 

#### Start mock-server
mock-server -r=routes.js

> If you see error, please check route object structure and config below. 


## Routes detail

A file which exports array of objects(routes). 
The route object has all the details. There are three property of route object.
1. **request**
2. **response**
3. **action**

Lets see details of these properties:
### 1. request(mandatory)
This object contains all details about the request we make while making API call.

#### Properties of `request`

Property | Details
-------- | ------- 
path | Endpoint which we want to mock. Same as `express.js` [path](https://expressjs.com/en/guide/routing.html). 
method | Request method. Any of `GET`, `POST`, `PATCH`, `DELETE` etc.
forward | An object used when we want to forward(redirect) request for current path to some other service to fetch response instead of using local(mocked) data. We will discuss this in details later.

Example 1: 
Problem: Make a request to `get` users data whose route is `www.yourdomain.name/users.json`.
Solution: While mocking api, we will be replacing our `hostname` with `localhost:port`. Lets assume `mock-api` server runs on port 6001. So our request will convert
`www.yourdomain.name/users.json` => `localhost:3000/users.json`

Hence, request object for this request will be:
```javascript
  request: {
    path: "/users.json",
    method: "GET"
  }
```


### 2. response
An object which contains all details about how we want our response to look like.

#### Properties of `response`

Property | Details
-------- | -------
data | Response we want when we make calls to current route path. This can be object, string or whatever format our API call is expected to return. 
headers| An object of response headers we want to set. To set status code of response to be 201, we can set `headers: {status: 201}`

**Note** If forwarding is enabled, response returned from the forwarded service will be returned to callee. Hence `response.data` from current `response` object will be overridden.

Example: For above example, lets say we want to respond with `responseData` and set a header `X_API_TOKEN`.
```
let responseData = [{
  id: 5145606,
  account_id: "12345",
  email: "keshav.xxx@gmail.com",
  name: "Keshav Kumar",
  phone_number: "+919008xx1555",
  country: "IN"
}, {
  id: 514243,
  account_id: "12334",
  email: "amit.xxx@gmail.com",
  name: "Amit Ranjan",
  phone_number: "+1xxxx1555",
  country: "US"
}]
```

Hence, response object for above requirement will be
```javascript
  response: {
    data: responseData,
    headers: {
      status: 200,
      X_API_TOKEN: "309rhnfdgjhbfg43e"
    }
  }
```

### 3. action method
A function which gets called when we access current route's object path.
`action` method has it's `this` context set to current route object. Hence we can access our `response` object, and modify it as per our need.
This function gets called with an object as argument.

Properties of object passed as arguments to `action` method

Property | Details
---------| -------
params | Contains route parameters if passed.
data | Contains data passed while making POST/PATCH/DELETE etc calls.
query | Contains query parameters of request

Example: Extending previous example, lets say we want to filter and want user whose country is india(IN) which we will pass in route's query parameter. 

```javascript
#routes.js

let routes = [{
  request: {
    path: "/users",
    method: "GET"
  },
  response: responseData,
  action: function(payload) {
    let query = payload.query;

    this.response.data = this.response.data.filter(currentUser => {
      currentUser.country == query.country;
    });
  }
}];
```

When we access `localhost:6001/users?country=IN`, in response we will get
```javascript
[{
  id: 5145606,
  account_id: "12345",
  email: "keshav.xxx@gmail.com",
  name: "Keshav Kumar",
  phone_number: "+919008xx1555",
  country: "IN"
}]
```
## Config file details
A simple javascript file exporting config object.

Though this file is not mandatory upto certain extent, it's recommended to create one. 
Default filename for the file is `mock-api.config.js` and is expected at the root of project.
For whatever reason you don't want to create `mock-api.config.js` in the root, you can keep it wherever you want with path to file passed as argument while runing `mock-api`.

`mock-api -c=path/to/mock-api/config.js`

Properties of config object.

Properies | Type  | Default | Details
----------|------ | ------ | -------
port | Number | 6001 | Port at which you want to run `mock-api` server
routes_path | String | `./routes.js` | Path to route file
forward | Object | {} | An object required for request forwarding.

Note: We will discuss about forward object shortly.

## Request Forwarding
Using `mock-api` server, we can forward any request coming to this server to any third-party service and return back response from third-party service to client.

 >  Client ===> Mock-api Server ===> Third-party Server ===> Mock-api Server ===> Back to Client

Forwarding is very helful when we want to run our application with third-party data but can't achieve from client(browser/localhost) directly due to various reasons like CORS, authentication etc.

To achieve route forwarding, we need to provide some configurations to `mock-api`. There are two ways configure forwarding.
 1. Generic forwarding
 2. Individual or custom forwarding

### 1. Generic forwarding
This type of request forwarding would be applicable to all routes defined in `routes.js` file. This is achieved using config file `mock-api.config.js`. This config file, exports an config object with `forward` propery in it which itself is an object. 

**`forward` object holds data required for route forwarding**

Properties of `forward` object:
 
Properties | Type | Details
-----------| --------- | ------
mode | String | all, custom, none. Discussed in detail below.
hostname | String | Third-party service hostname where the request would be forwarded to. Ex: Your prod server hostname.
headers | Object| Headers required by third party service to make api-calls.

There are various modes of forwarding in `mock-api`

Mode | Details | Motivation
-----| ------ | -----------
All | Forwards all calls. | We want to replicate entire application with third-party(prod) data.
Custom | Forward only enabled routes. | Want to run application with some data coming from third-party source while rest from mock server. Individual route forwarding.
None | Disable all forwardings. | Want to run application with mock-server data.

Example: Run application with `www.practo.com` as data source. We also need to fetch logged in data.

To achieve this, we need to log into `www.practo.com` and copy headers and cookie set by website and paste into our config file.

```Javascript
#mock-api.config.js

module.exports = {
  port: 4000,
  routes_path: "./mock-server/routes.js",
  forward: {
    mode: "all",
    hostname: "https://www.practo.com",
    headers: {
      accept: "application/json",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "en,pt-BR;q=0.9,pt;q=0.8,id;q=0.7,en-US;q=0.6,la;q=0.5",
      cookie:"_abc=xxxxxxx;sso=dkfgirhjdfvjfd4345dkfdfj",
      referer: "https://www.practo.com/partners/doctor/687092/edit/awa_mem",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36"
    }
  }
}
```

We decided to keep our `routes.js` inside `mock-server` folder. 

```Javascript
#./mock-server/routes.js

modules.exports = [
  {
    request: {
      path: "/user",
      method: "GET"
    }
  }
]
```

### 2. Custom forwarding
With `mock-api` we can forward some route to fetch data from third-party service while others to keep responding with saved mock data.
This is done with help of individual route defined in `routes.js` file. A route object has three properties, namely `request, response, action`. 

For individual route forwarding, we use route's `request.forward` property along with config file's `forward.mode` property set to `custom`.

Properties of `request.forward` in details

Properties | Type | Details
-----------| ---- | -------
enabled | boolean | Sets whether to enable forwarding for this route.
hostname| string | Sets third-party hostname where this particular route would be forwarded to.
headers | Object | Headers required by third party service to make this api-call.

Note: Route's `request.forward` simply overrides config's forward properties. If you have same property specified at both places, `request.forward` would take preference for that particular route.

Note 2: Route's `request.forward.enabled` property is just a toggle switch which works only when config's `forward.mode` is set to `custom`. Otherwise this is ignored.

Forwarding table to consider

config.forward.mode | request.forward.enabled | outcome
------------| ------------------------|---------
all | true | true
all | false | true
custom | true | true
custom | false | false
none | true | false
none | false | false

#### Example: Write a mock-server which serves data from different sources for different routes.
Details of routes given below:

Route | Source 
------| ------
`/users` | mock server or Local data
`/logged_in_user` | `www.practo.com`
`/users/1 | `www.practo.com`
`/search/users` | `api.github.com`

Solution
1. Install `mock-api`
2. Create a config file

```Javascript
#mock-api.config.js

module.exports = {
  port: 4000,
  routes_path: "./routes.js",
  forward: {
    mode: "custom",        
    hostname: "https://www.practo.com",
    headers: {
      cookie:"_abc=xxxxxxx;sso=dkfgirhjdfvjfd4345dkfdfj"
    }
  }
}
```

3. Create a route file

```Javascript
#./routes.js

modules.exports = [
  {
    request: {
      path: "/users",
      method: "GET"
    },
    response: {
      data: [{
        id: 5145606,
        account_id: "6939366",
        email: "",
        name: "Keshav Kumar",
        phone_number: "+919008xx1555",
        country: "IN",
        agent: false
      }, {
        id: 514243,
        account_id: "12334",
        email: "amit.xxx@gmail.com",
        name: "Amit Ranjan",
        phone_number: "+1xxxx1555",
        country: "US"
      }]
    }
  },
  {
    request: {
      path: "/logged_in_user",
      method: "GET",
      forward: {
        enabled: true // This has effect only when config's forward.mode=custom.
      }
    },
    response: {
      data: { // This data will not be returned in response when `request.forward.enabled` is `true`
        id: 5145606,
        account_id: "6939366",
        email: "",
        name: "Keshav Kumar",
        phone_number: "+919008xx1555",
        country: "IN",
        agent: false
      }
    } 
  },
  {
    request: {
      path: "/users/1",
      method: "GET",
      forward: {
        enabled: true 
      }
    },
    response: {
      data: { // This data will not be returned 
        id: 5145606,
        account_id: "6939366",
        email: "",
        name: "Keshav Kumar",
        phone_number: "+919008xx1555",
        country: "IN",
        agent: false
      }
    } 
  },
  {
    request: {
      path: "/search/users",
      method: "GET",
      forward: {
        enabled: true,  // We can skip the response object entirely when forwarding is enabled for a route
        hostname: "https://api.github.com" // This overrides hostname set in config for this route's request
      }
    }
  }
]
```
