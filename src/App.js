import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Registration  from './components/Registration';
import BooksList from './components/BooksList';
import Protected from './components/Protected';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element ={<Login />} path = '/login'></Route>
          <Route element ={<Registration />} path = 'registration'></Route>
          <Route element ={<BooksList />} path = 'booklist'></Route>
          <Route element ={<Protected />} path = 'protected'></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
