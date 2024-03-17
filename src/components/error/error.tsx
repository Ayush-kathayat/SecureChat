import React from 'react';
import "./error.css";

interface ErrorProps {
 error: string;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
 return <div>{error}</div>;
};

export default Error;
