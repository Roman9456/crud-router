import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import iziToast from 'izitoast';
import './css/wall.css';

function Newpost() {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    text: '',
  });

  const handleFormChange = ({ target }) => {
    let { name, value } = target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
  
    try {
      const response = await fetch('http://localhost:7070/posts', {
        method: 'POST',
        body: JSON.stringify({ text: form.text }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Error: ${error.message}`);
      }
  
      iziToast.success({
        message: 'Вы успешно добавили пост!',
        position: 'bottomCenter',
      });
      setForm({ text: '' });
      navigate('/');
    } catch (error) {
      iziToast.error({
        message: `Ошибка при добавлении поста: ${error.message}`,
        position: 'bottomCenter',
      });
      console.error('Ошибка при добавлении поста:', error);
    }
  };
  
  return (
    <Form onSubmit={handleSubmit} className='form-custom'>
      <Form.Group className='mb-3 mt-2'>
        <Form.Label className='form-label'>Введите текст поста</Form.Label>
        <InputGroup>
          <Form.Control
            placeholder='Введите текст поста'
            aria-label='Введите текст поста'
            aria-describedby='button-add-post'
            name='text'
            value={form.text}
            onChange={handleFormChange}
            required
            className='form-control-custom'
          />
          <Button type='submit' variant='outline-primary' id='button-add-post' className='button-custom'>
            Отправить
          </Button>
        </InputGroup>
      </Form.Group>
    </Form>
  );
}

export default Newpost;
