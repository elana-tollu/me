import {type FC, useEffect, useState} from "react";
import outputs from "../../../../infra/amplify_outputs.json";
import { Amplify } from 'aws-amplify';
import {signInWithRedirect} from "@aws-amplify/auth";

Amplify.configure(outputs);

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

    const signIn = () => {
        signInWithRedirect({ provider: "Google" })
    }

    return (
        <div>
            Test api!!!!
            <pre>{testResponse}</pre>

            <button onClick={signIn}>Sigh in</button>
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