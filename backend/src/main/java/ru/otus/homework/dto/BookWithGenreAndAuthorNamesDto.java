package ru.otus.homework.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class BookWithGenreAndAuthorNamesDto extends BookDto {

  private final String authorName;

  private final String genreName;

  public BookWithGenreAndAuthorNamesDto(Long id, String name, Long authorId, Long genreId,
      String authorName, String genreName) {
    super(id, name, authorId, genreId);
    this.authorName = authorName;
    this.genreName = genreName;
  }
}