import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/SupabaseClient";
import Logout from "../components/logout";
import "../App.css";

export default function EditCommunity() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchCommunity = async () => {
      const { data, error } = await supabase
        .from("communities")
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) {
        alert("Error loading community");
        console.log(error);
      } else {
        setFormData(data);
      }
      setLoading(false);
    };
    fetchCommunity();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase
      .from("communities")
      .update(formData)
      .eq("id", id);

    setSaving(false);
    if (error) {
      alert("Failed to update community: " + error.message);
      console.log(error);
    } else {
      alert("Community updated successfully!");
      navigate(`/communities/${id}`);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <Link to="/" className="dashboard-logo"><div className="brand-icon">C</div><span>Community Connect</span></Link>
        <nav className="dashboard-nav">
          <Link to="/dashboard"><span>🏠</span>Dashboard</Link>
          <Link to="/communities" className="active"><span>🏘️</span>Communities</Link>
          <Link to="/members"><span>👥</span>Members</Link>
          <Link to="/events"><span>📅</span>Events</Link>
        </nav>
        <div className="dashboard-bottom"><Link to="/profile"><span>👤</span>Profile</Link><Logout /></div>
      </aside>

      <main className="dashboard-main">
        <div className="auth-form-container" style={{ maxWidth: '600px', margin: '40px auto' }}>
          <div className="auth-form">
            <Link to={`/communities/${id}`} className="mobile-back">← Back to Community</Link>
            
            <div className="auth-message" style={{ textAlign: 'center' }}>
              <div className="auth-symbol">🏘️</div>
              <h1>Edit Community</h1>
              <p>Update your community details.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Community Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} required />
              </div>

              <button type="submit" disabled={saving} className="primary-btn auth-submit">
                {saving ? "Saving..." : "Save Changes →"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}