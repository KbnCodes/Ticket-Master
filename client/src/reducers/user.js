const userInitialState = {}

const userReducer = (state = userInitialState, action) =>{
    switch(action.type) {
        case "SET_USER_REGISTER" : {
            return {...action.payload}
        }
        case "SET_USER_LOGIN":{
            return {...action.payload}
        }
        default: {
            return state
        }
    }
}

export default userReducer