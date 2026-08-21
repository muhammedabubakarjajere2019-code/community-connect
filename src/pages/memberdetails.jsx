import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '../lib/SupabaseClient'
import Logout from '../components/logout'
import '../App.css'

function MemberDetails() {
  const { communityId, userId } = useParams() // FIXED: now expects 2 params

  const [member, setMember] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMember()
  }, [communityId, userId])

  const fetchMember = async () => {
    setLoading(true)

    // 1. Get member from community_members table
    const { data: memberData, error } = await supabase
     .from('community_members')
     .select('joined_at')
     .eq('community_id', communityId)
     .eq('user_id', userId)
     .single()

    if (error || !memberData) {
      setMember(null)
      setLoading(false)
      return
    }

    // 2. Get profile data
    const { data: profileData } = await supabase
     .from('profiles')
     .select('id, username, full_name, email, avatar_url')
     .eq('id', userId)
     .single()

    // 3. Get community name
    const { data: commData } = await supabase
     .from('communities')
     .select('name')
     .eq('id', communityId)
     .single()

    setMember({
      ...profileData,
      joined: new Date(memberData.joined_at).toLocaleDateString(),
      community: commData?.name,
      status: 'Active',
      type: 'Member'
    })
    setLoading(false)
  }

  if (loading) {
    return <div className="dashboard"><main className="dashboard-main"><p>Loading...</p></main></div>
  }

  // Member not found
  if (!member) {
    return (
      <div className="dashboard">
        <aside className="dashboard-sidebar">
          <Link to="/" className="dashboard-logo"><div className="brand-icon">C</div><span>Community Connect</span></Link>
          <nav className="dashboard-nav">
            <Link to="/dashboard"><span>🏠</span>Dashboard</Link>
            <Link to="/communities"><span>🏘️</span>Communities</Link>
            <Link to={`/communities/${communityId}/members`} className="active"><span>👥</span>Members</Link>
            <Link to="/events"><span>📅</span>Events</Link>
            <Link to="/announcements"><span>📢</span>Announcements</Link>
          </nav>
          <div className="dashboard-bottom"><Link to="/profile"><span>👤</span>Profile</Link><Logout /></div>
        </aside>
        <main className="dashboard-main">
          <Link to={`/communities/${communityId}/members`} className="back-link">← Back to Members</Link>
          <div className="empty-communities"><div>👤</div><h2>Member Not Found</h2><p>We could not find this member.</p></div>
        </main>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <Link to="/" className="dashboard-logo"><div className="brand-icon">C</div><span>Community Connect</span></Link>
        <nav className="dashboard-nav">
          <Link to="/dashboard"><span>🏠</span>Dashboard</Link>
          <Link to="/communities"><span>🏘️</span>Communities</Link>
          <Link to={`/communities/${communityId}/members`} className="active"><span>👥</span>Members</Link>
          <Link to="/events"><span>📅</span>Events</Link>
          <Link to="/announcements"><span>📢</span>Announcements</Link>
        </nav>
        <div className="dashboard-bottom"><Link to="/profile"><span>👤</span>Profile</Link><Logout /></div>
      </aside>

      <main className="dashboard-main">
        <Link to={`/communities/${communityId}/members`} className="back-link">← Back to Members</Link>

        <section className="member-details-card">
          <div className="member-details-avatar">
            {member.full_name ? member.full_name.charAt(0).toUpperCase() : 'M'}
          </div>
          <div className="member-details-info">
            <span className={`member-type ${member.type?.toLowerCase() || 'general'}`}>{member.type}</span>
            <h1>{member.full_name || member.username}</h1>
            <p>👤 Community Member</p>
            <span className={`member-status ${member.status?.toLowerCase()}`}>● {member.status}</span>
          </div>
        </section>

        <section className="member-details-grid">
          <div className="details-card">
            <div className="details-card-icon">📧</div>
            <h2>Email</h2>
            <p>{member.email || 'No email provided'}</p>
          </div>
          <div className="details-card">
            <div className="details-card-icon">🏘️</div>
            <h2>Community</h2>
            <p>{member.community}</p>
          </div>
          <div className="details-card">
            <div className="details-card-icon">📅</div>
            <h2>Joined</h2>
            <p>{member.joined}</p>
          </div>
        </section>

        <section className="community-welcome">
          <span>🤝</span>
          <div>
            <p className="dashboard-label">COMMUNITY CONNECT</p>
            <h2>Connected and Growing Together</h2>
            <p>Community Connect brings people together to participate, communicate and support positive community development.</p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default MemberDetails