import { createContext, ReactComponentElement, useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
import { UserCredentials } from "../interface/users/user-credentials.interface";
import { UserInfo } from "../interface/users/user-info";
import { useRouter } from "next/router";

const userObj: UserInfo= {
    _id: '',
    username: '',
    token: ''
};

export const authContext = createContext({
    userInfo: userObj,
    loginHandler: (userObj: UserCredentials) =>{},
    logoutHandler: () => {},
    registerHandler: (userObj: UserCredentials) => {},
    isLoggedIn: false,
    isLoading: true
})

const AuthProvider = (props: React.PropsWithChildren<{}>): JSX.Element =>{
    const [userInfoState, setUserInfoState] = useState(userObj)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const api = useAxios()
    const router = useRouter()

    useEffect(() =>{
        refreshToken()
        if(isLoggedIn){ 
            const interval = setInterval(() =>{
                refreshToken()
            }, 5000)

            return () => {
                clearInterval(interval)
            }
        }
    }, [isLoggedIn])

    const refreshToken = async () =>{
        try{
            const res = await api.get('/auth/refresh-token', {withCredentials: true})

            const data = res.data
            setUserInfoState(data)
            setIsLoggedIn(true)
            setIsLoading( false)
        } catch(e){
            setUserInfoState(userObj)
            setIsLoggedIn(false)
            setIsLoading(false)
        }
    }

    const registerHandler = async (authObj: UserCredentials) => {
        try{
            const res = await api.post('/auth/create', authObj)

            const data = res.data
            setUserInfoState(data)
            setIsLoggedIn(true)
            setIsLoading( false)
            router.push('/profile')
        } catch(e){
            console.log(e)
            setUserInfoState(userObj)
            setIsLoggedIn(false)
            setIsLoading(false)
        }   
    }

    const loginHandler = async (authObj: UserCredentials) =>{
        try{
            const res = await api.post('/auth/login', authObj)

            const data = res.data
            setUserInfoState(data)
            setIsLoggedIn(true)
            setIsLoading( false)
            router.push('/profile')
        } catch(e){
            console.log(e)
            setUserInfoState(userObj)
            setIsLoggedIn(false)
            setIsLoading(false)
        }        
    }
    

    const logoutHandler = async () => {
        try{
            const res = await api({
                url: '/auth/logout',
                method: 'POST',
                data: {},
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${userInfoState.token}`
                }
            })
            setUserInfoState(userObj)
            setIsLoggedIn(false)
            setIsLoading(false)
        } catch(e: any){
            console.log(e.response)
        }
    }

    const contextValues = {
        userInfo: userInfoState,
        loginHandler,
        logoutHandler,
        registerHandler,
        isLoggedIn,
        isLoading
    }
    return (
       <authContext.Provider value={contextValues}>
           {props.children}
       </authContext.Provider>
    )
}

export default AuthProvider