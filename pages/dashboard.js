import { useEffect } from "react";
import Link from 'next/link'
import { useRouter } from 'next/router'
import { 
  CardBody, 
  CardTitle, 
  Col, 
  Row, 
  Container, 
  Card, 
  ListGroup, 
  ListGroupItem 
} from "reactstrap"
import { auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import Profile from 'components/Profile'
import NavBar from 'components/NavBar'

function Dashboard() {
  const [user] = useAuthState(auth);
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  })

  return (
    <Container>
      <NavBar navigations={[]} />
      <Container>
        <Row>
          <Col>
            <Profile user={user} />
          </Col>
          <Col>
            <Card>
             <CardBody>
                <CardTitle tag="h5">
                  Game List
                </CardTitle>
                <ListGroup>
                  <ListGroupItem>
                    <Link to="/game/rock-paper-sisccors">Rock Paper Scissors</Link>
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default Dashboard
