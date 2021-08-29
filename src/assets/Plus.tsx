import * as React from "react"

function Plus(props: React.SVGProps<SVGSVGElement>) {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24"{...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
        </svg>
    )
}

export default Plus