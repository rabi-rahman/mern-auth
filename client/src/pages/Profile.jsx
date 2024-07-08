import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from "../firebase";


export default function Profile() {
  const { currentUser } = useSelector((state) => state.user)
  const fileRef = useRef(null)
  const [image,setImage] = useState(undefined);
  const [imagePercent,setImagePercent] = useState(0)
  const [imageError,setImageError] = useState(false)
  const [formData,setFormData] = useState({})
  console.log(formData)

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

  return (
    <div className="p-3 max-w-lg mx-auto ">
    <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
    <form className="flex flex-col gap-4">
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
      <input defaultValue={currentUser.username} type="text" id="username" placeholder="Username" className="bg-slate-100 rounded-lg p-3" /> 
      <input defaultValue={currentUser.email} type="email" id="email" placeholder="Email" className="bg-slate-100 rounded-lg p-3" /> 
      <input defaultValue={currentUser.pass} type="password" id="password" placeholder="Password" className="bg-slate-100 rounded-lg p-3" /> 
      <button className="bg-slate-700 text-white rounded-lg uppercase p-3 hover:opacity:95 disabled:opacity-80">Update</button>
    </form>
    <div className="flex justify-between mt-5">
      <span className="text-red-700 cursor-pointer">Delete Account</span>
      <span className="text-red-700 cursor-pointer">Sign out</span>
    </div>
    </div>

  )
}
