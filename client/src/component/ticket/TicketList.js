import React from 'react'
import axios from '../../config/axios'
import TicketForm from './TicketForm'

class TicketList extends React.Component{
    constructor(){
        super()
        this.state={
            tickets:[],
            customers:[],
            // employees:[],
            departments:[],
            department:'',
            customer:'',
            priority:'',
            message:'',
            code:'DCT'+Math.round(Math.random()*100),
            isResolved:true,
            sort:[],
            arr:[['department', 'priority']]
        }
    }

    componentDidMount(){
        axios.get('/tickets',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            // console.log(Response.data)

            this.setState({tickets:response.data,sort:response.data})

        });
        axios.get('/customers',{
    headers:{
        'x-auth':localStorage.getItem('authToken')
    }
})
.then(response=>{
    // console.log(Response.data)
    this.setState({customers:response.data})

});
axios.get('/departments',{
     headers:{
         'x-auth':localStorage.getItem('authToken')
     }})
     .then(response=>{
        // console.log(Response.data)
        this.setState({departments:response.data})
    
    })
    }




allHandle=(e)=>{
    // e.preventDefault()
    // const sort=this.state.tickets
    this.state.tickets=this.state.sort
    const tickets=this.state.tickets.filter(tic=>tic.priority!=="")  
    this.setState({tickets})
    // this.props.history.push('/ticket')
}
highHandle=(e)=>{
    // e.preventDefault()
    this.state.tickets=this.state.sort
    const tickets=this.state.tickets.filter(tic=>tic.priority === "high")
    this.setState({tickets,high:tickets})
}
mediumHandle=(e)=>{
    // e.preventDefault()
    this.state.tickets=this.state.sort
    const tickets=this.state.tickets.filter(tic=>tic.priority === "medium")
    this.setState({tickets,medium:tickets})
}
lowHandle=(e)=>{
    this.state.tickets=this.state.sort
    // e.preventDefault()
    const tickets=this.state.tickets.filter(tic=>tic.priority === "low")
    this.setState({tickets,low:tickets})
}

checkHandle=(e,id)=>{
    // console.log(e.target.checked)
    // console.log(e.target.value)
    axios.put(`/tickets/${e.target.value}`,{"isResolved":e.target.checked},{headers:{
        'x-auth':localStorage.getItem('authToken')
    }})
    .then(response=>{
        // this.setState({tick})
        console.log(response.data)
    })
}

chartHandle=()=>{
    const ass=[],bss=[]
    let count=0
    this.state.departments.forEach(dep=>{
        const arr=this.state.tickets.filter(tick=>tick.department === dep._id)
        ass.push(arr.length)

    })
   this.state.departments.forEach(dep=>{
    //    console.log(dep.name)
        bss.push(dep.name)
   })

    //    console.log(bss)
    bss.forEach(b=>{
    this.state.arr.push([b,ass[count]])
        count++
    })
    //    console.log(this.state.arr)
return(
    // [
    //     ['department', 'high'],
    //     ['2014', 1000 ],
    //     ['2015', 1170 ],
    //     ['2016', 660 ],
    //     ['2017', 1030],
    // ]
this.state.arr
)

    
}

    render(){
        // console.log(this.state.tickets)
        const table={
            borderCollapse:'collapse',
            border:'1px solid black',
            boxAlign:'center',
            textContent:'center',
            //  width:'50%'
        } 
        
        return (
            <div>
                <h2 >Ticket Master</h2>
                <h3>Listing Tickets-{this.state.tickets.length}</h3>
                <button onClick={this.allHandle}>all</button>
                <button onClick={this.highHandle}>high</button>
                <button onClick={this.mediumHandle}>medium</button>
                <button onClick={this.lowHandle}>low</button>
                <table style={table}>
                    <thead >
                        <tr>
                            <th style={table}>ticket.no</th>
                            <th style={table}>customer</th>
                            <th style={table}>priority</th>
                            <th style={table}>department</th>
                            <th style={table}>Message</th>
                            <th style={table}>Resolved</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tickets.map(tick=>{
                            return (
                                <tr key={tick._id}>
                                    <td style={table}>{tick.code}</td>
                                    <td style={table}>{tick.customer.name}</td>
                                    <td style={table}>{tick.priority}</td>
                                    <td style={table}>{tick.department.name}</td>
                                    <td style={table}>{tick.message}</td>
                                    <td style={table}><input type='checkbox' onChange={(e)=>this.checkHandle(e,tick._id)}  value={tick._id} name='isResolve' checked={tick.isResolved}/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table><br/><br/>
                <TicketForm /><br/><br/><br/>

                {/* <Chart width={'500px'}
                     height={'300px'}
                     chartType="PieChart"
                     loader={<div>Loading Chart</div>}
                     data={[
                        ['priority', 'length'],
                        ['high', this.state.tickets.filter(tic=>tic.priority=="high").length],
                        ['medium', this.state.tickets.filter(tic=>tic.priority=="medium").length],
                        ['low', this.state.tickets.filter(tic=>tic.priority=="low").length],
                      ]}
                      options={{
                        title: 'priority Chart',
                      }}/>

            <Chart
            width={'500px'}
            height={'300px'}
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={this.chartHandle()}
            options={{
                chart: {
                title: 'Company Performance',
                subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                },
            }} 
            />*/}
            </div>
        )
    }
}

export default TicketList

