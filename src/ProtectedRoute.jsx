import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { supabase } from './lib/supabaseClient'

function ProtectedRoute({ children }) {
  const location = useLocation()

  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)

  useEffect(() => {
    let mounted = true

    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!mounted) return

      setSession(session)
      setLoading(false)
    }

    checkSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) return

        console.log(
          'ProtectedRoute Auth Event:',
          event
        )

        setSession(session)
        setLoading(false)
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  // Wait while Supabase checks the session
  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p>Loading...</p>
      </div>
    )
  }

  // No Supabase session = not logged in
  if (!session) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location.pathname,
        }}
        replace
      />
    )
  }

  // User is authenticated
  return children
}

export default ProtectedRoute