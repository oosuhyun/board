
import React, {useEffect, useState} from "react";
import './Paging.css';
import {Link} from "react-router-dom";
import axios from "axios";
import {Table, Form} from "react-bootstrap";
import Pagination from "react-js-pagination";

function Paging(){
    const [data, setData] = useState({
        content: [],
        pageable:{},
    });

    //index가 1일 때 최신순, index가 2일 때 오래된 순 정렬임을 의미 (최신순이 기본화면이므로 시작은 index 1로 지정)
    const [index, setIndex] = useState("1");


    const onChange = (e) => {
        setIndex(e.target.value);
        if(e.target.value === "1"){
            console.log("111");
            axios.get("http://localhost:8080/api/board/list?page=0")
                .then(res => setData(res.data));
            setPage(1)
        } else if(e.target.value === "2"){
            console.log("222");
            axios.get("http://localhost:8080/api/board/oldList?page=0")
                .then(res => setData(res.data));
            setPage(1)
        }
    };

    useEffect(() => {
        axios.get("http://localhost:8080/api/board/list?page=0" )
            .then(res => setData(res.data))
            .catch(error => console.log(error));

    },[]);

    const [page, setPage] = useState(1);

    const handlePageChange = (page) => {
        setPage(page);

        var pagenum = parseInt(page) - 1;

        if(index === "1"){
            axios.get("http://localhost:8080/api/board/list?page=" + pagenum )
                .then(res => setData(res.data))
                .catch(error => console.log(error));
        } else if(index === "2"){
            axios.get("http://localhost:8080/api/board/oldList?page=" + pagenum )
                .then(res => setData(res.data))
                .catch(error => console.log(error));
        }
    };

    return (
        <div>
            <Form.Select aria-label="Default select example" onChange={onChange}>
                <option>정렬</option>
                <option value="1" >최신순</option>
                <option value="2">오래된순</option>
            </Form.Select>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>no</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>날짜</th>
                    </tr>
                </thead>
                <tbody>
                {data.content && data.content.map((myMap) => (
                    <tr key={myMap.id}>
                        <td>{myMap.id}</td>
                        <Link to={"/detail?id=" + `${myMap.id}`}>
                            <td>{myMap.title}</td>
                        </Link>
                        <td>name</td>
                        <td>
                            {myMap.date}
                            {myMap.update_check === "O"? " (수정됨)" : ""}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <h3> 현재페이지: {data.pageable.pageNumber + 1}</h3>
            <Pagination
                activePage={page}
                itemsCountPerPage={data.size}
                totalItemsCount={data.totalElements}
                pageRangeDisplayed={5}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={handlePageChange}
            />

        </div>
    );
};

export default Paging;