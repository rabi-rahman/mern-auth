import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom'

export default function OAuth() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () =>{
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth,provider)
      const res = await axios.post('http://localhost:3000/api/auth/google',{
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      })
      dispatch(signInSuccess(res.data))
      console.log(res.data)
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <button type="button" onClick={handleGoogleClick} className='text-white bg-red-700 rounded-lg p-3 uppercase hover:opacity-95 '>Continue with Google </button>
  ) 
}
