import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from "../lib/supabaseClient"
import '../App.css'

function CreateCommunity() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [type, setType] = useState('General') // FIX

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const { error } = await supabase.from('communities').insert([{
      name, description, location, type, created_by: user.id
    }])
    
    if(error) { alert(error.message); setLoading(false); return }
    
    alert("Community Created!")
    navigate('/communities')
  }

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <Link to="/" className="dashboard-logo"><div className="brand-icon">C</div><span>Community Connect</span></Link>
        <nav className="dashboard-nav">
          <Link to="/dashboard"><span>🏠</span>Dashboard</Link>
          <Link to="/communities" className="active"><span>🏘️</span>Communities</Link>
          <Link to="/members"><span>👥</span>Members</Link>
          <Link to="/events"><span>📅</span>Events</Link>
          <Link to="/announcements"><span>📢</span>Announcements</Link>
        </nav>
      </aside>

      <main className="dashboard-main">
        <header className="page-header">
          <div><p className="dashboard-label">COMMUNITY CONNECT</p><h1>Create Community</h1></div>
        </header>

        <form onSubmit={handleSubmit} className="create-form" style={{maxWidth:600}}>
          <div className="form-group"><label>Community name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} required /></div>
          <div className="form-group">
            <label>Category</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option>General</option><option>Muslim</option><option>Christian</option>
            </select>
          </div>
          <div className="form-group"><label>Location</label><input type="text" value={location} onChange={(e) => setLocation(e.target.value)} /></div>
          <div className="form-group"><label>Description</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="4" required/></div>
          <button type="submit" disabled={loading} className="create-community-btn">
            {loading ? 'Creating...' : 'Create Community'}
          </button>
        </form>
      </main>
    </div>
  )
}
export default CreateCommunity