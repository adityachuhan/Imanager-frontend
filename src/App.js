import './App.css';
import Navabar from './components/Navabar';
import Todo from './components/To-Do/To-do';
import NoteState from './contex/notes/NoteState';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Diary from './components/Diary/Diary';
import Notes from './components/Notes-files/Notes';
import Login from './components/Authentication/Login';
import SignUp from './components/Authentication/SignUp';
import Home from './components/Home';
import Alert from './components/Alert';
function App() {
  return (
    <>
    <NoteState>
      <Router basename='/'>
      <Navabar/>
      
      <Alert/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/To-do" element={<Todo/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/signup" element={<SignUp/>}/>
        <Route exact path="/Diary" element={<Diary/>}/>
        <Route exact path="/Notes-files" element={  <Notes/>}/>
      </Routes>
    
      </Router>
    </NoteState>
    </>
  );
}

export default App;
