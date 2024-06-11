index.js --> main file just like main() in a C++ program

npm init -y in terminal to use JS in our project...after that package.json will be created...
package.json lets us know about our project i.e. all the important things and dependencies in our project

now we make an express server(express js) to run our backend
npm i express

Import express

use "type":"module" in package.json to use latest version

mongoDB cluster port-->27017
some ports are free like 5000,3000

install nodemon (npm i nodemon)
nodemon index.js

in your app, always keep a / get route, it will help a lot even in production

if in a post request, if you dont send any data then it will show CANNOT GET /register on localhost:5000

install mongoose and dotenv (npm i mongoose dotenv)

const { firstname, lastname, email, password } = req.body; //initially all this data will be stored in req.body
//this is destructing method in ES6

---

Register functionality

//generate a token for user and send it to the backend

    /*we will generate a token using JWT which has header,payload and signature in it

header contains info about how jwt is encoded and which algo we want to use
payload is what the user will be sending(your information)
signature checks that it has not been tampered\*/
// npm i jsonwebtoken

---

Login Functionality

to store this token
cookies is the best way to store token and not local storage and session storage
so store token in cookies with options
