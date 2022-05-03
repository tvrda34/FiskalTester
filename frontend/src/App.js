import { Container } from 'react-bootstrap'
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Header from './components/Header'
import Footer from './components/Footer'

import HomeScreen from './screens/HomeScreen'
import About from './screens/About'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import CashRegistersScreen from './screens/CashRegistersScreen';
import CashRegisterEditScreen from './screens/CashRegisterEditScreen';
import VerifyAccountScreen from './screens/VerifyAccountScreen';
import EmailVerifyScreen from './screens/EmailVerifyScreen';

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
                  <Route path='/email-verify/:id' element={<EmailVerifyScreen />} />
                  <Route path='/cash-registers' element={<CashRegistersScreen />} />
                  <Route path='/cash-registers/:id/edit' element={<CashRegisterEditScreen/>} />
                  <Route path='register/verification' element={<VerifyAccountScreen/>} />
              </Routes>
            </Container>
          </main>
        <Footer/>
      </BrowserRouter>
  );
}

export default App;
