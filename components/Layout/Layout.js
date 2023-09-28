import Head from "next/head"
import { Global, css } from "@emotion/core"

import Header from "./Header"

const Layout = props => {
  return (
    <>
      <Head>
        <title>Product Hunt - The best new products in tech.</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossOrigin="anonymous"
        />
        <link href="/static/app.css" rel="stylesheet" />
      </Head>
      <Header />
      <main>{props.children}</main>
    </>
  )
}

export default Layout
