package ru.otus.homework.controller.requestEntity;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class GenreRequestEntity {

  @NotBlank(message = "Genre name must be not blank")
  @Size(min = 2, max = 30, message = "Genre name must be between 2 and 30 characters")
  private String name;
}