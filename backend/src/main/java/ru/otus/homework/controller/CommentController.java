package ru.otus.homework.controller;

import jakarta.validation.Valid;
import java.util.List;
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
import ru.otus.homework.controller.requestEntity.CommentRequestEntity;
import ru.otus.homework.dto.CommentDto;
import ru.otus.homework.service.CommentService;


@RestController
public class CommentController {

  private final CommentService commentService;

  @Autowired
  public CommentController(CommentService commentService) {
    this.commentService = commentService;
  }

  @PostMapping("api/comment")
  public ResponseEntity<?> add(@Valid @RequestBody CommentRequestEntity comment, Errors errors) {
    if (errors.hasErrors()) {
      return new ResponseEntity<>(errors.getAllErrors().stream()
          .map(ObjectError::getDefaultMessage), HttpStatus.BAD_REQUEST);
    }
    CommentDto commentDto = commentService.add(comment.getBookId(), comment.getText());
    return new ResponseEntity<>(commentDto, HttpStatus.CREATED);
  }

  @GetMapping("api/comment")
  public List<CommentDto> getByBookId(@RequestParam("bookId") long bookId) {
    return commentService.getByBookId(bookId);
  }

  @GetMapping("api/comment/{id}")
  public CommentDto get(@PathVariable("id") long id) {
    return commentService.get(id);
  }

  @PutMapping("api/comment/{id}")
  public ResponseEntity<?> update(@PathVariable("id") long id,
      @Valid @RequestBody CommentRequestEntity comment, Errors errors) {
    if (errors.hasErrors()) {
      return new ResponseEntity<>(errors.getAllErrors().stream()
          .map(ObjectError::getDefaultMessage), HttpStatus.BAD_REQUEST);
    }
    CommentDto commentDto = commentService.update(id, comment.getBookId(), comment.getText());
    return new ResponseEntity<>(commentDto, HttpStatus.OK);
  }

  @DeleteMapping("api/comment/{id}")
  public ResponseEntity<?> remove(@PathVariable("id") long id) {
    commentService.remove(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
