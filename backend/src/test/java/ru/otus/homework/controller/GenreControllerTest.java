package ru.otus.homework.controller;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Collections;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import ru.otus.homework.controller.requestEntity.GenreRequestEntity;
import ru.otus.homework.dto.GenreDto;
import ru.otus.homework.service.GenreService;

@DisplayName("Genre rest controller")
@WebMvcTest(GenreController.class)
class GenreControllerTest {

  private static final String BASE_URI_TEMPLATE = "/api/genre";

  private static final GenreDto EXISTING_GENRE = new GenreDto(1L, "Drama");

  private static final String NEW_GENRE_NAME = "Novel";

  private static final String[] VALIDATION_ERRORS = new String[]{
      "Genre name must be not blank",
      "Genre name must be between 2 and 30 characters"
  };

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper mapper;

  @MockBean
  private GenreService genreService;

  @Test
  @DisplayName("should correctly process POST-request for genre creation")
  void shouldCorrectlyCreateNewGenre() throws Exception {
    GenreDto genreDto = new GenreDto(1, NEW_GENRE_NAME);
    GenreRequestEntity genreRequestEntity = new GenreRequestEntity();
    genreRequestEntity.setName(NEW_GENRE_NAME);

    when(genreService.add(genreDto.getName())).thenReturn(genreDto);
    String requestEntity = mapper.writeValueAsString(genreRequestEntity);
    String expectedResult = mapper.writeValueAsString(genreDto);

    mockMvc.perform(post(BASE_URI_TEMPLATE)
            .contentType(MediaType.APPLICATION_JSON)
            .content(requestEntity))
        .andExpect(status().isCreated())
        .andExpect(content().json(expectedResult));

    verify(genreService, times(1)).add(NEW_GENRE_NAME);
  }

  @Test
  @DisplayName("should validate POST-request for genre creation and return error message")
  void shouldReturnAnErrorMessageForInvalidGenreCreation() throws Exception {
    GenreRequestEntity genreRequestEntity = new GenreRequestEntity();
    genreRequestEntity.setName("");
    String requestEntity = mapper.writeValueAsString(genreRequestEntity);
    String expectedResponse = mapper.writeValueAsString(VALIDATION_ERRORS);

    mockMvc.perform(post(BASE_URI_TEMPLATE)
            .contentType(MediaType.APPLICATION_JSON)
            .content(requestEntity))
        .andExpect(status().is4xxClientError())
        .andExpect(content().json(expectedResponse));

    verify(genreService, times(0)).add(anyString());
  }

  @Test
  @DisplayName("should correctly process GET-request for providing all genres")
  void shouldCorrectlyReturnAllGenres() throws Exception {
    List<GenreDto> genres = Collections.singletonList(EXISTING_GENRE);
    when(genreService.getAll()).thenReturn(genres);
    String expectedResponse = mapper.writeValueAsString(genres);

    mockMvc.perform(get(BASE_URI_TEMPLATE))
        .andExpect(status().isOk())
        .andExpect(content().json(expectedResponse));

    verify(genreService, times(1)).getAll();
  }

  @Test
  @DisplayName("should correctly process GET-request for providing genre by id")
  void shouldCorrectlyReturnGenreById() throws Exception {
    when(genreService.get(EXISTING_GENRE.getId())).thenReturn(EXISTING_GENRE);
    String expectedResponse = mapper.writeValueAsString(EXISTING_GENRE);

    mockMvc.perform(get(BASE_URI_TEMPLATE + "/" + EXISTING_GENRE.getId()))
        .andExpect(status().isOk())
        .andExpect(content().json(expectedResponse));

    verify(genreService, times(1)).get(EXISTING_GENRE.getId());
  }

  @Test
  @DisplayName("should correctly process PUT-request for updating genre")
  void shouldCorrectlyProvideUpdatingGenre() throws Exception {
    GenreRequestEntity genreRequestEntity = new GenreRequestEntity();
    genreRequestEntity.setName(NEW_GENRE_NAME);
    String requestEntity = mapper.writeValueAsString(genreRequestEntity);

    GenreDto genreDto = new GenreDto(EXISTING_GENRE.getId(), NEW_GENRE_NAME);
    when(genreService.update(EXISTING_GENRE.getId(), NEW_GENRE_NAME))
        .thenReturn(genreDto);
    String expectedResponse = mapper.writeValueAsString(genreDto);

    mockMvc.perform(put(BASE_URI_TEMPLATE + "/" + EXISTING_GENRE.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .content(requestEntity))
        .andExpect(status().isOk())
        .andExpect(content().json(expectedResponse));

    verify(genreService, times(1))
        .update(EXISTING_GENRE.getId(), NEW_GENRE_NAME);
  }

  @Test
  @DisplayName("should validate PUT-request for genre update and return error message")
  void shouldReturnAnErrorMessageForInvalidGenreUpdate() throws Exception {
    GenreRequestEntity genreRequestEntity = new GenreRequestEntity();
    genreRequestEntity.setName("");
    String requestEntity = mapper.writeValueAsString(genreRequestEntity);
    String expectedResponse = mapper.writeValueAsString(VALIDATION_ERRORS);

    mockMvc.perform(put(BASE_URI_TEMPLATE + "/" + EXISTING_GENRE.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .content(requestEntity))
        .andExpect(status().is4xxClientError())
        .andExpect(content().json(expectedResponse));

    verify(genreService, times(0)).update(anyLong(), anyString());
  }

  @Test
  @DisplayName("should correctly process DELETE-request for removing genre")
  void shouldCorrectlyProvideDeletingGenre() throws Exception {
    mockMvc.perform(delete(BASE_URI_TEMPLATE + "/" + EXISTING_GENRE.getId()))
        .andExpect(status().isNoContent());

    verify(genreService, times(1)).remove(EXISTING_GENRE.getId());
  }
}
