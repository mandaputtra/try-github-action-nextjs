import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Navbar,
  Nav,
  NavItem,
  Button,
  NavbarText,
} from 'reactstrap';
import { logout as logoutFirebase } from 'utils/firebase'

function NavBar ({ navigations, text }) {

  const router = useRouter()

  function logout() {
    logoutFirebase()
    router.push('/')
  }

  return (
    <Navbar full={true}>
      <h4>
        <Link href="/dashboard">Dashboard</Link>
      </h4>
      {text && (<NavbarText className="ms-4">{text}</NavbarText>)}
      <Nav className="me-auto" navbar>
        {navigations.map(a => 
          <NavItem>
            <Link href={a.link}>
              {a.text}
            </Link>
          </NavItem>
        )}
      </Nav>
      <Button onClick={logout}>
        Log Out
      </Button>
    </Navbar>
  );
}

export default NavBar;
