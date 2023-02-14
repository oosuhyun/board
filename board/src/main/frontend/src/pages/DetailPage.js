import React, {useEffect, useState} from "react";
import {useLocation} from "react-router";
import axios from "axios";
import {Form, Button} from "react-bootstrap";

function DetailPage(){

    const location = useLocation();
    const keyword = getId(location);

    const [data, setData] = useState([]);
    // const [data, setData] = useState({
    //     id : '',
    //     title: '',
    //     content: '',
    //     date: '',
    //     update_check: '',
    // });

    const [ContentValue, setContentValue] = useState("")
    const [TitleValue, setTitleValue] = useState("")

    useEffect(() => {
        axios.get("http://localhost:8080/api/board/" + keyword)
            .then((res) => {
                setData(res.data);
                setTitleValue(data.title);
                setContentValue(data.content);
            })
            .catch(error => console.log(error));
    },[]);

    // useEffect(() => {
    //     if(!data.content){
    //         setData(data.content);
    //     }
    // },[]);
    //
    useEffect(() => {

        setTitleValue(data.title);

    },[data]);

    useEffect(() => {

        setContentValue(data.content);

    },[data]);

    const onContentChange = (event) => {

        setContentValue(event.currentTarget.value);
    };

    const onTitleChange = (e) => {

        setTitleValue(e.currentTarget.value);

    };

    const onClickDelete = async() => {
        if(window.confirm("삭제하시겠습니까?")){
            await axios.delete("http://localhost:8080/api/board/" + keyword)
                .then(res=> setData(res.data))
                .catch(error => console.log(error));
            alert("삭제 되었습니다.");
            console.log("delete success");
        } else{
            console.log("delete cancel");
        }
    }

    const onClickUpdate = async() => {
        const dataUp ={
            "title": TitleValue
            ,"content": ContentValue
        };
        await axios
            .put("http://localhost:8080/api/board/"+keyword, JSON.stringify(dataUp), {
                headers: {
                    "Content-Type": `application/json`,
                    "Title-Type": `application/json`,
                },
            })
            .then((res) => {
                console.log(res.data);
                alert('수정 완료되었습니다.');
                console.log("update success");
            })
            .catch((error) =>{
                console.log(error);
            })
    }

    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name = "title"
                        placeholder="제목을 입력하시오"
                        defaultValue={data.title}
                        onChange={onTitleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        type = "text"
                        name = "content"
                        defaultValue={data.content}
                        // class = "noresize"
                        onChange={onContentChange}
                    />
                </Form.Group>
            </Form>
            <Button onClick={onClickUpdate} variant="outline-primary">수정하기</Button>{' '}
            <Button onClick={onClickDelete} variant="outline-primary">삭제하기</Button>
        </div>
    );
}

function getId(location) {
    const params = new URLSearchParams(location.search);
    const keyword = params.get('id');

    return keyword
}
export default DetailPage;

