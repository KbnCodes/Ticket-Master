import React from 'react'
//import axios from '../../config/axios'
import {connect} from 'react-redux'
import { startAddCustomer } from '../../action/customer'
import CustomerForm from './Form'


class AddCustomer extends React.Component{
    constructor(props){
        super(props)
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleSubmit(formData){
        this.props.dispatch(startAddCustomer(formData, this.props))
        // axios.post('/customers',formData,{
        //     headers:{
        //         'x-auth':localStorage.getItem('authToken')
        //     }
        // })
        // .then(response=>{
        //     if(response.data.hasOwnProperty('errors')){
        //         alert(response.data.message)
        //     }else{
        //         this.props.history.push('/customers')
        //     }
        // })
        // .catch(err=>{
        //     alert(err)
        // })
    }
    render(){
        return (
            <div>
                <h2> Add customer</h2>
                <CustomerForm handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

export default connect() (AddCustomer)