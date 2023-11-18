package ru.otus.homework.dto;

import lombok.Data;

@Data
public class CommentDto {

  private final long id;

  private final String text;

  private final long bookId;
}