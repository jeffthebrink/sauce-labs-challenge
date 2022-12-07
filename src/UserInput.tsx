import React, { useState } from 'react';

function UserInput() {
    const [url, setUrl] = useState<any>('');

    const handleSubmit = () => {
        window.alert(url);
    }

    return (
        <div className="url-input">
            <h3>Enter a URL to fetch from</h3>
            <span>
                <input inputMode="text" type="text" id="url-input" value={url} required onChange={event => setUrl(event.target.value)}/>
                <button onClick={handleSubmit}>Submit</button>
            </span>
        </div>
    );
}

export default UserInput;
