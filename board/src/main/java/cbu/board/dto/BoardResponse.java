package cbu.board.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class BoardResponse {

    private Long id;
    private String name;
    private String content;
    private String date;

}
