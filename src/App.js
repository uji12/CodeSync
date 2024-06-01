import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import EditPage from './pages/EditPage';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
      <div >
      <Toaster/>
    </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/editor/:roomId' element={<EditPage/>}></Route>
         </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
