# URL Shortener Microservice - FreeCodeCamp

### Description:

1. `GET [project_url]/new/*`
1.1. When the user passes a **valid** url the API returns a JSON with the original url and the short url.
1.2. If the url is **invalid** the API returns an error message.
2. `GET [project_url]/:urlHash`
2.1. When the user sends a request to the shorted url he is redirected to the original url.
2.2. If the shorted url is **invalid** the API returns an error message.

#### Example Usage:
* [https://fcc-url.gomix.me/new/https://www.google.com](https://fcc-url.gomix.me/new/https://www.google.com)


#### Example Output:
```javascript
{
    "original_url": "https://www.google.com",
    "short_url": "https://fcc-url.gomix.me/kX6Kn"
}