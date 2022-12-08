import React, {useCallback, useEffect, useState} from 'react';
import Response from "./Response";

function UserInput() {
    const [url, setUrl] = useState<string>('');
    const [response, setResponse] = useState<any>(null);
    const [showResponse, setShowResponse] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = useCallback(async () => {
        if (url.length < 1) return;
        setLoading(true);
        const response = await fetch(url, {
            method: 'GET',
            headers: {},
        });
        const content = await response.json();
        setResponse(content);
        setLoading(false);
        setShowResponse(true);
    }, [url]);

    useEffect(() => {
        const enterListener = (e: any) => {
            if (e.key === 'Enter') {
                handleSubmit().then(null);
            }
        };
        document.addEventListener('keypress', enterListener);

        return () => document.removeEventListener('keypress', enterListener);
    }, [handleSubmit]);

    return (
        <div className="url-input-container">
            <h3>Enter a URL to fetch from</h3>
            <span>
                <input
                    className="input-field"
                    inputMode="text"
                    type="text"
                    id="url-input"
                    value={url}
                    required
                    onChange={event => setUrl(event.target.value)}
                />
                <button className="submit-btn" onClick={handleSubmit}>{loading ? 'Loading' : 'Submit'}</button>
                <button className="clear-btn" onClick={() => {
                    setUrl('');
                    setShowResponse(false);
                }}>Clear</button>
            </span>
            <hr/>
            {response && showResponse && <Response response={response} url={url}/>}
        </div>
    );
}

export default UserInput;
