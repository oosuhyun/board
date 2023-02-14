import React ,{useState, useEffect} from 'react'
import {Link} from "react-router-dom";
// import apiAxios from "./apiAxios";

function  Main() {
    return(
        <div>
            <h3>
                메인화면입니다.
            </h3>
            <Link to={"/article"}>
                <div>test page</div>
            </Link>
        </div>
    );
};

export  default  Main;
