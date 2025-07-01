import React from 'react' 
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './components/pagecomponents/Signup'
import Login from './components/pagecomponents/Login'
import { Toaster } from './components/ui/sonner'
import Admin from './pages/Admin'
import Uploadpaper from './components/pagecomponents/Uploadpaper'
import Useruploadpapers from './components/pagecomponents/Useruploadpapers'
import Contactform from './components/pagecomponents/Contactform'
import FindPapers from './components/pagecomponents/FindPapers'
import Protectedroute from './components/pagecomponents/protectedroute'

function App() {

  return (
    <>
      <div className='app px-[2vw]'>
        {/* routes */}
        <Routes>
           <Route path='/' element={<Home />} />
           <Route path='/signup' element={<SignUp />} />
           <Route path='/login' element={<Login />} />
            <Route path='/findpapers' element={<FindPapers />} />
           {/* contact form */}
           <Route path='/contact' element={<Contactform />} />
           {/* find question papers */}
          
           {/* protected routes */}
           <Route element={<Protectedroute allowedRoles={["student"]} />}>
           {/* user routes */}
          <Route path='/uploadpaper' element={<Uploadpaper />} />
           <Route path='/managepapers' element={<Useruploadpapers />} />
           </Route>
           <Route element={<Protectedroute allowedRoles={["admin"]} />}>
           {/* admin routes */}
           <Route path='/admin' element={<Admin />} />

           </Route>
          
       
        </Routes>
        <Toaster />
      </div>
    </>
  )
}

export default App
