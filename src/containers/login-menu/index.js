import { memo, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import './style.css';

function LoginMenu() {
    const store = useStore();
    useEffect(() => {
        callbacks.onToken();
    }, [])
    const callbacks = {
        onToken: useCallback(() => store.actions.login.getUser()),
        onLogout: useCallback(() => store.actions.login.logout())
    };

    const select = useSelector(state => ({
        auth: state.login.auth,
        user: state.login.user,
        loading: state.login.loading,
    }));

    return (
        <div className='Login-menu'>
            {select.auth
                ?
                <>
                    <Link to='/profile' className='Login-menu-title'>{select.user?.profile.name}</Link>
                    <button className='Login-menu-button' onClick={callbacks.onLogout}>Выход</button>
                </>
                :
                <Link to='/login'><button className='Login-menu-button'>Вход</button></Link>}
        </div>
    );
}

export default memo(LoginMenu);