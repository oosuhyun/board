package cbu.board.mapper;

import cbu.board.dto.BoardRequest;
import cbu.board.dto.BoardResponse;
import cbu.board.entity.Board;
import org.springframework.stereotype.Component;

@Component
public class BoardMapper {
    public Board mapToEntity(BoardRequest dto){
        return Board.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .build();
    }

    public BoardResponse mapToDTO(Board entity) {
        return BoardResponse.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .content(entity.getContent())
                .date(entity.getDate())
                .update_check(entity.getUpdate_check())
                .build();
    }

}
