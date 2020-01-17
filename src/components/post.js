import React,{Component} from 'react';

class Post extends Component{

    state={
        color:[]
    }
    
    componentDidMount(){
        if(!localStorage.getItem('userid')){
            this.props.history.replace('/login')
        }
        this.setState({
            color:['#EEDD82','#CCF0C8','#FFCCBC','#FFF0D5','#FFBCDE','#CCE697','#B4ECEA','white','#E0FCF4', '#B5FFD5']
        })
    }
    render(){
        let rand =  1 + (Math.random() * (10-1))
        // console.log(typeof(Math.ceil(rand)))
        rand = parseInt(rand)
        let user = localStorage.getItem('userid');
        // console.log(localStorage.getItem('userid'),this.props.userId);
        return(
         
            <div className="post p-4 m-4" key={this.props.id} style={{textAlign:'center',minWidth:'280px',backgroundColor:'white'}}>
                <p></p>
                <h1 className="" style={{fontSize:'28px',fontWeight:'800'}}>{this.props.title}</h1>
                <p className="" style={{fontSize:'18px'}}>({this.props.category})</p>
                <p className="text-danger" style={{fontSize:'12px' ,marginBottom:'0'}}>By</p>
                
                {(this.props.userId === user) ? <p className="text-danger" style={{fontSize:'12px',fontWeight:'900',color:'green'}}>- You -</p> : <p className="text-danger" style={{fontSize:'12px',fontWeight:'900',color:'green'}}>- {this.props.username} -</p> }
                
                <a className="btn btn-back" href={'detail/'+this.props.id}>see more</a>
            </div>
        )
    }
}

export default Post;