import styled from "@emotion/styled"

import Layout from "@components/Layout/Layout"
import UserIcon from "@components/UI/UserIcon"
import Link from "next/link"
import { useContext } from "react"
import FirebaseContext from "../firebase/context"
import { useRouter } from "next/router"

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
  width: max-content;
  border-radius: 100%;
  height: max-content;

  svg {
    width: 120px;
    height: 120px;
  }
`

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`

const NameAndEmail = styled.div`
  display: flex;
  flex-direction: column;
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

  console.log(rest)

  const { user, firebase } = useContext(FirebaseContext)

  return (
    <Layout>
      <Gradient>
        <Container>
          <MainUserInfo>
            <UserIconContainer>
              <UserIcon />
            </UserIconContainer>
            {userRecord && (
              <UserContainer>
                <NameAndEmail>
                  <H1>{displayName}</H1>
                  <Email>{email}</Email>
                </NameAndEmail>
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

  const response = await fetch(`${baseUrl}/api/profile/${username}`)
  const data = await response.json()

  return {
    props: { userRecord: data.userRecord || null },
  }
}
