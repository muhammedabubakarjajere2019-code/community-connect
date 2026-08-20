// Navbar.jsx
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Navbar() {
  const [session, setSession] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
    window.location.reload() // force refresh so navbar updates
  }

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LEFT: Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-green-600 text-white w-9 h-9 rounded-xl flex items-center justify-center font-bold">C</div>
          <span className="font-bold text-xl text-gray-800">Community Connect</span>
        </Link>

        {/* MIDDLE: Links */}
        <div className="hidden md:flex gap-8 text-gray-600 font-medium">
          <Link to="/" className="hover:text-green-600">Home</Link>
          <Link to="/communities" className="hover:text-green-600">Communities</Link>
          <Link to="/communities" className="hover:text-green-600">Members</Link> {/* ADDED THIS - OPTION B */}
          <Link to="/events" className="hover:text-green-600">Events</Link>
          <Link to="/about" className="hover:text-green-600">About</Link>
        </div>

        {/* RIGHT: This is the magic part */}
        <div className="flex items-center gap-3">
          {session ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-green-600 font-medium">Dashboard</Link>
              <Link to="/my-events" className="text-gray-700 hover:text-green-600 font-medium">My Events</Link>
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50">
                Login
              </Link>
              <Link to="/register" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}