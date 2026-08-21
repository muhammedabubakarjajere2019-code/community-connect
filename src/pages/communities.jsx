import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from "../lib/supabaseClient"
import '../App.css'
import { MoreVertical, Trash2, Edit } from 'lucide-react'

function Communities() {
  const [search, setSearch] = useState('')
  const [communities, setCommunities] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser()
      
      // FIX: STOP THE LOOP - REDIRECT TO LOGIN IF NOT LOGGED IN
      if (!user) {
        navigate('/login')
        return
      }
      
      setCurrentUser(user)
      fetchCommunities()
    }
    init()
  }, [navigate]) // Added navigate to dependency array

  async function fetchCommunities() {
    setLoading(true)
    const { data } = await supabase
     .from('communities')
     .select('*')
     .order('created_at', { ascending: false })
    
    setCommunities(data || [])
    setLoading(false)
  }

  const handleDeleteCommunity = async (communityId) => {
    if(!confirm("Delete this community? This cannot be undone.")) return
    const { error } = await supabase.from('communities').delete().eq('id', communityId)
    if(error) return alert(error.message)
    alert("Community deleted")
    fetchCommunities()
    setMenuOpen(null)
  }

  const handleEditCommunity = (communityId) => {
    navigate(`/edit-community/${communityId}`)
  }

  const filteredCommunities = communities.filter((c) => {
    const name = c.name?.toLowerCase() || ''
    const description = c.description?.toLowerCase() || ''
    return name.includes(search.toLowerCase()) || description.includes(search.toLowerCase())
  })

  if (loading) return <div className="dashboard"><main className="dashboard-main"><p>Loading...</p></main></div>

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
        <div className="dashboard-bottom"><Link to="/profile"><span>👤</span>Profile</Link><Link to="/"><span>🚪</span>Logout</Link></div>
      </aside>

      <main className="dashboard-main">
        <header className="page-header">
          <div>
            <p className="dashboard-label">COMMUNITY CONNECT</p>
            <h1>Find your community</h1>
            <p>Connect with people, participate in activities and grow together.</p>
          </div>
          <Link to="/create-community" className="create-community-btn">+ Create Community</Link>
        </header>

        <section className="communities-toolbar">
          <div className="community-search"><span>🔍</span><input type="text" placeholder="Search communities..." value={search} onChange={(e) => setSearch(e.target.value)}/></div>
        </section>

        <section className="community-grid">
          {filteredCommunities.map((community) => {
            const isCreator = currentUser?.id === community.created_by
            return (
            <article className="community-card" key={community.id} style={{position:'relative', paddingTop: 40}}>
              
              {/* ONLY SHOW MENU IF YOU CREATED IT */}
              {isCreator && (
                <div style={{position:'absolute', right:12, top:12, zIndex:10}}>
                  <button 
                    onClick={() => setMenuOpen(menuOpen === community.id? null : community.id)}
                    style={{background:'#fff', border:'1px solid #e5e7eb', borderRadius:6, cursor:'pointer', padding:6}}
                  >
                    <MoreVertical size={18} />
                  </button>
                  
                  {menuOpen === community.id && (
                    <div style={{position:'absolute', right:0, top:35, background:'#fff', border:'1px solid #e5e7eb', borderRadius:8, boxShadow:'0 4px 6px rgba(0,0,0,0.1)', zIndex:10, minWidth:130}}>
                      <button 
                        onClick={() => handleEditCommunity(community.id)}
                        style={{display:'flex', gap:8, alignItems:'center', width:'100%', padding:'8px 12px', background:'none', border:'none', cursor:'pointer', color:'#2563eb', textAlign:'left', fontWeight:600, borderBottom:'1px solid #f3f4f6'}}
                      >
                        <Edit size={16}/> Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteCommunity(community.id)}
                        style={{display:'flex', gap:8, alignItems:'center', width:'100%', padding:'8px 12px', background:'none', border:'none', cursor:'pointer', color:'#ef4444', textAlign:'left', fontWeight:600}}
                      >
                        <Trash2 size={16}/> Delete
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="community-card-content">
                <span className="community-type">{community.type || 'General'}</span>
                <h2>{community.name}</h2>
                <p>{community.description}</p>
                <p style={{fontSize:12, color:'#666'}}>📍 {community.location}</p>
                <div className="community-card-footer">
                  <Link to={`/community/${community.id}`} className="view-community-btn">View Details</Link>
                  <Link to={`/create-event?community=${community.id}`} className="create-community-btn" style={{padding:'8px 16px'}}>+ Create Event</Link>
                </div>
              </div>
            </article>
          )})}
        </section>

        {filteredCommunities.length === 0 && (
          <div className="empty-communities"><div>🏘️</div><h2>No communities found</h2><p>Create a community to get started.</p></div>
        )}
      </main>
    </div>
  )
}
export default Communities