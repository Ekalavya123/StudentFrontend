import './App.css';
import Home from './screens/Home'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Signup from './screens/SignUp';
import Login from './screens/Login';
import ProfileNavbar from './components/ProfileNavbar';
import About from './components/About';
import Experience from './components/Experience';
import Experiences from './screens/Experiences';
import FindStudent from './screens/FindStudent';
import Recieved from './screens/Recieved'
import Sent from './screens/Sent'
import ExperiencePage from './components/ExperiencePage';
import Cpi from './components/Cpi';
import Resources from './components/Resources';
import ExperienceUpdate from './components/Updates/ExperienceUpdate';
import GradesUpdate from './components/Updates/GradesUpdate';
import InfoUpdate from './components/Updates/InfoUpdate';
import Verification from './components/Verification'
import PasswordReset from './components/PasswordReset'
import RequestAbout from './components/RequestAbout';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/SignUp" element={<Signup />}/>
          <Route exact path="/Login" element={<Login />}/>
          <Route exact path="/Profile" element={<ProfileNavbar />}/>
          <Route exact path="/About" element={<About />}/>
          <Route exact path="/Experience" element={<Experience />}/>
          <Route exact path="/InterviewExperiences" element={<Experiences />}/>
          <Route exact path="/FindStudent" element={<FindStudent />}/>
          <Route exact path='/Sent' element={<Sent />}/>
          <Route exact path='/Recieved' element={<Recieved />}/>
          <Route path='/ExperiencePage/:type' Component={ExperiencePage}/>
          <Route exact path='/Cpi' element={<Cpi />}/>
          <Route exact path='/Resources' element={<Resources />}/>
          <Route exact path='/ExperienceUpdate' element={<ExperienceUpdate />}/>
          <Route exact path='/GradesUpdate' element={<GradesUpdate />}/>
          <Route exact path='/InfoUpdate' element={<InfoUpdate />}/>
          <Route exact path={"/users/verify/:token"} element={<Verification />}/>
          <Route exact path={"/users/reset/:token"} element={<PasswordReset />}/>
          <Route exact path={"/RequestAbout"} element={<RequestAbout/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;