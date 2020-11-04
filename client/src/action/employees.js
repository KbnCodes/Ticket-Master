import axios from '../../src/config/axios'
//import Swal from 'sweetalert2'

export const getEmployees = (emp)=>{
    return {
        type:"GET_EMPLOYEES",
        payload: emp
    }
}
export const startGetEmployees = ()=>{
    return(dispatch)=>{
        axios.get('/employees',{
            headers:{
                "x-auth": localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const employees = response.data
            dispatch(getEmployees(employees))
        })
        .catch((err)=>{
            alert(err)
        })
    }
}