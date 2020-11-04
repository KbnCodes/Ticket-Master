import React from 'react'
import {connect} from 'react-redux'
import axios from '../../config/axios'


class TicketForm extends React.Component{
    constructor(){
        super()
        this.state={
            tickets:[],
            customers:[],
            // employees:[],
            departments:[],
            department:'',
            customer:'',
            priority:'',
            message:'',
            code:'DCT'+Math.round(Math.random()*100),
            isResolve:false,
            sort:[]
        }
    }

    componentDidMount(){
        axios.get('/tickets',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            // console.log(Response.data)
            this.setState({tickets:response.data,sort:response.data})

        });
        axios.get('/customers',{
    headers:{
        'x-auth':localStorage.getItem('authToken')
    }
})
.then(response=>{
    // console.log(Response.data)
    this.setState({customers:response.data})

});
axios.get('/departments',{
     headers:{
         'x-auth':localStorage.getItem('authToken')
     }})
     .then(response=>{
         this.setState({departments:response.data})
     })   

    }
    handleChange=(e)=>{
        // e.preventDefault()
        this.setState({[e.target.name]:e.target.value})
    }

    submitHandle=(e)=>{
        e.preventDefault()
        const formData={
            customer:this.state.customer,
            department:this.state.department,
            priority:this.state.priority,
            code:this.state.code,
            message:this.state.message  
        }
        // console.log(formData)
        axios.post('/tickets',formData,{
                headers:{
                    'x-auth':localStorage.getItem('authToken')
                }
            })
            .then(response=>{
                if(response.data.hasOwnProperty('errors')){
                    alert(response.data.message)
                }else{
                    window.location.reload()
                }
            })
            .catch(err=>{
                alert(err)
            })
    }

    render(){
        const formStyle={
            textAlign:'center',
            border:'1px solid black',
            padding:'10px',
            width:'300px',
            height:'188px'
        }
        console.log('customers',this.props.customers)
        console.log('departments', this.props.departments)
        return (
                    <form style={formStyle} onSubmit={this.submitHandle}>
                    <label>customer:
                    <select value={this.props.customers} onChange={this.handleChange} name='customer'>
                        <option>---select customer---</option>
                        {this.props.customers.map(cust=>{
                            return <option key={cust._id} value={cust._id}>{cust.name}</option>
                        })}
                    </select>
                    </label><br/><br/>
                    <label>department:
                    <select value={this.props.departments} onChange={this.handleChange} name='department'>
                    <option>---select department---</option>
                        {this.props.departments.map(dep=>{
                            return <option key={dep._id} value={dep._id}>{dep.name}</option>
                        })}
                    </select>
                    </label><br/><br/>
                    <label >priority:
                        <input type='radio' name='priority' value='high' onChange={this.handleChange}/>high
                        <input type='radio' name='priority' value='medium' onChange={this.handleChange}/>medium
                        <input type='radio' name='priority' value='low' onChange={this.handleChange}/>low
                    </label><br/><br/>
                    <label > message:
                    <textarea value={this.state.message} onChange={this.handleChange} name='message'></textarea>
                    </label><br/><br/>
                    <input type='submit'/>
                </form>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        customers: state.customers,
        departments: state.departments
    }
}

export default connect(mapStateToProps)(TicketForm)
