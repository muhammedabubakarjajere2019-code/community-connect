import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import LandingPage from './Pages/LandingPage'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Dashboard from './Pages/Dashboard'
import Communities from './Pages/Communities'
import CommunityDetails from './Pages/CommunityDetails'
import EditCommunity from './Pages/EditCommunity'
import Members from './Pages/Members'
import MemberDetails from './Pages/MemberDetails'
import InviteMember from './Pages/InviteMember'
import Events from './Pages/Events'
import CreateEvent from './Pages/CreateEvent'
import EventDetails from './Pages/EventDetails'
import Announcements from './Pages/Announcements'
import CreateAnnouncement from './Pages/CreateAnnouncement'
import AnnouncementDetails from './Pages/AnnouncementDetails'
import CreateCommunity from './Pages/CreateCommunity'
import Profile from './Pages/Profile'
import ForgotPassword from './Pages/ForgotPassword'
import ResetPassword from './Pages/ResetPassword'
import MyEvents from './Pages/MyEvents'
import ProtectedRoute from './ProtectedRoute'

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