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

type Notif = { id: number; icon: string; bg: string; text: string; time: string; unread: boolean; to?: string };

const NOTIFS: Notif[] = [
  { id: 1, icon: '🎾', bg: '#eafaf4', text: 'John Isner accepted you to Wimbledon 1st Round.', time: '2m ago', unread: true, to: '/event/1' },
  { id: 2, icon: '💬', bg: '#eef2ff', text: 'Ayla Dimitri sent you a message about Champions League Final.', time: '1h ago', unread: true, to: '/chat/2' },
  { id: 3, icon: '⭐', bg: '#fff7e6', text: 'Marco left you a 5-star review. Nice one!', time: '3h ago', unread: false, to: '/profile' },
  { id: 4, icon: '⏰', bg: '#eafaf4', text: 'Reminder: Thomas Cup 2023 starts tomorrow at 18:00.', time: 'Yesterday', unread: false, to: '/event/4' },
  { id: 5, icon: '👋', bg: '#f0f4f1', text: 'Welcome to HOF! Find your first watch party.', time: '2 days ago', unread: false, to: '/discover' },
];

export default function NotificationsPage() {
  const navigate = useNavigate();

  return (
    <div className="w-[390px] bg-white relative" style={{ height: 880, overflow: 'hidden', fontFamily: "'Roboto', sans-serif" }}>
      <StatusBar />

      {/* Back + title */}
      <button onClick={() => navigate(-1)} style={{ position: 'absolute', top: 64, left: 33, zIndex: 20, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
        <img src="/assets/4c05635826a75c06c376304f17fa5fc3a1f1919b.svg" alt="back" style={{ width: 20, height: 20 }} />
      </button>
      <p style={{ position: 'absolute', top: 60, left: 0, right: 0, textAlign: 'center', fontSize: 18, fontWeight: 600, color: '#191c1b', margin: 0 }}>Notifications</p>

      {/* List */}
      <div style={{ position: 'absolute', top: 104, left: 0, right: 0, bottom: 0, overflowY: 'auto' }}>
        {NOTIFS.map(n => (
          <div
            key={n.id}
            onClick={() => n.to && navigate(n.to)}
            style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 20px', cursor: 'pointer', background: n.unread ? '#f6faf8' : 'white', borderBottom: '1px solid #f0f2f0' }}
          >
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: n.bg, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{n.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: 14, color: '#191c1b', lineHeight: '19px' }}>{n.text}</p>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: '#9ea89d' }}>{n.time}</p>
            </div>
            {n.unread && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#006b56', flexShrink: 0, marginTop: 6 }} />}
          </div>
        ))}
      </div>
    </div>
  );
}
