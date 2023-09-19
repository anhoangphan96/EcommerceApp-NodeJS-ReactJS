# E-Commerce Website (MERN Stack)

## MongoDB - Express - React - Redux - NodeJS
MERN stack is intended to provide a starting point for building full-stack JavaScript applications, including dynamic web apps. The stack is made of MongoDB, Express, React, Redux, and NodeJS.

## E-Commerce Website
An ecommerce website for selling mobile devices, full of features like quick-view, mange user-account, add to cart, check out, filter list product in Client Page. When it comes to Admin Page, you can observe a summary revenue dashboard, add/edit/delete product, manage the role of users. The demo apps was deployed on Render and Firebase.

## Demo

\*Note: Please open link back-end first.

- Back-end demo (Render) : [Link](https://ecommerceapp-be.onrender.com)
- Client app (Firebase) : [Link](https://clientapp-ecommerceapp.web.app)
- Admin demo (Firebase) : [Link](https://adminapp-ecommerce.web.app)

- Client-role Account: `email: khachhang25@gmail.com` , `password: asdasdasd`
- Counselor-role Account: `email: lamanhduy456@gmail.com` , `password: asdasdasd`
- Admin-role Account: `email: anhoangphan96@gmail.com` , `password: asdasdasd`

## Project Breakdown

### API Server

- Directory: server
- Features:
  - [x] Building api server (MVC model) - CRUD operations
  - [x] Generating schema models
  - [x] Session-cookie to store data login user.
  - [x] Authenticating based on user role , using bcrypt to encrypt password when storing it in database
  - [x] User express-validator to validate login, sign up, checkout, create/edit products form.
  - [x] Socket.io to handle Room Chat on server-side

### Client App

- Directory: client
- Features:

  - [x] Developing Login/Sign up page
  - [x] Home page, Shop page, Detail product page
  - [x] Cart page, Check out page, History orders page (for logged in user)
  - [x] Redux/Redux Toolkit to store some
  - [x] React-router
  - [x] Chat Box (socket.io on client-side)
  - [x] Send Email when order sucessfully!

### Admin App

- Directory: admin
- Features:
  - [x] Login page - authenticate role admin, role counselor just allows to use Chat room to reply user
  - [x] Dash-board to summarize data.
  - [x] Create/Update/Delete products
  - [x] Show all orders on system (order page)
  - [x] User Page - manage and set role for user
  - [x] Chat room to reply client' messages

### Clone or download the `E-commerce App` Respository
#### Prerequisites

- MongoDB
- NodeJS
- npm

\*Note:you need client, admin and server runs concurrently in different terminal session, in order to make them talk to each other and avoid comflict

**Make sure you set all variable related to url to localhost on .env file **
#### Client-side usage(PORT: 3000)
url: http://localhost:3000
change backend url to http://localhost:5000 in .env file

```
$ cd client          // go to client folder
$ yarn # or npm i    // npm install packages
$ npm start       // run it locally
```

#### Admin usage(PORT: 3001)
url: http://localhost:3001
change backend url to http://localhost:5000 in .env file

```
$ cd admin
$ yarn # or npm i    // npm install packages
$ npm start       // run it locally
```

#### Server-side usage(PORT: 5000)
url: http://localhost:5000
adjust config of session in index.js follow the code below:
add the .env and replace all the variable by your account, config, origin
```
app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, // the shelf-life of session is 30 days
    },
  })
);
```

Finally, run the server like the some steps below

```
$ cd server   // go to server folder
$ npm i       // npm install packages
$ npm start // run it locally
```
