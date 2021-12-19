import { AppProps } from "next/dist/shared/lib/router/router"
import { useRouter } from "next/router"
import React, { useContext } from "react"
import { authContext } from "../../store/AuthProvider"

const ProfilePage = (props: AppProps) => {
    const {userInfo, isLoading, isLoggedIn, logoutHandler} = useContext(authContext)
    const router = useRouter()

  
    if(isLoading){
        return <p>Loading....</p>
    }

    if(!isLoggedIn){
        router.push('/')
    }
    
    const logout = () =>{
        logoutHandler()
    }
    return (
        <>
            <p>Logged In as {userInfo.username}</p>
            <button onClick={logout}>Logout</button>
        </>
    )
}

export default ProfilePage