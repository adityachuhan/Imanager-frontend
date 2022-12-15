import React,{useState,useContext} from 'react'
import { useNavigate ,Link } from 'react-router-dom';
import noteContext from '../../contex/notes/noteContext';
const Login = () => {
// constext api call and destructuring
    const context = useContext(noteContext)
    const{ setrelod}  = context
// this is for navingating user to homepage after logging in
    const navigate = useNavigate();
// Usual method to store form data
    const [logincredent, setlogincredent] = useState({email:" ",passward:" "})
    const onChange = (e)=>{
        setlogincredent({...logincredent, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://imanager-api-z2gy.onrender.com/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: logincredent.email, passward: logincredent.passward})
        });
        const json = await response.json()
        console.log(json);
        if (json.authToken){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken); 
            // step to reload navbar
            setrelod(true);
            navigate("/");

        }
        else{
            alert("Invalid credentials");
        }
    }
  return (
    <div className='container'>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input required type="email" className="form-control" value={logincredent.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="passward" className="form-label">Password</label>
                    <input required type="passward" className="form-control" value={logincredent.passward} onChange={onChange} name="passward" id="passward" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <Link to='/signup' type="button" className="btn add btn-primary" >
              Sign Up
            </Link>
        </div>
  )
}

export default Login
