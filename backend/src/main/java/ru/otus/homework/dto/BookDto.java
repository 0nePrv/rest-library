package ru.otus.homework.dto;

import lombok.Data;

@Data
public class BookDto {

  private final long id;

  private final String name;

  private final long authorId;

  private final long genreId;
}