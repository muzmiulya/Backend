<h1 align="center">ExpressJS - Foodsie_Project RESTfull API</h1>

With more and more new food related business started popping out the demand for new food application that's accessible and easy to use are growing, this project is made to meet that demand. [More about Express](https://en.wikipedia.org/wiki/Express.js)

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.17.1-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.18.2-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?

1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name online_shop, and Import file sql to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3000/)
8. You can see all the end point [here](#end-point)

## Set up .env file

Open .env file on your favorite code editor, and copy paste this code below :

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_DATABASE=online_shop
```

## End Point

**1. GET**

- `/product`(Get all product)

**2. POST**

- `/product` (Post product)
  - `{ "product_name": "Coca-cola", "category_id": 2, "product_harga": 8000 , "product_status" : 1 | 0}`

**3. PATCH**

- `/product/:id` (Update product by id)

  - `{"product_name" : "Pepsi", "category_id" : 2, "product_harga" : 8000, "product_status" : 1 | 0}`

**4. DELETE**

- `/product/:id` (Delete product by id)
