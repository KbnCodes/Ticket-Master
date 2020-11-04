const departmentsInitialState = []

const departmentsReducer = (state = departmentsInitialState, action)=>{
    switch(action.type) {
        case "GET_DEPARTMENTS":{
            return [...action.payload]
        }
        case "ADD_DEPARTMENTS":{
            return [...state,action.payload]
        }
        default: {
            return state
        }
    }
}
export default departmentsReducer