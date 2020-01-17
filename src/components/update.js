import React from 'react';
import api from '../api/backapi';

class Update extends React.Component{
    state={
            post_id:'',
            title:'',
            category:'',
            description:''
    }
    componentDidMount(){
        const id = this.props.match.params.id
        api.get('/notes/'+id)
        .then(res=>{
            console.log(res.data)
            this.setState({
                post_id:res.data._id,
                title:res.data.title,
                category:res.data.category,
                description:res.data.description
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
    // params = note_id, body(title,category,description)
    // /notes/id

    handleChange=(event)=>{
        if(event.target.name === 'title'){
            this.setState({
                title:event.target.value
            })
        }
        else if(event.target.name === 'category'){
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
            console.log('state',this.state)
            let url = '/notes/'+this.state.post_id;
            let data = {
                title:this.state.title,
                category:this.state.category,
                description:this.state.description
            }
            api.put(url,JSON.stringify(data))
            .then(res=>{
                console.log(res)
                if(res.status === 200){
                    this.props.history.replace('/');
                }
            })
            .catch(err=>{
                console.log(err)
                alert("Note Not updated.")
               
            })
            event.preventDefault();
    }
    render(){
        return(
            <div>
                <a href="/"><div className="btn btn-warning back-btn px-4 mt-2 ml-2">&lt;&lt; Home</div></a>
                <div className="form form-group create-form">
                    <h3>Update Post</h3>
                    <hr />
                    <form onSubmit={this.handleSubmit} action="/">
                        <input type="text" name="title" placeholder="Post title...."  value={this.state.title} required  onChange={this.handleChange}/>
                        <input type="text" name="category" placeholder="Category...." value={this.state.category} required  onChange={this.handleChange}/>
                        <input type="text" name="description" placeholder="description...." value={this.state.description} required onChange={this.handleChange}/>
                        <button className="btn" style={{backgroundColor:'drakcayon',color:'white'}}>Add New</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Update;