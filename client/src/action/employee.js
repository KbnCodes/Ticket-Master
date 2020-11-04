import axios from '../../src/config/axios'
import Swal from 'sweetalert2'

export const getEmployee=(emp)=>{
    return {type:"GET_EMPLOYEE",payload:emp}
}

export const startGetEmployee=(id)=>{
    return (dispatch)=>{
        axios.get(`/employees/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            dispatch(getEmployee(response.data))
        })
    }
}

export const startDeleteEmployee = (id,props)=>{
    return(dispatch)=>{
        axios.delete(`/employees/${id}`,{
            headers:{
                "x-auth":localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            props.history.push('/employees')
        })
    }
}



export const startAddEmployee = (data, props)=>{
    return(dispatch)=>{
        axios.post('/employees', data, {
            headers:{
                "x-auth":localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            if(response.data.hasOwnProperty('errors')){
                Swal.fire('form should not be blank','','please fill')
            }else{
                
                props.history.push('/employees')
            }
        })
    }
}


export const startEditEmployee = (data,props,id)=>{
    return(dispatch)=>{
        axios.put(`/employees/${id}`,data,{
            headers:{
                "x-auth":localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            if(response.data.hasOwnProperty('errors')){
                Swal.fire(response.data.message)
            } else {
                props.history.push(`/employees/${response.data._id}`)
                Swal.fire('succesfully Edited!','','success')
            }
            
        })
        .catch(err=>{
            alert(err)
        })
       
    }
}
