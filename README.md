# Bitfinex Backend Programming Challenge
## Author

Yusuf Badmos 

---

## Responsibilities

This service is responsible for matching buy and sell orders in a hypothetical market.

## Stack

### API

- NodeJs
- Grenache-grape

## Local Development

Ensure you have NodeJs installed locally. You can download NodeJs [here](https://nodejs.org/en/download/). For MacOs users, it can alternatively be installed via homebrew using the command: `brew install node`. Since NodeJs ships with NPM, once we've successfully installed node, we can use npm.

### Setting up the DHT

We need to install the grenache-grape packages globally so we can run the binary.

```
npm i -g grenache-grape
```

```
# boot two grape servers by running the command from two terminal instances

grape --dp 20001 --aph 30001 --bn '127.0.0.1:20002'
grape --dp 20002 --aph 40001 --bn '127.0.0.1:20001'
```



The application has the server running from the server/ folder while the client runs from the client/ folder.

From each of the folders root, execute `npm install` to install local packages.

For both folders (client and server),Once npm packages are installed, you start the server locally via:

From the application root, execute `npm install` to install packages.

Once npm packages are installed, you start the both the client and server locally via:

`npm start`

Both server and client should now be available with some output in the terminal
Code is hot-reloaded, but may take a few seconds to correctly reload.


## Local resources
Local data is stored under `data.js`.
The service matching engine lives in server/src/matching-engine.js.


## Notes
While the code currently supports further optimizations, Given enough time, we can go forward to implement the following to make the matching engine more robust:
- Use of a more efficient matching algorithm.
- Add the ability to cancel orders
- Increase communication performance
- Backup and restore the order book to prevent losing data
- Add monitoring and observability to improve availability
- Fix minor bugs like issue with socket hangup
