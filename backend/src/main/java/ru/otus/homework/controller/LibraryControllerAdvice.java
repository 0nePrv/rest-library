package ru.otus.homework.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.ErrorResponse;
import org.springframework.web.ErrorResponseException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ru.otus.homework.exception.NotExistException;

@RestControllerAdvice
public class LibraryControllerAdvice {

  @ExceptionHandler(NotExistException.class)
  public ErrorResponse handleException(NotExistException exception) {
    HttpStatus status = HttpStatus.NOT_FOUND;
    ProblemDetail detail = ProblemDetail.forStatusAndDetail(status, exception.getMessage());
    return new ErrorResponseException(HttpStatus.NOT_FOUND, detail, exception);
  }
}
