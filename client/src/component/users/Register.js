import React from 'react'
//import axios from '../../config/axios'
import {connect} from 'react-redux'
import { startUserRegister } from '../../action/user'

class Register extends React.Component{
    constructor(){
        super()
        this.state={
            username:'',
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
            username:this.state.username,
            email:this.state.email,
            password:this.state.password
        }
        console.log(formData)
        // axios.post('/users/register',formData)
        //     .then(response=>{
        //         if(response.data.hasOwnProperty('errors')){
        //             alert(response.data.message)
        //         }else{
        //             this.props.history.push('/users/login')
        //         }
        //     })
        this.props.dispatch(startUserRegister(formData, this.props))
    }

    render(){
        return (
            <div>
                <h2>Register Page</h2>
                <form onSubmit={this.handleSubmit}>
                <label>name:
                    <input type='text' value={this.state.name} onChange={this.handleChange} name="username"/>
                </label><br/>
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

export default connect() (Register)