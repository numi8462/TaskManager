import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadProfilePic } from '../../redux/authSlice';
import './ProfilePicUpload.scss';
import ProfileImg from '../../assets/profile.svg';
import ProfileEdit from './ProfileEdit';
import { MdEdit } from "react-icons/md";

function ProfilePicUpload() {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.currentUser); // get the current user from your Redux state
  const [profileImage, setProfileImage] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const fileInputRef = useRef(null);
  const hiddenFileInputRef = useRef(null);

  const onImageChange = (event) => {
    setImage(event.target.files[0]);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    let fileToUpload = image;

    if (hiddenFileInputRef.current && hiddenFileInputRef.current.files.length > 0) {
      fileToUpload = hiddenFileInputRef.current.files[0];
    }

    if (fileToUpload) {
      dispatch(uploadProfilePic(currentUser.id, fileToUpload));
    } else {
      console.log("No file selected");
    }
  }

  const updateAvatar = (imgSrc, file) => {
    setProfileImage(imgSrc);
    if (hiddenFileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      hiddenFileInputRef.current.files = dataTransfer.files;
    }
  };

  useEffect(() => {
    if (!currentUser.photo) {
      setProfileImage(ProfileImg);
    } else {
      setProfileImage(`./images/${currentUser.photo}`);
    }
  }, [currentUser.photo]);

  return (
    <div className='upload'>
      <button className="edit-profile" onClick={() => setEditOpen(true)}>
        <MdEdit className='edit-icon'/>
      </button>

      <form onSubmit={onSubmit} className='upload-form'>

        <div className='profile'>
          <h2>{currentUser.username}</h2>
          <img 
            src={profileImage} 
            alt="profile" 
            className="profile_image"
            onClick={() => setEditOpen(true)} 
          />
        </div>
    
        <div className='input_field'>
          <input type="file" id="file_input" onChange={onImageChange} hidden ref={fileInputRef}/>
          <input type="file" id="hidden_file_input" hidden ref={hiddenFileInputRef}/>
        </div>

        <div className='button_field'>
          <button type="submit" className='upload_button'>저장</button>
        </div>
      </form>
      {editOpen && (
        <ProfileEdit
          updateAvatar={updateAvatar}
          closeEdit={() => setEditOpen(false)}
        />
      )}
    </div>
  );
}

export default ProfilePicUpload;
