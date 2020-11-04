import React from 'react'
//import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import { startGetCustomer , startDeleteCustomer} from '../../action/customer'



class ShowCustomer extends React.Component{
    constructor(){
        super()
        this.state={
            customer:{}
        }
        this.removeHandle=this.removeHandle.bind(this)
    }

    componentDidMount(){
        const id=this.props.match.params.id
        this.props.dispatch(startGetCustomer(id))
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

    removeHandle(){
        const id=this.props.match.params.id
        this.props.dispatch(startDeleteCustomer(id, this.props))
        // axios.delete(`/customers/${id}`,{
        //     headers:{
        //         'x-auth':localStorage.getItem('authToken')
        //     }
        // })
        // .then(response=>{
        //     this.props.history.push('/customers')
        // })
    }
    render(){
        return (
            <div>
                <h2>show customer information</h2>
                <p>
                    {this.props.customer.name}-
                    {this.props.customer.email}-
                    {this.props.customer.mobile}
                </p>
                <Link to={`/customers/edit/${this.props.match.params.id}`}>Edit</Link>
                <button onClick={this.removeHandle}>remove</button><br/>
                <Link to='/customers'>back</Link>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        customer: state.customer
    }
}

export default connect(mapStateToProps) (ShowCustomer)