import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useEffect, useState } from 'react'
import { Card, CardBody, CardText, CardTitle, Col, Form, FormGroup, ListGroup, ListGroupItem, Row } from 'reactstrap'
import { storage, updatePhotoProfile, getUser } from 'utils/firebase'

function Profile ({ user }) {
  const [userData, setUserData] = useState()

  async function reloadData () {
    if (user?.uid) {
      const data = await getUser(user.uid)
      setUserData(data)
    }
  }

  useEffect(() => {
    async function fetchData () {
      await reloadData()
    }
    fetchData()
  }, [user])

  function handleFireBaseUpload (imageAsFile) {
    if (imageAsFile === '') {
      console.error(`not an image, the image file is a ${typeof (imageAsFile)}`)
    }

    const storageRef = ref(storage, `files/${imageAsFile.name}`)
    // Upload dokumen
    const uploadTask = uploadBytesResumable(storageRef, imageAsFile)
    // Proses upload dokumen
    uploadTask.on('state_changed',
      () => {
        // console.info(snapShot)
      }, (err) => {
        console.error(err)
      }, async () => {
        // Ambil foto url
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
        // update foto profil
        await updatePhotoProfile(user.uid, downloadUrl)
        // reload user data, agar foto profil langsung muncul
        await reloadData()
      })
  }

  function handleImageAsFile (e) {
    const image = e.target.files[0]
    handleFireBaseUpload(image)
  }

  return (
        <Card>
          <img src={userData?.profileUrl} className="card-img-top" alt="gambar profile" />
           <CardBody>
              <CardTitle tag="h3">
                Profile
              </CardTitle>
              <Row>
                <Col className="mb-3">
                  <ListGroup>
                    <ListGroupItem>
                      <span className="small">Profile Code :</span> <br/> {userData?.uid}
                    </ListGroupItem>
                    <ListGroupItem>
                      {userData?.name}
                    </ListGroupItem>
                    <ListGroupItem>
                      {userData?.email}
                    </ListGroupItem>
                  </ListGroup>
                </Col>
                <Col>
                  <Form>
                    <FormGroup>
                      <CardText className="mb-1">Change profile picture : </CardText>
                      <input type="file" onChange={handleImageAsFile} accept="image/" placeholder="change photo profile here" />
                    </FormGroup>
                  </Form>
                </Col>
                <Col>
                </Col>
              </Row>
          </CardBody>
        </Card>
  )
}

export default Profile
