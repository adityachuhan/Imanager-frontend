import React,{useContext,useEffect} from 'react'
import noteContext from '../../contex/notes/noteContext'
import Diarybutton from './Diarybutton'
import DiaryScreen from './DiaryScreen'

const Diary = () => {
  const authtoken = localStorage.getItem("token")
let user= false
 if(authtoken){
  user = true
 }

  const context = useContext(noteContext)
  const {Diary ,fetchDiary}=context
  useEffect(() => {
    fetchDiary()
      // eslint-disable-next-line
    }, [])
if(user){
  return (
    <div style = {{display: "flex",height: "100%"}}>
      <div className="diarybox">
      {
           Diary.map((e)=>{
            return(<Diarybutton key = {e._id} note = {e}/>)
           })
    }
      </div>
      <DiaryScreen/>
    </div>
  )
}else{
  return(
    <>
    please login or sign up
    </>
  )
}
}

export default Diary