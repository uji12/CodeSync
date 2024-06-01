import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [id,setId] =useState("");
  const [userid,setUserId] =useState("");
  const navigate = useNavigate();
  const generateRan = (e) => {
    e.preventDefault();
    const iid = uuidv4();
    setId(iid);
    toast.success('Room successfully created!');
  }
  const joinRoom =()=>{
    if(!id || !userid) {
      toast.error('Please fill the details before joining!!');
      return ;
    }
    //Redirect
    navigate(`/editor/${id}`,{
       state : {
         userid,
      }
    });
 };
  const handleKeyInput = (e)=>{
   e.preventDefault(); 
   if(e.code==='Enter'){
     joinRoom();
   }
  }
  return (
   <div className="homePageWrapper">
     <div className="formWrapper">
        <img className="hlogo" src="/code-sync.png" alt="code-sync-logo" />
        <h4 className='mainLabel'>Paste invitation Room id</h4>
        <div className="inputGroup">
          <input 
            type="text"
            className='inputBox'
             placeholder='ROOM ID' 
             value={id}
             onChange={(e)=>setId(e.target.value)}
             onKeyUp={handleKeyInput}
          />
            <input 
            type="text"
            className='inputBox'
            placeholder='USERNAME' 
            value={userid}
            onChange={(e)=>setUserId(e.target.value)}
            onKeyUp={handleKeyInput}
          />
          <button className="btn joinBtn" onClick={joinRoom}>JOIN</button>
          <span className="createInfo">
            If you don't have an Invite then create &nbsp;
            <a onClick={generateRan} href="" className='createNewBtn'>new room</a> 
          </span>
        </div>
     </div>
      <footer>
        <h4>Build With 💙 &nbsp;
         <a href="">by mb99</a>
        </h4>
      </footer>
   </div> 
  )
}

export default Home