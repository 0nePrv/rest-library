package ru.otus.homework.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.otus.homework.dto.BookDto;
import ru.otus.homework.service.BookService;


@RestController
public class BookController {

  private final BookService bookService;

  @Autowired
  public BookController(BookService bookService) {
    this.bookService = bookService;
  }

  @PostMapping("api/book")
  public BookDto add(@RequestBody BookDto book) {
    return bookService.add(book.getName(), book.getAuthorId(), book.getGenreId());
  }

  @GetMapping("api/book")
  public List<? extends BookDto> getAll(
      @RequestParam(value = "withRelations", required = false, defaultValue = "true") boolean withRelations) {
    if (withRelations) {
      return bookService.getAllWithGenreAndAuthorNames();
    }
    return bookService.getAll();
  }

  @GetMapping("/api/book/{id}")
  public BookDto get(@PathVariable long id) {
    return bookService.get(id);
  }

  @PutMapping("api/book/{id}")
  public BookDto update(@RequestBody BookDto book) {
    return bookService.update(book.getId(), book.getName(), book.getAuthorId(), book.getGenreId());
  }

  @DeleteMapping("api/book/{id}")
  public void remove(@PathVariable("id") long id) {
    bookService.remove(id);
  }
}
