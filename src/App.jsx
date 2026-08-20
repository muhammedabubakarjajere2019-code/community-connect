import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import LandingPage from './pages/landingpage'
import Login from './pages/login'
import Register from './pages/register'
import Dashboard from './pages/dashboard'
import Communities from './pages/communities'
import CommunityDetails from './pages/communitydetails'
import EditCommunity from './pages/editcommunity'
import Members from './pages/members'
import MemberDetails from './pages/memberdetails'
import InviteMember from './pages/invitemember'
import Events from './pages/events'
import CreateEvent from './pages/createevent'
import EventDetails from './pages/eventdetails'
import Announcements from './pages/announcements'
import CreateAnnouncement from './pages/createannouncement'
import AnnouncementDetails from './pages/announcementdetails'
import CreateCommunity from './pages/createcommunity'
import Profile from './pages/profile'
import ForgotPassword from './pages/forgotpassword'
import ResetPassword from './pages/resetpassword'
import MyEvents from './pages/myevents'
import ProtectedRoute from './protectedroute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/communities" element={<ProtectedRoute><Communities /></ProtectedRoute>} />
        <Route path="/communities/:id" element={<ProtectedRoute><CommunityDetails /></ProtectedRoute>} />
        <Route path="/communities/:id/edit" element={<ProtectedRoute><EditCommunity /></ProtectedRoute>} />
        <Route path="/communities/new" element={<ProtectedRoute><CreateCommunity /></ProtectedRoute>} />
        <Route path="/members" element={<ProtectedRoute><Members /></ProtectedRoute>} />
        <Route path="/members/:id" element={<ProtectedRoute><MemberDetails /></ProtectedRoute>} />
        <Route path="/members/invite" element={<ProtectedRoute><InviteMember /></ProtectedRoute>} />
        <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
        <Route path="/events/new" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
        <Route path="/events/:id" element={<ProtectedRoute><EventDetails /></ProtectedRoute>} />
        <Route path="/my-events" element={<ProtectedRoute><MyEvents /></ProtectedRoute>} />
        <Route path="/announcements" element={<ProtectedRoute><Announcements /></ProtectedRoute>} />
        <Route path="/announcements/new" element={<ProtectedRoute><CreateAnnouncement /></ProtectedRoute>} />
        <Route path="/announcements/:id" element={<ProtectedRoute><AnnouncementDetails /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App
