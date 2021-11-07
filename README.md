# kids_away_api
## Project setup
The following steps are neccesary to run the app.

1. Fork and clone your copy of the repo to your dev machine
2. Create the DB roles and the DB
- CREATE ROLE development WITH LOGIN password 'development';
- CREATE DATABASE kids_away OWNER development;
3. Create the .env file and update it with your local information
- username: development
- password: development
- database: kids_away
4. Install dependencies: npm i
5. Load the schema and seeds files with npm run db:reset OR run \i db/schema/create.sql and \i db/seeds/seeds.sql inside PG-database 
6. Add your API keys to .env file to use Twilio API
7. Run the server: npm start

## Dependencies
    "chalk": "^4.1.2",
    "date-fns": "^2.25.0",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "pg": "^8.7.1",
    "pg-native": "^3.0.0",
    "twilio": "^3.70.0"