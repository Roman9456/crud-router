import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Menu from './components/Menu';
import Posts from './components/Posts';
import Newpost from './components/Newpost';
import PostInfo from './components/PostInfo';
import './components/css/wall.css'

function App() {
  return (
    <BrowserRouter>
      <Container className='bg-light-custom container-custom'>
        <Menu />
        <Routes>
          <Route path='/' element={<Posts />} />
          <Route path='/newpost' element={<Newpost />} />
          <Route path='/posts/:id' element={<PostInfo />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
