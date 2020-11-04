import React from 'react'
import {connect} from 'react-redux'
import { startAddDepartments } from '../../action/departments'

class DepList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            // departments:[],
            text:'',
            check:[]
        }
      
    }

    // componentDidMount(){
    //     //this.props.dispatch(startGetDepartments())
    //     axios.get('/departments',{
    //         headers:{
    //             'x-auth':localStorage.getItem('authToken')
    //         }
    //     })
    //     .then(response=>{
    //         // console.log(response.data)
    //         const departments=response.data
    //         this.setState({departments})
    //     })
    //     .catch(err=>{
    //         alert(err)
    //     })
    // }

    handleClick=(e)=>{
        const text=e.target.value
        this.setState({text})
    }

    addHandle=()=>{
        const data = {"name":this.state.text}
       this.props.dispatch(startAddDepartments(data))
        // axios.post('/departments',{"name":this.state.text},{
        //     headers:{
        //         'x-auth':localStorage.getItem('authToken')
        //     }
        // })
        // .then(response=>{
    
        //     window.location.reload()
        // })
        // .catch(err=>{
        //     alert(err)
        // })
    }

    CheckHandle=(e,id)=>{
        const array=[...this.state.check]
        
        if(e.target.checked){
            array.push(id)
            this.setState({check:array})

        }else{
            const num=this.state.check.indexOf(id)
           array.splice(num,1)
           this.setState({check:array})
        }

    }

    removeHandle=()=>{
        this.state.check.forEach(chk=>{
       
            const num=this.props.departments.indexOf(this.props.departments.find(id=>id._id === chk))
            this.props.departments.splice(num,1)
        })
        this.setState({check:[]})
    }

    render(){
        console.log(this.props.departments, 'departments')
        return (
            <div>
                <h2>List of Department-{this.props.departments.length}</h2>
                <h2>Add</h2>
                <form onSubmit={this.addHandle}>
                <input type='text' value={this.state.text} onChange={this.handleClick}/>
                <input type="submit" value="Add"  />
                </form>
                <br/>
            {/* <button onClick={this.addHandle}>Add</button><br/><br/><br/> */}
                <table style={{border:'1px solid black'}}>
                    <thead>
                        <tr style={{border:'1px solid black'}}>
                            <th style={{border:'1px solid black'}}>sl.no</th>
                            <th style={{border:'1px solid black'}}>Name</th>
                            <th style={{border:'1px solid black'}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                            { this.props.departments.map(department=>{
                                return (
                                    <tr style={{border:'1px solid black'}} key={department._id}>
                                        <td style={{border:'1px solid black'}}>{department._id}</td>
                                        <td style={{border:'1px solid black'}}>{department.name}</td>
                                        <td style={{border:'1px solid black'}}><button>Edit</button><button>Delete</button></td>
                                    </tr>                                    
                                )
                            })}
                        
                    </tbody>
                </table>
                

            </div>
        )
    }
}
const mapStateToProps =(state)=>{
    return {
        departments:state.departments
    }
}

export default connect(mapStateToProps)(DepList)