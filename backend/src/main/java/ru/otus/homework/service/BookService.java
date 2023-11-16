package ru.otus.homework.service;

import java.util.List;
import org.springframework.transaction.annotation.Transactional;
import ru.otus.homework.dto.BookDto;
import ru.otus.homework.dto.BookWithGenreAndAuthorNamesDto;


public interface BookService {

  BookWithGenreAndAuthorNamesDto add(String name, long authorId, long genreId);

  List<BookWithGenreAndAuthorNamesDto> getAllWithGenreAndAuthorNames();

  BookWithGenreAndAuthorNamesDto get(long id);

  @Transactional(readOnly = true)
  List<BookDto> getAll();

  BookWithGenreAndAuthorNamesDto update(long id, String name, long authorId, long genreId);

  void remove(long id);
}
