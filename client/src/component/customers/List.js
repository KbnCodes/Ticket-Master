import React from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import { startGetCustomers } from '../../action/customers';

class CustomerList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            customers:[],
            check:[]
        }
    }

    componentDidMount(){
        // axios.get('/customers',{
        //     headers:{
        //         'x-auth':localStorage.getItem('authToken')
        //     }
        // })
        // .then(response=>{
        //     // console.log(response.data)
        //     const customers=response.data
        //     this.setState({customers})
        // })
        // .catch(err=>{
        //     alert(err)
        // })
        this.props.dispatch(startGetCustomers())
    }

  

    render(){
        return (
            <div>
              
                <h2>ListingCustomers-{this.props.customers.length}</h2>
                <ul>
                    {this.props.customers.map(customer=>{
                        return (
                            <li key={customer._id}><Link to={`/customers/${customer._id}`}>{customer.name}</Link></li>
                    )})}
                </ul>
                <Link to='/customers/add'>Add Customer</Link>

            </div>
        )
    }

   
}
const mapStateToProps = (state)=>{
    return {
        customers :state.customers
    }
}

export default connect(mapStateToProps) (CustomerList)