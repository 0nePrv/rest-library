package ru.otus.homework.service;

import java.util.List;
import ru.otus.homework.dto.CommentDto;
import ru.otus.homework.dto.CommentWithBookNameDto;

public interface CommentService {

  CommentDto add(long bookId, String text);

  CommentDto update(long id, long bookId, String text);

  CommentDto get(long id);

  List<CommentDto> getByBookId(long bookId);

  void remove(long id);
}
