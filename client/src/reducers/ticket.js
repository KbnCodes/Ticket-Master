const ticketsInitialState = []

const ticketsReducer = (state =ticketsInitialState , action)=>{
    switch(action.type) {
        case "GET_TICKETS":{
            return [...action.payload]
        }
        default : {
            return [...state]
        }
    }
}
export default ticketsReducer