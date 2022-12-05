import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { BsImageFill } from 'react-icons/bs'
import './register.css'

//Firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, signInWithGoogle, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";


export const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className='form__container'>
        <div className='form__wrapper' >
          <span className="logo">Chat App</span>
          <span className="title">Register</span>
          <form onSubmit={handleSubmit} >
              <input type="text" placeholder='Username'/>
              <input type="email" placeholder='Email'/>
              <input type="password" placeholder='Password'/>
              <input type="file" id='file' style={{display:'none'}} />
              <label htmlFor='file'>
                <BsImageFill className='form-icon'/>
                <span> Add an Avatar</span>
              </label>
              <button className='btn btn-primary' >Sign Up</button>
          </form>
          <span className="title">Or</span>
          <span className="title">Sign in with Google</span>
          <button className='btn btn-primary' onClick={() => {signInWithGoogle(); navigate('/');}} >Google</button>
          <p>You do have an account? <Link to="/login">Login</Link></p>
        </div>
    </div>
  )
}
