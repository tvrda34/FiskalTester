import { Container } from 'react-bootstrap'
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Header from './components/Header'
import Footer from './components/Footer'

import HomeScreen from './screens/HomeScreen'
import About from './screens/About'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import EmailVerify from './screens/EmailVerify';

function App() {
  return (
      <BrowserRouter>
        <Header/>
          <main className="py-3">
            <Container>
              <Routes>
                  {" "}
                  <Route path="/" element={<HomeScreen />} exact />
                  <Route path="/about" element={<About />} exact/>
                  <Route path="/login" element={<LoginScreen />} />
                  <Route path='/register' element={<RegisterScreen />} />
                  <Route path='/profile' element={<ProfileScreen />} />
                  <Route path='/email-verify/:token' element={<EmailVerify />} />
              </Routes>
            </Container>
          </main>
        <Footer/>
      </BrowserRouter>
  );
}

export default App;
