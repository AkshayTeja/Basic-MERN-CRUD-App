//Use npm run start to launch, run server first, then frontend

import LoginPage from "../pages/LoginPage";
import NotesPage from "../pages/NotesPage";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";


function App() {

  
  
  return (
  <div className="App">
    <BrowserRouter>
      
      {/*Navigation*/}
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>

      <Routes>
        <Route index element={<NotesPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
    
  </div>
  );
}

export default App;
