import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
function Logout(){
    const navigate = useNavigate(); //navigation
    useEffect(()=>{
        localStorage.clear();
        navigate("/login");
    })



}

export default Logout;