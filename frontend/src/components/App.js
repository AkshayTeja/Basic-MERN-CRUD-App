//Use npm run start to launch, run server first, then frontend
//Username: test2@gmail.com, Password: password123

import LoginPage from "../pages/LoginPage";
import NotesPage from "../pages/NotesPage";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import RequireAuth from "./RequireAuth";
import SignupPage from "../pages/SignupPage";


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
        <li>
          <Link to="/signup">Signup</Link>
        </li>
      </ul>

      <Routes>
        <Route index element={
          <RequireAuth>
            <NotesPage/>
          </RequireAuth>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
      </Routes>
    </BrowserRouter>
    
  </div>
  );
}

export default App;
