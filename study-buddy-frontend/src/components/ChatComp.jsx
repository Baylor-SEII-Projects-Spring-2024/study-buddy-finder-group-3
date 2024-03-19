import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {selectToken, selectUser} from "@/utils/authSlice";
import {useRouter} from "next/router";
import 'react-chat-elements/dist/main.css'




function ChatComp(){
    const token = useSelector(selectToken)
    const user = useSelector(selectUser)
    const router = useRouter()
    const [profile, setProfile] = useState('');
    const [userId, setUserid] = useState('')
}