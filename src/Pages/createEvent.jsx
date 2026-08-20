import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import '../App.css'

function CreateEvent() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const communityId = searchParams.get('community')

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [community, setCommunity] = useState(null)

  useEffect(() => {
    if (!communityId) {
      alert("No community selected")
      navigate('/communities')
      return
    }
    // Get community name for the header
    supabase.from('communities').select('name').eq('id', communityId).single()
    .then(({ data }) => setCommunity(data))
  }, [communityId, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setError("Please login first")
      setLoading(false)
      return
    }

    // Combine date + time into 1 datetime for the 'date' column
    const event_datetime = date && time? `${date}T${time}:00` : null

    const { error } = await supabase
    .from('events')
    .insert([{
        title,
        description,
        location,
        date: event_datetime, // FIXED: was event_date
        time: time, // FIXED: was event_time
        type: 'General', // ADDED
        status: 'Upcoming', // ADDED
        community_id: communityId,
        created_by: user.id
      }])

    setLoading(false)

    if (error) {
      setError(error.message)
      console.log(error)
      return
    }

    alert('Event created successfully!')
    navigate(`/community/${communityId}`)
  }

  return (
    <div className="auth-page">
      {/* LEFT BRAND SIDE */}
      <div className="auth-brand">
        <Link to="/" className="auth-logo">
          <div className="brand-icon">E</div>
          <span>Community Connect</span>
        </Link>
        <div className="auth-message">
          <div className="auth-symbol">📅</div>
          <h1>Create amazing<span> events.</span></h1>
          <p>Bring your {community?.name || 'community'} together with events people will love.</p>
        </div>
      </div>

      {/* RIGHT FORM SIDE */}
      <div className="auth-form-container">
        <div className="auth-form">
          <Link to={`/community/${communityId}`} className="mobile-back">← Back to Community</Link>

          <div className="form-heading">
            <h2>Create new event 📅</h2>
            <p>Fill in the details for your event.</p>
          </div>

          {error && <p style={{ color: '#d93025', marginBottom: '10px' }}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Event Title</label>
              <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Weekly Meetup" required />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What will happen at this event?" rows="3" />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. PKM Hall" />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="date">Date</label>
                <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="time">Time</label>
                <input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
              </div>
            </div>

            <button type="submit" className="primary-btn auth-submit" disabled={loading}>
              {loading? 'Creating...' : 'Create Event →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateEvent