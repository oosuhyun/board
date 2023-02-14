import React, {useState} from 'react';
import axios from "axios";
import {Form, Button} from "react-bootstrap";

function RegisterPage()  {
    const [TitleValue, setTitleValue] = useState("")
    const [ContentValue, setContentValue] = useState("")

    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value);
    };

    const onContentChange = (event) => {
        setContentValue(event.currentTarget.value);
    };
    // console.log(ContentValue);

    const onSubmit = (e) => {
        // e.preventDefault();
        // console.log("hello there I am working");
        return true
    }

    const onClick = (e) => {
        console.log("click login");
        console.log("Title : ", TitleValue);
        console.log("Content : ", ContentValue);

        if(TitleValue === ""){
            alert("제목을 입력해주세요.");
        }else if(ContentValue === ""){
            alert("내용을 입력해주세요.");
        } else{
            const data ={
                "title": TitleValue,
                "content": ContentValue
            };

            axios
                .post("http://localhost:8080/api/board", JSON.stringify(data), {
                    headers: {
                        "Content-Type": `application/json`,
                    },
                })
                .then((res) => {
                    console.log(res.data);
                    window.location.reload();
                })
                .catch((error) =>{
                    console.log(error);
                })
        }
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
                        value={TitleValue}
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
                        placeholder="Input text."
                        onChange={onContentChange}
                    />
                </Form.Group>
            </Form>
            <Button onClick={onClick} variant="outline-primary">Submit</Button>

            {/*<form onSubmit={onSubmit}> /!*호출되면 페이지 새로고침*!/*/}
            {/*    <br />*/}
            {/*    <label>Title: </label>*/}
            {/*    <input*/}
            {/*        onChange={onTitleChange}*/}
            {/*        value={TitleValue}*/}
            {/*        type="text"*/}
            {/*        name="title"*/}
            {/*    /> /!*한 줄 text*!/*/}
            {/*    <hr></hr> /!*가로줄*!/*/}
            {/*    <div>*/}
            {/*        <textarea*/}
            {/*            onChange={onContentChange}*/}
            {/*            placeholder="Input text."*/}
            {/*            value={ContentValue}*/}
            {/*            name="content"*/}
            {/*        /> /!*여러 줄 text*!/*/}
            {/*    </div>*/}
            {/*    <button onClick={onClick}>Submit</button>*/}
            {/*</form>*/}
        </div>
    );
};

export default RegisterPage;