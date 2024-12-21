import { FC, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback: ReactNode;
}

const Protected: FC<Props> = ({ children, fallback }) => {
    const access_token = localStorage.getItem('access_token');
    // Ensure that fallback and children are of type ReactNode and will return at least an empty fragment if undefined
    if (!access_token) {
        return <>{fallback}</>; // Wrap fallback in a fragment to ensure a valid return type
    }
    return <>{children}</>; // Wrap children in a fragment to ensure a valid return type
};

export default Protected;
