import { useState } from 'react'
import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import Logout from '../components/Logout'
import '../App.css'

function NewEvent() {
  const { id: communityId } = useParams()
  const [searchParams] = useSearchParams()
  const communityFromQuery = searchParams.get('community')
  const finalCommunityId = communityId || communityFromQuery
  
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    time: '', // CHANGED: was event_time
    type: 'General'
  })

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return alert("Please login first")

    // Combine date + time into 1 datetime for Supabase
    const event_datetime = form.date && form.time? `${form.date}T${form.time}` : null

    const { error } = await supabase.from('events').insert([{
      title: form.title,
      description: form.description,
      location: form.location,
      date: event_datetime, // save as 1 datetime
      time: form.time, // also save time separately
      type: form.type,
      status: 'Upcoming',
      community_id: finalCommunityId,
      created_by: user.id
    }])

    setLoading(false)
    if (error) {
      alert("Error: " + error.message)
      console.log(error)
    } else {
      alert("Event created!")
      navigate(`/community/${finalCommunityId}`)
    }
  }

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <Link to="/" className="dashboard-logo"><div className="brand-icon">C</div><span>Community Connect</span></Link>
        <nav className="dashboard-nav">
          <Link to="/dashboard"><span>🏠</span>Dashboard</Link>
          <Link to="/communities"><span>🏘️</span>Communities</Link>
          <Link to="/members"><span>👥</span>Members</Link>
          <Link to="/events" className="active"><span>📅</span>Events</Link>
        </nav>
        <div className="dashboard-bottom"><Link to="/profile"><span>👤</span>Profile</Link><Logout /></div>
      </aside>

      <main className="dashboard-main">
        <div className="auth-form-container" style={{ maxWidth: '600px', margin: '40px auto' }}>
          <div className="auth-form">
            <Link to={`/community/${finalCommunityId}`} className="mobile-back">← Back to Community</Link>
            
            <div className="auth-message" style={{ textAlign: 'center' }}>
              <div className="auth-symbol">📅</div>
              <h1>Create new event</h1>
              <p>Fill in the details for your event.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Event Title</label>
                <input name="title" value={form.title} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows="3" required />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input name="location" value={form.location} onChange={handleChange} required />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Date</label>
                  <input type="date" name="date" value={form.date} onChange={handleChange} required />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Time</label>
                  <input type="time" name="time" value={form.time} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-group">
                <label>Type</label>
                <select name="type" value={form.type} onChange={handleChange}>
                  <option>General</option>
                  <option>Muslim</option>
                  <option>Christian</option>
                </select>
              </div>

              <button type="submit" disabled={loading} className="primary-btn auth-submit">
                {loading? 'Creating...' : 'Create Event →'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
export default NewEvent