import React, {useEffect, useState} from 'react';

interface ResponseProps {
    response: unknown,
    url: string
}

function Response({response, url}: ResponseProps) {
    const [responseState, setResponseState] = useState<unknown>();

    useEffect(() => {
        if (response) {
            setResponseState(response);
        }
    }, [response]);

    return (
        <div className="response-container">
            <table>
                <thead>
                <tr>
                    <th colSpan={2}>Response From {url}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>The table body</td>
                    <td>with two columns</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Response;
