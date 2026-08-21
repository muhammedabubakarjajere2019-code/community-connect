import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/SupabaseClient'
import CreatePost from '../components/createpost'
import CommentSection from '../components/commentsection'

export default function CommunityDetails() {
  const { id } = useParams()
  const [community, setCommunity] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [isMember, setIsMember] = useState(false)
  const [memberCount, setMemberCount] = useState(0)
  const [showInvite, setShowInvite] = useState(false)
  const [inviteUsername, setInviteUsername] = useState('')
  const [showNotif, setShowNotif] = useState(false)
  const [notifications, setNotifications] = useState([])
  
  const [editingPostId, setEditingPostId] = useState(null)
  const [editPostTitle, setEditPostTitle] = useState('')
  const [editPostContent, setEditPostContent] = useState('')

  useEffect(() => {
    getUser()
    fetchCommunity()
    fetchPosts()
    getMemberCount()
  }, [id])

  useEffect(() => {
    if(user) fetchNotifications()
  }, [user])

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser() // FIXED: added }
    setUser(user)
    if(user) checkMembership(user.id)
  }

  const checkMembership = async (userId) => {
    const { data } = await supabase.from('community_members').select('*').eq('community_id', id).eq('user_id', userId).single()
    setIsMember(!!data)
  }

  const fetchCommunity = async () => {
    const { data } = await supabase.from('communities').select('*').eq('id', id).single()
    setCommunity(data)
  }

  const fetchPosts = async () => {
    setLoading(true)
    const { data: postsData } = await supabase.from('posts').select('*').eq('community_id', id).order('created_at', { ascending: false })
    const { data: profilesData } = await supabase.from('profiles').select('*')
    const { data: likesData } = await supabase.from('post_likes').select('*')
    const { data: viewsData } = await supabase.from('post_views').select('*')
    
    const postIds = postsData?.map(p => p.id) || []

    const finalPosts = postsData?.map(post => ({
   ...post, 
      profiles: profilesData?.find(p => p.id === post.user_id) || null,
      likes: likesData?.filter(l => l.post_id === post.id) || [],
      views: viewsData?.filter(v => v.post_id === post.id).length || 0
    })) || []

    setPosts(finalPosts)

    if(user) {
      postIds.forEach(postId => {
        const alreadyViewed = viewsData?.some(v => v.post_id === postId && v.user_id === user.id)
        if(!alreadyViewed) supabase.from('post_views').insert({ post_id: postId, user_id: user.id })
      })
    }
    setLoading(false)
  }

  const getMemberCount = async () => {
    const { count } = await supabase.from('community_members').select('*', { count: 'exact', head: true }).eq('community_id', id)
    setMemberCount(count || 0)
  }

  const fetchNotifications = async () => {
    const { data } = await supabase.from('notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10)
    setNotifications(data || [])
  }

  const createNotification = async (type, postId, targetUserId) => {
    if(!user || targetUserId === user.id) return
    await supabase.from('notifications').insert({ user_id: targetUserId, actor_id: user.id, type, post_id: postId })
  }

  const markAsRead = async (notifId) => { await supabase.from('notifications').update({ read: true }).eq('id', notifId); fetchNotifications() }
  const handleJoin = async () => { if(!user) return alert("Please login first"); await supabase.from('community_members').insert({ community_id: id, user_id: user.id }); setIsMember(true); getMemberCount() }
  const handleLeave = async () => { await supabase.from('community_members').delete().eq('community_id', id).eq('user_id', user.id); setIsMember(false); getMemberCount() }
  const handleInvite = async (e) => { e.preventDefault(); if(!inviteUsername) return alert('Enter a username'); const { data: userData } = await supabase.from('profiles').select('id').eq('username', inviteUsername).single(); if(!userData) return alert('User not found'); await supabase.from('community_members').insert({ community_id: id, user_id: userData.id }); alert('Member added!'); setInviteUsername(''); setShowInvite(false); getMemberCount(); }
  const handleLike = async (postId) => { if(!user) return alert("Please login first"); const post = posts.find(p => p.id === postId); const hasLiked = post.likes.some(l => l.user_id === user.id); if(hasLiked) await supabase.from('post_likes').delete().eq('post_id', postId).eq('user_id', user.id); else { await supabase.from('post_likes').insert({ post_id: postId, user_id: user.id }); createNotification('like', postId, post.user_id) } fetchPosts(); }
  const handleShare = (postId) => { navigator.clipboard.writeText(`${window.location.origin}/post/${postId}`); alert('Link copied!') }
  
  const handleReport = async (postId) => {
    if(!user) return alert("Please login first")
    const reason = prompt("Why are you reporting this post?")
    if(!reason) return
    const { error } = await supabase.from('post_reports').insert({ 
      post_id: postId, 
      reporter_id: user.id,
      reason 
    })
    if(error) alert(error.message)
    else alert("Report submitted. Thank you!")
  }

  const handlePin = async (postId, current) => { await supabase.from('posts').update({ is_pinned:!current }).eq('id', postId); fetchPosts() }
  const handleEditPost = (post) => { setEditingPostId(post.id); setEditPostTitle(post.title); setEditPostContent(post.content) }
  const handleUpdatePost = async () => { if(!editPostTitle ||!editPostContent) return alert("Required"); await supabase.from('posts').update({ title: editPostTitle, content: editPostContent }).eq('id', editingPostId); setEditingPostId(null); fetchPosts() }
  const handleDeletePost = async (postId) => { if(!confirm("Delete this post?")) return; await supabase.from('posts').delete().eq('id', postId); fetchPosts() }
  const handleNewPost = () => { fetchPosts() }
  const timeAgo = (date) => { const s = Math.floor((new Date() - new Date(date))/1000); if(s<60) return 'just now'; const m = Math.floor(s/60); if(m<60) return `${m}m`; const h = Math.floor(m/60); if(h<24) return `${h}h`; return `${Math.floor(h/24)}d` }

  if(loading) return <div className="cd-page"><p style={{textAlign:'center', padding:'40px'}}>Loading...</p></div>
  if(!community) return <div className="cd-page"><p style={{textAlign:'center', padding:'40px'}}>Community not found</p></div>

  return (
    <div className="cd-page">
      <div className="cd-community-card">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12}}>
          <h1 className="cd-community-title">{community.name}</h1>
          <div style={{display:'flex', gap:8}}>
            <div style={{position:'relative'}}>
              <button onClick={() => setShowNotif(!showNotif)} className="cd-btn cd-btn-blue" style={{padding:'10px 14px'}}>🔔 {notifications.filter(n=>!n.read).length > 0 && <span style={{background:'red', color:'white', borderRadius:10, padding:'2px 6px', fontSize:10, marginLeft:4}}>{notifications.filter(n=>!n.read).length}</span>}</button>
              {showNotif && <div style={{position:'absolute', right:0, top:50, width:320, background:'white', border:'1px solid #ddd', borderRadius:8, boxShadow:'0 4px 12px rgba(0,0,0,0.1)', zIndex:100}}><div style={{padding:12, borderBottom:'1px solid #eee', fontWeight:700}}>Notifications</div>{notifications.length === 0? <p style={{padding:12}}>No notifications</p> : notifications.map(n => (<div key={n.id} onClick={() => markAsRead(n.id)} style={{padding:12, borderBottom:'1px solid #f5f5f5', background: n.read? '#fff' : '#eff6ff', cursor:'pointer'}}>{n.type === 'like' && '❤️ Someone liked your post'}{n.type === 'comment' && '💬 Someone commented'}<div style={{fontSize:11, color:'#666'}}>{timeAgo(n.created_at)}</div></div>))}</div>}
            </div>
            <button onClick={() => setShowInvite(true)} className="cd-btn cd-btn-blue">+ Invite Member</button>
          </div>
        </div>
        <p className="cd-community-desc">{community.description}</p>
        <div className="cd-community-meta">
          <span><b>{memberCount}</b> Members</span>
          <Link to={`/communities/${id}/members`} className="cd-btn cd-btn-blue">View Members</Link>
          {user && (isMember? <button onClick={handleLeave} className="cd-btn cd-btn-red">Leave</button> : <button onClick={handleJoin} className="cd-btn cd-btn-green">Join Community</button>)}
        </div>
      </div>

      {user && isMember && <div className="cd-createpost-card"><CreatePost onPostCreated={handleNewPost} communityId={id} /></div>}

      <div className="cd-posts-list">
        {posts.length === 0 && <p style={{textAlign:'center', color:'#666'}}>No posts yet. Be the first to post!</p>}
        {posts
     .sort((a,b) => b.is_pinned - a.is_pinned || new Date(b.created_at) - new Date(a.created_at))
     .map(post => { 
          const isOwner = user?.id === post.user_id
          const hasLiked = user && Array.isArray(post.likes) && post.likes.some(l => l.user_id === user.id); 
          
          return (
          <div key={post.id} className="cd-post-card" style={post.is_pinned? {border:'2px solid #2563eb'} : {}}>
            {post.is_pinned && <div style={{color:'#2563eb', fontWeight:700, fontSize:12, marginBottom:8}}>📌 PINNED</div>}
            
            <div className="cd-post-header">
              {post.profiles?.avatar_url? <img src={post.profiles.avatar_url} className="cd-post-avatar"/> : <div className="cd-post-avatar-fallback">{post.profiles?.username?.[0]?.toUpperCase() || 'U'}</div>}
              <div>
                <div className="cd-post-username">{post.profiles?.username || 'Unknown'}</div>
                <div className="cd-post-time">{timeAgo(post.created_at)}</div>
              </div>
            </div>

            <div className="cd-post-content">
              {editingPostId === post.id? (
                <div>
                  <input value={editPostTitle} onChange={(e) => setEditPostTitle(e.target.value)} style={{width:'100%', padding:8, marginBottom:8, border:'1px solid #ddd', borderRadius:6, fontWeight:700, fontSize:18}}/>
                  <textarea value={editPostContent} onChange={(e) => setEditPostContent(e.target.value)} style={{width:'100%', padding:8, marginBottom:8, border:'1px solid #ddd', borderRadius:6, minHeight:80}}/>
                  <div style={{display:'flex', gap:8}}>
                    <button onClick={handleUpdatePost} className="cd-btn cd-btn-green">Save</button>
                    <button onClick={() => setEditingPostId(null)} className="cd-btn" style={{background:'#e5e7eb'}}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="cd-post-title">{post.title}</h3>
                  <p className="cd-post-text">{post.content}</p>
                  {post.image_url && <img src={post.image_url} style={{width:'100%', borderRadius:8, marginTop:8}}/>}
                  
                  {isOwner && (
                    <div style={{display:'flex', gap:8, marginTop:12}}>
                      <button onClick={() => handleEditPost(post)} className="cd-btn cd-btn-blue" style={{padding:'6px 12px', fontSize:12}}>Edit</button>
                      <button onClick={() => handleDeletePost(post.id)} className="cd-btn cd-btn-red" style={{padding:'6px 12px', fontSize:12}}>Delete</button>
                      <button onClick={() => handlePin(post.id, post.is_pinned)} className="cd-btn" style={{padding:'6px 12px', fontSize:12, background:'#fbbf24'}}>{post.is_pinned? 'Unpin' : 'Pin'}</button>
                    </div>
                  )}
                </>
              )}
            </div>

            <div style={{display:'flex', gap:16, alignItems:'center', paddingTop:12, borderTop:'1px solid #f3f4f6', marginBottom:12, flexWrap:'wrap'}}>
              <button onClick={() => handleLike(post.id)} style={{display:'flex', alignItems:'center', gap:6, background:'none', border:'none', cursor:'pointer', fontSize:14}}>
                <span>{hasLiked? '❤️' : '🤍'}</span>
                <span>{Array.isArray(post.likes)? post.likes.length : 0} Likes</span>
              </button>
              <div style={{display:'flex', alignItems:'center', gap:6, fontSize:14, color:'#6b7280'}}>
                <span>👁️</span>
                <span>{post.views || 0} Views</span>
              </div>
              <button onClick={() => handleShare(post.id)} style={{display:'flex', alignItems:'center', gap:6, background:'none', border:'none', cursor:'pointer', fontSize:14}}>
                <span>🔗</span>
                <span>Share</span>
              </button>
              <button onClick={() => handleReport(post.id)} style={{display:'flex', alignItems:'center', gap:6, background:'none', border:'none', cursor:'pointer', fontSize:14, color:'#ef4444'}}>
                <span>🚩</span>
                <span>Report</span>
              </button>
            </div>
            
            <div className="cd-post-comments">
              <CommentSection communityId={id} postId={post.id} />
            </div>
          </div>
        )})}
      </div>

      {showInvite && <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:50}}><div style={{background:'white', padding:24, borderRadius:12, width:400}}><h3>Invite Member</h3><form onSubmit={handleInvite}><input type="text" placeholder="Enter username" value={inviteUsername} onChange={(e) => setInviteUsername(e.target.value)} style={{width:'100%', padding:8, margin:'12px 0', border:'1px solid #ccc', borderRadius:4}} /><div style={{display:'flex', gap:8}}><button type="submit" className="cd-btn cd-btn-blue" style={{flex:1}}>Invite</button><button type="button" onClick={() => setShowInvite(false)} className="cd-btn" style={{flex:1, background:'#e5e7eb'}}>Cancel</button></div></form></div></div>}

    <style>{`.cd-page{ width:100%; max-width:1100px; margin:0 auto; padding:24px 20px; font-family: system-ui; }.cd-community-card,.cd-createpost-card,.cd-post-card{ background:#fff; border:1px solid #e5e7eb; border-radius:16px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); padding:24px; margin-bottom:24px; }.cd-community-title{ font-size:32px; font-weight:800; color:#111827; margin:0 0 8px 0; }.cd-community-desc{ font-size:16px; color:#4b5563; margin:0 0 16px 0; }.cd-community-meta{ display:flex; gap:12px; align-items:center; font-size:14px; color:#374151; flex-wrap:wrap; }.cd-btn{ padding:10px 20px; border-radius:10px; border:none; font-weight:600; font-size:14px; cursor:pointer; display:inline-flex; align-items:center; gap:6px; transition:all 0.2s }.cd-btn:hover{ opacity:0.85; transform:translateY(-1px) }.cd-btn-green{background:#16a34a;color:#fff}.cd-btn-red{background:#ef4444;color:#fff}.cd-btn-blue{background:#2563eb;color:#fff}.cd-posts-list{display:flex;flex-direction:column;gap:24px}.cd-post-header{display:flex;gap:12px;align-items:center;margin-bottom:12px}.cd-post-avatar,.cd-post-avatar-fallback{ width:44px;height:44px;border-radius:50%;object-fit:cover; }.cd-post-avatar-fallback{ background:linear-gradient(135deg,#3b82f6,#8b5cf6); color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700; }.cd-post-username{font-weight:600;font-size:15px}.cd-post-time{font-size:12px;color:#6b7280}.cd-post-title{font-size:18px;font-weight:700;margin:0 0 8px 0}.cd-post-text{font-size:15px;color:#374151;white-space:pre-wrap;line-height:1.7;margin:0}.cd-post-comments{ border-top:1px solid #f3f4f6; background:#fafafa; border-radius:0 0 14px 14px; margin:0 -24px -24px -24px; padding:20px 24px; }`}</style>
    </div>
  )
}