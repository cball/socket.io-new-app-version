This is an example app that came out of a blog post on realtime app versions. [Check out the post](http://cball.me/realtime-app-version-notices/)

### Requirements
- Redis
- node

### Running the server
1. clone the repo
2. npm install
3. node server.js
4. open a browser to localhost:3000
5. publish a redis message: `redis-cli publish frontend-app-version asdf`

You should see asdf in the browser.
