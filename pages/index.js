import Link from 'next/link'
import { Card, CardBody, CardTitle, Row } from 'reactstrap'

function Home () {
  return (
      <Row className="justify-content-center  align-items-center">
        <Card>
           <CardBody>
              <CardTitle tag="h5" className="warning">
                Homepage, our super app!!!
              </CardTitle>
              <Link href="/login">login</Link>
              <br></br>
              <Link href="/register">register</Link>
          </CardBody>
        </Card>
      </Row>
  )
}

export default Home
