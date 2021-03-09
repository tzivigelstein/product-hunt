import firebase, { FirebaseContext } from '../firebase/index'
import useAuth from '../Hooks/useAuth'
import Head from 'next/head'

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
