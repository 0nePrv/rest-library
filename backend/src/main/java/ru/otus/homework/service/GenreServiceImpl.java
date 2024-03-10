package ru.otus.homework.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.otus.homework.domain.Genre;
import ru.otus.homework.dto.GenreDto;
import ru.otus.homework.exception.notExist.GenreNotExistException;
import ru.otus.homework.repository.GenreRepository;

@Service
public class GenreServiceImpl implements GenreService {

  private final GenreRepository genreRepository;

  private final ConversionService conversionService;

  @Autowired
  public GenreServiceImpl(GenreRepository genreRepository, ConversionService conversionService) {
    this.genreRepository = genreRepository;
    this.conversionService = conversionService;
  }

  @Override
  @Transactional
  public GenreDto add(String name) {
    Genre genre = new Genre().setName(name);
    Genre savedGenre = genreRepository.save(genre);
    return conversionService.convert(savedGenre, GenreDto.class);
  }

  @Override
  @Transactional(readOnly = true)
  public List<GenreDto> getAll() {
    return genreRepository.findAll().stream().map(g -> conversionService.convert(g, GenreDto.class))
        .toList();
  }

  @Override
  @Transactional(readOnly = true)
  public GenreDto get(long id) {
    Genre genre = genreRepository.findById(id).orElseThrow(
        () -> new GenreNotExistException("Genre with id " + id + " does not exist"));
    return conversionService.convert(genre, GenreDto.class);
  }

  @Override
  @Transactional
  public GenreDto update(long id, String name) {
    Genre genre = new Genre().setId(id).setName(name);
    Genre updatedGenre = genreRepository.save(genre);
    return conversionService.convert(updatedGenre, GenreDto.class);
  }

  @Override
  @Transactional
  public void remove(long id) {
    genreRepository.deleteById(id);
  }
}
