import {type FC, useEffect, useState} from "react";
import outputs from "../../../../infra/amplify_outputs.json";

const progressApi = outputs.custom.progressApi;

export const TestApi: FC = () => {
    const outputString = JSON.stringify(outputs, null, 2);

    const [testResponse, setTestResponse] = useState('N/A');

    const requestApi = async () => {
        const data = await getData();
        const dataString = JSON.stringify(data, null, 2);
        setTestResponse(dataString);
    }

    useEffect(
        () => {
            requestApi();
        },
        []
    )

    return (
        <div>
            Test api!!!!
            <pre>{testResponse}</pre>
            <pre>
                {outputString}
            </pre>
        </div>
    );
}

async function getData() {

        const response = await fetch(progressApi);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        return await response.json();
}