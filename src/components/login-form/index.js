import { memo, useState } from "react";
import PropTypes from 'prop-types';
import './style.css';

function LoginForm({ onLogin, onToken, error, loading }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const login = (e) => {
        e.preventDefault();
        onLogin(username, password);
        onToken();
    }

    if (loading) return <p>Идёт загрузка</p>
    return (
        <div className='Login'>
            <h2 className='Login-title'>Вход</h2>
            <form className='Login-form'>
                <h4 className='Login-input-title'>Логин</h4>
                <input type='text' className='Login-input' onChange={(e) => setUsername(e.target.value)} />
                <h4 className='Login-input-title'>Пароль</h4>
                <input type='password' className='Login-input' onChange={(e) => setPassword(e.target.value)} />
                {error && <p className='Login-error'>{error}</p>}
                <button className='Login-button' onClick={(e) => login(e)}>Войти</button>
            </form>
        </div>
    )
}


export default memo(LoginForm);
