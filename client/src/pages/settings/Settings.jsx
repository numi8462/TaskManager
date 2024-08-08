import Sidebar from "../../components/sidebar/Sidebar";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import './Settings.scss';
import ProfilePicUpload from "../../components/profilePicUpload/ProfilePicUpload";

const Settings = () => {
    const currentUser = useSelector(state => state.auth.currentUser);
    return ( <>
        <div className="settings">
            <div className="settings__left">
            </div>
            <div className="settings__right">
                <div className="settings__right__content">
                    <h1>설정</h1>
                    <ProfilePicUpload/>

                </div>
            </div>
        </div>
    </> );
}
  
 export default Settings;