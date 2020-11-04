import React from 'react'
import axios from '../../config/axios'
import {connect} from 'react-redux'
import EmpForm from './EmpForm'

class EditEmp extends React.Component{
    constructor(props){
        super(props)
        this.state={
            employee:{}
        }
        this.submitHandle=this.submitHandle.bind(this)
    }

    // componentDidMount(){
    //     const id = this.props.match.params.id
    //     axios.get(`/employees/${this.props.match.params.id}`,{
    //         headers:{
    //             'x-auth':localStorage.getItem('authToken')
    //         }
    //     })
    //     .then(response=>{
    //         // console.log(response.data)
    //         this.setState({employee:response.data})
    //     })
    // }

    submitHandle(formData){
        const id=this.props.match.params.id
        axios.put(`/employees/${id}`,formData,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            }else{
                this.props.history.push(`/employee/${response.data._id}`)
            }
        })
        .catch(err=>{
            alert(err)
        })
    }
    render(){
        // console.log(this.state.employee.department && this.state.employee.department.name)

        return (
            <div>
                <h2>Edit Employee Info</h2>
                {Object.keys(this.props.employee).length!==0 && <EmpForm 
                employee={this.props.employee} submitHandle={this.submitHandle}/>
            }
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        employee: state.employee
    }
}


export default connect(mapStateToProps)(EditEmp)