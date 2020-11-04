import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import userReducer from '../reducers/user'
import customersReducer from '../reducers/customers'
import customerReducer from '../reducers/customer'
import departmentsReducer from '../reducers/departments'
import employeesReducer from '../reducers/employees'
import employeeReducer from '../reducers/employee'
import ticketsReducer from  '../reducers/ticket'

const configureStore = ()=>{
    const store = createStore(combineReducers({
        user: userReducer,
        customers: customersReducer,
        customer: customerReducer,
        departments: departmentsReducer,
        employees: employeesReducer,
        employee:employeeReducer,
        tickets:ticketsReducer
    }), applyMiddleware(thunk))
    return store
}
export default configureStore