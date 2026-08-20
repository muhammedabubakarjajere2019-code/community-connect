import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function Members() {
  const { id } = useParams();
  const [members, setMembers] = useState([]);
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    getUser()
    fetchData();
  }, [id]);

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

  const fetchData = async () => {
    setLoading(true);

    const { data: commData } = await supabase
     .from('communities')
     .select('*')
     .eq('id', id)
     .single();
    setCommunity(commData);

    const { data: memberData } = await supabase
     .from('community_members')
     .select('user_id, joined_at')
     .eq('community_id', id);

    if(user) {
      const isAlreadyMember = memberData?.some(m => m.user_id === user.id)
      setIsMember(isAlreadyMember)
    }

    if(!memberData || memberData.length === 0){
      setMembers([])
      setLoading(false)
      return
    }

    const userIds = memberData.map(m => m.user_id).filter(Boolean)
    const { data: profilesData } = await supabase
     .from('profiles')
     .select('id, username, full_name, avatar_url')
     .in('id', userIds)

    const combined = memberData
     .filter(m => m.user_id)
     .map(m => ({
       ...m,
        profiles: profilesData?.find(p => p.id === m.user_id)
      }))

    setMembers(combined);
    setLoading(false);
  };

  const handleJoin = async () => {
    if(!user) return alert("Login first")
    await supabase.from('community_members').insert({ community_id: id, user_id: user.id })
    setIsMember(true)
    fetchData()
  }

  const handleLeave = async () => {
    await supabase.from('community_members').delete().eq('community_id', id).eq('user_id', user.id)
    setIsMember(false)
    fetchData()
  }

  if (loading) return <p style={{padding:20, textAlign:'center'}}>Loading members...</p>;

  return (
    <div style={{padding:20, maxWidth:800, margin:'0 auto', fontFamily:'system-ui'}}>
      <Link to={`/communities/${id}`} style={{color:'#2563eb', textDecoration:'none', fontWeight:600}}>← Back to Community</Link>
      
      <div style={{background:'#fff', padding:24, borderRadius:16, border:'1px solid #e5e7eb', marginTop:12, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12}}>
        <div>
          <h1 style={{margin:0, fontSize:28, fontWeight:800}}>{community?.name} Members</h1>
          <p style={{margin:'4px 0 0 0', color:'#6b7280'}}><b>{members.length}</b> Total Members</p>
        </div>
        {user && (
          isMember 
         ? <button onClick={handleLeave} style={{background:'#ef4444', color:'#fff', border:'none', padding:'10px 20px', borderRadius:10, fontWeight:600, cursor:'pointer'}}>Leave</button>
          : <button onClick={handleJoin} style={{background:'#16a34a', color:'#fff', border:'none', padding:'10px 20px', borderRadius:10, fontWeight:600, cursor:'pointer'}}>Join Community</button>
        )}
      </div>

      {members.length === 0? (
        <div style={{background:'white', padding:40, borderRadius:12, textAlign:'center', marginTop:20, border:'1px solid #e5e7eb'}}>
          <p style={{fontSize:18, fontWeight:600}}>No members yet</p>
        </div>
      ) : (
        <div style={{display:'grid', gap:12, marginTop:20}}>
          {members.map((m) => (
            <div key={m.user_id} style={{background:'white', padding:16, borderRadius:12, border:'1px solid #e5e7eb', display:'flex', gap:12, alignItems:'center'}}>
              <img
                src={m.profiles?.avatar_url || `https://ui-avatars.com/api/?name=${m.profiles?.username || 'U'}`}
                alt="avatar"
                style={{width:48, height:48, borderRadius:'50%', objectFit:'cover'}}
              />
              <div style={{flex:1}}>
                <p style={{fontWeight:700, margin:0}}>
                  {m.profiles?.full_name || m.profiles?.username || 'User'}
                </p>
                <p style={{fontSize:14, color:'#6b7280', margin:0}}>
                  {m.profiles?.username? `@${m.profiles.username}` : ''}
                </p>
                <p style={{fontSize:12, color:'#9ca3af', margin:0}}>
                  Joined {new Date(m.joined_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}