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
        first_name: "Keshav Kumar",
        phone_number: "+919008xx1555",
        country: "IN"
      }
    }
  }
]
```
We will discuss about route file and it's object structure later.

#### Config file
A `javascript` file to hold all configurations required to run the server. This file exports an object, the properties of which is used to customize `mock-api` server. This is not required until you are using forwarding feature.

#### Start mock-server
mock-server -r=routes.js

> If you see error, please check route object structure and config below. 





