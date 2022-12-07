import React from 'react';

function UserInput() {
    return (
        <div className="url-input">
            <h3>Enter a URL to fetch from</h3>
            <span>
                <input inputMode="text" type="text" id="url-input" required/>
                <button onClick={() => window.alert('submitted')}>Submit</button>
            </span>
        </div>
    );
}

export default UserInput;
