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

const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
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

const ViewProfileLink = styled.a`
  background-color: transparent;
  text-decoration: none;
  color: #21293c;
  font-size: 16px;
  font-weight: 400;
  line-height: 32px;
  cursor: pointer;
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
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

const Form = styled.form`
  gap: 1.5rem;
  display: grid;
`

const InputContainer = styled.div``

const Label = styled.label`
  color: #21293c;
  font-size: 14px;
  line-height: 24px;
  font-weight: 600;
`

const Input = styled.input`
  font: inherit;
  margin: 0;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 12px;
  padding-right: 12px;
  color: #21293c;
  font-size: 14px;
  line-height: 24px;
  outline: none;
  border: 1px solid #d9e1ec;
  border-radius: 4px;
  height: 40px;
  box-sizing: border-box;
  width: 100%;
  background-color: #fff;
`

const Submit = styled.button`
  font: inherit;
  margin: 0;
  overflow: visible;
  text-transform: none;
  cursor: pointer;
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
  width: max-content;
`

export default function Edit() {
  const { user, firebase } = useContext(FirebaseContext)

  const [formValues, setFormValues] = useState({
    name: "",
    username: "",
  })

  useEffect(() => {
    if (user) {
      setFormValues(prev => ({
        ...prev,
        name: user.displayName,
        username: user.displayName,
      }))
    }
  }, [user])

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

  function handleFormSubmit(event) {
    event.preventDefault()
    console.log(event.target)
  }

  function handleInputChange(event) {
    const { name, value } = event.target
    setFormValues(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <Layout>
      <Container>
        <MainUserInfo>
          <HeadingContainer>
            <H1>My details</H1>
            <Link href={`/@${user?.displayName}`}>
              <ViewProfileLink>View my profile</ViewProfileLink>
            </Link>
          </HeadingContainer>
          <ImageUploadContainer>
            <ImagePreviewContainer>
              <img
                loading="lazy"
                src={newPictureUrl ?? user?.photoURL ?? "/product-hunt.svg"}
                alt={user?.displayName}
              />
            </ImagePreviewContainer>
            <FileUploadActions>
              <FileUploadButton
                onClick={handleUploadButtonClick}
                disabled={loadingPicture}
              >
                {loadingPicture ? "Uploading..." : "Upload new avatar"}
              </FileUploadButton>
              <FileUploadHelper>
                Recommended size: 400x400px · Picture is automatically saved
              </FileUploadHelper>
            </FileUploadActions>
            <FileInput
              type="file"
              name="avatar"
              accept="image/gif, image/jpeg, image/png, image/webp"
              onChange={handleNewPictureUpload}
              ref={fileInputRef}
            />
          </ImageUploadContainer>
          <Form onSubmit={handleFormSubmit}>
            <InputContainer>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
              />
            </InputContainer>
            <InputContainer>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                name="username"
                value={formValues.username}
                onChange={handleInputChange}
              />
            </InputContainer>
            <Submit type="submit">Save</Submit>
          </Form>
        </MainUserInfo>
      </Container>
    </Layout>
  )
}
