import { useContext, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import styled from "@emotion/styled"

import FirebaseContext from "../../../firebase/context"
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

const H1 = styled.h1`
  margin: 0;
  padding: 0;
  margin-bottom: 4px;
  color: #21293c;
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
`

const ImageUploadContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  flex: 1;
`

const ImagePreviewContainer = styled.div`
  position: relative;

  img {
    vertical-align: bottom;
    border: none;
    border-radius: 4px;
    width: 80px;
    height: 80px;
  }
`

const FileUploadActions = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  margin-left: 16px;
`

const FileUploadButton = styled.button`
  font: inherit;
  margin: 0;
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
`

const FileUploadHelper = styled.p`
  color: #4b587c;
  margin-top: 20px;
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
`

const FileInput = styled.input`
  display: none;
`

const MainUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
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

export default function Edit() {
  const { user, firebase } = useContext(FirebaseContext)

  const [newPictureUrl, setNewPictureUrl] = useState(null)
  const [loadingPicture, setLoadingPicture] = useState(false)

  const fileInputRef = useRef(null)

  const handleUploadButtonClick = () => {
    fileInputRef.current.click()
  }

  function handleNewPictureUpload(event) {
    const file = event.target.files[0]

    if (file) {
      setLoadingPicture(true)
      const storageRef = firebase.storage.ref()
      const fileRef = storageRef.child(`avatars/${user.uid}/${file.name}`)

      fileRef.put(file).then(() => {
        fileRef
          .getDownloadURL()
          .then(url => {
            setNewPictureUrl(url)

            user.updateProfile({
              photoURL: url,
            })
          })
          .finally(() => setLoadingPicture(false))
      })
    }
  }

  return (
    <Layout>
      <Container>
        <MainUserInfo>
          <H1>My details</H1>
          <ImageUploadContainer>
            <ImagePreviewContainer>
              <img
                loading="lazy"
                src={newPictureUrl ?? user?.photoURL ?? "/product-hunt.svg"}
                alt={user?.displayName}
              />
            </ImagePreviewContainer>
            <FileUploadActions>
              <FileUploadButton onClick={handleUploadButtonClick}>
                Upload new avatar
              </FileUploadButton>
              <FileUploadHelper>Recommended size: 400x400px</FileUploadHelper>
            </FileUploadActions>
            <FileInput
              type="file"
              name="avatar"
              accept="image/gif, image/jpeg, image/png, image/webp"
              onChange={handleNewPictureUpload}
              ref={fileInputRef}
            />
          </ImageUploadContainer>
          <UserContainer>
            <InfoAndActions>
              <NameAndEmail>
                <Email></Email>
              </NameAndEmail>
              <Link href="/my/details/edit">
                <EditProfileLink>Edit my profile</EditProfileLink>
              </Link>
            </InfoAndActions>
          </UserContainer>
        </MainUserInfo>
      </Container>
    </Layout>
  )
}
