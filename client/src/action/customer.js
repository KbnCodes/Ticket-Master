import axios from '../../src/config/axios'
import Swal from 'sweetalert2'



// Get customer
export const getCustomer = (customer)=>{
    return {
        type: "GET_CUSTOMER",
        payload: customer
    }
}
export const startGetCustomer = (id)=>{
    return(dispatch)=>{
        axios.get(`/customers/${id}`,{
            headers:{
                "x-auth": localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const customer = response.data
            dispatch(getCustomer(customer))
        })
    }
}

// Delete Customer
export const deleteCustomer = (customer)=>{
    return {
        type: "DELETE_CUSTOMER",
        payload: customer
    }
}

export const startDeleteCustomer = (id, props)=>{
    return (dispatch)=>{
        axios.delete(`/customers/${id}`, {
            headers:{
                "x-auth": localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            Swal.fire({
                title: "Are you sure?",
                text: "You will not be able to recover the customer information",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: "No, cancel it!",
            }).then(result=>{
                if(result.value){
                    props.history.push('/customers')
                }
            })
        })
        .catch(err=>{
            Swal.fire({
                title:err
            })
        })
    }
}

// add Form
export const addCustomer = (customer)=>{
    return {
        type: "ADD_CUSTOMER",
        payload: customer
    }
}

export const startAddCustomer = (data,props)=>{
    return (dispatch)=>{
        axios.post('/customers', data,{
            headers:{
               "x-auth": localStorage.getItem('authToken') 
            }
        })
        .then((response)=>{
            if(response.data.hasOwnProperty('errors')){
                Swal.fire('form cannot be blank, please fill')
            }else{
                dispatch(addCustomer())
                props.history.push('/customers')
                Swal.fire('succesffuly added','','success')
                
                
            }
        })
        .catch((err)=>{
            alert(err)
        })
    }
}


// Edit Customer 

export const startEditCustomer=(data,id,props)=>{
    return (dispatch)=>{
        axios.put(`/customers/${id}`,data,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            if(response.data.hasOwnProperty('error')){
                alert(response.data.message)
            }else{
                props.history.push(`/customers/${response.data._id}`)
                Swal.fire('successfully Edited.!','','success')
            }
        })
        .catch(err=>{
            alert(err)
        })
    }
}





