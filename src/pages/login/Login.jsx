import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

//Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithGoogle } from '../../firebase.js'

export const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className='form__container'>
    <div className='form__wrapper' >
      <span className="logo">Chat App</span>
      <span className="title">Login</span>
      <form onSubmit={handleSubmit} >
          <input type="email" placeholder='Email'/>
          <input type="password" placeholder='Password'/>
          <button className='btn btn-primary' >Sign In</button>
      </form>
      <span className="title">Or</span>
      <span className="title">Sign in with Google</span>
          <button className='btn btn-primary' onClick={ () => {signInWithGoogle(); navigate('/') }} >Google</button>
      <p>You don't have an account? <Link to="/register">Register</Link></p>
    </div>
</div>
  )
}
