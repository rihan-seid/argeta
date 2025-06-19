    "use client";
export default function Footer() {
  return (
    <footer style={{
      background:'#333', color:'#fff', padding:'2rem', textAlign:'center'
    }}>
      <img src="/logo.png" alt="Argeta Logo" style={{ height:'40px' }} />
      <p style={{ margin:'1rem 0' }}>© 2025 Argeta. All rights reserved.</p>
      <div>
        <a href="#!" style={{ margin:'0 0.5rem', color:'#fff' }}>Privacy</a>
        |
        <a href="#!" style={{ margin:'0 0.5rem', color:'#fff' }}>Terms</a>
      </div>
    </footer>
  );

}
