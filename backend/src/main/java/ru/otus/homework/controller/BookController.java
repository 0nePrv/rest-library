package ru.otus.homework.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.otus.homework.controller.requestEntity.BookRequestEntity;
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
  public ResponseEntity<?> add(@Valid @RequestBody BookRequestEntity book, Errors errors) {
    if (errors.hasErrors()) {
      return new ResponseEntity<>(errors.getAllErrors().stream()
          .map(ObjectError::getDefaultMessage), HttpStatus.BAD_REQUEST);
    }
    BookDto bookDto = bookService.add(book.getName(), book.getAuthorId(), book.getGenreId());
    return new ResponseEntity<>(bookDto, HttpStatus.CREATED);
  }

  @GetMapping("api/book")
  public ResponseEntity<?> getAll(@RequestParam(value = "withRelations",
      required = false, defaultValue = "true") boolean withRelations) {
    return ResponseEntity.ok().body(
        withRelations ? bookService.getAllWithGenreAndAuthorNames() : bookService.getAll()
    );
  }

  @GetMapping("/api/book/{id}")
  public BookDto get(@PathVariable long id) {
    return bookService.get(id);
  }

  @PutMapping("api/book/{id}")
  public ResponseEntity<?> update(@PathVariable("id") long id,
      @Valid @RequestBody BookRequestEntity book, Errors errors) {
    if (errors.hasErrors()) {
      return new ResponseEntity<>(errors.getAllErrors().stream()
          .map(ObjectError::getDefaultMessage), HttpStatus.BAD_REQUEST);
    }
    BookDto bookDto = bookService.update(id, book.getName(), book.getAuthorId(),
        book.getGenreId());
    return new ResponseEntity<>(bookDto, HttpStatus.OK);
  }

  @DeleteMapping("api/book/{id}")
  public ResponseEntity<?> remove(@PathVariable("id") long id) {
    bookService.remove(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
