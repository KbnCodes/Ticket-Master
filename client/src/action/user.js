import axios from '../../src/config/axios'
import Swal from 'sweetalert2'

export const userRegister = (user)=>{
    return {
        type: "SET_USER_REGISTER",
        payload: user
    }
}
export const startUserRegister = (formData, props)=>{
    return(dispatch)=>{
        axios.post('/users/register', formData)
            .then((response)=>{
                if(response.data.hasOwnProperty('errors')){
                    Swal.fire(response.data.message)
                }else{
                    dispatch(userRegister())
                    props.history.push('/users/login')
                }
            })
            .catch((err)=>{
                Swal.fire(err)
            })
    }
}

export const userLogin =(user)=>{
    return {
        type: "SET_USER_LOGIN",
        payload: user
    }
}

export const startUserLogin = (formData, props)=>{
    return (dispatch)=>{
        axios.post('/users/login', formData)
            .then((response)=>{
                if(response.data.hasOwnProperty('errors')){
                    Swal.fire(response.data.message)
                }else{
                    const token = response.data.token
                    localStorage.setItem('authToken', token)
                    dispatch(userLogin(token))

                    props.history.push('/')
                    window.location.reload()
                }
            })
            .then((err)=>{
                Swal.fire(err)
            })
    }
}