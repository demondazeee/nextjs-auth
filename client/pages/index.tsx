import { useRouter } from "next/router"
import { useContext } from "react"
import LoginForm from "../components/Users/LoginForm"
import { authContext } from "../store/AuthProvider"

const HomePage = () => {
  const authCtx = useContext(authContext)
  const router = useRouter()

  if(authCtx.isLoading){
    return <p>Loading....</p>
  }

  if(authCtx.isLoggedIn){
    router.push('/profile')
  }

  return (
    <>
      <LoginForm />
    </>
  )
}

export default HomePage