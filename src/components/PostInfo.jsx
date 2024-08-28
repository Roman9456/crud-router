import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import useJsonFetch from '../hooks/useJsonFetch';
import moment from 'moment';
import iziToast from 'izitoast';
import './css/wall.css'

function PostInfo() {
  let { id } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useJsonFetch(`http://localhost:7070/posts/${id}`, { method: 'GET' });
  const [state, setState] = useState({
    status: 'read',
    text: '',
  });

  const handleFormChange = ({ target }) => {
    let { name, value } = target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const changeText = await fetch(`http://localhost:7070/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ text: state.text }),
    });

    if (changeText.status !== 204) {
      iziToast.error({
        message: 'Произошла ошибка при изменении!',
        position: 'bottomCenter',
      });
    } else {
      iziToast.success({
        message: 'Вы успешно изменили текст поста!',
        position: 'bottomCenter',
      });
      data.post.text = state.text;
      state.status = 'read';
      state.text = '';
      setState(prevState => ({ ...prevState }));
    }
  };

  const handleStatusChange = () => {
    if (state.status === 'read') {
      state.status = 'change';
      state.text = data.post.text;
    } else {
      state.status = 'read';
      state.text = '';
    }
    setState(prevState => ({ ...prevState }));
  };

  const handleDelete = async (evt) => {
    evt.preventDefault();

    const deletePost = await fetch(`http://localhost:7070/posts/${id}`, {
      method: 'DELETE',
    });

    if (deletePost.status !== 204) {
      iziToast.error({
        message: 'Произошла ошибка при удалении!',
        position: 'bottomCenter',
      });
    } else {
      iziToast.success({
        message: 'Вы успешно удалили пост!',
        position: 'bottomCenter',
      });

      navigate('/');
    }
  };

  return (
    <>
      {loading ? (
        <span>Loading</span>
      ) : (
        data &&
        <div>
          <Card className='card-custom mt-2'> 
            <Card.Body className='d-flex flex-column justify-content-center align-items-center'>
              <Card.Title className='card-title-custom text-uppercase'>Roman Smolyakov</Card.Title>
              <Card.Text>
                Student
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <Card.Text className='card-text-custom text-center'>
                  {moment(data.post.created).startOf('minute').fromNow()}
                </Card.Text>
                {state.status === 'read' ? 
                  <Card.Text className='fs-4 text-center card-text-custom'>{data.post.text}</Card.Text>
                : 
                  (
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className='mt-2'>
                        <Form.Label className='fw-bold'>Введите новый текст поста</Form.Label>
                        <InputGroup>
                          <Form.Control
                            placeholder='Введите новый текст поста'
                            aria-label='Введите новый текст поста'
                            aria-describedby='button-add-post'
                            name='text'
                            value={state.text}
                            onChange={handleFormChange}
                            required
                            className='form-control-custom'
                          />
                          <Button type='submit' variant='outline-primary' id='button-add-post' className='button-primary-custom'>
                            Изменить
                          </Button>
                        </InputGroup>
                        <br />
                      </Form.Group>
                    </Form>
                  )
                }
              </ListGroup.Item>
              <ListGroup.Item className='d-flex justify-content-center'>
                {state.status === 'read' ?
                  <div>
                    <Button variant='primary' className='button-primary-custom me-2' onClick={handleStatusChange}>Изменить</Button>
                    <Button variant='danger' className='button-danger-custom me-2' onClick={handleDelete}>Удалить</Button>
                  </div>
                :
                  <Button variant='secondary' className='button-secondary-custom me-2' onClick={handleStatusChange}>Отмена</Button>
                }
              </ListGroup.Item>
            </ListGroup>
          </Card>
          <br />
        </div>
      )}
    </>
  );
}

export default PostInfo;
