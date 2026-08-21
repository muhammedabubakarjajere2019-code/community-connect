import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import LandingPage from './pages/landingpage.jsx'
import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import Dashboard from './pages/dashboard.jsx'
import Communities from './pages/communities.jsx'
import CommunityDetails from './pages/communitydetails.jsx'
import EditCommunity from './pages/editcommunity.jsx'
import Members from './pages/members.jsx'
import MemberDetails from './pages/memberdetails.jsx'
import InviteMember from './pages/invitemember.jsx'
import Events from './pages/events.jsx'
import CreateEvent from './pages/createevent.jsx'
import EventDetails from './pages/eventdetails.jsx'
import Announcements from './pages/announcements.jsx'
import CreateAnnouncement from './pages/createannouncement.jsx'
import AnnouncementDetails from './pages/announcementdetails.jsx'
import CreateCommunity from './pages/createcommunity.jsx'
import Profile from './pages/profile.jsx'
import ForgotPassword from './pages/forgotpassword.jsx'
import ResetPassword from './pages/resetpassword.jsx'
import MyEvents from './pages/myevents.jsx'
import ProtectedRoute from './protectedroute.jsx'

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