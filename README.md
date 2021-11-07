# kids_away_api
# Project setup
The following steps are neccesary to run the app.

Fork and clone your copy of the repo to your dev machine
Create the DB roles and the DB
CREATE ROLE development WITH LOGIN password 'development';
CREATE DATABASE kids_away OWNER development;
Create the .env file and update it with your local information
username: development
password: development
database: kids_away
Install dependencies: npm i
Load the schema and seeds files with npm run db:reset
Add your API keys to .env file to use Twilio API
Run the server: npm start

# Dependencies
    "chalk": "^4.1.2",
    "date-fns": "^2.25.0",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "pg": "^8.7.1",
    "pg-native": "^3.0.0",
    "twilio": "^3.70.0"