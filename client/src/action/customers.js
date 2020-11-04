import axios from '../../src/config/axios'
import Swal from 'sweetalert2'


export const getCustomers = (customers)=>{
    return {
        type: "GET_CUSTOMERS",
        payload: customers
    }
}
export const startGetCustomers = ()=>{
    return (dispatch)=>{
        axios.get('/customers', {
            headers:{
                "x-auth": localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const customers = response.data
            dispatch(getCustomers(customers))
        })
        .catch(err=>{
            Swal.fire(err)
        })
    
    }
}