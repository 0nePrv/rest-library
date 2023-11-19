package ru.otus.homework.controller.requestBody;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AuthorRequestBody {

  @NotBlank(message = "Author name must be not blank")
  @Size(min = 4, max = 30, message = "Author name must be between 2 and 30 characters")
  private String name;
}