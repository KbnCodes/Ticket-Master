import React from 'react'
//import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class EmpList extends React.Component{
    constructor(){
        super()
        this.state={
            //employees:[]
        }
    }

    // componentDidMount(){
    //     axios.get('/employees',{
    //         headers:{
    //             'x-auth':localStorage.getItem('authToken')
    //         }
    //     })
    //     .then(response=>{
            
    //         this.setState({employees:response.data})
    //     })
    // }
    render(){
   
            const table={
                borderCollapse:'collapse',
                border:'1px solid black',
                boxAlign:'center',
                textContent:'center',
           
            }       
        return(
            <div>
                <h2>Employee List-{this.props.employees.length}</h2>
                <table style={table} >
                    <thead>
                        <tr style={{brder:'1px solid black'}} >
                            <th style={table} >sl.no</th>
                            <th style={table} >name</th>
                            <th style={table} >department</th>
                            <th style={table} >Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.employees.map((emp,index)=>{
                        return (
                        <tr style={table} key={emp._id}>
                            <td style={table} >{index+1}</td>
                            <td style={table} >{emp.name}</td>
                            <td style={table} >{emp.department && emp.department.name}</td>
                            <td style={table} ><Link to={`/employee/${emp._id}`}>Show</Link></td>
                        </tr>)
                    })}
                    </tbody>
                </table>
                                    
                <Link to='/employee/add'>Add</Link>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        employees:state.employees
    }
}

export default connect(mapStateToProps)(EmpList)