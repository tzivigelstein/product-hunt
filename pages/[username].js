import { useContext, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import styled from "@emotion/styled"

import FirebaseContext from "../firebase/context"
import Layout from "@components/Layout/Layout"
import UserIcon from "@components/UI/UserIcon"

const Container = styled.article`
  padding: 2rem 3rem;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 1100px) {
    max-width: unset;
  }
`

const Gradient = styled.div`
  background: linear-gradient(
      180deg,
      transparent,
      hsla(0, 0%, 95%, 0.29) 47.39%,
      #fff
    ),
    linear-gradient(
      90deg,
      #f9ddf1 0.07%,
      #e5e1ff 16.73%,
      #daedff 34.48%,
      #e2f4e3 49.98%,
      #ebf5d8 66.12%,
      #faf2da 81.95%,
      #fbe5d8 99.9%
    );
`

const MainUserInfo = styled.div`
  display: flex;
  gap: 2rem;
`

const UserIconContainer = styled.div`
  background-color: var(--orange);
  display: flex;
  border-radius: 100%;
  width: 120px;
  aspect-ratio: 1;
  overflow: hidden;
  justify-content: center;
  align-items: center;

  svg,
  img {
    width: 100%;
    padding: 0;
    margin: 0;
    object-fit: cover;
  }

  svg {
    width: 100px;
    height: 100px;
  }
`

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`

const InfoAndActions = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`

const NameAndEmail = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  margin-top: 0.5rem;
`

const H1 = styled.h1`
  margin: 0;
  padding: 0;
  margin-bottom: 4px;
  color: #21293c;
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
`

const Email = styled.span`
  margin-bottom: 4px;
  color: #4b587c;
  font-size: 18px;
  line-height: 28px;
  font-weight: 300;
`

const EditProfileLink = styled.button`
  text-decoration: none;
  appearance: none;
  outline: none;
  border-radius: 4px;
  transition: all 0.3s ease;
  text-align: center;
  font-size: 14px;
  line-height: 24px;
  font-weight: 600;
  padding: 8px 16px;
  border: 1px solid #d9e1ec;
  background: #fff;
  color: #21293c;
  cursor: pointer;
  height: max-content;
  margin-left: auto;
`

const ActionsContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
`

const NewProduct = styled.a`
  text-decoration: none;
  appearance: none;
  outline: none;
  border: 1px solid transparent;
  transition: all 0.3s ease;
  text-align: center;
  font-size: 14px;
  line-height: 24px;
  font-weight: 600;
  padding: 8px 16px;
  background: var(--orange);
  border-radius: 4px;
  color: #fff;
  width: 100%;
  cursor: pointer;
`

const Logout = styled.button`
  text-decoration: none;
  appearance: none;
  outline: none;
  border-radius: 4px;
  transition: all 0.3s ease;
  text-align: center;
  font-size: 14px;
  line-height: 24px;
  font-weight: 600;
  padding: 8px 16px;
  border: 1px solid #d9e1ec;
  background: #fff;
  color: #21293c;
  width: 100%;
  cursor: pointer;
`

export default function Profile({ userRecord }) {
  const { displayName, email, ...rest } = userRecord || {}

  const router = useRouter()

  const { user, firebase } = useContext(FirebaseContext)

  useEffect(() => {
    if (!userRecord) {
      router.push("/404")
    }
  }, [])

  return (
    <Layout>
      <Gradient>
        <Container>
          <MainUserInfo>
            {userRecord && (
              <UserContainer>
                <InfoAndActions>
                  <UserIconContainer>
                    {user?.photoURL ? (
                      <img src={user?.photoURL} />
                    ) : (
                      <UserIcon />
                    )}
                  </UserIconContainer>
                  <NameAndEmail>
                    <H1>{displayName}</H1>
                    <Email>{email}</Email>
                  </NameAndEmail>
                  <Link href="/my/details/edit">
                    <EditProfileLink>Edit my profile</EditProfileLink>
                  </Link>
                </InfoAndActions>
                {user && user.uid === userRecord.uid && (
                  <ActionsContainer>
                    <Link href="/posts/new">
                      <NewProduct>Create a new post</NewProduct>
                    </Link>
                    <Logout
                      onClick={() => {
                        firebase.signout()
                        router.replace("/")
                      }}
                    >
                      Logout
                    </Logout>
                  </ActionsContainer>
                )}
              </UserContainer>
            )}
          </MainUserInfo>
        </Container>
      </Gradient>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { params } = context
  const { username } = params

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  const response = await fetch(
    `${baseUrl}/api/profile/${username.replace("@", "")}`
  )
  const data = await response.json()

  const userRecord = data.userRecord || null

  if (!userRecord) {
    return {
      props: {
        notFound: true,
      },
    }
  }

  return {
    props: { userRecord },
  }
}
