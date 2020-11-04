import React from 'react'
//import axios from '../../config/axios'
import {connect} from 'react-redux'
import { startUserLogin } from '../../action/user'

class Login extends React.Component{
    constructor(){
        super()
        this.state={
            email:'',
            password:''
        }
    }

    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            email:this.state.email,
            password:this.state.password
        }
        console.log(formData)
        // axios.post('/users/login',formData)
        //     .then(response=>{
        //         if(response.data.hasOwnProperty('errors')){
        //             alert(response.data.message)
        //         }else{
        //             const token=response.data.token
        //             localStorage.setItem('authToken',token)
        //             this.props.history.push('/')
        //             window.location.reload()
        //         }
        //     })
        this.props.dispatch(startUserLogin(formData, this.props))
    }

    render(){
        return (
            <div>
                <h2>Login Page</h2>
                <form onSubmit={this.handleSubmit}>
                <label>email:
                    <input type='text' value={this.state.email} onChange={this.handleChange} name="email"/>
                </label><br/>
                <label>password:
                    <input type='password'value={this.state.password} onChange={this.handleChange}  name="password"/>
                </label><br/>
                <input type='submit'/>
                </form>
            </div>
        )
    }
}

export default connect() (Login)