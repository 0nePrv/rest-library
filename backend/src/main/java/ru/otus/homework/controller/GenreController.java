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
import org.springframework.web.bind.annotation.RestController;
import ru.otus.homework.controller.requestEntity.GenreRequestEntity;
import ru.otus.homework.dto.GenreDto;
import ru.otus.homework.service.GenreService;


@RestController
public class GenreController {

  private final GenreService genreService;

  @Autowired
  public GenreController(GenreService genreService) {
    this.genreService = genreService;
  }

  @PostMapping("api/genre")
  public ResponseEntity<?> add(@Valid @RequestBody GenreRequestEntity genre, Errors errors) {
    if (errors.hasErrors()) {
      return new ResponseEntity<>(errors.getAllErrors().stream()
          .map(ObjectError::getDefaultMessage), HttpStatus.BAD_REQUEST);
    }
    GenreDto genreDto = genreService.add(genre.getName());
    return new ResponseEntity<>(genreDto, HttpStatus.CREATED);
  }

  @GetMapping("api/genre")
  public List<GenreDto> getAll() {
    return genreService.getAll();
  }

  @GetMapping("api/genre/{id}")
  public GenreDto get(@PathVariable("id") long id) {
    return genreService.get(id);
  }

  @PutMapping("api/genre/{id}")
  public ResponseEntity<?> update(@PathVariable("id") long id,
      @Valid @RequestBody GenreRequestEntity genre, Errors errors) {
    if (errors.hasErrors()) {
      return new ResponseEntity<>(errors.getAllErrors().stream()
          .map(ObjectError::getDefaultMessage), HttpStatus.BAD_REQUEST);
    }
    GenreDto genreDto = genreService.update(id, genre.getName());
    return new ResponseEntity<>(genreDto, HttpStatus.OK);
  }

  @DeleteMapping("api/genre/{id}")
  public ResponseEntity<?> remove(@PathVariable("id") long id) {
    genreService.remove(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
