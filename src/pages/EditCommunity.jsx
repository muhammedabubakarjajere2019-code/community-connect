import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from "../lib/supabaseClient"
import '../App.css'

function EditCommunity() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    name: '',
    description: '',
    location: '',
    type: 'General'
  })
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser()
      setCurrentUser(user)
      fetchCommunity()
    }
    init()
  }, [id])

  async function fetchCommunity() {
    const { data, error } = await supabase
     .from('communities')
     .select('*')
     .eq('id', id)
     .single()
    
    if(error) return alert(error.message)
    
    // Security: only creator can edit
    if(data.created_by!== currentUser?.id) {
      alert("You can only edit your own community")
      navigate('/communities')
      return
    }

    setForm(data)
    setLoading(false)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    const { error } = await supabase
     .from('communities')
     .update(form)
     .eq('id', id)
    
    if(error) return alert(error.message)
    alert("Community updated!")
    navigate('/communities')
  }

  if(loading) return <div className="dashboard"><main className="dashboard-main"><p>Loading...</p></main></div>

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
          <div>
            <p className="dashboard-label">COMMUNITY CONNECT</p>
            <h1>Edit Community</h1>
          </div>
        </header>

        <form onSubmit={handleUpdate} className="create-form" style={{maxWidth:600}}>
          <div className="form-group">
            <label>Community Name</label>
            <input 
              type="text" 
              value={form.name} 
              onChange={(e) => setForm({...form, name: e.target.value})} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
              value={form.description} 
              onChange={(e) => setForm({...form, description: e.target.value})} 
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input 
              type="text" 
              value={form.location} 
              onChange={(e) => setForm({...form, location: e.target.value})} 
            />
          </div>

          <div className="form-group">
            <label>Type</label>
            <select value={form.type} onChange={(e) => setForm({...form, type: e.target.value})}>
              <option>General</option>
              <option>Muslim</option>
              <option>Christian</option>
            </select>
          </div>

          <button type="submit" className="create-community-btn">Update Community</button>
        </form>
      </main>
    </div>
  )
}
export default EditCommunity