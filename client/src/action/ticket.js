import axios from '../../src/config/axios'

export const getTickets = (tickets)=>{
    return {
        type: "GET_TICKETS",
        payload: tickets
    }
}
export const startGetTickets = ()=>{
    return(dispatch)=>{
        axios.get('/tickets',{
            headers:{
                "x-auth": localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const tickets = response.data
            dispatch(getTickets(tickets))
            window.location.reload()
        })
        .catch(err=>{
            alert(err)
        })
    }
}