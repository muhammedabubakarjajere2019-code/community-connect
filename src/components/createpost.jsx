import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

function CreatePost({ onPostCreated }) {
  const { id: communityId } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageFile, setImageFile] = useState(null) // NEW: IMAGE STATE
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!title.trim() ||!content.trim()) return alert("Title and content required")
    setLoading(true)

    // 1. GET USER WITH NULL CHECK
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      alert("Session expired. Please login again.")
      setLoading(false)
      navigate('/login')
      return
    }

    // 2. UPLOAD IMAGE IF EXISTS
    let imageUrl = null
    if(imageFile){
      const { data, error: uploadError } = await supabase.storage
       .from('post-images')
       .upload(`${Date.now()}-${imageFile.name}`, imageFile)
      
      if(uploadError) {
        alert("Image upload failed: " + uploadError.message)
        setLoading(false)
        return
      }
      imageUrl = supabase.storage.from('post-images').getPublicUrl(data.path).data.publicUrl
    }

    // 3. INSERT POST WITH IMAGE
    const { data, error } = await supabase
     .from('posts')
     .insert({ 
        community_id: communityId, 
        user_id: user.id,
        title,
        content,
        image_url: imageUrl // NEW: ADD IMAGE URL
      })
     .select()
     .single()

    if (error) {
      alert("SUPABASE ERROR: " + error.message + " | DETAILS: " + error.details)
      console.error(error)

    } else {
      setTitle('')
      setContent('')
      setImageFile(null) // RESET IMAGE
      onPostCreated(data)
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} style={{background: 'white', padding: '15px', borderRadius: '12px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
      <input 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post Title"
        required
        style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '10px', fontWeight: 'bold'}}
      />
      <textarea 
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        required
        rows="3"
        style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', resize: 'none', marginBottom: '10px'}}
      />

      {/* NEW: IMAGE UPLOAD INPUT */}
      <input 
        type="file" 
        accept="image/*" 
        onChange={(e) => setImageFile(e.target.files[0])} 
        style={{marginBottom: '10px', fontSize: 13}}
      />
      {imageFile && <p style={{fontSize:12, color:'#16a34a', margin:'0 0 10px 0'}}>Selected: {imageFile.name}</p>}

      <button 
        type="submit" 
        disabled={loading}
        style={{marginTop: '10px', background: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'}}
      >
        {loading? 'Posting...' : 'Post'}
      </button>
    </form>
  )
}
export default CreatePost