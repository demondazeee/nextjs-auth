import { useRouter } from "next/router"
import { ChangeEvent, FormEvent, FormEventHandler, ReducerAction, useContext, useReducer, } from "react"
import styled from "styled-components"
import { authContext } from "../../store/AuthProvider"
import Card from "../UI/Card"
import Button from "../UI/controls/Button"
import Input from "../UI/controls/Input"

interface State{
    username: string
    password: string
}

interface Action{
    type: string
    value: string
}



const reducerFn = (state: State, action: Action): State =>{
    if(action.type === 'USERNAME_INPUT'){
        return {...state, username: action.value}
    }

    if(action.type === 'PASSWORD_INPUT') {
        return {...state, password: action.value}
    }

    return {username: '', password: ''}
}

const FormContainer = styled.div`
    padding: 2rem;

    display: flex;
    flex-direction: column;
    gap: 2rem;
`

const LoginForm = (): JSX.Element => {
    const [userState, dispatchFn] = useReducer(reducerFn, {username: '', password: ''})
    const authCtx = useContext(authContext)
    const router = useRouter()

    const registerHandler = () =>{
        router.push('/register')
    }

    const submitHandler = (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        authCtx.loginHandler(userState)
    }

    return (
        <>
           <Card>
                <form onSubmit={submitHandler}>
                    <FormContainer>
                        <div>
                            <label htmlFor='username'>Username</label>
                            <Input id='username' type='text' onChange={(e) =>{
                                dispatchFn({type: 'USERNAME_INPUT', value: e.target.value})
                            }} value={userState.username} />
                        </div>
                        <div>
                            <label htmlFor='password'>Password</label>
                            <Input type='password' id='password' onChange={(e) =>{
                                dispatchFn({type: 'PASSWORD_INPUT', value: e.target.value})
                            }} value={userState.password}/>
                        </div>
                        <Button type='submit'>Login</Button>
                        <Button type='button' onClick={registerHandler}>Register User</Button>
                    </FormContainer>
                </form>
           </Card>
        </>
    )
}

export default LoginForm