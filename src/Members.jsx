import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

function Members() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const members = [
    {
      id: 1,
      name: 'Aisha Mohammed',
      email: 'aisha@example.com',
      community: 'Muslim Youth Community',
      type: 'Muslim',
      joined: '12 Aug 2026',
      status: 'Active',
    },
    {
      id: 2,
      name: 'David John',
      email: 'david@example.com',
      community: 'Christian Youth Community',
      type: 'Christian',
      joined: '10 Aug 2026',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Abdullahi Musa',
      email: 'abdullahi@example.com',
      community: 'Muslim Youth Community',
      type: 'Muslim',
      joined: '08 Aug 2026',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Grace Daniel',
      email: 'grace@example.com',
      community: 'Christian Family Community',
      type: 'Christian',
      joined: '05 Aug 2026',
      status: 'Active',
    },
    {
      id: 5,
      name: 'Ibrahim Ali',
      email: 'ibrahim@example.com',
      community: 'General Community',
      type: 'General',
      joined: '02 Aug 2026',
      status: 'Active',
    },
    {
      id: 6,
      name: 'Mary Joseph',
      email: 'mary@example.com',
      community: 'General Community',
      type: 'General',
      joined: '30 Jul 2026',
      status: 'Inactive',
    },
  ]

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.email.toLowerCase().includes(search.toLowerCase()) ||
      member.community.toLowerCase().includes(search.toLowerCase())

    const matchesFilter =
      filter === 'All' || member.type === filter

    return matchesSearch && matchesFilter
  })

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="dashboard-sidebar">

        <Link to="/" className="dashboard-logo">
          <div className="brand-icon">C</div>
          <span>Community Connect</span>
        </Link>

        <nav className="dashboard-nav">

          <Link to="/dashboard">
            <span>🏠</span>
            Dashboard
          </Link>

          <Link to="/communities">
            <span>🏘️</span>
            Communities
          </Link>

          <Link to="/members" className="active">
            <span>👥</span>
            Members
          </Link>

          <Link to="/events">
            <span>📅</span>
            Events
          </Link>

          <Link to="/announcements">
            <span>📢</span>
            Announcements
          </Link>

        </nav>

        <div className="dashboard-bottom">

          <Link to="/profile">
            <span>👤</span>
            Profile
          </Link>

          <Link to="/">
            <span>🚪</span>
            Logout
          </Link>

        </div>

      </aside>


      {/* Main */}
      <main className="dashboard-main">

        <header className="page-header">

          <div>
            <p className="dashboard-label">
              COMMUNITY CONNECT
            </p>

            <h1>Community Members</h1>

            <p>
              View and manage people connected to your communities.
            </p>
          </div>

          <button className="create-community-btn">
            + Invite Member
          </button>

        </header>


        {/* Statistics */}
        <section className="member-stats">

          <div className="member-stat-card">
            <div className="member-stat-icon">👥</div>
            <div>
              <span>Total Members</span>
              <strong>120</strong>
            </div>
          </div>

          <div className="member-stat-card">
            <div className="member-stat-icon">🟢</div>
            <div>
              <span>Active Members</span>
              <strong>112</strong>
            </div>
          </div>

          <div className="member-stat-card">
            <div className="member-stat-icon">🆕</div>
            <div>
              <span>New This Month</span>
              <strong>18</strong>
            </div>
          </div>

        </section>


        {/* Search and filters */}
        <section className="members-toolbar">

          <div className="member-search">
            <span>🔍</span>

            <input
              type="text"
              placeholder="Search members..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="member-filters">

            {['All', 'Muslim', 'Christian', 'General'].map((type) => (
              <button
                key={type}
                className={filter === type ? 'selected' : ''}
                onClick={() => setFilter(type)}
              >
                {type === 'Muslim' && '🕌 '}
                {type === 'Christian' && '⛪ '}
                {type === 'General' && '🤝 '}
                {type}
              </button>
            ))}

          </div>

        </section>


        {/* Members table */}
        <section className="members-table-card">

          <div className="members-table-header">

            <div>
              <h2>All Members</h2>
              <p>{filteredMembers.length} members displayed</p>
            </div>

          </div>

          <div className="members-table-wrapper">

            <table className="members-table">

              <thead>
                <tr>
                  <th>Member</th>
                  <th>Community</th>
                  <th>Type</th>
                  <th>Joined</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredMembers.map((member) => (

                  <tr key={member.id}>

                    <td>
                      <div className="member-info">

                        <div className="member-avatar">
                          {member.name.charAt(0)}
                        </div>

                        <div>
                          <strong>{member.name}</strong>
                          <span>{member.email}</span>
                        </div>

                      </div>
                    </td>

                    <td>
                      {member.community}
                    </td>

                    <td>
                      <span
                        className={`member-type ${member.type.toLowerCase()}`}
                      >
                        {member.type}
                      </span>
                    </td>

                    <td>
                      {member.joined}
                    </td>

                    <td>
                      <span
                        className={`member-status ${member.status.toLowerCase()}`}
                      >
                        ● {member.status}
                      </span>
                    </td>

                    <td>
                      <button className="member-view-btn">
                        View
                      </button>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>

      </main>

    </div>
  )
}

export default Members