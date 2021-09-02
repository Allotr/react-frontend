// import * as React from "react"

// function Plus(props: React.SVGProps<SVGSVGElement>) {

//     return (
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24"{...props}>
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
//         </svg>
//     )
// }

// export default Plus


import * as React from "react"

function Plus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      height="448pt"
      viewBox="0 0 448 448"
      width="448pt"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M408 184H272a8 8 0 01-8-8V40c0-22.09-17.91-40-40-40s-40 17.91-40 40v136a8 8 0 01-8 8H40c-22.09 0-40 17.91-40 40s17.91 40 40 40h136a8 8 0 018 8v136c0 22.09 17.91 40 40 40s40-17.91 40-40V272a8 8 0 018-8h136c22.09 0 40-17.91 40-40s-17.91-40-40-40zm0 0" />
    </svg>
  )
}

export default Plus
