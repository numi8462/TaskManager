import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadProfilePic } from '../../redux/authSlice';
import './ProfilePicUpload.scss';

function ProfilePicUpload() {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.currentUser); // get the current user from your Redux state

  const onImageChange = (event) => {
    setImage(event.target.files[0]);
    const fileNameElement = document.getElementById('selected_file_name');
    if (event.target.files.length > 0) {
      fileNameElement.textContent = event.target.files[0].name;
    } else {
      fileNameElement.textContent = '';
    }
  }

  const onSubmit = (event) => {
    event.preventDefault();

    if (image) {
      dispatch(uploadProfilePic(currentUser.id, image));
    }
  }

  return (
    <div className='upload'>
      <form onSubmit={onSubmit} className='upload-form'>
        <label className='label'>프로필 사진:</label>
        <div className='input_field'>
          <input type="file" id="file_input" onChange={onImageChange} hidden/>
          <label for="file_input" className="custom-file-upload">파일 선택</label>
          <span id="selected_file_name"></span>
        </div>
        <div className='button_field'>
          <button type="submit" className='upload_button'>저장</button>
        </div>
      </form>

    </div>

  );
}

export default ProfilePicUpload;
