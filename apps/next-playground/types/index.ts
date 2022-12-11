import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

export type TNextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: React.ReactElement) => React.ReactNode
}

export type TNextAppPropsWithLayout = AppProps & {
    Component: TNextPageWithLayout
}
