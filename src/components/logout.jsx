import { supabase } from '../lib/SupabaseClient'

function Logout() {
  const handleLogout = async () => {
    // 1. Logout from Supabase
    await supabase.auth.signOut()
    
    // 2. Clear any old localStorage stuff
    localStorage.removeItem('currentUser')
    localStorage.removeItem('rememberMe')

    // 3. Go to login
    window.location.replace('/login')
  }

  return (
    <button
      type="button"
      className="logout-button"
      onClick={handleLogout}
    >
      <span>🚪</span>
      Logout
    </button>
  )
}

export default Logout