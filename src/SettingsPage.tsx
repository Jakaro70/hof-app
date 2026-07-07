import { useNavigate } from 'react-router-dom';

function StatusBar() {
  return (
    <div style={{ position: 'absolute', top: 11, left: 12, right: 0, height: 15, overflow: 'hidden', zIndex: 10 }}>
      <div style={{ position: 'absolute', left: 0, top: 1, height: 14, width: 84, overflow: 'hidden' }}>
        <span style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', fontSize: 12, fontWeight: 400, color: '#030303', whiteSpace: 'nowrap' }}>Tsel</span>
        <img src="/assets/4e32eb6c77b4c639a6a5bf754ab0e24414d70175.svg" alt="" style={{ position: 'absolute', top: '7.14%', left: 0, bottom: '21.43%', width: '17.86%', height: '71.43%' }} />
        <img src="/assets/77b158f52252216a70b8544a0b377b107f01038d.svg" alt="" style={{ position: 'absolute', top: '7.14%', left: '83.33%', bottom: '21.43%', right: 0, height: '71.43%' }} />
      </div>
      <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', height: 15, width: 72, overflow: 'hidden' }}>
        <img src="/assets/35c6012564d77c53cc9ab8ef9c73b68aec493f0c.svg" alt="" style={{ position: 'absolute', left: 0.5, top: 2, width: 6, height: 10 }} />
        <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', height: 15, width: 63, overflow: 'hidden' }}>
          <span style={{ position: 'absolute', right: '47.62%', top: '50%', transform: 'translateY(-50%)', fontSize: 12, fontWeight: 400, color: '#030303', textAlign: 'right' }}>100%</span>
          <img src="/assets/68c46f4c007b927c51c5ed47fae81ad30b923944.svg" alt="" style={{ position: 'absolute', top: '10%', left: '57.14%', bottom: '13.33%', right: '0.79%' }} />
        </div>
      </div>
    </div>
  );
}

function Row({ icon, label, sub, danger, onClick }: { icon: string; label: string; sub?: string; danger?: boolean; onClick?: () => void }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', cursor: 'pointer' }}>
      <span style={{ fontSize: 20, width: 24, textAlign: 'center' }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: 15, color: danger ? '#dc2626' : '#191c1b' }}>{label}</p>
        {sub && <p style={{ margin: '2px 0 0', fontSize: 12, color: '#6f7975' }}>{sub}</p>}
      </div>
      {!danger && <span style={{ fontSize: 18, color: '#9ea89d' }}>›</span>}
    </div>
  );
}

function Section({ title }: { title: string }) {
  return <p style={{ margin: '20px 20px 4px', fontSize: 12, fontWeight: 600, color: '#9ea89d', textTransform: 'uppercase', letterSpacing: 0.5 }}>{title}</p>;
}

export default function SettingsPage() {
  const navigate = useNavigate();

  return (
    <div className="w-[390px] bg-white relative" style={{ height: 880, overflow: 'hidden', fontFamily: "'Roboto', sans-serif" }}>
      <StatusBar />

      {/* Back + title */}
      <button onClick={() => navigate(-1)} style={{ position: 'absolute', top: 64, left: 33, zIndex: 20, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
        <img src="/assets/4c05635826a75c06c376304f17fa5fc3a1f1919b.svg" alt="back" style={{ width: 20, height: 20 }} />
      </button>
      <p style={{ position: 'absolute', top: 60, left: 0, right: 0, textAlign: 'center', fontSize: 18, fontWeight: 600, color: '#191c1b', margin: 0 }}>Settings</p>

      <div style={{ position: 'absolute', top: 104, left: 0, right: 0, bottom: 0, overflowY: 'auto' }}>
        <Section title="Account" />
        <Row icon="👤" label="Edit profile" sub="Name, photo, bio, interests" onClick={() => navigate('/profile')} />
        <Row icon="💳" label="Payment methods" sub="Visa •••• 4242, PayPal" />
        <div style={{ height: 1, background: '#f0f2f0' }} />

        <Section title="Preferences" />
        <Row icon="🔔" label="Notifications" onClick={() => navigate('/notifications')} />
        <Row icon="🎯" label="Sports & date preferences" onClick={() => navigate('/discover')} />
        <div style={{ height: 1, background: '#f0f2f0' }} />

        <Section title="Trust & safety" />
        <Row icon="🛡️" label="Privacy & safety" sub="Verification, blocked users" />
        <Row icon="🚩" label="Report a problem" />
        <div style={{ height: 1, background: '#f0f2f0' }} />

        <Section title="About" />
        <Row icon="ℹ️" label="Terms & privacy policy" />
        <Row icon="📱" label="App version" sub="1.0.0 (prototype)" />

        <div style={{ height: 1, background: '#f0f2f0', margin: '8px 0' }} />
        <Row icon="🚪" label="Log out" danger onClick={() => navigate('/')} />
      </div>
    </div>
  );
}
