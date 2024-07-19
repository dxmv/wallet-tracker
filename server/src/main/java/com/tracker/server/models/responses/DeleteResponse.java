package com.tracker.server.models.responses;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

// when the delete request is successful
@Getter
@Setter
@AllArgsConstructor
public class DeleteResponse {

    private final String message;

}
