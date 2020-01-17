import React,{Component} from 'react';
import http from '../api/backapi';



class Login extends Component{
    componentDidMount(){
        if(localStorage.getItem('userid')){
            this.props.history.replace('/')
        }
    }

    state={
        email:'',
        password:'',
        name:'',
        id:''
    }
    handleChange=(event)=>{
            if(event.target.name==='email'){
                this.setState({
                    email:event.target.value
                })
            }
            else if(event.target.name==='password'){
                this.setState({
                    password:event.target.value
                })
            }
    }
    handleSubmit=(event)=>{
        
        let data={
            'email':this.state.email,
            'password':this.state.password
        }
        // console.log("here we go",data)
        http.post('/login',JSON.stringify(data))
        .then(res=>{
            console.log(res)
            if(res.status === 200){
                this.setState({
                    id:res.data.id,
                    name:res.data.name
                })
                localStorage.setItem('userid',res.data.id)
                localStorage.setItem('username',res.data.name)
                this.props.history.replace("/")    
            }  
            
        })
        .catch(e=>{
            console.log(e);
            alert("invalid password or email");
          
        })
        event.preventDefault();
       
    }


    render(){
        return(
            <div className="login-page">
                <div className="form">
                    <form className="login-form" onSubmit={this.handleSubmit}>
                    <input type="email" name="email" placeholder="useremail" onChange={this.handleChange} required/>
                    <input type="password" name="password" placeholder="password" onChange={this.handleChange} required/>
                    <button style={{backgroundColor:'drakcayon',color:'white'}}>login</button>
                    </form>
                </div>
            </div>
            
        )
    }
}

export default Login;