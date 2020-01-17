import React,{Component} from 'react';
import api from '../api/backapi';

class Createpost extends Component{
    state={
        title:'',
        category:'',
        description:'',
    }
    componentDidMount(){
        if(!localStorage.getItem('userid')){
            this.props.history.replace('/login')
        }
    }
   
    handleChange=(event)=>{
        if(event.target.name === 'title'){
            this.setState({
                title:event.target.value
            })
        }
       else if (event.target.name === 'category'){
        this.setState({
            category:event.target.value
        })
        }
        else if(event.target.name === 'description'){
            this.setState({
                description:event.target.value
            })
        }
        
    }
    handleSubmit=(event)=>{
        console.log(this.state)
        let data ={
            userId:localStorage.getItem('userid'),
            userName:localStorage.getItem('username'),
            title:this.state.title,
            category:this.state.category,
            description:this.state.description
        }
        api.post('/notes/create',JSON.stringify(data))
        .then(res=>{
            console.log(res)
            if(res.status === 200){
                this.props.history.replace('/')
            }
        })
        .catch(err=>{
            console.log(err)
            alert('error while creating.')
        })

        event.preventDefault();

    }

    render(){
        return(
            <div>
                <a href="/"><div className="btn btn-warning back-btn px-4 mt-2 ml-2">&lt;&lt; Home</div></a>
            <div className="form form-group create-form">
                <h3>Add New Post</h3>
                <hr />
                <form onSubmit={this.handleSubmit} action="/">
                    <input type="text" name="title" placeholder="Post title...."  required  onChange={this.handleChange}/>
                    <input type="text" name="category" placeholder="Category...." required  onChange={this.handleChange}/>
                    <input type="text" name="description" placeholder="description...." required onChange={this.handleChange}/>
                    <button className="btn btn-success">Add New</button>
                </form>
            </div>
        </div>
        )
    }
}

export default Createpost;