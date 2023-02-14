package cbu.board.controller;

import cbu.board.dto.BoardRequest;
import cbu.board.dto.BoardResponse;
import cbu.board.dto.UpdateBoardRequest;
import cbu.board.entity.Board;
import cbu.board.entity.BoardRepository;
import cbu.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/board")
@CrossOrigin(origins = "http://localhost:3000")
public class BoardController {

    private final BoardService boardService;
    private final BoardRepository boardRepository;

    //생성
    @PostMapping
    public ResponseEntity<Void> create(@RequestBody BoardRequest dto){ //@RequestBody : http 요청의 본문 body 변환 후 파라미터로 전달
        boardService.create(dto);
        return ResponseEntity
                .status(HttpStatus.CREATED) //이미 생성된 경우는 응답코드 반환,
                .build();
    }
    //단일 조회
    @GetMapping("/{id}")
    public ResponseEntity<BoardResponse> findById(@PathVariable Long id){
        return ResponseEntity
                .ok(boardService.findById(id));
    }

    //목록 조회
    @GetMapping
    public ResponseEntity<List<BoardResponse>> getAllASC(){
        return ResponseEntity
                .ok(boardService.findAllASC());
    }
    //목록 조회 (오래된순)
    @GetMapping("/DESC")
    public ResponseEntity<List<BoardResponse>> getAllDESC(){
        return ResponseEntity
                .ok(boardService.findAllDESC());
    }
    //키워드로 검색
    @GetMapping("/search")
    public ResponseEntity<List<BoardResponse>> getByKeyword(@RequestParam(value = "keyword") String keyword){
        return ResponseEntity
                .ok(boardService.findByKeywordContains(keyword));
    }
    //pagination
    @GetMapping("/list")
    public Page<Board> list(@PageableDefault(size = 5, sort = {"date"}, direction = Sort.Direction.DESC) Pageable pageable) {
        return boardRepository.findAll(pageable);
    }
    //pagination(오래된순)
    @GetMapping("/oldList")
    public Page<Board> oldList(@PageableDefault(size = 5, sort = {"date"}, direction = Sort.Direction.ASC) Pageable pageable) {
        return boardRepository.findAll(pageable);
    }

    //댓글 수정
    @PutMapping("/{id}")
    public void putReply(@PathVariable Long id, @RequestBody UpdateBoardRequest dto) {
        boardService.update(id, dto);
    }

    //댓글 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id){
        boardService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
