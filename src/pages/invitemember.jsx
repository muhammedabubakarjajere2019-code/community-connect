import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/SupabaseClient'

function InviteMember() {
  const { id: communityId } = useParams()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleInvite = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    // Step 1: Find user by email
    const { data: profile, error: findError } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', email)
    .single()

    if (findError || !profile) {
      setMessage("User not found. They need to sign up first.")
      setLoading(false)
      return
    }

    // Step 2: Add them to community_members
    const { error: insertError } = await supabase
    .from('community_members')
    .insert({ community_id: communityId, user_id: profile.id })

    if (insertError) {
      if (insertError.code === '23505') {
        setMessage("This user is already a member")
      } else {
        setMessage(insertError.message)
      }
    } else {
      setMessage("Member added successfully!")
      setEmail('')
      setTimeout(() => navigate(`/communities/${communityId}/members`), 1500)
    }
    
    setLoading(false)
  }

  return (
    <div className="dashboard-main" style={{padding: '20px', maxWidth: '500px'}}>
      <h1>Invite Member</h1>
      <p>Invite someone to Community {communityId} by their email</p>

      <form onSubmit={handleInvite} style={{display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px'}}>
        <input 
          type="email" 
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{padding: '10px', borderRadius: '6px', border: '1px solid #ddd'}}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{background: '#007bff', color: 'white', padding: '10px', border: 'none', borderRadius: '6px', cursor: 'pointer'}}
        >
          {loading ? 'Inviting...' : 'Send Invite'}
        </button>
      </form>

      {message && <p style={{marginTop: '15px', color: message.includes('success') ? 'green' : 'red'}}>{message}</p>}
    </div>
  )
}
export default InviteMember