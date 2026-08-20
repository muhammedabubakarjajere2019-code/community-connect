import { useState, useEffect } from "react"
import { supabase } from "../lib/supabaseClient"
import EmojiPicker from 'emoji-picker-react'

export default function CommentSection({ communityId, postId }) {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [replyingTo, setReplyingTo] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [user, setUser] = useState(null)
  const [profiles, setProfiles] = useState({})
  const [showEmoji, setShowEmoji] = useState(false)

  useEffect(() => {
    getUser()
    fetchComments()
  }, [postId])

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

  const fetchComments = async () => {
    const { data } = await supabase
   .from('comments')
   .select('*')
   .eq('post_id', postId)
   .order('created_at', { ascending: true })

    if(data){
      setComments(data)
      const userIds = [...new Set(data.map(c => c.user_id))]
      const { data: profilesData } = await supabase
     .from('profiles')
     .select('id, username, avatar_url')
     .in('id', userIds)
      
      const profilesObj = {}
      profilesData?.forEach(p => profilesObj[p.id] = p)
      setProfiles(profilesObj)
    }
  }

  const createNotification = async (type, postId, targetUserId, commentId = null) => {
    if(!user || targetUserId === user.id) return
    await supabase.from('notifications').insert({
      user_id: targetUserId,
      actor_id: user.id,
      type,
      post_id: postId,
      comment_id: commentId
    })
  }

  const handleComment = async (e) => {
    e.preventDefault()
    if(!newComment.trim()) return
    if(!user) return alert("Please login")

    const { data: postData } = await supabase.from('posts').select('user_id').eq('id', postId).single()

    const { data, error } = await supabase
   .from('comments')
   .insert({ 
        post_id: postId, 
        user_id: user.id,
        content: newComment,
        parent_id: null 
      })
   .select()
   .single()

    if(!error){
      setNewComment('')
      fetchComments()
      createNotification('comment', postId, postData.user_id, data.id)
    }
  }

  const handleReply = async (parentId) => {
    if(!replyText.trim()) return
    if(!user) return alert("Please login")

    const { data: parentComment } = await supabase.from('comments').select('user_id').eq('id', parentId).single()

    const { data, error } = await supabase
   .from('comments')
   .insert({ 
        post_id: postId, 
        user_id: user.id,
        content: replyText,
        parent_id: parentId 
      })
   .select()
   .single()

    if(!error){
      setReplyText('')
      setReplyingTo(null)
      fetchComments()
      createNotification('reply', postId, parentComment.user_id, data.id) // FIXED HERE
    }
  }

  const onEmojiClick = (emojiObject) => {
    if(replyingTo) setReplyText(replyText + emojiObject.emoji)
    else setNewComment(newComment + emojiObject.emoji)
  }

  const timeAgo = (date) => { const s = Math.floor((new Date() - new Date(date))/1000); if(s<60) return 'just now'; const m = Math.floor(s/60); if(m<60) return `${m}m`; const h = Math.floor(m/60); if(h<24) return `${h}h`; return `${Math.floor(h/24)}d` }

  const renderComments = (parentId = null) => {
    return comments
   .filter(c => c.parent_id === parentId)
   .map(comment => (
        <div key={comment.id} style={{marginLeft: parentId? 40 : 0, marginBottom: 12}}>
          <div style={{display:'flex', gap:10}}>
            {profiles[comment.user_id]?.avatar_url
? <img src={profiles[comment.user_id].avatar_url} style={{width:32, height:32, borderRadius:'50%'}}/>
              : <div style={{width:32, height:32, borderRadius:'50%', background:'#3b82f6', color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700}}>{profiles[comment.user_id]?.username?.[0]?.toUpperCase()}</div>
            }
            <div style={{flex:1, background:'#f3f4f6', padding:10, borderRadius:8}}>
              <div style={{fontWeight:600, fontSize:13}}>{profiles[comment.user_id]?.username}</div>
              <div style={{fontSize:14, marginTop:2}}>{comment.content}</div>
              <div style={{fontSize:11, color:'#6b7280', marginTop:4}}>{timeAgo(comment.created_at)} · <button onClick={() => setReplyingTo(comment.id)} style={{background:'none', border:'none', color:'#2563eb', cursor:'pointer', padding:0}}>Reply</button></div>
            </div>
          </div>
          
          {replyingTo === comment.id && (
            <div style={{marginLeft:42, marginTop:8}}>
              <textarea 
                value={replyText} 
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                style={{width:'100%', padding:8, border:'1px solid #ddd', borderRadius:6, fontSize:13}}
                rows="2"
              />
              <div style={{display:'flex', gap:8, marginTop:6}}>
                <button onClick={() => handleReply(comment.id)} className="cd-btn cd-btn-blue" style={{padding:'6px 12px', fontSize:12}}>Reply</button>
                <button onClick={() => setReplyingTo(null)} className="cd-btn" style={{padding:'6px 12px', fontSize:12, background:'#e5e7eb'}}>Cancel</button>
                <button onClick={() => setShowEmoji(!showEmoji)}>😀</button>
              </div>
              {showEmoji && <EmojiPicker onEmojiClick={onEmojiClick} />}
            </div>
          )}

          {renderComments(comment.id)}
        </div>
      ))
  }

  return (
    <div>
      <h4 style={{margin:'0 0 12px 0'}}>Comments</h4>
      {renderComments()}
      
      {user && (
        <form onSubmit={handleComment} style={{marginTop:16}}>
          <div style={{display:'flex', gap:8}}>
            <textarea 
              value={newComment} 
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              style={{flex:1, padding:8, border:'1px solid #ddd', borderRadius:6, fontSize:14}}
              rows="2"
            />
            <button type="button" onClick={() => setShowEmoji(!showEmoji)}>😀</button>
          </div>
          {showEmoji && <EmojiPicker onEmojiClick={onEmojiClick} />}
          <button type="submit" className="cd-btn cd-btn-blue" style={{marginTop:8}}>Comment</button>
        </form>
      )}
    </div>
  )
}