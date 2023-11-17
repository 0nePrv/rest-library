package ru.otus.homework.controller;

import jakarta.validation.Valid;
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
  public CommentDto add(@RequestBody CommentDto comment) {
    return commentService.add(comment.getBookId(), comment.getText());
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
  public CommentDto update(@Valid @RequestBody CommentDto comment) {
    return commentService.update(comment.getId(), comment.getBookId(), comment.getText());
  }

  @DeleteMapping("api/comment/{id}")
  public void remove(@PathVariable("id") long id) {
    commentService.remove(id);
  }
}
