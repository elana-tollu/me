import type {FC} from 'react';

interface Props {
    name: string;
}

export const Hello: FC<Props> = (props) => {
    return (
        <div>
            Hello, {props.name}!
        </div>
    )
}