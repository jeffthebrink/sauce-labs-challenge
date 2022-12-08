import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';

interface ResponseItemProps {
    responseItem: any,
    renderButton: boolean
}

function ResponseItem({responseItem, renderButton}: ResponseItemProps) {
    const [viewValue, setViewValue] = useState(false);

    const handleKey = () => {
        if (!responseItem) return;
        if (responseItem[0]) {
            return responseItem[0];
        } else {
            return Object.entries(responseItem).map(item => {
                return <ResponseItem responseItem={item} key={uuidv4()} renderButton/>
            })
        }
    }

    const handleRecursive = () => {
        if (Array.isArray(responseItem[1])) {
            return responseItem[1].map((item, index) => {
                return (
                    <div>
                        {index + 1}
                        <ResponseItem responseItem={item} key={uuidv4()} renderButton={false}/>
                    </div>
                )
            })
        } else if (responseItem[1]) {
            return responseItem[1]
        } else if (typeof responseItem === 'object') {
            return <ResponseItem responseItem={responseItem[1]} key={uuidv4()} renderButton/>
        }
    }

    return (
        <div className="response-item-container">
            {renderButton ? (
                responseItem ? (
                <button className={"response-item-key"} onClick={() => {
                    setViewValue(prev => !prev);
                }}>
                    {handleKey()}
                </button>
                ) : (
                    <div>
                        empty
                    </div>
                )
            ) : (
                <div className={"response-item-key"}>
                    {handleKey()}
                </div>
            )}
            {viewValue &&
                <div className={"response-item-value"}>
                    {handleRecursive()}
                </div>
            }
        </div>
    );
}

export default ResponseItem;
