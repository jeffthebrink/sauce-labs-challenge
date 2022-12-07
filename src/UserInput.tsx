import React, { useState } from 'react';

function UserInput() {
    const [url, setUrl] = useState<string>('');

    const handleSubmit = () => {
        window.alert(url);
    }

    return (
        <div className="url-input-container">
            <h3>Enter a URL to fetch from</h3>
            <span>
                <input className="input-field" inputMode="text" type="text" id="url-input" value={url} required onChange={event => setUrl(event.target.value)}/>
                <button className="submit-btn" onClick={handleSubmit}>Submit</button>
            </span>
        </div>
    );
}

export default UserInput;
