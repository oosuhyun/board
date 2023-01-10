package cbu.board.mapper;

import cbu.board.dto.BoardRequest;
import cbu.board.dto.BoardResponse;
import cbu.board.entity.Board;
import org.springframework.stereotype.Component;

@Component
public class BoardMapper {
    public Board mapToEntity(BoardRequest dto){
        return Board.builder()
                .name(dto.getName())
                .content(dto.getContent())
                .build();
    }

    public BoardResponse mapToDTO(Board entity) {
        return BoardResponse.builder()
                .id(entity.getId())
                .name(entity.getName())
                .content(entity.getContent())
                .date(entity.getDate())
                .build();
    }

}
