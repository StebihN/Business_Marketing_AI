![Node_JS](https://img.shields.io/badge/Node_JS-black?logo=npm) 
![Express_JS](https://img.shields.io/badge/Express_JS-gray?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-white?logo=mongodb)
![Mongoose](https://img.shields.io/badge/Mongoose-red?logo=mongoose&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-white?logo=postgresql)
![OpenAI](https://img.shields.io/badge/OpenAI-green?logo=openai&logoColor=white)


# Bussiness Marketing AI - Backend
The backend is made up of two seperate services joined into one app. The first one manages users while the other manages idea generation.



## API Endpoints

### User Management

#### Get User By Id

```http
  GET /users/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to fetch |


#### Update User

```http
  PUT /users/:id
```

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `id`      | `string` | **Required**. Id of the user to update|
| `username`| `string` | new username of the user              |
| `email`   | `string` | new email of the user                 |



#### Update User Password

```http
  PUT /users/:id/password
```

| Parameter     | Type     | Description                               |
| :------------ | :------- | :---------------------------------------- |
| `id`          | `string` | **Required**. Id of the user to update    |
| `old password`| `string` | **Required**. old password of the user    |
| `new password`| `string` | **Required**. new password of the user    |

#### User Log In

```http
  POST /auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`   | `string` | **Required**. email of the user   |
| `password`| `string` | **Required**. password of the user|

#### Register User / Create New User

```http
  POST /auth/register
```

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `username`| `string` | **Required**. username of the user    |
| `email`   | `string` | **Required**. email of the user       |
| `password`| `string` | **Required**. password of the user    |

### Idea Generation Management

#### Generate Names

```http
  POST /names/generate
```

| Parameter | Type     | Description                                         |
| :-------- | :------- | :-------------------------------------------------- |
| `field`   | `string` | **Required**. field in which the company operates   |
| `products`| `string` | **Required**. product or service the company offers |


#### Save Names

```http
  POST /names/save
```
| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `name 1`   | `string` | **Required**. first name to save  |
| `name 2`   | `string` | **Required**. second name to save |
| `name 3`   | `string` | **Required**. third name to save  |
| `name 4`   | `string` | **Required**. fourth name to save |
| `name 5`   | `string` | **Required**. fifth name to save  |

#### Get Name By Id

```http
  GET /names/get/:id
```
| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `id`      | `string` | **Required**. id of the name to fetch |


#### Delete Name By Id

```http
  DELETE /names/delete/:id
```
| Parameter | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `id`      | `string` | **Required**. id of the name to delete |


#### Generate Slogans

```http
  POST /slogans/generate
```

| Parameter | Type     | Description                                         |
| :-------- | :------- | :-------------------------------------------------- |
| `field`   | `string` | **Required**. field in which the company operates   |
| `products`| `string` | **Required**. product or service the company offers |
| `length`  | `string` | **Required**. length of slogan in number of words   |
| `target`  | `string` | **Required**. target audience for the slogan        |

#### Save Slogans

```http
  POST /slogans/save
```
| Parameter    | Type     | Description                         |
| :----------- | :------- | :---------------------------------- |
| `slogan 1`   | `string` | **Required**. first slogan to save  |
| `slogan 2`   | `string` | **Required**. second slogan to save |
| `slogan 3`   | `string` | **Required**. third slogan to save  |
| `slogan 4`   | `string` | **Required**. fourth slogan to save |
| `slogan 5`   | `string` | **Required**. fifth slogan to save  |

#### Get Slogan By Id

```http
  GET /slogans/get/:id
```
| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `id`      | `string` | **Required**. id of the slogan to fetch |

#### Delete Slogan By Id

```http
  DELETE /slogans/delete/:id
```
| Parameter | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `id`      | `string` | **Required**. id of the slogan to delete |


#### Generate Adds

```http
  POST /adds/generate
```

| Parameter     | Type     | Description                                              |
| :------------ | :------- | :------------------------------------------------------- |
| `product`     | `string` | **Required**. product or service to promote with the add |
| `description` | `string` | **Required**. descritpion of the product to promote      |
| `type`        | `string` | **Required**. type of add (video, post, poster)          |    
| `length`      | `string` | **Required**. length of add in number of words           |
| `target`      | `string` | **Required**. target audience for the add                |

#### Save Adds

```http
  POST /adds/save
```
| Parameter | Type     | Description                      |
| :-------- | :------- | :------------------------------- |
| `add 1`   | `string` | **Required**. first add to save  |
| `add 2`   | `string` | **Required**. second add to save |
| `add 3`   | `string` | **Required**. third add to save  |
| `add 4`   | `string` | **Required**. fourth add to save |
| `add 5`   | `string` | **Required**. fifth add to save  |

#### Get Add By Id

```http
  GET /adds/get/:id
```
| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `id`      | `string` | **Required**. id of the add to fetch  |

#### Delete Add By Id

```http
  DELETE /adds/delete/:id
```
| Parameter | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `id`      | `string` | **Required**. id of the add to delete  |
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

| Variable      | Description                   |
| :------------ |:----------------------------- |
| `DB_DATABASE` | PostgreSQL database name      |
| `DB_USERNAME` | PostgreSQL database username  |
| `DB_PASSWORD` | PostgreSQL database password  |
| `MONGO_URL `  | MongoDB connection string     |
| `AI_API_KEY ` | Open AI API key               |



## Database

1. **PostgreSQL**
The user management service requires a PostgreSQL to store data. It requires a database with a table that has the following columns:

| Name         | Type          |
| :--------    | :------------ |
| `id `        |  INT          |
| `username `  |  VARCHAR(45)  |
| `email `     |  VARCHAR(45)  |
| `password `  |  VARCHAR(255) |

In the db/pg folder, run

```bash
  knex migrate:latest --migrations-directory migrations
```

This will create the table automaticaly

2. **MongoDB**
The idea generation service requires a MongoDB database to store data.
## Running the app  

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```
