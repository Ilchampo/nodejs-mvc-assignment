# Node Js MVC web app
Author: Pablo Beltran
Date: January 18th 2022
## About
This is a project to apply theory learned about MVC Design Pattern with a Node Js environment. The purpose of this application is to calculate the total penalty fee of burrowed items for each delayed day. The entities in this requirement are:
| User | Item | Rental |
|--|--|--|
| Is the entity that request an item. An user can borrow as many items as it wants.| The entity that the user can borrow. Each item can have a different value as penalty fee | The detail of the item borrowed, containing user information, dates and status |

As for the technologies used in this project, Node Js was used as back-end and front-end language, Express framework along with Express Handlebars as view engine and finally, MongoDB as database. To run this project Node Js and NPM are required. Once installed, run this command to install all the dependencies
```
npm i
```
Then create a dotenv file inside the /src folder with the following information.
```
URI = YourMongoDBconnectionURI
PORT = 3000
```
Finally run this command to launch the application in your localhost:3000
```
npm run dev
```
## Application Interface
Once the application is running, it should look like this in http://localhost:3000. This is the main page:
![index page](https://i.gyazo.com/fcef0b71824520c017302edf3cac67f1.png) 
***NOTE: The dates are only accepted in format dd-mm-yyyy, any other format will send a server error***
## Diagrams
Before even programming, it was necessary to analyze the requirement and define a search algorithm. For this, the following diagram was used to represent the problem.
![problem diagram](https://i.gyazo.com/02152ac4f9367ab06493a00458b8412a.png)
Finally, in order to understand how the program works, you can check the following diagram.
![mvc diagram](https://i.gyazo.com/2218682e44af62dd6f4be6d0aebd9983.png)
## Disclaimer
This application was meant to be developed as a college assignment, data is burned on the database. You can create more data in your own with the endpoints defined on each entity controller using tools like Postman or Insomnia or edit the values directly from MongoDB Atlas.