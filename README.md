## Creating the server
1.- Create the project
npm init -y
To initialize the node project. The '-y' is to answer yes to all the questions of the configuration of the package.json

2.- Create the index.js
npm i dotenv express cors

Install the packages for the index.js

3.- Create the database
Create the mongo database on Mongo Compass

4.- Create the .env
Add the info of the port and database connection

5.- Create the database folder and its configuration file
npm i mongoose

6.- Create the .gitignore and add the .env and node modules
.env
node_modules/