package cbu.board.service;


import cbu.board.dto.BoardRequest;
import cbu.board.dto.BoardResponse;
import cbu.board.dto.UpdateBoardRequest;
import cbu.board.entity.Board;
import cbu.board.entity.BoardRepository;
import cbu.board.mapper.BoardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.persistence.EntityExistsException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
    private final BoardMapper boardMapper;

    //생성 기능
    public void create(BoardRequest request) {
        Board board = boardMapper.mapToEntity(request);
        boardRepository.save(board);
    }

    //단일 조회 기능
    public BoardResponse findById(Long id) {
        Board board = boardRepository.findById(id)
                .orElseThrow(EntityExistsException::new);
        return boardMapper.mapToDTO(board);
    }


    //목록 조회 기능
    public List<BoardResponse> findAllOld(){
        return boardRepository.findAll(Sort.by(Sort.Direction.ASC,"date"))
                .stream()
                .map(boardMapper::mapToDTO)
                .collect(Collectors.toList());
    }

    //목록 조회 기능(최신순)
    public List<BoardResponse> findAllRecent(){
        return boardRepository.findAll(Sort.by(Sort.Direction.DESC,"date"))
                .stream()
                .map(boardMapper::mapToDTO)
                .collect(Collectors.toList());
    }

    //키워드로 검색
    @Transactional
    public List<BoardResponse> findByKeywordContains(String keyword){
        return boardRepository.findByContentContaining(keyword)
                .stream()
                .map(boardMapper::mapToDTO)
                .collect(Collectors.toList());
    }

    //댓글 삭제
    public void deleteById(Long id) {
        boardRepository.deleteById(id);
    }

    //댓글 수정
    @Transactional
    public void update(Long id , UpdateBoardRequest dto){

        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("댓글 수정 X"));
        board.update(dto.getContent());
    }
}

