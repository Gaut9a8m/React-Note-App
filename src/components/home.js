import React,{Component} from 'react';
import api from '../api/backapi';
import Post from './post';

class Home extends Component{

    state={
        notes:[],
        serachBy:'',
        searchitem:[],
        query:''
    }
    
    componentDidMount(){
        if(!localStorage.getItem('userid')){
            this.props.history.replace('/login')
        }
        
        api.get('/notes')
        .then(res=>{
            // console.log(res.data.notes) 
            this.setState({
                notes:res.data.notes
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }

    handleform=(event)=>{
        console.log(event)
        event.preventDefault();
    }
    handleLogout=(event)=>{
        localStorage.clear()
        this.props.history.replace('/login')
    }

    handleSelect=(event)=>{
        // console.log(event.target.value)
        this.setState({
            serachBy:event.target.value,
            searchitem:[]

        })
        // notes/byTitle/queryparam

        // notes/byCategory/queryparam
    }
    handleSearch=(event)=>{
        // console.log(event.target.value)
        let query = event.target.value;
        this.setState({
            query:query
        })
        if(query != ''){
            if(this.state.serachBy === 'category'){
                // notes/byCategory/queryparam
                api.get('/notes/byCategory/'+query)
                .then(res=>{
                    // console.log(res)
                    this.setState({
                        searchitem:res.data
                    })
                })
                .catch(err=>{
                    console.log(err)
                  
                })
          }
          else{
                // notes/byTitle/queryparam
                this.setState({
                    serachBy:'title'
                })
                api.get('/notes/byTitle/'+query)
                .then(res=>{
                    // console.log(res)
                    this.setState({
                        searchitem:res.data
                    })
                })
                .catch(err=>{
                    console.log(err)
                    
                })
          }
        }
        else{
            this.setState({
                searchitem:[],
                query:''
            })
        }
        
    }

    render(){
        const notesarr= this.state.notes;
        const searcharr= this.state.searchitem;
        // console.log('search length',this.state.serachBy.length)
        return(
            <div>
                <div className="header-content">
                    <div className=" d-flex flex-row justify-content-around p-2">
                        <a href="/create"  className="m-2" style={{fontSize:'15px',color:'white',fontWeight:'800', border:'1px solid white', padding:'5px', borderRadius:'5px'}}>Create</a>
                        <div className="m-2 search-form">
                        
                            <form onSubmit={this.handleform}>
                            <select onChange={this.handleSelect} style={{fontSize:'15px',color:'white',fontWeight:'800', border:'1px solid white', padding:'5px', borderRadius:'5px'}}>
                                <option value="title" style={{color:'black'}}>Title</option>
                                <option value="category" style={{color:'black'}}>Category</option>   
                            </select>
                                <input type="text" name="search" placeholder="Search..." onChange={this.handleSearch}/>
                            </form>
                        </div> 
                        <a onClick={this.handleLogout} className="m-2" style={{fontSize:'15px',color:'white',fontWeight:'800', border:'1px solid white', padding:'5px', borderRadius:'5px',cursor:'pointer'}}>Logout</a>
                     </div>   
                </div>
                {(this.state.query.length === 0 && searcharr.length === 0 )? <div className="post-content">
                    <div className="d-inline-flex align-content-between flex-wrap">
                    {Object.keys(notesarr).map(key=>
                            
                          <Post userId={notesarr[key].userId} username={notesarr[key].userName} id={notesarr[key]._id} title={notesarr[key].title} category={notesarr[key].category} key={notesarr[key]._id} />   
                    )}
                    </div>
                </div> : <div className="post-content">
                    <div className="d-inline-flex align-content-between flex-wrap">
                    {Object.keys(searcharr).map(key=>
                            
                          <Post userId={searcharr[key].userId} username={searcharr[key].userName} id={searcharr[key]._id} title={searcharr[key].title} category={searcharr[key].category} key={searcharr[key]._id} />   
                    )}
                    </div>
                </div>}
                


            </div>
        )
    }
}
export default Home;