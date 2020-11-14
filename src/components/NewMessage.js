import React from 'react';

const NewMessage = ({
  post: { title, _id }
}) => {
    return (
        <div className="NewMessage">
          
            <form onSubmit={ (event) =>{
                event.preventDefault();
                // call HITAPI with url for /posts/{ _id }/messages
            }} classname="messages">
              <h3>Send Message on { title }</h3>
              <textarea
                type="scroll"
                placeholder="Drag the bottom right corner for more space...."
              ></textarea>
              <br></br>
              <button className="Submit">Submit</button>
            </form>
         
        </div>
    )
}

export default NewMessage;