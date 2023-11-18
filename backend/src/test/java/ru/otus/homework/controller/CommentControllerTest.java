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
import ru.otus.homework.controller.requestEntity.CommentRequestEntity;
import ru.otus.homework.dto.CommentDto;
import ru.otus.homework.service.CommentService;

@DisplayName("Comment controller")
@WebMvcTest(CommentController.class)
class CommentControllerTest {

  private static final String BASE_URI_TEMPLATE = "/api/comment";

  private static final long EXISTING_BOOK_ID = 1L;

  private static final CommentDto EXISTING_COMMENT = new CommentDto(1L, "Some text",
      EXISTING_BOOK_ID);

  private static final long NEW_COMMENT_BOOK_ID = 2L;

  private static final String NEW_COMMENT_TEXT = "New comment text";

  private static final String[] VALIDATION_ERRORS = new String[]{
      "Comment text must not be blank",
      "Comment text size should be between 5 and 300 characters",
      "Book id must have positive numeric value"
  };

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper mapper;

  @MockBean
  private CommentService commentService;

  @Test
  @DisplayName("should correctly process POST-request for comment creation")
  void shouldCorrectlyCreateNewComment() throws Exception {
    CommentRequestEntity commentRequestEntity = new CommentRequestEntity();
    commentRequestEntity.setText(EXISTING_COMMENT.getText());
    commentRequestEntity.setBookId(EXISTING_COMMENT.getBookId());
    String requestEntity = mapper.writeValueAsString(commentRequestEntity);

    CommentDto commentDto = new CommentDto(EXISTING_COMMENT.getId(),
        EXISTING_COMMENT.getText(), EXISTING_COMMENT.getBookId());
    when(commentService.add(EXISTING_COMMENT.getBookId(), EXISTING_COMMENT.getText()))
        .thenReturn(commentDto);
    String expectResponse = mapper.writeValueAsString(commentDto);

    mockMvc.perform(post(BASE_URI_TEMPLATE)
            .contentType(MediaType.APPLICATION_JSON)
            .content(requestEntity))
        .andExpect(status().isCreated())
        .andExpect(content().json(expectResponse));

    verify(commentService, times(1))
        .add(EXISTING_COMMENT.getBookId(), EXISTING_COMMENT.getText());
  }

  @Test
  @DisplayName("should validate POST-request for comment creation and return error message")
  void shouldReturnAnErrorMessageForInvalidCommentCreation() throws Exception {
    CommentRequestEntity commentRequestEntity = new CommentRequestEntity();
    commentRequestEntity.setBookId(0L);
    commentRequestEntity.setText("");
    String requestEntity = mapper.writeValueAsString(commentRequestEntity);

    String expectedResponse = mapper.writeValueAsString(VALIDATION_ERRORS);

    mockMvc.perform(post(BASE_URI_TEMPLATE)
            .contentType(MediaType.APPLICATION_JSON)
            .content(requestEntity))
        .andExpect(status().is4xxClientError())
        .andExpect(content().json(expectedResponse));

    verify(commentService, times(0)).add(anyLong(), anyString());
  }

  @Test
  @DisplayName("should correctly process GET-request for providing all comments by book id")
  void shouldCorrectlyReturnAllCommentsByBookId() throws Exception {
    List<CommentDto> comments = Collections.singletonList(EXISTING_COMMENT);
    when(commentService.getByBookId(EXISTING_BOOK_ID)).thenReturn(comments);
    String expectedResponse = mapper.writeValueAsString(comments);

    mockMvc.perform(get(BASE_URI_TEMPLATE)
            .param("bookId", String.valueOf(EXISTING_BOOK_ID)))
        .andExpect(status().isOk())
        .andExpect(content().json(expectedResponse));

    verify(commentService, times(1)).getByBookId(EXISTING_BOOK_ID);
  }

  @Test
  @DisplayName("should correctly process GET-request for providing comment by id")
  void shouldCorrectlyReturnCommentById() throws Exception {
    when(commentService.get(EXISTING_COMMENT.getId())).thenReturn(EXISTING_COMMENT);
    String expectedResponse = mapper.writeValueAsString(EXISTING_COMMENT);

    mockMvc.perform(get(BASE_URI_TEMPLATE + "/" + EXISTING_COMMENT.getId()))
        .andExpect(status().isOk())
        .andExpect(content().json(expectedResponse));

    verify(commentService, times(1)).get(EXISTING_COMMENT.getId());
  }

  @Test
  @DisplayName("should correctly process PUT-request for updating comment")
  void shouldCorrectlyProvideUpdatingComment() throws Exception {
    CommentRequestEntity commentRequestEntity = new CommentRequestEntity();
    commentRequestEntity.setBookId(NEW_COMMENT_BOOK_ID);
    commentRequestEntity.setText(NEW_COMMENT_TEXT);
    String requestEntity = mapper.writeValueAsString(commentRequestEntity);

    CommentDto commentResponseEntity = new CommentDto(EXISTING_COMMENT.getId(),
        NEW_COMMENT_TEXT, NEW_COMMENT_BOOK_ID);
    when(commentService.update(EXISTING_COMMENT.getId(), NEW_COMMENT_BOOK_ID, NEW_COMMENT_TEXT))
        .thenReturn(commentResponseEntity);
    String responseEntity = mapper.writeValueAsString(commentRequestEntity);

    mockMvc.perform(put(BASE_URI_TEMPLATE + "/" + EXISTING_COMMENT.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .content(requestEntity))
        .andExpect(status().isOk())
        .andExpect(content().json(responseEntity));

    verify(commentService, times(1))
        .update(EXISTING_COMMENT.getId(), NEW_COMMENT_BOOK_ID, NEW_COMMENT_TEXT);
  }

  @Test
  @DisplayName("should validate PUT-request for comment update and return error message")
  void shouldReturnAnErrorMessageForInvalidCommentUpdate() throws Exception {
    CommentRequestEntity commentRequestEntity = new CommentRequestEntity();
    commentRequestEntity.setBookId(0L);
    commentRequestEntity.setText("");
    String requestEntity = mapper.writeValueAsString(commentRequestEntity);

    String expectedResponse = mapper.writeValueAsString(VALIDATION_ERRORS);

    mockMvc.perform(put(BASE_URI_TEMPLATE + "/" + EXISTING_COMMENT.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .content(requestEntity))
        .andExpect(status().is4xxClientError())
        .andExpect(content().json(expectedResponse));

    verify(commentService, times(0))
        .update(anyLong(), anyLong(), anyString());
  }


  @Test
  @DisplayName("should correctly process DELETE-request for removing comment")
  void shouldCorrectlyProvideDeletingComment() throws Exception {
    mockMvc.perform(delete(BASE_URI_TEMPLATE + "/" + EXISTING_COMMENT.getId()))
        .andExpect(status().isNoContent());

    verify(commentService, times(1)).remove(EXISTING_COMMENT.getId());
  }
}
