import "@styles/globals.css"
import Head from "next/head"

import firebase, { FirebaseContext } from "../firebase/index"
import useAuth from "@hooks/useAuth"

const MyApp = ({ Component, pageProps }) => {
  const user = useAuth()

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="product-hunt.svg" type="image/png" />
      </Head>
      <FirebaseContext.Provider
        value={{
          firebase,
          user,
        }}
      >
        <Component {...pageProps} />
      </FirebaseContext.Provider>
    </>
  )
}

export default MyApp
