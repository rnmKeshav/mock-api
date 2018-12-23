### Purpose

To demonstrate use of `actions` provided with each route

### Description

- `action` is a function which has access to current route object along with all the parameters passed to it.
- As `action` has access to it's route object, it can easily modify response object. With this, we can set custom response and it's headers which `mock-api` will send as a response when current particular route url is hit.

### Details

```
let routes = [{
  request: {
    path: "/users/:userId",
    method: "PATCH"
  },
  response: {
    data: {
      id: 5145606,
      account_id: "6939366",
      email: "",
      first_name: "Keshav Kumar new",
      phone_number: "+919008001556",
      country: "IN",
      agent: false
    }
  }
}]
```

Without action method in `route` object, it will alwas return same object(`response.data`) when we make a `PATCH` API call to `/users/234`.

#### Adding `action` in route object

```
let routes = [
  {
    request: {
      path: "/users/:userId",
      method: "PATCH"
    },
    response: {
      data: {
        id: 5145606,
        account_id: "6939366",
        email: "",
        first_name: "Keshav Kumar",
        phone_number: "+919008001556",
        country: "IN",
        agent: false
      }
    },
    action: function(payload) {
      let { param, data } = payload;

      this.response.data = Object.assign({}, this.response.data, data);
    }
  }
]
```

- We have attached `action` method to route object. This method receives `payload` which consists of all the details we have passed while making actual request.

- When we make an `PATCH` call to `users/123` with `payloadSent` as

  ```
    payloadSent = {
      first_name: "Keshav Kumar new"
    }
  ```

  This will receive `payloadSent` object inside `data` and `123` in param of `payload`.

- This `action` method also has access to `this` which points to current `route` object where it has been defined.
