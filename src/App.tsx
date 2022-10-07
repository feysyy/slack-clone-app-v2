import React from 'react';
import SignUp from './components/SignUp';
import SignIn from './container/SignIn';
import MainPage from './container/MainPage';
import "./sass/app.scss"
import { Routes, Route} from 'react-router-dom'

function App() {
  return (
    <section>
      <Routes>
        <Route path="/" element={ <SignIn />} />
        <Route path="/sign-up-page" element={ <SignUp />} />
        <Route path="/main-page" element={ <MainPage />} />
     </Routes>
    </section>
  )
}

export default App;
