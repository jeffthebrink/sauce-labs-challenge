import React, {useMemo} from 'react';
import { v4 as uuidv4 } from 'uuid';
import ResponseItem from "./ResponseItem";

interface ResponseProps {
    response: {},
    url: string
}

function Response({response, url}: ResponseProps) {
    const responseList = useMemo(() => {
        return Object.entries(response);
    }, [response]);

    return (
        <div className="response-container">
            <h4>Response from {url}:</h4>
            {response && responseList.map((item) => {
                return (
                    <span key={uuidv4()}>
                        <ResponseItem responseItem={item} renderButton />
                    </span>
                )
            })
            }
        </div>
    );
}

export default Response;
