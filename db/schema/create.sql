DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS languages CASCADE;
DROP TABLE IF EXISTS age_groups CASCADE;
DROP TABLE IF EXISTS users_languages CASCADE;
DROP TABLE IF EXISTS users_age_groups CASCADE;
DROP TABLE IF EXISTS users_activities CASCADE;
DROP TABLE IF EXISTS activities CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS availability CASCADE;
DROP TABLE IF EXISTS reviews_for_parent CASCADE;
DROP TABLE IF EXISTS reviews_for_sitter CASCADE;
DROP TABLE IF EXISTS prices CASCADE;
DROP TABLE IF EXISTS favourites CASCADE;

CREATE TABLE users (
	id SERIAL UNIQUE PRIMARY KEY NOT NULL,
	first_name VARCHAR (50) NOT NULL,
	last_name VARCHAR (50) NOT NULL,
	phone VARCHAR (20) NOT NULL,
	email VARCHAR (255) NOT NULL,
	password VARCHAR (255) NOT NULL,
	city VARCHAR (32),
	address VARCHAR (255),
	zip VARCHAR (7),
	babysitter BOOLEAN DEFAULT FALSE,
	bio TEXT,
	has_first_aid BOOLEAN DEFAULT FALSE,
  has_police_check BOOLEAN DEFAULT FALSE,
	photo VARCHAR (255)	

);

CREATE TABLE languages (
	id SERIAL UNIQUE PRIMARY KEY NOT NULL,
	language VARCHAR (255) NOT NULL
);

CREATE TABLE age_groups (
	id SERIAL UNIQUE PRIMARY KEY NOT NULL,
	age_group TEXT NOT NULL
);

CREATE TABLE activities (
	id SERIAL UNIQUE PRIMARY KEY NOT NULL,
	activity VARCHAR (255) NOT NULL
);

CREATE TABLE orders (
	id SERIAL UNIQUE,
	parent_id int REFERENCES users(id) ON DELETE CASCADE,
  sitter_id int REFERENCES users(id) ON DELETE CASCADE,
	status TEXT NOT NULL,
	date DATE NOT NULL,
	start_time TIME NOT NULL,
	end_time TIME NOT NULL,
	hours int,
	num_of_kids INT NOT NULL,
  address TEXT NOT NULL,
  contact_phone VARCHAR (20) NOT NULL,
  comment TEXT
	
);

CREATE TABLE reviews_for_parent (
	id SERIAL UNIQUE PRIMARY KEY NOT NULL,
	order_id int REFERENCES orders(id) ON DELETE CASCADE,
  comment TEXT NOT NULL, 
  rate int NOT NULL
);

CREATE TABLE reviews_for_sitter (
	id SERIAL UNIQUE PRIMARY KEY NOT NULL,
	order_id int REFERENCES orders(id) ON DELETE CASCADE,
  comment TEXT NOT NULL,
  rate int NOT NULL
);

CREATE TABLE prices (
	id SERIAL UNIQUE PRIMARY KEY NOT NULL,
	user_id int REFERENCES users(id) ON DELETE CASCADE,
	onekid_onehour int NOT NULL,
  onekid_twohours int NOT NULL,
  onekid_threehours int NOT NULL,
  twokids_onehour int NOT NULL,
  twokids_twohours int NOT NULL,
  twokids_threehours int NOT NULL,
  threekids_onehour int NOT NULL,
  threekids_twohours int NOT NULL,
  threekids_threehours int NOT NULL	
);
CREATE TABLE availability (
	id SERIAL UNIQUE PRIMARY KEY NOT NULL,
	sitter_id INT REFERENCES users(id) ON DELETE CASCADE,
	date DATE NOT NULL,
	start_time TIME NOT NULL,
	end_time TIME NOT NULL,
	booked BOOLEAN DEFAULT FALSE,
	order_id INT REFERENCES orders(id) ON DELETE CASCADE 

);

CREATE TABLE favourites (
	id serial PRIMARY KEY,
	parent_id INT REFERENCES users(id) ON DELETE CASCADE,
  sitter_id INT REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE users_languages (
	id serial PRIMARY KEY,
	user_id INT REFERENCES users(id) ON DELETE CASCADE,
  language_id INT REFERENCES languages(id) ON DELETE CASCADE
);
CREATE TABLE users_age_groups (
	id serial PRIMARY KEY,
	user_id INT REFERENCES users(id) ON DELETE CASCADE,
  age_group_id INT REFERENCES age_groups(id) ON DELETE CASCADE
);
CREATE TABLE users_activities (
	id serial PRIMARY KEY,
	user_id INT REFERENCES users(id) ON DELETE CASCADE,
  activity_id INT REFERENCES activities(id) ON DELETE CASCADE
);
