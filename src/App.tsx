import React, { useState, useEffect } from 'react';
import { Redirect, withRouter, useHistory } from 'react-router';

import './App.scss';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.core.css';

import Section from './containers/Section';
import Loading from './components/Common/Loading';
import { getToken, setToken, removeToken } from './utils/tokenManager';
import AuthService from './services/AuthService';
import AuthContext from './contexts/AuthContext';
import AuthType from './types/AuthType';
import UserType from './types/UserType';

const TAG = 'App'

const initialAuth: AuthType = {
    isLoggedIn: false,
    user: {
        user_id: 0,
        nickname: '',
        grade: 10,
        level: 0,
        profile_path: '',
    }
};


function App() {

    const [isReady, setIsReady] = useState<boolean>(false);
    const [authInfo, setAuthinfo] = useState<AuthType>(initialAuth);
    const history = useHistory();

    useEffect(() => {
        if (navigator.userAgent.toLowerCase().indexOf('msie') !== -1) {
            alert("MicroSoft Internet Explorer에서는 홈페이지가 정상 동작하지 않을 수 있습니다.")
        }
        else if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1)) {
            alert("MicroSoft Internet Explorer에서는 홈페이지가 정상 동작하지 않을 수 있습니다.")
        }
        else {

        }
        checkToken();
    }, [])

    const checkToken = async () => {
        const accessToken = getToken();

        if (!accessToken) {
            //토큰이 없으면 logout
            history.replace({
                pathname: '/login',
                state: {
                    accessLocation: history.location
                }
            })
            authLogout();
            setIsReady(true)
        }
        else {
            // 서버에 토큰 확인 , invalid => logout, valid => 로그인 유지(연장)
            await AuthService.checkToken()
                .then((res: any) => {
                    const { token, userInfo, autoLogin } = res.data;
                    authLogin(token, autoLogin, userInfo)
                })
                .catch((err: Error) => {
                    console.error(err);
                    console.log('expired token')
                    history.replace({
                        pathname: '/login',
                        state: {
                            accessLocation: history.location
                        }
                    })
                    authLogout();
                })
        }
    }

    const authLogin = (token: string, autoLogin: boolean, userInfo: UserType) => {
        setToken(token, autoLogin);
        setIsReady(true);
        setAuthinfo({
            isLoggedIn: true,
            user: userInfo
        })
    }

    const authLogout = () => {
        removeToken();
        setIsReady(true)
        setAuthinfo(initialAuth)
    }

    return (
        <div className="snuaaa-wrapper">
            <AuthContext.Provider value={{
                authInfo: authInfo,
                authLogin: authLogin,
                authLogout: authLogout
            }}>
                {(() => {
                    if (!isReady) {
                        return <Loading />
                    }
                    else if (!authInfo.isLoggedIn && !(window.location.pathname === '/page/login' || window.location.pathname === '/page/signup')) {
                        return <Redirect to='/login' />
                    }
                    else {
                        return (
                            <Section />
                        )
                    }
                })()}
            </AuthContext.Provider>
        </div>
    )
}

export default withRouter(App);
