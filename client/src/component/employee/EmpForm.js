import React from 'react'
//import axios from '../../config/axios'
import {connect} from 'react-redux'

class EmpForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:props.employee ? props.employee.name:'',
            email:props.employee ? props.employee.email:'',
            mobile:props.employee ? props.employee.mobile:'',
            department:props.employee?props.employee.department._id:'',
            departments:[]
        }
        this.submitHandle=this.submitHandle.bind(this)
    }
    // componentDidMount(){
    //     axios.get(`/departments`,{
    //         headers:{
    //             'x-auth':localStorage.getItem('authToken')
    //         }
    //     })
    //     .then(response=>{
    //         // console.log(response.data)
    //         this.setState({departments:response.data})
    //     })
    // }


    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    submitHandle(e){
        e.preventDefault()
        const formData={
            name:this.state.name,
            email:this.state.email,
            mobile:this.state.mobile,
            department:this.state.department
        }
        // console.log(formData)
        this.props.submitHandle(formData)
}

// change=(name)=>{
//     console.log(name)
// }

    render(){

        const table={
            textAlign:'center',
            border:'1px solid black',
            padding:'10px',
            width:'300px',
            height:'100px'
        }
        return (
            <form onSubmit={this.submitHandle} style={table}>
                <label>name:&nbsp;
                    <input type='text' value={this.state.name} onChange={this.handleChange} name='name'/>
                </label><br/>
                <label>email:&nbsp;
                    <input type='text' value={this.state.email} onChange={this.handleChange} name='email'/>
                </label><br/>
                <label>mobile:&nbsp;
                    <input type='text' value={this.state.mobile} onChange={this.handleChange} name='mobile'/>
                </label><br/>department:&emsp;
                <select value={this.state.department} onChange={this.handleChange} name='department'>
                    <option>-----select----</option>
                    {this.props.departments.map(dep=>{
                        return <option key={dep._id} value={dep._id}>{dep.name}</option>
                    })}
                </select><br/>
                <input type='submit'/>
            </form>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        departments:state.departments
    }
}
export default connect(mapStateToProps)(EmpForm) 