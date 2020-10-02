var path = require("path");

module.exports = {
  routes_path: path.resolve(__dirname, "./routes.js"),
  forward: {
    mode: "custom", // Custom means forwarding enabled route would be forwarded to given hostname, others will be served from local data.
    hostname: "https://www.practo.com", // Generic hostname where you want to forward your request
    headers: {  // Copy all headers required to make an API call to this hostname
      accept: "application/json",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "en,pt-BR;q=0.9,pt;q=0.8,id;q=0.7,en-US;q=0.6,la;q=0.5",
      cookie:
        "XXXXX",
      referer: "https://www.practo.com/",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36"
    }
  }
}