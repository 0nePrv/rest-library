package ru.otus.homework.controller;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.otus.homework.dto.AuthorDto;
import ru.otus.homework.service.AuthorService;


@RestController
public class AuthorController {

  private final AuthorService authorService;

  @Autowired
  public AuthorController(AuthorService authorService) {
    this.authorService = authorService;
  }

  @PostMapping("api/author")
  public AuthorDto add(@RequestBody AuthorDto author) {
    return authorService.add(author.getName());
  }

  @GetMapping("api/author")
  public List<AuthorDto> getAll() {
    return authorService.getAll();
  }

  @GetMapping("api/author/{id}")
  public AuthorDto get(@PathVariable long id) {
    return authorService.get(id);
  }

  @PutMapping("api/author/{id}")
  public AuthorDto update(@RequestBody AuthorDto author) {
    return authorService.update(author.getId(), author.getName());
  }

  @DeleteMapping("api/author/{id}")
  public ResponseEntity<AuthorDto> remove(@PathVariable("id") long id) {
    authorService.remove(id);
    return new ResponseEntity<>(HttpStatus.OK);
  }
}
