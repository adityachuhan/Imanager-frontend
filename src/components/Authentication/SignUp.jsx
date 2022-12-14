import React, { useState , useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import noteContext from "../../contex/notes/noteContext";
const SignUp = () => {
// this is use to navigating user after signing up
  const navigate = useNavigate();
//   usual method of storing form data
  const [signcredent, setsigncredent] = useState({
    name: " ",
    email: " ",
    passward: " ",
  });
  const onChange = (e) => {
    setsigncredent({ ...signcredent, [e.target.name]: e.target.value });
  };
//   using context api and desturctring
  const context = useContext(noteContext)
  const{ setrelod}  = context
//   function to run after submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Iteration for making sure correct required length of Name and passward
    if (signcredent.name.length >= 4 && signcredent.passward.length >= 6) {
      const response = await fetch(
        "http://localhost:5000/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: signcredent.name,
            email: signcredent.email,
            passward: signcredent.passward,
          }),
        }
      );
      const json = await response.json();
        // Save the auth token and redirect
        localStorage.setItem("token", json.authToken);
        // reloding the Navabar component after signing up
        setrelod(true);
        navigate("/");
    } else {
      alert(
        `1. Name should of be of minimum 4 letters \n 2. Password's min length is 6 characters`
      );
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            required
            type="name"
            className="form-control"
            value={signcredent.name}
            onChange={onChange}
            name="name"
            id="name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            required
            type="email"
            className="form-control"
            value={signcredent.email}
            onChange={onChange}
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="passward" className="form-label">
            Password
          </label>
          <input
            required
            type="passward"
            className="form-control"
            value={signcredent.passward}
            onChange={onChange}
            name="passward"
            id="passward"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <Link to="/login" type="button" className="btn add btn-primary">
        Login
      </Link>
    </div>
  );
};

export default SignUp;
