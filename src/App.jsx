import LandingPage from "./Pages/landingpage";
import Login from "./Pages/login";
import Register from "./Pages/register";
import Dashboard from "./Pages/dashboard";
import Communities from "./Pages/communities";
import CommunityDetails from "./Pages/communitydetails";
import Members from "./Pages/members";
import MemberDetails from "./Pages/memberdetails";
import InviteMember from "./Pages/invitemember";
import Events from "./Pages/events";
import CreateEvent from "./Pages/createEvent";
import EventDetails from "./Pages/eventdetails";
import Announcements from "./Pages/announcements";
import CreateAnnouncement from "./Pages/createannouncement";
import AnnouncementDetails from "./Pages/announcementdetails";
import CreateCommunity from "./Pages/createcommunity";
import Profile from "./Pages/profile";
import ForgotPassword from "./Pages/forgotpassword";
import ResetPassword from "./Pages/resetpassword";
import ProtectedRoute from './ProtectedRoute'
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // <-- FIXED


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC PAGES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />


        {/* PROTECTED PAGES */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/communities" element={<ProtectedRoute><Communities /></ProtectedRoute>} />
        <Route path="/create-community" element={<ProtectedRoute><CreateCommunity /></ProtectedRoute>} />
        <Route path="/community/:id" element={<ProtectedRoute><CommunityDetails /></ProtectedRoute>} />

        <Route path="/members" element={<ProtectedRoute><Members /></ProtectedRoute>} /> {/* <-- Only 1 now */}
        
        <Route path="/member/:id" element={<ProtectedRoute><MemberDetails /></ProtectedRoute>} />
        <Route path="/invite-member" element={<ProtectedRoute><InviteMember /></ProtectedRoute>} />

        <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
        <Route path="/create-event" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
        <Route path="/event/:id" element={<ProtectedRoute><EventDetails /></ProtectedRoute>} />

        <Route path="/announcements" element={<ProtectedRoute><Announcements /></ProtectedRoute>} />
        <Route path="/create-announcement" element={<ProtectedRoute><CreateAnnouncement /></ProtectedRoute>} />
        <Route path="/announcement/:id" element={<ProtectedRoute><AnnouncementDetails /></ProtectedRoute>} />

        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App