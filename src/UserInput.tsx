import React, { useState } from 'react';
import Response from "./Response";

function UserInput() {
    const [url, setUrl] = useState<string>('');
    const [response, setResponse] = useState<any>(null);

    const handleSubmit = async () => {
        if (url.length < 1) return;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const content = await response.json();
        setResponse(content);
    }

    return (
        <div className="url-input-container">
            <h3>Enter a URL to fetch from</h3>
            <span>
                <input className="input-field" inputMode="text" type="text" id="url-input" value={url} required onChange={event => setUrl(event.target.value)}/>
                <button className="submit-btn" onClick={handleSubmit}>Submit</button>
            </span>
            {response && <Response response={response} />
            }
        </div>
    );
}

export default UserInput;
