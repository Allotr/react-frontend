import * as React from "react"

function Clock({ fill, ...rest }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={512}
      height={512}
      viewBox="0 0 426.667 426.667"
      {...rest}
    >
      <path
        d="M213.227 0C95.36 0 0 95.467 0 213.333s95.36 213.333 213.227 213.333 213.44-95.467 213.44-213.333S331.093 0 213.227 0zm.106 384c-94.293 0-170.667-76.373-170.667-170.667S119.04 42.667 213.333 42.667 384 119.04 384 213.333 307.627 384 213.333 384z"
        fill={fill}
        data-original="#000000"
      />
      <path
        fill={fill}
        data-original="#000000"
        d="M224 218.667v-112h-32v128l111.893 67.2L320 275.627z"
      />
    </svg>
  )
}

export default Clock;