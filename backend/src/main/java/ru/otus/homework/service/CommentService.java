package ru.otus.homework.service;

import java.util.List;
import ru.otus.homework.dto.CommentDto;
import ru.otus.homework.dto.CommentWithBookNameDto;

public interface CommentService {

  CommentWithBookNameDto add(long bookId, String text);

  CommentWithBookNameDto update(long id, long bookId, String text);

  CommentWithBookNameDto get(long id);

  List<CommentDto> getByBookId(long bookId);

  void remove(long id);
}
