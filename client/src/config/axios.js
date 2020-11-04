import Axios from 'axios'

const axios=Axios.create({
    baseURL:'http://localhost:3026'
})

export default axios