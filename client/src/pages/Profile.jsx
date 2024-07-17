import { useSelector,useDispatch } from "react-redux";
import { useRef, useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from "../firebase";
import axios from "axios";
import { updateUserStart,updateUserSuccess,updateUserFailure,
  deleteUserStart,deleteUserSuccess,deleteUserFailure,
  signOutStart,signOutSuccess,signOutFailure } from "../redux/user/userSlice";


export default function Profile() {
  const { currentUser,loading,error } = useSelector((state) => state.user)
  const fileRef = useRef(null)
  const [image,setImage] = useState(undefined);
  const [imagePercent,setImagePercent] = useState(0)
  const [imageError,setImageError] = useState(false)
  const [formData,setFormData] = useState({})
  const [updateStatus,setUpdateStatus] = useState(false)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(image){
      handleFileUpload(image);
    }
  },[image]);

  const handleFileUpload = async (image) =>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef,image);
    uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setImagePercent(Math.round(progress));
    },
    (error) => {
      setImageError(true)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(
        (downloadURL) => setFormData({...formData, profilepicture:downloadURL})
      )}
    )}

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value})
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        dispatch(updateUserStart());
        console.log(formData)
        const res = await axios.post(`http://localhost:3000/api/user/update/${currentUser._id}`, formData);
        console.log(formData)
        dispatch(updateUserSuccess(res.data));
        setUpdateStatus(true)
        console.log(res.data);
      }
      catch(error){
        (error.response)
        console.log(error.response.data)
        dispatch(updateUserFailure(error.response.data.message))
      }
    }

    const handleDeleteAccount = async () => {
      try {
        dispatch(deleteUserStart());
        const res = await axios.delete(`http://localhost:3000/api/user/delete/${currentUser._id}`);
        dispatch(deleteUserSuccess(res.data));
      } catch (error) {
        (error.response)
        console.log(error.response.data)
        dispatch(deleteUserFailure(error.response.data.message))
      }
    }

    const handleSignout = async () => {
      try {
        dispatch(signOutStart());
        const res = await axios.get("http://localhost:3000/api/auth/signout");
        dispatch(signOutSuccess(res.data));
      } catch (error) {
        (error.response)
        console.log(error.response.data)
        dispatch(signOutFailure(error.response.data.message))
      }
    }

  return (
    <div className="p-3 max-w-lg mx-auto ">
    <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input type="file" ref={fileRef} hidden accept="image/*" onChange={(e) => setImage(e.target.files[0])}/>
      <img src={formData.profilepicture || currentUser.profilepicture} alt="Profile" 
        className="h-24 w-24 cursor-pointer rounded-full object-cover mt-2 self-center" 
        onClick={()=>fileRef.current.click()}/>
      <p className="self-center text-sm">{imageError ? 
        (<span className="text-red-700">Error Uploading Image</span>) :
        imagePercent > 0 && imagePercent < 100 ?
        (<span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>) :
        imagePercent === 100 ?
        (<span className="text-green-700">Image Successfully Updated</span>) : ''}</p>
      <input defaultValue={currentUser.username} type="text" id="username" placeholder="Username" className="bg-slate-100 rounded-lg p-3" onChange={handleChange}/> 
      <input defaultValue={currentUser.email} type="email" id="email" placeholder="Email" className="bg-slate-100 rounded-lg p-3" onChange={handleChange}/> 
      <input defaultValue={currentUser.pass} type="password" id="password" placeholder="Password" className="bg-slate-100 rounded-lg p-3" onChange={handleChange}/> 
      <button className="bg-slate-700 text-white rounded-lg uppercase p-3 hover:opacity:95 disabled:opacity-80">{loading?'Loading...':'Update'}</button>
    </form>
    <div className="flex justify-between mt-5">
      <span className="text-red-700 cursor-pointer" onClick={handleDeleteAccount}>Delete Account</span>
      <span className="text-red-700 cursor-pointer" onClick={handleSignout}>Sign out</span>
    </div>
    <p className="text-red-700 mt-5">{error && "something went wrong"}</p>
    <p className="text-green-700 mt-5">{updateStatus  && "User is updated successfully"}</p>
    </div>

  )
}
