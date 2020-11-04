import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import App from './App';
import configureStore from './store/configureStore'
import 'bootstrap/dist/css/bootstrap.min.css';
import { startGetCustomers } from './action/customers';
import { startGetDepartments } from './action/departments';
import { startGetEmployees } from './action/employees';
import { startGetEmployee } from './action/employee';
import { startGetTickets } from './action/ticket';

const store = configureStore()

store.subscribe(()=>{
    console.log(store.getState())
})

if(localStorage.getItem('authToken')){
    store.dispatch(startGetCustomers())
    store.dispatch(startGetDepartments())
    store.dispatch(startGetEmployees())
    store.dispatch(startGetEmployee())
    store.dispatch(startGetTickets())
    
}

const ele = (
    <Provider store = {store} >
        <App />
    </Provider>
)

ReactDOM.render(ele, document.getElementById('root'));
