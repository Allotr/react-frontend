import React, { useEffect } from "react";

function ActiveUserStatus({ currentUsers, maxUsers }: { currentUsers: number, maxUsers: number }) {
    useEffect(() => {
        // Add your init code
    }, [])

    return (
        <div className="ml-2 flex-grow w-14 h-14 bg-blue-dark border border-blue-light flex content-center">
                <p className="content-center flex-grow m-auto text-blue-light text-center font-bold break-words">{`${currentUsers}/\r\n${maxUsers}`}</p>
        </div>
    );
}

export default ActiveUserStatus;