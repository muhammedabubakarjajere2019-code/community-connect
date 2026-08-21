import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from "../lib/supabaseClient"
import Logout from '../components/logout'
import '../App.css'

function MyEvents() {
  const [createdEvents, setCreatedEvents] = useState([])
  const [joinedEvents, setJoinedEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMyEvents() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // 1. Events I Created
      const { data: created } = await supabase
        .from('events')
        .select('*')
        .eq('created_by', user.id)
        .order('date', { ascending: true })

      // 2. Events I Joined
      const { data: rsvpData } = await supabase
        .from('event_rsvps')
        .select('event_id')
        .eq('user_id', user.id)
      
      const eventIds = rsvpData?.map(r => r.event_id) || []
      let joined = []
      if (eventIds.length > 0) {
        const { data: joinedData } = await supabase
          .from('events')
          .select('*')
          .in('id', eventIds)
          .order('date', { ascending: true })
        joined = joinedData || []
      }

      setCreatedEvents(created || [])
      setJoinedEvents(joined || [])
      setLoading(false)
    }
    fetchMyEvents()
  }, [])

  if (loading) return <div className="dashboard"><main className="dashboard-main"><p>Loading...</p></main></div>

  const cardStyle = {
    display: 'block', 
    padding: '12px 16px', 
    background: '#f9fafb', 
    margin: '8px 0', 
    borderRadius: '10px', 
    textDecoration: 'none', 
    color: 'black',
    border: '1px solid #e5e7eb',
    transition: 'all 0.2s'
  }

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <Link to="/" className="dashboard-logo"><div className="brand-icon">C</div><span>Community Connect</span></Link>
        <nav className="dashboard-nav">
          <Link to="/dashboard"><span>🏠</span>Dashboard</Link>
          <Link to="/communities"><span>🏘️</span>Communities</Link>
          <Link to="/members"><span>👥</span>Members</Link>
          <Link to="/events"><span>📅</span>Events</Link>
          <Link to="/my-events" className="active"><span>⭐</span>My Events</Link>
          <Link to="/announcements"><span>📢</span>Announcements</Link>
        </nav>
        <div className="dashboard-bottom"><Link to="/profile"><span>👤</span>Profile</Link><Logout /></div>
      </aside>

      <main className="dashboard-main">
        <h1>My Events</h1>

        <div className="details-card">
          <h2>📢 Events I Created ({createdEvents.length})</h2>
          {createdEvents.length === 0 ? <p>You haven't created any events yet.</p> : 
            createdEvents.map(e => (
              <Link 
                key={e.id} 
                to={`/event/${e.id}`} 
                style={cardStyle}
                onMouseOver={(e) => e.currentTarget.style.background = '#f3f4f6'}
                onMouseOut={(e) => e.currentTarget.style.background = '#f9fafb'}
              >
                <strong>{e.title}</strong> 
                <div style={{fontSize: '14px', color: '#6b7280', marginTop: '4px'}}>
                  📅 {e.date} at 🕓 {e.time} | 📍 {e.location}
                </div>
              </Link>
            ))
          }
        </div>

        <div className="details-card" style={{marginTop: '20px'}}>
          <h2>✓ Events I Joined ({joinedEvents.length})</h2>
          {joinedEvents.length === 0 ? <p>You haven't joined any events yet.</p> : 
            joinedEvents.map(e => (
              <Link 
                key={e.id} 
                to={`/event/${e.id}`} 
                style={cardStyle}
                onMouseOver={(e) => e.currentTarget.style.background = '#f3f4f6'}
                onMouseOut={(e) => e.currentTarget.style.background = '#f9fafb'}
              >
                <strong>{e.title}</strong>
                <div style={{fontSize: '14px', color: '#6b7280', marginTop: '4px'}}>
                  📅 {e.date} at 🕓 {e.time} | 📍 {e.location}
                </div>
              </Link>
            ))
          }
        </div>
      </main>
    </div>
  )
}
export default MyEvents