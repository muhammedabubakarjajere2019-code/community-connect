import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate
} from 'react-router-dom'

import { supabase } from './lib/supabaseClient'

import LandingPage from './Pages/landingpage'
import Login from './Pages/login'
import Register from './Pages/register'
import Dashboard from './Pages/dashboard'
import Communities from './Pages/communities'
import CommunityDetails from './Pages/communitydetails'
import EditCommunity from './pages/EditCommunity'
import Members from './Pages/members'
import MemberDetails from './Pages/memberdetails'
import InviteMember from './Pages/invitemember'
import Events from './Pages/events'
import CreateEvent from './Pages/createEvent'
import EventDetails from './Pages/eventdetails'
import Announcements from './Pages/announcements'
import CreateAnnouncement from './Pages/createannouncement'
import AnnouncementDetails from './Pages/announcementdetails'
import CreateCommunity from './Pages/createcommunity'
import Profile from './Pages/profile'
import ForgotPassword from './Pages/forgotpassword'
import ResetPassword from './Pages/resetpassword'
import ProtectedRoute from './ProtectedRoute'
import MyEvents from './Pages/myevents'

function Navbar() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  const authPages = ['/', '/login', '/register', '/forgot-password', '/reset-password']
  const isAuthPage = authPages.includes(location.pathname)

  useEffect(() => {
    if (isAuthPage) { setUser(null); return }
    
    supabase.auth.getUser().then(({ data: { user } }) => { setUser(user) })
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
    })
    
    return () => { subscription.unsubscribe() }
  }, [location.pathname, isAuthPage])

  async function handleLogout() {
    await supabase.auth.signOut()
    localStorage.clear()
    setUser(null)
    navigate('/login')
  }

  if (isAuthPage) { return null }

  return (
    <nav className="w-full bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-4 flex justify-between items-center">
        <Link to="/communities" className="text-2xl font-bold text-green-600">
          Community Connect
        </Link>
        <div className="flex gap-4 md:gap-8 items-center">
          <Link to="/communities" className="text-gray-700 hover:text-green-600 font-medium hidden md:block">Communities</Link>
          <Link to="/dashboard" className="text-gray-700 hover:text-green-600 font-medium hidden md:block">Dashboard</Link>
          <Link to="/my-events" className="text-gray-700 hover:text-green-600 font-medium">⭐ My Events</Link>
          {user? (
            <div className="flex gap-4 items-center">
              <span className="text-sm hidden lg:block text-gray-600">{user.email}</span>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold">Login</Link>
          )}
        </div>
      </div>
    </nav>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 w-full">
        <Navbar />
        <main className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-8">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/communities" element={<ProtectedRoute><Communities /></ProtectedRoute>} />
            <Route path="/create-community" element={<ProtectedRoute><CreateCommunity /></ProtectedRoute>} />
            
            <Route path="/edit-community/:id" element={<ProtectedRoute><EditCommunity /></ProtectedRoute>} />
            
            <Route path="/community/:id" element={<ProtectedRoute><CommunityDetails /></ProtectedRoute>} />
            <Route path="/communities/:id" element={<ProtectedRoute><CommunityDetails /></ProtectedRoute>} />
            
            {/* MEMBERS ROUTES */}
            <Route path="/members" element={<ProtectedRoute><Navigate to="/communities" replace /></ProtectedRoute>} />
            <Route path="/members/:id" element={<ProtectedRoute><Members /></ProtectedRoute>} />
            <Route path="/community/:id/members" element={<ProtectedRoute><Members /></ProtectedRoute>} />
            <Route path="/communities/:id/members" element={<ProtectedRoute><Members /></ProtectedRoute>} />
            <Route path="/communities/:id/invite" element={<ProtectedRoute><InviteMember /></ProtectedRoute>} />
            
            <Route path="/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/member/:id" element={<ProtectedRoute><MemberDetails /></ProtectedRoute>} />
            
            <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
            <Route path="/my-events" element={<ProtectedRoute><MyEvents /></ProtectedRoute>} />
            <Route path="/events/new" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
            <Route path="/create-event" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} /> {/* ADDED THIS */}
            <Route path="/communities/:id/create-event" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
            <Route path="/event/:id" element={<ProtectedRoute><EventDetails /></ProtectedRoute>} />
            <Route path="/announcements" element={<ProtectedRoute><Announcements /></ProtectedRoute>} />
            <Route path="/create-announcement" element={<ProtectedRoute><CreateAnnouncement /></ProtectedRoute>} />
            <Route path="/announcement/:id" element={<ProtectedRoute><AnnouncementDetails /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
export default App