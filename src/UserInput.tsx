import React, {useCallback, useEffect, useState, useReducer} from 'react';
import Response from "./Response";

interface DataRemote {
    status: 'success' | 'failure' | 'loading' | 'not-requested';
    data: null | string | any;
}

const initialState: DataRemote = {status: 'not-requested', data: null};

function reducer(state: any, action: { type: string, payload: any }) {
    switch (action.type) {
        case 'success':
            return {status: 'success', data: action.payload};
        case 'failure':
            return {status: 'failure', data: 'Error fetching data'};
        case 'loading':
            return {status: 'loading', data: null};
        case 'not-requested':
            return initialState;
        default:
            throw new Error();
    }
}

function UserInput() {
    const [url, setUrl] = useState<string>('');
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleSubmit = useCallback(async () => {
        if (url.length < 1) return;
        dispatch({type: 'loading', payload: null});
        let response = null;
        try {
            response = await fetch(url, {
                method: 'GET',
                headers: {},
            });
            const content = await response.json();
            dispatch({type: 'success', payload: content});
        } catch (error) {
            dispatch({type: 'failure', payload: null});
        }
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

    const renderStatus = () => {
        switch (state.status) {
            case 'success':
                return <Response response={state.data} url={url}/>
            case 'failure':
                return (
                    <div className={'fetch-error'}>
                        <p>{state.data}</p>
                    </div>
                )
            case 'loading':
                return <div className={'loading'}>Loading...</div>
            case 'not-requested':
                return <></>
        }
    }

    return (
        <div className="url-input-and-response-container">
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
                <button className="submit-btn"
                        onClick={handleSubmit}>{state.status === 'loading' ? 'Loading' : 'Submit'}</button>
                <button className="clear-btn" onClick={() => {
                    setUrl('');
                    dispatch({type: 'not-requested', payload: null});
                }}>Clear</button>
            </span>
            <hr/>
            {renderStatus()}
        </div>
    );
}

export default UserInput;
