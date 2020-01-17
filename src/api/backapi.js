import axios from 'axios';

export default axios.create({
    baseURL:'https://notes-appnode.herokuapp.com',
    headers: {'Content-Type':'application/json'}
})