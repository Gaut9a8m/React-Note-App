import React from 'react';
import api from '../api/backapi';

class Detail extends React.Component{
    state={
        username:'',
        title:'',
        category:'',
        desc:'',
        cod:''
    }

    componentDidMount(){
        if(!localStorage.getItem('userid')){
            this.props.history.replace('/')
        }

        let url = '/notes/'+this.props.match.params.id;
        api.get(url)
        .then(res=>{
            // console.log('myid',res.data)
            this.setState({
                _id:res.data._id,
                username:res.data.userName,
                title:res.data.title,
                category:res.data.category,
                desc:res.data.description,
                cod:res.data.createdAt,
                uod:res.data.updatedAt,
                userId:res.data.userId
            })
        })
        .catch(err=>{
            console.log(err)
        })
    } 
    
    handleDelete=(event)=>{
        let url='/notes/'+this.state._id;
            api.delete(url)
            .then(res=>{
                console.log(res)
                if(res.status === 200){
                    this.props.history.replace('/')
                    // event.preventDefault();
                }
                else{
                    this.props.history.replace('*')
                }
                
            })
            .catch(err=>{
                console.log(err)
                this.props.history.replace('/*')
            })
    }
    
    render(){
        
        return (
            <div>
                <a href="/"><div className="btn btn-warning back-btn px-4 mt-2 ml-2">&lt;&lt; Home</div></a>
                {(this.state.title != '')?<div className="post-detail">
                {(this.state.userId === localStorage.getItem('userid'))? <div>
                    <a onClick={this.handleDelete} style={{cursor:'pointer'}}><i class="fa fa-minus-circle" style={{float:'left',color:'red',fontSize:'20px'}}></i></a>
                    <a href={'/update/'+this.state._id}><i class="fa fa-edit" style={{float:'right',color:'red',fontSize:'20px', paddingLeft:'10px'}}></i></a>
                    </div> : <div></div> }
                   
                    <h2>{this.state.title}</h2>
                    <hr className="dash" />
                    <b>- Category -</b>
                    <h3 style={{fontSize:'15px',textAlign:'center'}}> {this.state.category}</h3>
                    <h3 style={{fontSize:'15px',fontWeight:'400',textAlign:'center',fontWeight:'600'}}>- Description -</h3>
                    <p style={{fontSize:'16px',color:'black', textAlign:'center'}}>{this.state.desc}</p>
                    {(this.state.userId === localStorage.getItem('userid'))? <h4 style={{fontSize:'12px',color:'green',fontWeight:'900'}}>- You -</h4>: <h4 style={{fontSize:'12px',color:'green',fontWeight:'900'}}>- {this.state.username} -</h4>}
                    <div style={{fontSize:'11px',fontWeight:'800', color:'red'}}>
                        <span style={{float:'left'}} >CreatedAt: <label> {this.state.cod}</label></span>
                        <span style={{float:'right'}}>UpdatedAt: <label>{this.state.uod}</label></span>
                    </div>
                </div>:<h1 style={{fontSize:'30px', color:'white', margin:'12% 40%'}}>No Record Found</h1>}
                
            </div>
        )
    }
   
}

export default Detail;