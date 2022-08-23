import { Button, Card, CardBody, CardSubtitle, CardTitle, Form, FormGroup, Input, Label, Row, Alert } from 'reactstrap'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { registerWithEmailAndPassword } from 'utils/firebase'
import { useState } from 'react'

function Register () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  async function register (e) {
    e.preventDefault()
    if (!name) alert('Please enter name')
    await registerWithEmailAndPassword(name, email, password)
    setSuccess(true)
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  };

  return (
      <Row className="login-container justify-content-center  align-items-center">
        <Card>
           <CardBody>
              <CardTitle tag="h5">
                Register
              </CardTitle>
              <CardSubtitle
                className="mb-2 text-muted"
                tag="h6"
              >
                Register your new account
              </CardSubtitle>
                <Form>
                  <FormGroup>
                    <Label>Name</Label>
                    <Input id="name" onChange={e => setName(e.target.value)} value={name} placeholder="please input your name" type="text" />
                  </FormGroup>
                  <FormGroup>
                    <Label>Email</Label>
                    <Input id="email" onChange={e => setEmail(e.target.value)} value={email} placeholder="input by email" type="email" />
                  </FormGroup>
                  <FormGroup>
                    <Label>Password</Label>
                    <Input id="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="password" type="password" />
                  </FormGroup>
                  <p>
                    Login <Link href="/login">here</Link> if already had account.
                  </p>
                  <div>
                    <Alert
                      hidden={!success}
                      color="primary"
                    >
                      Success register, please login on login page!
                    </Alert>
                  </div>
                  <Button onClick={e => register(e)}>
                    Register
                  </Button>
                </Form>
          </CardBody>
        </Card>
      </Row>
  )
}

export default Register
