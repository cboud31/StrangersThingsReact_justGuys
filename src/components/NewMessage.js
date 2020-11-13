import React from 'react';

const NewMessage = () => {
    return (
        <div className="NewMessage">
          
            <form onSubmit={ (event) =>{
                event.preventDefault();
            }} classname="messages">
              <h3>Messages</h3>
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