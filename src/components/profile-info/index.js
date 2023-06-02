import { memo } from 'react';
import PropTypes from "prop-types";
import './style.css';

function ProfileInfo({ user, loading }) {
    if (loading) return <p>Идёт загрузка</p>
    return (
        <div className='Profile'>
            <h2 className='Profile-title'>Профиль</h2>
            <h4 className='Profile-subtitle'>Имя: <span>{user?.profile.name}</span></h4>
            <h4 className='Profile-subtitle'>Телефон: <span>{user?.profile.phone}</span></h4>
            <h4 className='Profile-subtitle'>email: <span>{user?.email}</span></h4>
        </div>
    );
}

ProfileInfo.propTypes = {
    user: PropTypes.object,
    loading: PropTypes.bool,
  };
  
  
export default memo(ProfileInfo);