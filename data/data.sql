ALTER TABLE IF EXISTS ONLY public.users
  DROP CONSTRAINT IF EXISTS pk_users_id CASCADE ;

ALTER TABLE IF EXISTS ONLY public.planet_votes
  DROP CONSTRAINT IF EXISTS pk_planet_votes_id CASCADE ;

ALTER TABLE IF EXISTS ONLY public.planet_votes
  DROP CONSTRAINT IF EXISTS fk_users_id CASCADE ;


DROP TABLE IF EXISTS public.users;
DROP SEQUENCE IF EXISTS public.users_id_seq;
CREATE TABLE users
(
  id       serial NOT NULL,
  username varchar UNIQUE,
  password varchar
);

DROP TABLE IF EXISTS public.planet_votes;
DROP SEQUENCE IF EXISTS public.planet_votes;
CREATE TABLE planet_votes
(
  id              serial NOT NULL,
  planet_id       INTEGER,
  planet_name     varchar,
  user_id         INTEGER,
  submission_time INTEGER
);


ALTER TABLE ONLY users
  ADD CONSTRAINT pk_users_id PRIMARY KEY (id);

ALTER TABLE ONLY planet_votes
  ADD CONSTRAINT pk_planet_vote_id PRIMARY KEY (id);

ALTER TABLE ONLY planet_votes
  ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id);
