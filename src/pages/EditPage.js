import React, { useEffect, useRef, useState } from 'react'
import Client from '../components/Client'
import Editor from '../components/Editor';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { initSocket } from '../socket'
import Actions from '../Actions'
import toast from 'react-hot-toast';

const EditPage = () => {
  const [clients,setClients]=useState([]);
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const {roomId} = useParams();
  const reactNavigator= useNavigate();
  useEffect(()=>{
    const init =async ()=>{
      socketRef.current= await initSocket();
      socketRef.current.on('connect_error',(err)=>handleErrors(err));
      socketRef.current.on('connect_failed',(err)=>handleErrors(err));
      const handleErrors=(e)=>{
        console.log('socket error',e);
        toast.error('Socket connection failed...');
        reactNavigator('/');
      }
      socketRef.current.emit(Actions.JOIN,{
        roomId,
        username: location.state?.userid
      });
      socketRef.current.on(Actions.JOINED,({clients,username,socketId})=>{
          if(username!==location.state?.userid){
            toast.success(`User ${username} joined`);
          }
          setClients(clients);
          socketRef.current.emit(Actions.SYNC_CODE,{
             socketId,
             code:codeRef.current
          })
      })
         //Listenin for disconnected
         socketRef.current.on(Actions.DISCONNECTED,({socketId,username})=>{
            toast.success(` ${username} disconnected from room `);
            setClients((prev)=>{
              return prev.filter((client)=>client.socketId!==socketId);
            });
         })
      

    };
    init();
    return ()=>{
      socketRef.current.disconnect();
      socketRef.current.off(Actions.DISCONNECTED);
      socketRef.current.off(Actions.JOINED);
    }
  },[])
if(!location.state){
  return <Navigate to="/"/>
}
 const CopyBtn= async ()=>{
  try {
    await navigator.clipboard.writeText(roomId);
    toast.success('Room ID has been copied to your clipboard');
} catch (err) {
    toast.error('Could not copy the Room ID');
    console.error(err);
  }
 }
 const LeaveRoom =()=>{
  reactNavigator('/');
 }
  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img className='logoImage' src="/code-sync.png" alt="" />
          </div>
            <h3 className='h3'>Connected</h3>
            <div className="clientList">
              {
                clients.map((client)=>(
                  <Client key={client.socketId} username={client.username}/>
                ))
              }
            </div>
        </div>
          <button className=" btn1 copybtn"onClick={CopyBtn}>Copy Room ID</button>
          <button className=" btn1 leavebtn"onClick={LeaveRoom}>Leave</button>
        </div>
      <div className="editorWrap">
        <Editor socketRef={socketRef} roomId={roomId} onCodeChange={(code)=>{codeRef.current=code}}/>
      </div>
    </div>
  )
}

export default EditPage