import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {Table, Button, Form, InputGroup} from "react-bootstrap";


function BoardList() {

    const [data, setData] = useState([]);
    const [SearchValue, setSearchValue] = useState("")

    const onSearchChange = (event) => {
        setSearchValue(event.currentTarget.value);
    };


    const onClick = async() => {
        if(SearchValue === ''){
            await axios.get("http://localhost:8080/api/board/" )
                .then(res => setData(res.data))
                .catch(error => console.log(error));
        }
        else{
            await axios.get("http://localhost:8080/api/board/search?keyword=" + SearchValue )
                .then(res => setData(res.data))
                .catch(error => console.log(error));
        }
    }

    useEffect(() => {
        axios.get("http://localhost:8080/api/board/" )
            .then(res => setData(res.data))
            .catch(error => console.log(error));
    },[]);

    const [index, setIndex] = useState("0");

    const onChange = (e) => {
        setIndex(e.target.value);
        if(e.target.value === "1"){
            console.log("111");
            axios.get("http://localhost:8080/api/board")
                .then(res => setData(res.data));
        } else if(e.target.value === "2"){
            console.log("222");
            axios.get("http://localhost:8080/api/board/DESC")
                .then(res => setData(res.data));
        }
    };

    return(
        <div>
            <Form.Select aria-label="Default select example" onChange={onChange}>
                <option>정렬</option>
                <option value="1" >최신순</option>
                <option value="2">오래된순</option>
            </Form.Select>

            <InputGroup className="mb-3">
                <Form.Control
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    onChange={onSearchChange}
                    placeholder="검색어를 입력하시오."
                    value={SearchValue}
                    type="text"
                    name="title"
                />
                <Button onClick={onClick} variant="outline-primary" id="button-addon2">
                    검색하기
                </Button>
            </InputGroup>

            <div>
                <h3>Board List</h3>
            </div>
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
                {data.map((myMap) => (
                    <tr key={myMap.id}>
                        <td>{myMap.id}</td>
                        <Link to={"/detail?id=" + `${myMap.id}`}>
                            <td>{myMap.title}</td>
                        </Link>
                        <td>name</td>
                        <td>
                            {myMap.date}
                            {myMap.update_check === "O"? " (수정됨)" : ""}
                            {/*<div style={{color: "blue"}}>{myMap.update_check === "O"? " (수정됨)" : ""}</div>*/}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default BoardList;


