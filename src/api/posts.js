import axios from 'axios';
export default axios.create({
    base: 'http://localhost:3500/posts'
});