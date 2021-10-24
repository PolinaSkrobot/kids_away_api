DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS languages CASCADE;
DROP TABLE IF EXISTS age_groups CASCADE;
DROP TABLE IF EXISTS users_languages CASCADE;
DROP TABLE IF EXISTS users_age_groups CASCADE;
DROP TABLE IF EXISTS users_activities CASCADE;
DROP TABLE IF EXISTS activities CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS reviews_for_parent CASCADE;
DROP TABLE IF EXISTS reviews_for_sitter CASCADE;
DROP TABLE IF EXISTS prices CASCADE;

CREATE TABLE users (
	id SERIAL UNIQUE PRIMARY KEY NOT NULL,
	first_name VARCHAR (50) NOT NULL,
	last_name VARCHAR (50) NOT NULL,
	phone VARCHAR (10) NOT NULL,
	email VARCHAR (255) NOT NULL,
	password VARCHAR (255) NOT NULL,
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
	name VARCHAR (255) NOT NULL
);

CREATE TABLE age_groups (
	id SERIAL UNIQUE PRIMARY KEY NOT NULL,
	age_group TEXT NOT NULL
);

CREATE TABLE activities (
	id SERIAL UNIQUE PRIMARY KEY NOT NULL,
	name VARCHAR (255) NOT NULL
);

CREATE TABLE orders (
	id SERIAL UNIQUE PRIMARY KEY NOT NULL,
	parent_id int REFERENCES users(id) ON DELETE CASCADE,
  sitter_id int REFERENCES users(id) ON DELETE CASCADE,
	status TEXT NOT NULL,
	date DATE NOT NULL,
	start_time TIME NOT NULL,
	end_time TIME NOT NULL,
	num_of_kids INT NOT NULL,
  address TEXT NOT NULL,
  contact_phone VARCHAR (10) NOT NULL,
  comment TEXT
	
);

CREATE TABLE reviews_for_parent (
	id SERIAL UNIQUE PRIMARY KEY NOT NULL,
	sitter_id int REFERENCES users(id) ON DELETE CASCADE,
	parent_id int REFERENCES users(id) ON DELETE CASCADE,
	order_id int REFERENCES orders(id) ON DELETE CASCADE,
  comment TEXT NOT NULL, 
  payment int NOT NULL,
  on_time int NOT NULL,
  communication int NOT NULL,
  average numeric NOT NULL
);

CREATE TABLE reviews_for_sitter (
	id SERIAL UNIQUE PRIMARY KEY NOT NULL,
	sitter_id int REFERENCES users(id) ON DELETE CASCADE,
	parent_id int REFERENCES users(id) ON DELETE CASCADE,
	order_id int REFERENCES orders(id) ON DELETE CASCADE,
  comment TEXT NOT NULL, 
  on_time int NOT NULL,
  communication int NOT NULL,
  fair_price int NOT NULL,
  good_with_children int NOT NULL,
  average numeric NOT NULL
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

CREATE TABLE users_languages (
	PRIMARY KEY(user_id, language_id),
	user_id INT REFERENCES users(id) ON DELETE CASCADE,
  language_id INT REFERENCES languages(id) ON DELETE CASCADE
);
CREATE TABLE users_age_groups (
	PRIMARY KEY(user_id, age_group_id),
	user_id INT REFERENCES users(id) ON DELETE CASCADE,
  age_group_id INT REFERENCES age_groups(id) ON DELETE CASCADE
);
CREATE TABLE users_activities (
	PRIMARY KEY(user_id, activity_id),
	user_id INT REFERENCES users(id) ON DELETE CASCADE,
  activity_id INT REFERENCES activities(id) ON DELETE CASCADE
);