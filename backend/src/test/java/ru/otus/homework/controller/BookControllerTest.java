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
import ru.otus.homework.controller.requestBody.BookRequestBody;
import ru.otus.homework.dto.BookDto;
import ru.otus.homework.dto.BookWithGenreAndAuthorNamesDto;
import ru.otus.homework.service.BookService;

@DisplayName("Book rest controller")
@WebMvcTest(BookController.class)
class BookControllerTest {

  private static final String BASE_URI_TEMPLATE = "/api/book";

  private static final BookDto EXISTING_BOOK = new BookDto(1L, "Evgeniy Onegin",
      1L, 1L);

  private static final BookWithGenreAndAuthorNamesDto EXISTING_BOOK_WITH_NAMES =
      new BookWithGenreAndAuthorNamesDto(1L, "Evgeniy Onegin", 1L,
          "Evgeniy Onegin", 1L, "Novel");

  private static final String NEW_BOOK_NAME = "A hero of our time";

  private static final long NEW_AUTHOR_ID = 2L;

  private static final long NEW_GENRE_ID = 2L;

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private BookService bookService;

  @Autowired
  private ObjectMapper mapper;

  @Test
  @DisplayName("should correctly process POST-request for book creation")
  void shouldCorrectlyCreateNewBook() throws Exception {
    BookRequestBody bookRequestBody = new BookRequestBody();
    bookRequestBody.setName(NEW_BOOK_NAME);
    bookRequestBody.setAuthorId(EXISTING_BOOK.getAuthorId());
    bookRequestBody.setGenreId(EXISTING_BOOK_WITH_NAMES.getGenreId());
    String requestEntity = mapper.writeValueAsString(bookRequestBody);

    BookDto bookDto = new BookDto(2L, NEW_BOOK_NAME,
        EXISTING_BOOK.getAuthorId(), EXISTING_BOOK.getGenreId());
    when(bookService.add(NEW_BOOK_NAME, EXISTING_BOOK.getAuthorId(), EXISTING_BOOK.getGenreId()))
        .thenReturn(bookDto);
    String expectedResponse = mapper.writeValueAsString(bookDto);

    mockMvc.perform(post(BASE_URI_TEMPLATE)
            .contentType(MediaType.APPLICATION_JSON)
            .content(requestEntity))
        .andExpect(status().isCreated())
        .andExpect(content().json(expectedResponse));

    verify(bookService, times(1))
        .add(NEW_BOOK_NAME, EXISTING_BOOK.getAuthorId(), EXISTING_BOOK.getGenreId());
  }

  @Test
  @DisplayName("should validate POST-request for book creation and return error message")
  void shouldReturnAnErrorMessageForInvalidBookCreation() throws Exception {
    BookRequestBody bookRequestBody = new BookRequestBody();
    bookRequestBody.setName("");
    bookRequestBody.setAuthorId(0L);
    bookRequestBody.setGenreId(0L);
    String requestEntity = mapper.writeValueAsString(bookRequestBody);

    mockMvc.perform(post(BASE_URI_TEMPLATE)
            .contentType(MediaType.APPLICATION_JSON)
            .content(requestEntity))
        .andExpect(status().is4xxClientError())
        .andExpect(content().contentType(MediaType.APPLICATION_PROBLEM_JSON));

    verify(bookService, times(0)).add(anyString(), anyLong(), anyLong());
  }

  @Test
  @DisplayName("should correctly process GET-request for providing all books with author and genre names")
  void shouldCorrectlyProvideAllBooksWithNames() throws Exception {
    List<BookWithGenreAndAuthorNamesDto> books = Collections.singletonList(
        EXISTING_BOOK_WITH_NAMES);
    String expectedResponse = mapper.writeValueAsString(books);
    when(bookService.getAllWithGenreAndAuthorNames()).thenReturn(books);

    mockMvc.perform(get(BASE_URI_TEMPLATE)
            .param("withRelations", "true"))
        .andExpect(status().isOk())
        .andExpect(content().json(expectedResponse));

    verify(bookService, times(1)).getAllWithGenreAndAuthorNames();
  }

  @Test
  @DisplayName("should correctly process GET-request for providing all books without relations")
  void shouldCorrectlyProvideAllBooksWithoutRelations() throws Exception {
    List<BookDto> books = Collections.singletonList(EXISTING_BOOK);
    String expectedResponse = mapper.writeValueAsString(books);
    when(bookService.getAll()).thenReturn(books);

    mockMvc.perform(get(BASE_URI_TEMPLATE)
            .param("withRelations", "false"))
        .andExpect(status().isOk())
        .andExpect(content().json(expectedResponse));

    verify(bookService, times(1)).getAll();
  }

  @Test
  @DisplayName("should correctly process GET-request for providing book by id")
  void shouldCorrectlyReturnBookById() throws Exception {
    when(bookService.get(EXISTING_BOOK.getId())).thenReturn(EXISTING_BOOK);
    String expectedResponse = mapper.writeValueAsString(EXISTING_BOOK);

    mockMvc.perform(get(BASE_URI_TEMPLATE + "/" + EXISTING_BOOK.getId()))
        .andExpect(status().isOk())
        .andExpect(content().json(expectedResponse));

    verify(bookService, times(1)).get(EXISTING_BOOK.getId());
  }

  @Test
  @DisplayName("should correctly process PUT-request for updating book")
  void shouldCorrectlyProvideUpdatingBook() throws Exception {
    BookRequestBody bookRequestBody = new BookRequestBody();
    bookRequestBody.setName(NEW_BOOK_NAME);
    bookRequestBody.setAuthorId(NEW_AUTHOR_ID);
    bookRequestBody.setGenreId(NEW_GENRE_ID);
    String requestEntity = mapper.writeValueAsString(bookRequestBody);

    BookDto bookResponseEntity = new BookDto(EXISTING_BOOK.getId(), NEW_BOOK_NAME,
        NEW_AUTHOR_ID, NEW_GENRE_ID);
    when(bookService.update(EXISTING_BOOK.getId(), NEW_BOOK_NAME, NEW_AUTHOR_ID, NEW_GENRE_ID))
        .thenReturn(bookResponseEntity);
    String expectedResponse = mapper.writeValueAsString(bookRequestBody);

    mockMvc.perform(put(BASE_URI_TEMPLATE + "/" + EXISTING_BOOK.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .content(requestEntity))
        .andExpect(status().isOk())
        .andExpect(content().json(expectedResponse));

    verify(bookService, times(1))
        .update(EXISTING_BOOK.getId(), NEW_BOOK_NAME, NEW_AUTHOR_ID, NEW_GENRE_ID);
  }

  @Test
  @DisplayName("should validate PUT-request for book update and return error message")
  void shouldReturnAnErrorMessageForInvalidBookUpdate() throws Exception {
    BookRequestBody bookRequestBody = new BookRequestBody();
    bookRequestBody.setName("");
    bookRequestBody.setAuthorId(0L);
    bookRequestBody.setGenreId(0L);
    String requestEntity = mapper.writeValueAsString(bookRequestBody);

    mockMvc.perform(put(BASE_URI_TEMPLATE + "/" + EXISTING_BOOK.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .content(requestEntity))
        .andExpect(status().is4xxClientError())
        .andExpect(content().contentType(MediaType.APPLICATION_PROBLEM_JSON));

    verify(bookService, times(0))
        .update(anyLong(), anyString(), anyLong(), anyLong());
  }

  @Test
  @DisplayName("should correctly process DELETE-request for removing book")
  void shouldCorrectlyProvideDeletingBook() throws Exception {
    mockMvc.perform(delete(BASE_URI_TEMPLATE + "/" + EXISTING_BOOK.getId()))
        .andExpect(status().isNoContent());

    verify(bookService, times(1)).remove(EXISTING_BOOK.getId());
  }
}
