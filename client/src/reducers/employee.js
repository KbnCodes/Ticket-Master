const employeeInitialState = {}

const employeeReducer = (state = employeeInitialState, action)=>{
    switch(action.type) {
        case "GET_EMPLOYEE":{
            return {...action.payload}
        }
        
        default: {
            return {...state}
        }
    }
}
export default employeeReducer