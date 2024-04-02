# Bussiness Marketing AI - Backend
The backend of this app is made up of two seperate services joined into one app. The first one takes care of user management while the other sends requests to OpenAI API for marketing material generation.

## 1. User management service
The user management service uses postgreSQL database for storing user data. To run locally, you can download postgre.  
### Instructions:
1. Create new database and name it the value of `DB_DATABASE` in the .env file
2. Username should be the same as the value of `DB_USERNAME` and password should be the same as the value of `DB_PASSWORD` in the .env file
3. Run npm install 
4. Inside the db/pg folder run `knex migrate:latest --migrations-directory migrations`
5. Run npm start

Developed by [Nik Kovačević](https://github.com/nikkovacevic)


## 2. Marketing material generation service
This service uses MongoDB for storing generated marketing material. To run locally, download MongoDB Community Server. OpenAI API is used for generation, so you will need an OpenAI API key to use this app.

### Functionalities:
1. Name generation:
   Request body requires the following:
   - field: the field in which your company works,
   - products: the products or service your company sels
2. Slogan generation:
   Request body requires the following:
   - field: the field in which your company works,
   - products: the products or service your company sells,
   - lenght: the lenght of the slogan in words,
   - target: the target audience of your company
3. Add generation:
   Request body requires the following:
   - product: the product you are trying to sell,
   - description: describe the products in short,
   - type: the format of the add. Can be video, poster, or post,
   - lenght: the lenght of the add in words

### Instructions:
1. Make sure you have a MongoDB server running, and that the connection string is pasted as the value of `MONGO_URL` in the .env file
2. Make sure you have a valid OpenAI API key pasted as the value of `AI_API_KEY` in the .env file
3. Run npm install
4. Run npm start
