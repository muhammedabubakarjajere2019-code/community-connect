import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/SupabaseClient'
import '../App.css'

function EventDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [user, setUser] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
    fetchEvent()
    fetchComments()
  }, [id])

  const fetchEvent = async () => {
    const { data, error } = await supabase.from('events').select('*').eq('id', id).single()
    if(error) console.log(error)
    setEvent(data)
    setLoading(false)
  }

  const fetchComments = async () => {
    const { data: commentsData } = await supabase
  .from('event_comments')
  .select('*')
  .eq('event_id', id)
  .order('created_at', { ascending: false })
    
    if(!commentsData) return setComments([])

    const userIds = [...new Set(commentsData.map(c => c.user_id))].filter(Boolean)
    
    const { data: profilesData } = await supabase
  .from('profiles')
  .select('id, name')
  .in('id', userIds)

    const commentsWithNames = commentsData.map(c => ({
   ...c,
      profiles: profilesData?.find(p => p.id === c.user_id)
    }))

    setComments(commentsWithNames)
  }

  const handleDelete = async () => {
    if (!confirm('Delete this event?')) return
    await supabase.from('events').delete().eq('id', id)
    alert('Event deleted')
    navigate(`/community/${event.community_id}`)
  }

  // NEW: Delete Comment Function
  const handleDeleteComment = async (commentId) => {
    if (!confirm('Delete this comment?')) return
    const { error } = await supabase.from('event_comments').delete().eq('id', commentId)
    if(error) alert("Error: " + error.message)
    else fetchComments() // refresh comments
  }

  const handleComment = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return
    
    const { error } = await supabase.from('event_comments').insert([{ 
      comment: newComment,
      event_id: id, 
      user_id: user.id 
    }])
    
    if(error) {
      alert("Error: " + error.message)
      console.log(error)
    } else {
      setNewComment('')
      fetchComments()
    }
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    alert('Link copied!')
  }

  if (loading) return <div className="auth-page"><div className="auth-form-container"><p>Loading...</p></div></div>
  if (!event) return <div className="auth-page"><div className="auth-form-container"><p>Event not found</p></div></div>

  return (
    <div className="auth-page">
      <div className="auth-brand">
        <Link to="/" className="auth-logo"><div className="brand-icon">E</div><span>Community Connect</span></Link>
        <div className="auth-message">
          <div className="auth-symbol">📅</div>
          <h1>{event.title}</h1>
        </div>
      </div>
      <div className="auth-form-container">
        <div className="auth-form">
          <Link to={`/community/${event.community_id}`} className="mobile-back">← Back to Community</Link>
          
          <h2>{event.title}</h2>
          {event.event_date && <p><b>Date:</b> {event.event_date}</p>}
          {event.time && <p><b>Time:</b> {event.time}</p>}
          <p><b>Location:</b> {event.location}</p>
          <p>{event.description}</p>

          <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
            <button onClick={handleShare} className="primary-btn" style={{ background: '#4CAF50' }}>📤 Share</button>
            {user?.id === event.created_by && (
              <button onClick={handleDelete} className="primary-btn" style={{ background: '#d93025' }}>🗑️ Delete Event</button>
            )}
          </div>

          <hr />
          <h3>Comments 💬</h3>
          <form onSubmit={handleComment}>
            <div className="form-group">
              <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add a comment..." rows="2" required />
            </div>
            <button type="submit" className="primary-btn auth-submit">Post Comment</button>
          </form>

          <div style={{ marginTop: '20px' }}>
            {comments.map(c => (
              <div key={c.id} style={{ borderBottom: '1px solid #eee', padding: '10px 0', position: 'relative' }}>
                <p style={{ margin: '0 0 5px 0' }}>
                  <b>{c.profiles?.name || 'Anonymous'}</b>
                </p>
                <p style={{ margin: '0 0 5px 0' }}>{c.comment}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <small style={{ color: '#666' }}>{new Date(c.created_at).toLocaleString()}</small>
                  
                  {/* ONLY SHOW DELETE IF IT'S YOUR COMMENT */}
                  {user?.id === c.user_id && (
                    <button 
                      onClick={() => handleDeleteComment(c.id)}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: '#d93025', 
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      🗑️ Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default EventDetails