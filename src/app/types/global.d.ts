/// <reference types="vite-plugin-svgr/client" />

declare module '*.scss' {
    type ClassNames = Record<string, string>
    const classNames: ClassNames
    export = classNames
}

declare module '*.png'
declare module '*.gif'
declare module '*.jpg'
declare module '*.jpeg'

// declare module '*.svg' {
//     import { type SVGProps, type VFC } from 'react'

//     const SVG: VFC<SVGProps<SVGSVGElement>>

//     export default SVG
// }

type DeepPartial<T> = T extends object
    ? {
          [P in keyof T]?: DeepPartial<T[P]>
      }
    : T
