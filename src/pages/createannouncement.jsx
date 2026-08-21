import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from "../lib/supabaseClient" // <-- ADDED
import Logout from '../components/logout'
import '../App.css'

function CreateAnnouncement() {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [author, setAuthor] = useState('')
  const [type, setType] = useState('General')
  const [icon, setIcon] = useState('📢')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => { // <-- MADE ASYNC
    e.preventDefault()

    if (!title.trim() || !message.trim() || !author.trim()) {
      alert('Please fill in all required fields.')
      return
    }

    setLoading(true)

    const { error } = await supabase.from('announcements').insert({
      title: title.trim(),
      message: message.trim(),
      author: author.trim(),
      type,
      icon,
      created_at: new Date().toISOString() // <-- saves date to DB
    })

    setLoading(false)

    if (error) {
      alert('Error: ' + error.message)
      return
    }

    alert('Announcement published successfully!')
    navigate('/announcements')
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
          <Link to="/announcements" className="active"><span>📢</span>Announcements</Link>
        </nav>
        <div className="dashboard-bottom"><Link to="/profile"><span>👤</span>Profile</Link><Logout /></div>
      </aside>

      <main className="dashboard-main">
        <Link to="/announcements" className="back-link">← Back to Announcements</Link>

        <header className="page-header">
          <div>
            <p className="dashboard-label">COMMUNITY CONNECT</p>
            <h1>Create Announcement</h1>
            <p>Share important information with your community members.</p>
          </div>
        </header>

        <section className="create-form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Announcement Title</label>
              <input id="title" type="text" placeholder="Enter announcement title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div className="form-group">
              <label htmlFor="message">Announcement Message</label>
              <textarea id="message" rows="6" placeholder="Write your announcement..." value={message} onChange={(e) => setMessage(e.target.value)} required />
            </div>

            <div className="form-group">
              <label htmlFor="author">Your Name</label>
              <input id="author" type="text" placeholder="Enter your name" value={author} onChange={(e) => setAuthor(e.target.value)} required />
            </div>

            <div className="form-group">
              <label htmlFor="type">Community Type</label>
              <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="General">🤝 General</option>
                <option value="Muslim">🕌 Muslim</option>
                <option value="Christian">⛪ Christian</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="icon">Announcement Icon</label>
              <select id="icon" value={icon} onChange={(e) => setIcon(e.target.value)}>
                <option value="📢">📢 Announcement</option>
                <option value="🎓">🎓 Education</option>
                <option value="📅">📅 Event</option>
                <option value="🌱">🌱 Community</option>
                <option value="🕌">🕌 Muslim</option>
                <option value="⛪">⛪ Christian</option>
              </select>
            </div>

            <div className="form-actions">
              <Link to="/announcements" className="cancel-btn">Cancel</Link>
              <button type="submit" disabled={loading} className="create-community-btn">
                {loading ? 'Publishing...' : '📢 Publish Announcement'}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  )
}
export default CreateAnnouncement