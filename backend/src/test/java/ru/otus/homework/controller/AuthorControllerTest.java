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
import ru.otus.homework.controller.requestEntity.AuthorRequestEntity;
import ru.otus.homework.dto.AuthorDto;
import ru.otus.homework.service.AuthorService;

@DisplayName("Author rest controller")
@WebMvcTest(AuthorController.class)
class AuthorControllerTest {

  private static final String BASE_URI_TEMPLATE = "/api/author";

  private static final AuthorDto EXISTING_AUTHOR = new AuthorDto(1L, "Pushkin");

  private static final String NEW_AUTHOR_NAME = "Lermontov";

  private static final String[] VALIDATION_ERRORS = new String[]{
      "Author name must be not blank",
      "Author name must be between 2 and 30 characters"
  };

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper mapper;

  @MockBean
  private AuthorService authorService;

  @Test
  @DisplayName("should correctly process POST-request for author creation")
  void shouldCorrectlyCreateNewAuthor() throws Exception {
    AuthorRequestEntity authorRequestEntity = new AuthorRequestEntity();
    authorRequestEntity.setName(NEW_AUTHOR_NAME);
    String requestEntity = mapper.writeValueAsString(authorRequestEntity);

    AuthorDto authorDto = new AuthorDto(2L, NEW_AUTHOR_NAME);
    when(authorService.add(authorDto.getName())).thenReturn(authorDto);
    String expectedResult = mapper.writeValueAsString(authorDto);

    mockMvc.perform(post(BASE_URI_TEMPLATE)
            .contentType(MediaType.APPLICATION_JSON)
            .content(requestEntity))
        .andExpect(status().isCreated())
        .andExpect(content().json(expectedResult));

    verify(authorService, times(1)).add(NEW_AUTHOR_NAME);
  }

  @Test
  @DisplayName("should validate POST-request for author creation and return error message")
  void shouldReturnAnErrorMessageForInvalidAuthorCreation() throws Exception {
    AuthorRequestEntity authorRequestEntity = new AuthorRequestEntity();
    authorRequestEntity.setName("");
    String requestEntity = mapper.writeValueAsString(authorRequestEntity);

    String expectedResponse = mapper.writeValueAsString(VALIDATION_ERRORS);

    mockMvc.perform(post(BASE_URI_TEMPLATE)
            .contentType(MediaType.APPLICATION_JSON)
            .content(requestEntity))
        .andExpect(status().is4xxClientError())
        .andExpect(content().json(expectedResponse));

    verify(authorService, times(0)).add(anyString());
  }

  @Test
  @DisplayName("should correctly process GET-request for providing all authors")
  void shouldCorrectlyReturnAllAuthors() throws Exception {
    List<AuthorDto> authors = Collections.singletonList(EXISTING_AUTHOR);
    when(authorService.getAll()).thenReturn(authors);
    String expectedResponse = mapper.writeValueAsString(authors);

    mockMvc.perform(get(BASE_URI_TEMPLATE))
        .andExpect(status().isOk())
        .andExpect(content().json(expectedResponse));

    verify(authorService, times(1)).getAll();
  }

  @Test
  @DisplayName("should correctly process GET-request for providing author by id")
  void shouldCorrectlyReturnAuthorById() throws Exception {
    when(authorService.get(EXISTING_AUTHOR.getId())).thenReturn(EXISTING_AUTHOR);
    String expectedResponse = mapper.writeValueAsString(EXISTING_AUTHOR);

    mockMvc.perform(get(BASE_URI_TEMPLATE + "/" + EXISTING_AUTHOR.getId()))
        .andExpect(status().isOk())
        .andExpect(content().json(expectedResponse));

    verify(authorService, times(1)).get(EXISTING_AUTHOR.getId());
  }

  @Test
  @DisplayName("should correctly process PUT-request for updating author")
  void shouldCorrectlyProvideUpdatingAuthor() throws Exception {
    AuthorRequestEntity authorRequestEntity = new AuthorRequestEntity();
    authorRequestEntity.setName(NEW_AUTHOR_NAME);
    String requestEntity = mapper.writeValueAsString(authorRequestEntity);

    AuthorDto authorResponseEntity = new AuthorDto(EXISTING_AUTHOR.getId(), NEW_AUTHOR_NAME);
    when(authorService.update(EXISTING_AUTHOR.getId(), NEW_AUTHOR_NAME))
        .thenReturn(authorResponseEntity);
    String expectedResponse = mapper.writeValueAsString(authorResponseEntity);

    mockMvc.perform(put(BASE_URI_TEMPLATE + "/" + EXISTING_AUTHOR.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .content(requestEntity))
        .andExpect(status().isOk())
        .andExpect(content().json(expectedResponse));

    verify(authorService, times(1))
        .update(EXISTING_AUTHOR.getId(), NEW_AUTHOR_NAME);
  }

  @Test
  @DisplayName("should validate PUT-request for author update and return error message")
  void shouldReturnAnErrorMessageForInvalidAuthorUpdate() throws Exception {
    AuthorRequestEntity authorRequestEntity = new AuthorRequestEntity();
    authorRequestEntity.setName("");
    String requestEntity = mapper.writeValueAsString(authorRequestEntity);

    String expectedResponse = mapper.writeValueAsString(VALIDATION_ERRORS);

    mockMvc.perform(put(BASE_URI_TEMPLATE + "/" + EXISTING_AUTHOR.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .content(requestEntity))
        .andExpect(status().is4xxClientError())
        .andExpect(content().json(expectedResponse));

    verify(authorService, times(0)).update(anyLong(), anyString());
  }

  @Test
  @DisplayName("should correctly process DELETE-request for removing author")
  void shouldCorrectlyProvideDeletingAuthor() throws Exception {
    mockMvc.perform(delete(BASE_URI_TEMPLATE + "/" + EXISTING_AUTHOR.getId()))
        .andExpect(status().isNoContent());

    verify(authorService, times(1)).remove(EXISTING_AUTHOR.getId());
  }
}
