import Head from 'next/head'
import type { FC } from 'react'

const Layout: FC = ({ children }) => {
  return (
    <div className='antialiased bg-gray-50 min-h-screen'>
      <Head>
        <title>Gästebuch</title>
        <link
          rel='icon'
          href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💩</text></svg>'
        ></link>
      </Head>
      <main>
        <div className='container max-w-2xl mx-auto px-6 py-12'>{children}</div>
      </main>
    </div>
  )
}

export default Layout
