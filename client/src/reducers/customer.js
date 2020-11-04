const customerInitialState = {}

const customerReducer  = (state=customerInitialState, action)=>{
    switch(action.type) {
        case "GET_CUSTOMER" :{
            return {...action.payload}
        }
        case "DELETE_CUSTOMER":{
            return {...action.payload}
        }
        case "ADD_CUSTOMER":{
            return {...action.payload}
        }
        default  :{
            return state
        }
    }
}

export default customerReducer