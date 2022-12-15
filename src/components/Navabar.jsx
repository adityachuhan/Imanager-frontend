import React,{useState,useEffect,useContext} from 'react'
import LoadingBar from 'react-top-loading-bar'
import noteContext from '../contex/notes/noteContext'
import { Link, useLocation } from "react-router-dom";
const Navabar = () => {
  const authtoken = localStorage.getItem("token")
 // Context api
  const context = useContext(noteContext)
  const{progress , relod , setrelod}  = context
// to reload Navbar component after login / signup
if(relod===true){
   window.location.reload(true);
   setrelod(false)
}
// saving user detail and makin fetching call to get uder information
  const [userdetail, setuserdetail] = useState({name: "",})
  const GetuserDetail = async()=>{
     const response = await fetch('https://imanager-api-z2gy.onrender.com/api/auth/getuser',{
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
      'auth-token':authtoken
      }
     })
     const parsedata = await response.json()
        if(parsedata.error){
          setuserdetail({name:null})
        }else{
          setuserdetail(parsedata)
        }
  }
// this useEffect is used so that Getuse Detail run only once after mounting of componenet
  useEffect(() => {
    GetuserDetail()
      // eslint-disable-next-line
    }, [])

    // setting up login and signup for non registered users
    const detailnav = ()=>{
       if(userdetail.name){
        return( <span className="text-light"> Welcome! {userdetail.name?userdetail.name:"Login/SignUp"}</span>)
       }else{
        return( <Link to="/login" style={{textDecoration : "none"}} className="text-light" >Login/SignUp</Link>)
       }
    }

    let location = useLocation()
  return (
    <>
    <nav className="navbar navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="container-fluid">
            <a className="navbar-brand fst-italic" href="/">I-MANAGER</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/Diary"? "active": ""}`}  to="/Diary">Diary</Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/To-do"? "active": ""}`}  to="/To-do">To-Do List</Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/Notes-files"? "active": ""}`}  to="/Notes-files">Notes/Files</Link>
                </li>
            </ul>
            <form className="d-flex" role="search">
            {/* <button type="button" className="btn btn-primary">{userdetail.name?userdetail.name:"Login/SignUp"}</button> */}
            {detailnav()}
            </form>
            </div>
        </div>
        </nav>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress} 
      />
    </>
  )
}

export default Navabar