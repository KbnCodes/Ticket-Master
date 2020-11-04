import React from 'react'
//import axios from '../../config/axios'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { startGetEmployee } from '../../action/employee'
import { startDeleteEmployee} from '../../action/employee'


class EmpShow extends React.Component{
    constructor(){
        super()
        this.state={
            employee:{}
        }
        this.removeHandle=this.removeHandle.bind(this)
    }

    removeHandle(){
        const id = this.props.match.params.id
        this.props.dispatch(startDeleteEmployee(id,this.props))
        // axios.delete(`/employees/${this.props.match.params.id}`,{
        //     headers:{
        //         'x-auth':localStorage.getItem('authToken')
        //     }
        // })
        // .then(response=>{
        //     // this.setState(prevState=>({employee:prevState.employee.filter(emp=>emp._id!==response.data._id)}))
        //     this.props.history.push('/employee')
        // })
    }

    componentDidMount(){
        const id = this.props.match.params.id
        this.props.dispatch(startGetEmployee(id, this.props))
        // axios.get(`/employees/${id}`,{
        //     headers:{
        //         'x-auth':localStorage.getItem('authToken')
        //     }
        // })
        // .then(response=>{
        //     // console.log(response.data)
        //     this.setState({employee:response.data})
        // })
    }
    render(){
        console.log('emp', this.props.employee)
        return (
            <div>
                <h2>Employee Info</h2>
                <h3>
                    {this.props.employee.name} - {this.props.employee.email}:-{this.props.employee.department && this.props.employee.department.name}
                </h3>
                <Link to={`/employee/edit/${this.props.match.params.id}`}>Edit</Link>
                <button onClick={this.removeHandle}>Delete</button>

            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
       employee: state.employee 
    }
}

export default connect(mapStateToProps)(EmpShow)