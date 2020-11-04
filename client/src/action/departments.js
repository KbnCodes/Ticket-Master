import axios from '../../src/config/axios'

// get deaprtments
export const getDepartments = (departments)=>{
    return {
        type: "GET_DEPARTMENTS",
        payload: departments
    }
}

export const startGetDepartments = ()=>{
    return (dispatch)=>{
        axios.get('/departments',{
            headers:{
                "x-auth":localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const departments = response.data
            console.log(response.data, 'dep')
            dispatch(getDepartments(departments))
        })
        .catch(err=>{
            alert(err)
        })
    }
}
export const addDepartments = (department)=>{
    return {
        type:"ADD_DEPARTMENTS",
        payload:department
    }
}
export const startAddDepartments = (data, props)=>{
    return(dispatch)=>{
        axios.post('/departments',data,{
            headers:{
                "x-auth":localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const department = response.data
            dispatch(addDepartments(department))
        })
        .catch((err)=>{
            alert(err)
        })
    }
}