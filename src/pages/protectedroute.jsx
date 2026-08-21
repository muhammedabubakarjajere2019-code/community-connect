import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/SupabaseClient';

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{padding: '20px'}}>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  
  return children;
}