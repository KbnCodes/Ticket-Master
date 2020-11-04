import React from 'react'
import {connect} from 'react-redux'
import EmpForm from './EmpForm'
//import axios from '../../config/axios'
import { startAddEmployee } from '../../action/employee'

class AddEmp extends React.Component{
    constructor(){
        super()
        this.submitHandle=this.submitHandle.bind(this)
    }

    submitHandle(formData){
        this.props.dispatch(startAddEmployee(formData, this.props))

    //     axios.post('/employees',formData,{
    //     headers:{
    //         'x-auth':localStorage.getItem('authToken')
    //     }
    // })
    // .then(response=>{
    //     if(response.data.hasOwnProperty('errors')){
    //         alert(response.data.message)
    //     }else{
    //         this.props.history.push('/employee')
    //     }
    // })
    // .catch(err=>{
    //     alert(err)
    // })

    }
    render(){
        return (
            <div>
                <h2>Add Employee</h2>
                <EmpForm submitHandle={this.submitHandle}/>
            </div>
        )
    }
}

export default connect() (AddEmp)