`mock-api.config.js` can be configured to perform following tasks
1. Forward all requests to another API server(external_server_1)
2. Send custom request header in an API request (external_server_1)
3. Manipulate request before sending an API request
4. PATCH API call with variable in route
5. Send request to custom API server (external_server_2)
6. Set custom response 
7. Set custom response status code


### Forward all requests to another API server(external_server_1)

With following config you can send all requests to another API server. In this document, another API server is `https://jsonplaceholder.typicode.com` which is referred as external_server_1.

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
  }
}
```

### Send custom request header in an API request (external_server_1)

Bellow config will forward POST request to `/posts` to `https://jsonplaceholder.typicode.com/posts` where only custom headers will be forwarded to `jsonplaceholder.typicode.com` server as `skip_forward_all_headers` and `skip_req_headers` are provided as true. 


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
  routes: [{
    enable_forward: true,
    request: {
      path: "/posts",
      method: "POST",
      payload: {
        title: 'foo'
      },
      headers: {
        skip_forward_all_headers: true,
        skip_req_headers: true,
        "X-API-TOKEN": getAPIToken()
      }
    }
  }]
}
```

 > Please note that the only custom header for POST `/posts` route  is `X-API-TOKEN`. No other headers will be forwarded with above configuration. 


### Manipulate request before sending an API request

We may want to update the request payload, query params, headers before actually being sent to our API server from `moc-api` server. To achieve this we can utilise `beforeRequest` method of route. 

In each route, we can define `beforeRequest` method which provides us access to your  route's `request` object before the request was made. In this function, we can manipulate the request object. 

The `this` object inside `beforeRequest` funtion, refers to route's `request` object. In also provides access to request's `params` and `payload`.

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
  routes: [{
    enable_forward: true,
    request: {
      path: "/posts",
      method: "POST",
      payload: {
        title: 'foo'
      },
      headers: {
        skip_forward_all_headers: true,
        skip_req_headers: true,
        "X-API-TOKEN": getAPIToken()
      },
      beforeRequest: function ({params, body}) {
        // console.log("this", this);
        const getProfileToken = () => 'YYYYY';

        this.headers["X-PROFILE-TOKEN"] = getProfileToken()
      }
    }
  }]
}
```

In the above configuration, `beforeRequest` method updates route request's headers to add `X-PROFILE-TOKEN` on this fly before request actually being sent to the API server. 

The above configuration, sends following headers while making POST request to `https://jsonplaceholder.typicode.com/posts`

```
headers {
  'X-API-TOKEN': { 'X-API-TOKEN': 'XXXXXXXX' },
  'X-PROFILE-TOKEN': 'YYYYY'
}
```


### PATCH API call with variable in route

We can pass variable in route as params. `path` variable inside `request` object follows [express route](https://expressjs.com/en/guide/routing.html) pattern.


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
  routes: [{
    enable_forward: true,
    request: {
      path: "/posts/:post_id",
      method: "PATCH",
      payload: {
        title: 'foo'
      },
      headers: {
        skip_forward_all_headers: true,
        skip_req_headers: true,
        "X-API-TOKEN": getAPIToken()
      },
      beforeRequest: function ({params, body}) {
        // console.log("this", this);
        // console.log("params, body", params, body);
        let {post_id} = params;

        const getProfileToken = () => 'YYYYY';

        this.payload.post_multiplier = 2*post_id;
        this.headers["X-PROFILE-TOKEN"] = getProfileToken()
      }
    },
    response: {
      status: 206,
      response_data: {
        "Name":"Keshav Kumar",
        "userId":1,
        "githubHandle":"rnmkeshav"
      },
    }
  }]
}
```

In the above config, makes a PATCH request to `https://jsonplaceholder.typicode.com/posts/1`. Above configuration also usage `beforeRequest` to manipulate `headers` as well as `payload` before sending request. 

### Send request to custom API server (external_server_2)

When we specify `hostname` in route object, it does not use forward config i.e `config.forward` but usage provided hostname. 

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
  routes: [{  // To see this in action, make a POST request to `http://localhost:3002/api/users` with {"name":"morpheus","job":"leader"} as request payload 
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
```

The above configuration will send all POST requests routed to `/api/users` to `https://reqres.in/api/users` route. 
### Set custom response 

By setting `config.routes.response.response_data` we can set our own custom response data for a requested route path. This will override any response coming from external API server(`https://jsonplaceholder.typicode.com` in this case)

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
  routes: [{
    enable_forward: true,
    request: {
      path: "/posts",
      method: "POST",
      payload: {
        title: 'foo'
      },
      headers: {
        skip_forward_all_headers: true,
        skip_req_headers: true,
        "X-API-TOKEN": getAPIToken()
      }
    },
    response: {
      response_data: {
        "Name":"Keshav Kumar",
        "userId":1,
        "githubHandle":"rnmkeshav"
      },
    }
  }]
}
```

With above configuration, the response to POST `https://jsonplaceholder.typicode.com/posts` will always be following:
```
{
  "Name":"Keshav Kumar",
  "userId":1,
  "githubHandle":"rnmkeshav"
}
```

### Set custom response status code

To set custom response status code, we need to add desired status code in `status` key of `config.routes.response.status`.

In the above example if we add `status` key to response object. The individual route object will look as follows

```
{
  enable_forward: true,
  request: {
    path: "/posts",
    method: "POST",
    payload: {
      title: 'foo'
    },
    headers: {
      skip_forward_all_headers: true,
      skip_req_headers: true,
      "X-API-TOKEN": getAPIToken()
    }
  },
  response: {
    status: 206
  }
}
```

In the above config, we have set `response.status` as 206. So POST API request to `https://jsonplaceholder.typicode.com/posts` will always respond with status code of 206. 

