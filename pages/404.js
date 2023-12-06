import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import styled from "@emotion/styled"
import Link from "next/link"

import { FirebaseContext } from "../firebase/index"

import Layout from "@components/Layout/Layout"

const Container = styled.div`
  overflow: hidden;
  height: calc(100vh - 81px);
`

const Background = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const MessageContainer = styled.div`
  position: absolute;
  background: #fff;
  padding: 30px 20px;
  top: calc(30px + 81px);
  width: 100%;

  @media (min-width: 760px) {
    background: #fff;
    border-radius: 4px;
    bottom: 30px;
    left: 30px;
    padding: 30px;
    width: 500px;
    top: unset;
  }
`

const Message = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: flex-start;
`

const H2 = styled.h2`
  margin: 0;
  padding: 0;
  color: #4b587c;
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
`

const H1 = styled.h1`
  margin: 0;
  padding: 0;
  color: #21293c;
  margin-top: 8px;
  line-height: 24px;
  font-weight: 600;
  font-size: 28px;
  text-align: left;

  @media (max-width: 480px){
    font-size: 20px;
  }
`

const Text = styled.p`
  margin: 0;
  padding: 0;
  color: #21293c;
  margin-top: 8px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
`

const ActionsContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 8px;
  gap: 1rem;
  width: 100%;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`

const ActionLink = styled.a`
  text-decoration: none;
  appearance: none;
  outline: none;
  border: 1px solid transparent;
  position: relative;
  display: inline-block;
  transition: all 0.3s ease;
  text-align: center;
  font-size: 14px;
  line-height: 24px;
  font-weight: 600;
  padding: 8px 16px;
  background: #ff6154;
  border-radius: 4px;
  color: #fff;
  width: auto;
  white-space: nowrap;
  cursor: pointer;
`

const ActionButton = styled.button`
  font: inherit;
  overflow: visible;
  text-transform: none;
  cursor: pointer;
  appearance: none;
  outline: none;
  border-radius: 4px;
  position: relative;
  display: inline-block;
  transition: all 0.3s ease;
  text-align: center;
  font-size: 14px;
  line-height: 24px;
  font-weight: 600;
  padding: 8px 16px;
  border: 1px solid #d9e1ec;
  background: #fff;
  color: #21293c;
  width: auto;
  white-space: nowrap;
`

export default function NotFound() {
  const [imageIndex, setImageIndex] = useState(0)

  const petImages = [
    "https://ph-static.imgix.net/error-page-richard.jpg",
    "https://ph-static.imgix.net/error-page-ashley.jpg",
    "https://ph-static.imgix.net/error-page-emily.jpg",
    "https://ph-static.imgix.net/error-page-jacq.jpg",
    "https://ph-static.imgix.net/error-page-julie.jpg",
  ]

  return (
    <Layout>
      <Container>
        <Background src={petImages[imageIndex]} />
        <MessageContainer>
          <Message>
            <H2>404</H2>
            <H1>We seem to have lost this page</H1>
            <Text>
              Please accept these adorable photos of our PH team's furry friend
              as our humble apology for the inconvenience. Let's get you back to
              the homepage
            </Text>
            <ActionsContainer>
              <Link href="/" legacyBehavior>
                <ActionLink>Go to the homepage</ActionLink>
              </Link>
              <ActionButton
                type="button"
                onClick={() =>
                  setImageIndex(prev => (prev + 1) % petImages.length)
                }
              >
                😸 Show me more pets
              </ActionButton>
            </ActionsContainer>
          </Message>
        </MessageContainer>
      </Container>
    </Layout>
  );
}
