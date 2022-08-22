import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import { io } from "socket.io-client";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";

import './Chat.css';

// const ENDPOINT = 'localhost:5000';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState('');
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState('');

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    // socket = io(ENDPOINT);
    socket = io('https://reactchatheroku.herokuapp.com/');

    setRoom(room);
    setName(name);
    socket.emit('join', { name, room }, () => {
      
    });

    return () =>{
      socket.emit('disconnect');
      socket.off();
    }
  }, ['localhost:5000', location.search]);

  useEffect(() =>{
    socket.on('message', (message)=>{
      setMessages([...messages,message])
    })

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [messages]);

  const sendMessage = (event) =>{
    event.preventDefault();

    if(message){
      socket.emit('SendMessage', message ,()=> setMessage(''));
    }
  }
  // console.log(messages,message)
  return (
    <div >
      <div className="outerContainer">
        <div className="container">
          <InfoBar room={room}/>
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
        <TextContainer users={users} />
      </div>
    </div>
  );
}

export default Chat;