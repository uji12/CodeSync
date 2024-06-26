import CodeMirror from 'codemirror';
import React, { useEffect, useRef } from 'react'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import Actions from '../Actions';
const Editor = ({socketRef,roomId,onCodeChange}) => {
  const editorRef = useRef(null);
  useEffect(()=>{
   async function init(){
     editorRef.current =CodeMirror.fromTextArea(document.getElementById('realtimeEditor'),{
      mode: { name: 'javascript', json: true },
      theme: 'dracula',
      autoCloseTags: true,
      autoCloseBrackets: true,
      lineNumbers: true,

    });
     editorRef.current.on('change',(instance,changes)=>{
       console.log("instance",instance.getValue());
       const {origin} = changes;
       const code = instance.getValue();
       onCodeChange(code)
       if(origin!=='setValue'){
         socketRef.current.emit(Actions.CODE_CHANGE,{
          code,
          roomId
         })
       }
     })
    //  console.log(editorRef)
   }
   init()
  },[]);

  useEffect(()=>{
    if(socketRef.current){
      socketRef.current.on(Actions.CODE_CHANGE,({code})=>{
        if(code !==null){
          editorRef.current.setValue(code);
        }
      })
    }
 },[socketRef.current])

  return <textarea id="realtimeEditor"></textarea>
}

export default Editor