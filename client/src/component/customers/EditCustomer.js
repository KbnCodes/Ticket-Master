import React from 'react'
//import axios from '../../config/axios'
import CustomerForm from './Form'
import {connect} from 'react-redux'
import { startEditCustomer } from '../../action/customer'

class EditCustomer extends React.Component{
    constructor(){
        super()
        this.state={
            customer:{}
        }
    }

    componentDidMount(){
        //const id=this.props.match.params.id
        // axios.get(`/customers/${id}`,{
        //     headers:{
        //         'x-auth':localStorage.getItem('authToken')
        //     }
        // })
        // .then(response=>{
        //     // console.log(response.data)
        //     const customer=response.data
        //     this.setState({customer})
        // })
    }

    handleSubmit=(formData)=>{
        const id=this.props.match.params.id
        this.props.dispatch(startEditCustomer(formData, id, this.props))
        // axios.put(`/customers/${id}`,formData,{
        //     headers:{
        //         'x-auth':localStorage.getItem('authToken')
        //     }
        // })
        // .then(response=>{
        //     if(response.data.hasOwnProperty('errors')){
        //         alert(response.data.message)
        //     }else{
        //         this.props.history.push(`/customers/${response.data._id}`)
        //     }
        // })
        // .catch(err=>{
        //     alert(err)
        // })
    }
    render(){
        return (
            <div>
                <h2>Edit Customer Information</h2>
                {Object.keys(this.props.customer).length!==0 && <CustomerForm 
                customer={this.props.customer} handleSubmit={this.handleSubmit}
                />}
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        customer: state.customer
    }
}

export default connect(mapStateToProps) (EditCustomer)