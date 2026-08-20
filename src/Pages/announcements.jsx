import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from "../lib/supabaseClient"
import '../App.css'
import { MoreVertical, Trash2 } from 'lucide-react'

function Announcements() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(null)

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser()
      setCurrentUser(user)
      fetchAnnouncements()
    }
    init()
  }, [])

  async function fetchAnnouncements() {
    setLoading(true)
    const { data } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false })
    
    setAnnouncements(data || [])
    setLoading(false)
  }

  const handleDeleteAnnouncement = async (annId) => {
    if(!confirm("Delete this announcement? This cannot be undone.")) return
    const { error } = await supabase.from('announcements').delete().eq('id', annId)
    if(error) return alert(error.message)
    alert("Announcement deleted")
    fetchAnnouncements()
    setMenuOpen(null)
  }

  const defaultAnnouncements = [
    { id: 1, title: 'Important Community Meeting', message: 'All community members are invited...', author: 'Community Admin', date: '12 August 2026', time: '2 hours ago', type: 'General', icon: '📢' },
    { id: 2, title: 'Youth Development Program', message: 'Registration is now open...', author: 'Youth Coordinator', date: '11 August 2026', time: 'Yesterday', type: 'General', icon: '🎓' },
  ]

  const allAnnouncements = announcements.length > 0 ? announcements : defaultAnnouncements

  const filteredAnnouncements = allAnnouncements.filter((announcement) => {
    const title = announcement.title?.toLowerCase() || ''
    const message = announcement.message?.toLowerCase() || ''
    const author = announcement.author?.toLowerCase() || ''
    const searchText = search.toLowerCase()
    const matchesSearch = title.includes(searchText) || message.includes(searchText) || author.includes(searchText)
    const matchesFilter = filter === 'All' || announcement.type === filter
    return matchesSearch && matchesFilter
  })

  if (loading) return <div className="dashboard"><main className="dashboard-main"><p>Loading announcements...</p></main></div>

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
        <div className="dashboard-bottom"><Link to="/profile"><span>👤</span>Profile</Link><Link to="/"><span>🚪</span>Logout</Link></div>
      </aside>

      <main className="dashboard-main">
        <header className="page-header">
          <div>
            <p className="dashboard-label">COMMUNITY CONNECT</p>
            <h1>Announcements</h1>
            <p>Stay informed about important community news and updates.</p>
          </div>
          <Link to="/create-announcement" className="create-community-btn">+ New Announcement</Link>
        </header>

        <section className="announcements-toolbar">
          <div className="announcement-search"><span>🔍</span><input type="text" placeholder="Search announcements..." value={search} onChange={(e) => setSearch(e.target.value)}/></div>
          <div className="announcement-filters">
            {['All', 'Muslim', 'Christian', 'General'].map((type) => (
              <button key={type} className={filter === type ? 'selected' : ''} onClick={() => setFilter(type)}>
                {type === 'Muslim' && '🕌 '}{type === 'Christian' && '⛪ '}{type === 'General' && '🤝 '}{type}
              </button>
            ))}
          </div>
        </section>

        <div className="announcement-results"><strong>{filteredAnnouncements.length}</strong><span> announcements available</span></div>

        <section className="announcement-list">
          {filteredAnnouncements.map((announcement) => {
            const isCreator = currentUser?.id === announcement.created_by
            console.log("Ann:", announcement.title, "created_by:", announcement.created_by, "myID:", currentUser?.id, "isCreator:", isCreator) // DEBUG
            return (
            <article className="announcement-card" key={announcement.id} style={{position:'relative'}}>
              <div className="announcement-card-icon">{announcement.icon || '📢'}</div>
              <div className="announcement-content">
                <div className="announcement-card-header">
                  <div>
                    <span className={`announcement-type ${announcement.type?.toLowerCase() || 'general'}`}>{announcement.type || 'General'}</span>
                    <h2>{announcement.title}</h2>
                  </div>
                  <div style={{display:'flex', gap:8, alignItems:'center'}}>
                    <span className="announcement-time">{new Date(announcement.created_at).toLocaleDateString() || announcement.time}</span>
                    
                    {/* SHOW DELETE FOR EVERYONE FOR TESTING. REMOVE isCreator LATER */}
                    <div style={{position:'relative'}}>
                      <button 
                        onClick={() => setMenuOpen(menuOpen === announcement.id? null : announcement.id)}
                        style={{background:'none', border:'none', cursor:'pointer', padding:4}}
                      >
                        <MoreVertical size={18} />
                      </button>
                      
                      {menuOpen === announcement.id && (
                        <div style={{position:'absolute', right:0, top:30, background:'#fff', border:'1px solid #e5e7eb', borderRadius:8, boxShadow:'0 4px 6px rgba(0,0,0,0.1)', zIndex:10, minWidth:120}}>
                          <button 
                            onClick={() => handleDeleteAnnouncement(announcement.id)}
                            style={{display:'flex', gap:8, alignItems:'center', width:'100%', padding:'8px 12px', background:'none', border:'none', cursor:'pointer', color:'#ef4444', textAlign:'left', fontWeight:600}}
                          >
                            <Trash2 size={16}/> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <p>{announcement.message}</p>
                <div className="announcement-footer">
                  <span>👤 {announcement.author || 'Community Admin'}</span>
                  <span>📅 {new Date(announcement.created_at).toLocaleDateString() || announcement.date}</span>
                  <Link to={`/announcement/${announcement.id}`} className="view-event-btn">View →</Link>
                </div>
              </div>
            </article>
          )})}
        </section>

        {filteredAnnouncements.length === 0 && (
          <div className="empty-announcements"><div>📢</div><h2>No announcements found</h2><p>Try another search or select a different community type.</p></div>
        )}

        <section className="announcement-cta">
          <div className="announcement-cta-icon">📢</div>
          <div><h2>Have something important to share?</h2><p>Create an announcement and keep your community informed.</p></div>
          <Link to="/create-announcement" className="create-community-btn">Create Announcement →</Link>
        </section>
      </main>
    </div>
  )
}
export default Announcements