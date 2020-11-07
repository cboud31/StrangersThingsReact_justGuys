import React, { useState, useEffect } from "react";
import { fecthPost, getPost } from "../api";


const Posts = (props) => {
    const [ newPost, setNewPost ] = useState({});
const [ posts, setPosts ] = useState([]);
const [ description, setDescription ] = useState('');
const [ location, setLocation ] = useState('');
const [ price, setPrice ] = useState('');
const [ title, setTitle ] = useState('');
const [ willDeliver, setWillDeliver ] = useState(false);

    useEffect(() => {
        getPost().then((result) =>  {
            setPosts(result.posts);
        })
      }, [])




const handleSubmit = (event)=> {
 event.preventDefault();
 //creates post object to pass as body of Post
    const newPost = {

        description,
        location,
        price,
        willDeliver,
        title
    }

    fecthPost(newPost).then((results)=>{
        const postsCopy = posts.slice()
        postsCopy.push(results)
        setPosts(postsCopy);

    })
}

  return (
    <div id='post'>
        <aside>
        <form onSubmit={ handleSubmit }
        className='post'>
            <input type='text' value={ title } onChange={e=>setTitle(e.target.value)} ></input><br />
            <input type='text' value={ description } onChange={e=>setDescription(e.target.value)}></input><br />
            <input type='text' value={ location } onChange={e=>setLocation(e.target.value)}></input><br />
            <input type='text' value={ price } onChange={e=>setPrice(e.target.value)}></input><br />
            <input type='checkbox' value={ willDeliver } ></input>
            <label>Will Deliver</label><br />
            <input type="submit" value="Submit"></input>
            
        </form>
        </aside>


<div>
{posts.map((post, idx)=>{
return (<div>
    
</div>)/* Create html to display posts */



})}

</div>
        
        
    </div>
  );
};

export default Posts;