import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props)=>{
  const authtoken = localStorage.getItem("token")
// alert section
const [alert, setalert] = useState({status:false,message:'this is alert for now ',color:'danger'})
const [progress, setprogress] = useState(0)

  const [Todo, setTodo] = useState([])
  // fetch function to fetch data(todo,diary,filelist) from database which take url as parameter

  const Fetch = async(url)=>{
    setprogress(70)
    const response = await fetch(url,{
      method:"GET",
      headers:{
        'Content-Type': 'application/json',
        'auth-token':authtoken
      }
    })
    setprogress(100)
    return response
   } 
const fetchTodo = async()=>{
    const response = await Fetch('https://imanager-api-z2gy.onrender.com/api/notes/fetchalltodos')
    if(!(response.status == 401)){
      const parsedata = await response.json()
      setTodo(parsedata)
    }else{
      setalert({status:true,message:'Please authenticate yourself',color:'danger'})
    }
  
}   

  // This is the parse data which eventually went to ToDo component
  let TodayDate = new Date()
  let TodayDay = TodayDate.getDate()
  let TmrDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
  let TmrDay = TmrDate.getDate()

  // function to filter today todo
  const todayfilter = (data)=>{
    // eslint-disable-next-line 
    const todaytodo = data.filter((element)=>{
       if(element.date.slice(8,10)==TodayDay){
        return element
       }
       return false
    })
   return todaytodo
  }
  // function to filter tommorow todo
  const tommorowfilter =   (data)=>{
    // eslint-disable-next-line 
    const tommorowtodo = data.filter((element)=>{
       if(element.date.slice(8,10)==(TmrDay)){
        return element
       }
       return false
    })
    return tommorowtodo
  }
  // function to filter extra todos
  const extrafilter = (data)=>{
    // eslint-disable-next-line 
    const extratodo =  data.filter((element)=>{
       if((element.date.slice(8,10)!=(TmrDay))&&(element.date.slice(8,10)!=TodayDay)&&(element.date.slice(8,10)>TodayDay)){
        return element
       }
       return false
    })
    return extratodo
  }
  

  let maindata= {
    todaytodo :todayfilter(Todo),
     tommorowtodo:tommorowfilter(Todo),
     extratodo:extrafilter(Todo)
  }
  // Delete function which takes url and delete todo , diary and file [GENERAL]
  const Delete = async(url)=>{
    setprogress(30)
    const response = await fetch(url,{
      method:"DELETE",
      headers:{
        'Content-Type': 'application/json',
        'auth-token':authtoken
      }
     })
     setprogress(60)
     return response
  }
  // function to Update To-do
   const updateTodo = async (state,id)=>{
         const response = await fetch(`https://imanager-api-z2gy.onrender.com/api/notes/updatetodo/${id}`,{
          method:"PUT",
          headers:{
            'Content-Type': 'application/json',
            'auth-token':authtoken
          },
          body:JSON.stringify({state})
         })
        fetchTodo();
  }
  // function to delete To-do
  const DeleteTodo = async (id)=>{
         const response = await  Delete(`https://imanager-api-z2gy.onrender.com/api/notes/deletetodo/${id}`) // this is the delete function with url encoded with id of the todo that has to be deleted
        //  This iteration is to make alert component appear as per the status given by above function
         if((response.status == 404 || response.status == 401  )){
           setalert({status:true,message:'Internal error - please try again later',color:'danger'})
          }

         fetchTodo();// this is to fetch new updated todo list 
  }
  // To delete old Todos
  const somefilter = (data)=>{
    // eslint-disable-next-line 
    const extratodo =  data.filter((element)=>{
       if((element.date.slice(8,10)!=(TmrDay))&&(element.date.slice(8,10)!=TodayDay)&&(element.date.slice(8,10)<TodayDay)){
        return element
       }
       return false
    })
    return extratodo
  }
  const [count, setcount] = useState(true)
  const  delTodo = somefilter(Todo)
  if(delTodo.length!=0){
    delTodo.map(async(e)=>{
      if(count){
        await  DeleteTodo(e._id)
        setcount(false)
      }
    })
  }
  // function to add to-do
const AddTodo = async(todo)=>{
  setprogress(30)
 const response = await fetch('https://imanager-api-z2gy.onrender.com/api/notes/addtodo',{
  method:'POST',
  headers:{
    'Content-Type': 'application/json',
    'auth-token':authtoken
  },
  body:JSON.stringify(todo)
 })
 setprogress(60)
 if((response.status == 404 || response.status == 401  )){
  setalert({status:true,message:'Internal server error - Please try again later',color:'danger'})
}
 fetchTodo();
}
  // This part is for DIARY
  const [currentdiary, setcurrentdiary] = useState({
    diaryNote: "Please Enter your thoughts and create this beautiful cloud diary of yours",
    id:" "
  })
  const [Diary, setDiary] = useState([])
  // fecthcall to fetch all diary of the user
  const fetchDiary = async()=>{
    setprogress(30)
    const response = await Fetch('https://imanager-api-z2gy.onrender.com/api/diary/fetchDiary')
    if(!(response.status == 401)){
      const ParsediaryData = await response.json()
    setDiary(ParsediaryData)
    }else{
      setalert({status:true,message:'Please authenticate yourself',color:'danger'})
    }
  }
//function to  delete Diary
  const deleteDiary = async(id)=>{
    setprogress(30)
    const response = await Delete(`https://imanager-api-z2gy.onrender.com/api/diary/deleteDiary/${id}`)
      if((response.status == 404 || response.status == 401  )){
        setalert({status:true,message:'Internal error - please try again later',color:'danger'})
       }
      fetchDiary();       
  }
  // function to add Diary Note
  const addDiaryNote = async(diaryNote)=>{
    setprogress(30)
    const response = await fetch('https://imanager-api-z2gy.onrender.com/api/diary/addDiary',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'auth-token':authtoken
      },
      body:JSON.stringify({diaryNote})
    })
    setprogress(60)
    if((response.status == 404 || response.status == 401  )){
      setalert({status:true,message:'Internal server error - Please try again later',color:'danger'})
    }
    fetchDiary();    
  }
  // function to update Diary
  const diaryUpdate =async ()=>{
    setprogress(30)
    const response = await fetch(`https://imanager-api-z2gy.onrender.com/api/diary/updateDiary/${currentdiary.id}`,{
      method:'PUT',
      headers:{
        'Content-Type': 'application/json',
        'auth-token':authtoken
      },
      body:JSON.stringify({diaryNote:currentdiary.diaryNote})
    })
    setprogress(60)
    if((response.status == 404 || response.status == 401  )){
      setalert({status:true,message:'Internal error - please try again later',color:'danger'})
     }
    fetchDiary();    
  }
  // THis section of NoteState is gonna used for Storing files
   const [file, setfile] = useState([])

  const fetchfileinfo = async ()=>{
  const response = await Fetch('https://imanager-api-z2gy.onrender.com/api/file/filesinfo')
  if((response.status == 401 )){
    setalert({status:true,message:'Please authenticate yourself',color:'danger'})
  }else if(response.status == 404){
    setalert({status:true,message:'Please Add file',color:'success'})
  }else{
    const parsefileInfo = await response.json()
    setfile(parsefileInfo)
  }
}
// function to delete File
const deleteFile = async(id)=>{
  const newfileinfo = file.filter((file) => { return file._id !== id })
  setfile(newfileinfo)
  const response = await Delete(`https://imanager-api-z2gy.onrender.com/api/file/filedelete/${id}`);
}
// this state is used to reload navabar after logging in/ signing up
const [relod, setrelod] = useState(false)
    return(
        <noteContext.Provider value = {{alert,progress,relod,setrelod,setalert,AddTodo,fetchTodo,DeleteTodo,updateTodo,maindata ,Diary ,addDiaryNote,deleteDiary,fetchDiary,diaryUpdate,currentdiary,setcurrentdiary ,file,fetchfileinfo,deleteFile}}>
         {props.children}
        </noteContext.Provider>
    )
}

export default NoteState ;