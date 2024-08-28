import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import useJsonFetch from '../hooks/useJsonFetch';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './css/wall.css';

function Posts() {
  const { data } = useJsonFetch('http://localhost:7070/posts', { method: 'GET' });

  return (
    <>
      {data?.map(elem =>
        <Card className='card-custom mt-2' key={elem.id}> 
          <NavLink className='text-decoration-none' to={`/posts/${elem.id}`}>
            <Card.Body className='d-flex flex-column justify-content-center align-items-center'>
              <Card.Title className='card-title-custom text-uppercase'>Roman Smolyakov</Card.Title>
              <Card.Text>
                Student
              </Card.Text>
            </Card.Body>
          </NavLink>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              <Card.Text className='text-center card-text-custom'>
                {moment(elem.created).startOf('minute').fromNow()}
              </Card.Text>
              <Card.Text className='fs-4 text-center card-text-custom'>
                {elem.text}
              </Card.Text>
            </ListGroup.Item>
            <ListGroup.Item className='d-flex justify-content-center'>
              <Button className='button-like me-2'>
                <FontAwesomeIcon icon={faHeart} className='me-2' /> Нравится
              </Button>
              <Button className='button-comment me-2'>Комментировать</Button>
            </ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <InputGroup>
              <Form.Control
                placeholder='Напишите комментарий'
                aria-label='Напишите комментарий'
                aria-describedby='button-add-message'
                className='form-control-custom'
              />
              <Button variant='outline-primary' id='button-add-message' className='button-outline-primary-custom'>
                Отправить
              </Button>
            </InputGroup>
          </Card.Body>
        </Card>
      )}
      <br />
    </>
  );
}

export default Posts;
