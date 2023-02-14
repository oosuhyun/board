import React from 'react';
import BoardList from "./BoardList";
import {Button} from "react-bootstrap";


function BoardPage() {
    return (
        <div>
            <h1>Board Title</h1>
            <Button variant="outline-primary" href={"/Register"}>New Post</Button>
            <br/>
            <Button variant="outline-primary" href={"/paging"}>Paging</Button>
            <div>
                <BoardList />
            </div>
        </div>
    );
}

export default BoardPage;