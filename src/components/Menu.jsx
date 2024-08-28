import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import './css/wall.css';

function Menu() {
  return (
    <Navbar className='menu-custom' expand='lg'>
      <Container fluid>
        <Navbar.Collapse>
          <Nav className='me-auto my-2 my-lg-0'>
            <NavLink className='menu-link' to='/'>Главная</NavLink>
          </Nav>
          
          <NavLink className='menu-link' to='/newpost'>
            <Button variant='outline-primary'>
              Создать пост
            </Button>
          </NavLink>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
