DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS book;
DROP TABLE IF EXISTS author;
DROP TABLE IF EXISTS genre;

CREATE TABLE author
(
id   BIGSERIAL PRIMARY KEY,
name VARCHAR(50) NOT NULL
);

CREATE TABLE genre
(
    id   BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE book
(
    id        BIGSERIAL PRIMARY KEY,
    name      VARCHAR(50) NOT NULL,
    author_id BIGINT,
    genre_id  BIGINT,
    FOREIGN KEY (author_id) REFERENCES author (id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genre (id)
        ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE comment
(
    id      BIGSERIAL PRIMARY KEY,
    text    TEXT NOT NULL,
    book_id BIGINT,
    FOREIGN KEY (book_id) REFERENCES book (id)
        ON UPDATE CASCADE ON DELETE CASCADE
)