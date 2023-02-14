package cbu.board.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Board {
    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String content;
    private String date;
    private String update_check;


    @Builder
    public Board(Long id, String title, String content, String date, String update_check) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.date = LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        this.update_check = "X";
    }

    public void update(String title, String content) {
        this.title = title;
        this.content = content;
//        this.date = LocalDateTime.now()
//                .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        this.update_check = "O";
    }
}