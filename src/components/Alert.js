import React, { useContext } from 'react';
import ResultContext from '../context/ResultContext';

export default function Alert() {
    const { alertContext } = useContext(ResultContext);
    return (
        (
            <>
                {alertContext.isActive && <div className={`alert alert-${alertContext.status}`} role="alert">
                    {alertContext.message}
                </div>}
            </>
        )
    );
}
