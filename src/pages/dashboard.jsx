import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Link } from 'react-router-dom'
import Logout from '../components/Logout'
import '../App.css'

export default function Dashboard() {
  const [stats, setStats] = useState({ members: 0, events: 0, announcements: 0 })
  const [events, setEvents] = useState([])
  const [announcements, setAnnouncements] = useState([])
  const [userName, setUserName] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  async function fetchDashboardData() {
    setLoading(true)
    
    const { data: { user } } = await supabase.auth.getUser()
    setUserName(user?.user_metadata?.name || user?.email?.split('@')[0] || 'User')

    const [membersRes, eventsRes, announcementsRes] = await Promise.all([
      supabase.from('profiles').select('id', { count: 'exact', head: true }),
      supabase.from('events').select('*').order('date', {ascending: true}).limit(3), // CHANGED TO 'date'
      supabase.from('announcements').select('*').order('created_at', {ascending: false}).limit(2)
    ])

    setStats({
      members: membersRes.count || 0,
      events: eventsRes.data?.length || 0,
      announcements: announcementsRes.data?.length || 0
    })
    setEvents(eventsRes.data || [])
    setAnnouncements(announcementsRes.data || [])
    setLoading(false)
  }

  function formatEventDate(dateString) {
    if (!dateString) return { day: '--', month: 'Date' }
    const date = new Date(dateString)
    if (isNaN(date)) return { day: '--', month: 'Date' }
    return {
      day: date.getDate(),
      month: date.toLocaleString('en-US', {month: 'short'})
    }
  }

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <Link to="/" className="dashboard-logo"><div className="brand-icon">C</div><span>Community Connect</span></Link>
        <nav className="dashboard-nav">
          <Link to="/dashboard" className="active"><span>🏠</span>Dashboard</Link>
          <Link to="/communities"><span>🏘️</span>Communities</Link>
          <Link to="/members"><span>👥</span>Members</Link>
          <Link to="/events"><span>📅</span>Events</Link>
          <Link to="/announcements"><span>📢</span>Announcements</Link>
        </nav>
        <div className="dashboard-bottom"><Link to="/profile"><span>👤</span>Profile</Link><Logout /></div>
      </aside>

      <main className="dashboard-main">
        <header className="page-header">
          <div>
            <p className="dashboard-label">COMMUNITY CONNECT</p>
            <h1>Welcome back, {userName} 👋</h1>
            <p>Here's what's happening in your community today.</p>
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div>
              <p>Total Members</p>
              <h2>{loading? '...' : stats.members}</h2>
              <span>Community members</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div>
              <p>Upcoming Events</p>
              <h2>{loading? '...' : stats.events}</h2>
              <span>Events available</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📢</div>
            <div>
              <p>Announcements</p>
              <h2>{loading? '...' : stats.announcements}</h2>
              <span>Community announcements</span>
            </div>
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-header">
              <h2>Upcoming Events</h2>
              <Link to="/events">View all</Link>
            </div>
            {events.length === 0? <p>No upcoming events</p> : 
              events.map(e => {
                const {day, month} = formatEventDate(e.date)
                return (
                  <div className="event-item" key={e.id}>
                    <div className="event-date">
                      <span>{day}</span>
                      <span>{month}</span>
                    </div>
                    <div>
                      <h3>{e.title}</h3>
                      <p>🕒 {e.date? new Date(e.date).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'}) : 'TBD'} 📍 {e.location || 'TBD'}</p>
                    </div>
                  </div>
                )
              })
            }
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h2>Announcements</h2>
              <Link to="/announcements">View all</Link>
            </div>
            {announcements.length === 0? <p>No announcements</p> : 
              announcements.map(a => (
                <div className="announcement-item" key={a.id}>
                  <h3>{a.title}</h3>
                  <p>{a.content?.slice(0, 80)}...</p>
                </div>
              ))
            }
          </div>
        </section>
      </main>
    </div>
  )
}