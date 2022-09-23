Use case 1: `enable_forward:true`

1. Make API call to forward all routes. Should forward all requests to global config.
2. Make API call to a route with custom hostname and check if the request goes to custom hostname.
3. Make API call to a route with custom request header. The request should forward the custom request header to configured hostname.
  - Hostname being global hostname
  - Hostname being local configuration
4. Make API call to a route to check if cookie is getting forwarded according to the configuration.
  - Route matching with custom defined route object
  - Route matching global request object
5. Make API call to a `Method` different from custom defined route config
  - Same method should use configured header and host
  - Different method should use global configuration for header and host
6. Make GET API call to verify if query parameter is being forwarded to 
  - Custom defined hostname and endpoint
  - Global hostname and endpoint
7. Make POST request to verify if payload data is getting forwarded to 
  - Custom defined hostname and endpoint
  - Global hostname and endpoint
8. Make POST request to verify if request header is getting forwarded to 
  - Custom defined hostname and endpoint
  - Global hostname and endpoint
9. 

Use Case 2: `enable_forward:false`
1. Check if custom response header is coming in response to the API
2. Check if custom response data is coming in response to the API
3. Check if custom header is coming in response

Updating flag `enable_forward` should switch the functionality to enable/disable request forwarding 
