import { useState, useEffect } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { supabase } from "../lib/supabaseClient";
import Logout from '../components/logout'
import '../App.css'
import { MoreVertical, Trash2 } from 'lucide-react' // 1. ADD THIS

function Events() {
  const { id: communityId } = useParams()
  const location = useLocation()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [events, setEvents] = useState([])
  const [joinedEvents, setJoinedEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [communityName, setCommunityName] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(null) // 2. ADD THIS

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser()
      setCurrentUser(user)

      const { data: rsvpData } = await supabase
    .from('event_rsvps')
    .select('event_id')
    .eq('user_id', user?.id)
      setJoinedEvents(rsvpData?.map(r => r.event_id) || [])

      fetchEvents()
    }
    init()
  }, [communityId])

  // 3. ADD DELETE FUNCTION
  const handleDeleteEvent = async (eventId) => {
    if(!confirm("Delete this event? This cannot be undone.")) return
    const { error } = await supabase.from('events').delete().eq('id', eventId)
    if(error) return alert(error.message)
    alert("Event deleted")
    fetchEvents() // refresh instead of reload
    setMenuOpen(null)
  }

  async function fetchEvents() {
    setLoading(true)

    let query = supabase
  .from('events')
  .select('*')
  .eq('status', 'Upcoming')
  .order('date', { ascending: true, nullsFirst: false })

    if (communityId) {
      query = query.eq('community_id', communityId)
      const { data: commData } = await supabase
    .from('communities')
    .select('name')
    .eq('id', communityId)
    .single()
      if (commData) setCommunityName(commData.name)
    }

    const { data: eventsData, error } = await query

    if (error) {
      console.log('Error fetching events:', error)
    } else {
      const { data: rsvpData } = await supabase.from('event_rsvps').select('event_id')

      const counts = {}
      rsvpData?.forEach(r => {
        counts[r.event_id] = (counts[r.event_id] || 0) + 1
      })

      const eventsWithCount = eventsData?.map(e => ({
    ...e,
        rsvp_count: counts[e.id] || 0
      }))

      setEvents(eventsWithCount || [])
    }
    setLoading(false)
  }

  const getEventDate = (event) => {
    if (!event.date) return { day: '--', month: 'DATE' }
    const date = new Date(event.date)
    if (isNaN(date.getTime())) return { day: '--', month: 'DATE' }
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    }
  }

  const formatEventTime = (event) => {
    if (!event.date) return 'TBD'
    const date = new Date(event.date)
    if (isNaN(date.getTime())) return 'TBD'
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  const handleJoinEvent = async (eventId) => {
    if (!currentUser) return alert('Please login first')

    const alreadyJoined = joinedEvents.some((id) => String(id) === String(eventId))

    if (alreadyJoined) {
      await supabase.from('event_rsvps').delete().eq('event_id', eventId).eq('user_id', currentUser.id)
      setJoinedEvents(joinedEvents.filter(id => String(id)!== String(eventId)))
    } else {
      await supabase.from('event_rsvps').insert({ event_id: eventId, user_id: currentUser.id })
      setJoinedEvents([...joinedEvents, eventId])
    }
    fetchEvents()
  }

  const filteredEvents = events.filter((event) => {
    const title = event.title?.toLowerCase() || ''
    const description = event.description?.toLowerCase() || ''
    const location = event.location?.toLowerCase() || ''
    const searchText = search.toLowerCase()

    const matchesSearch =
      title.includes(searchText) ||
      description.includes(searchText) ||
      location.includes(searchText)

    const matchesFilter = filter === 'All' || event.type === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <Link to="/" className="dashboard-logo"><div className="brand-icon">C</div><span>Community Connect</span></Link>
        <nav className="dashboard-nav">
          <Link to="/dashboard"><span>🏠</span>Dashboard</Link>
          <Link to="/communities"><span>🏘️</span>Communities</Link>
          <Link to="/members"><span>👥</span>Members</Link>
          <Link to="/events" className="active"><span>📅</span>Events</Link>
          <Link to="/announcements"><span>📢</span>Announcements</Link>
        </nav>
        <div className="dashboard-bottom"><Link to="/profile"><span>👤</span>Profile</Link><Logout /></div>
      </aside>

      <main className="dashboard-main">
        <header className="page-header">
          <div>
            <p className="dashboard-label">COMMUNITY CONNECT</p>
            <h1>{communityName? `${communityName} Events` : 'Community Events'}</h1>
            <p>Discover meetings, programs and activities happening in your communities.</p>
          </div>

          {communityId? (
            <Link to={`/communities/${communityId}/create-event`} className="create-community-btn">+ Create Event</Link>
          ) : (
            <Link to="/communities" className="create-community-btn">+ Create Event</Link>
          )}
        </header>

        <section className="events-toolbar">
          <div className="event-search">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="event-filters">
            {['All', 'Muslim', 'Christian', 'General'].map((type) => (
              <button
                key={type}
                type="button"
                className={filter === type? 'selected' : ''}
                onClick={() => setFilter(type)}
              >
                {type === 'Muslim' && '🕌 '}{type === 'Christian' && '⛪ '}{type === 'General' && '🤝 '}{type}
              </button>
            ))}
          </div>
        </section>

        <div className="event-results">
          <strong>{filteredEvents.length}</strong> <span> upcoming events</span>
        </div>

        {loading && <p>Loading events...</p>}

        <section className="events-grid">
          {filteredEvents.map((event) => {
            const eventDate = getEventDate(event)
            const isJoined = joinedEvents.some((id) => String(id) === String(event.id))
            const isCreator = currentUser?.id === event.created_by // 4. CHECK IF CREATOR

            return (
              <article className="event-card" key={event.id} style={{position:'relative'}}>
                <div className="event-card-top">
                  <div className="large-event-date">
                    <strong>{eventDate.day}</strong>
                    <span>{eventDate.month}</span>
                  </div>
                  <div style={{display:'flex', gap:8, alignItems:'center'}}>
                    <span className={`event-type ${event.type?.toLowerCase() || 'general'}`}>
                      {event.type || 'General'}
                    </span>

                    {/* 5. ADD 3 DOTS MENU FOR CREATOR */}
                    {isCreator && (
                      <div style={{position:'relative'}}>
                        <button 
                          onClick={() => setMenuOpen(menuOpen === event.id? null : event.id)}
                          style={{background:'none', border:'none', cursor:'pointer', padding:4}}
                        >
                          <MoreVertical size={18} />
                        </button>
                        
                        {menuOpen === event.id && (
                          <div style={{position:'absolute', right:0, top:30, background:'#fff', border:'1px solid #e5e7eb', borderRadius:8, boxShadow:'0 4px 6px rgba(0,0,0,0.1)', zIndex:10, minWidth:120}}>
                            <button 
                              onClick={() => handleDeleteEvent(event.id)}
                              style={{display:'flex', gap:8, alignItems:'center', width:'100%', padding:'8px 12px', background:'none', border:'none', cursor:'pointer', color:'#ef4444', textAlign:'left', fontWeight:600}}
                            >
                              <Trash2 size={16}/> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <h2>{event.title}</h2>
                <p className="event-description">{event.description}</p>
                <div className="event-details">
                  <div><span>🕓</span>{formatEventTime(event)}</div>
                  <div><span>📍</span>{event.location}</div>
                  <div><span>👥</span>{event.rsvp_count} Going</div>
                </div>
                <div className="event-card-footer">
                  <span className="upcoming-status">● {event.status || 'Upcoming'}</span>
                  <div className="event-actions">
                    <button
                      type="button"
                      className={isJoined? 'joined-event-btn' : 'join-event-btn'}
                      onClick={() => handleJoinEvent(event.id)}
                    >
                      {isJoined? '✓ Joined' : 'Join Event'}
                    </button>
                    <Link to={`/event/${event.id}`} className="view-event-btn">
                      View Event →
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </section>

        {!loading && filteredEvents.length === 0 && (
          <div className="empty-events">
            <div>📅</div>
            <h2>No events found</h2>
            <p>Try another search or create a new event.</p>
          </div>
        )}

        <section className="event-cta">
          <div className="event-cta-icon">📅</div>
          <div>
            <h2>Have an event to share?</h2>
            <p>Create an event and invite your community members.</p>
          </div>
          {communityId? (
            <Link to={`/communities/${communityId}/create-event`} className="create-community-btn">+ Create Event</Link>
          ) : (
            <Link to="/communities" className="create-community-btn">+ Create Event</Link>
          )}
        </section>
      </main>
    </div>
  )
}

export default Events