import { useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';

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

const CHATS = [
  { id: 1, name: 'John Isner | Munich', event: 'Wimbledon 1st Round 2023', status: "You're going to this event", color: '#007860', highlighted: true },
  { id: 2, name: 'Ayla Dimitri | Munich', event: 'Champions League Final', status: "You're going to this event", color: '#1d4ed8', highlighted: false },
  { id: 3, name: 'Amanda Rigby | Munich', event: 'Formula One Monaco 2023', status: 'You went to this event', color: '#b45309', highlighted: false },
  { id: 4, name: 'Oza Rangkuti | Jakarta', event: 'NBA Finals Game 7', status: 'You went to this event', color: '#7c3aed', highlighted: false },
  { id: 5, name: 'Adjis Doa Ibu | Jakarta', event: 'Stand up Fest 2023', status: 'You went to this event', color: '#15803d', highlighted: false },
  { id: 6, name: 'Aruna Dewi | Munich', event: 'Thomas Cup 2023', status: "You're going to this event", color: '#007860', highlighted: false },
  { id: 7, name: 'Geraldo | Jakarta', event: 'Girls Only: FIFA WC Final', status: 'You went to this event', color: '#dc2626', highlighted: false },
];

export default function ChatsPage() {
  const navigate = useNavigate();

  return (
    <div className="w-[390px] bg-white relative" style={{ height: 880, overflow: 'hidden', fontFamily: "'Roboto', sans-serif" }}>
      <StatusBar />

      {/* Header */}
      <p style={{ position: 'absolute', top: 87, left: 33, fontSize: 28, fontWeight: 600, color: '#191c1b', margin: 0 }}>Chats</p>

      {/* Chat list */}
      <div style={{ position: 'absolute', top: 140, left: 0, right: 0, bottom: 89, overflowY: 'auto' }}>
        {CHATS.map((chat, i) => (
          <div key={chat.id}>
            <div
              onClick={() => navigate(`/chat/${chat.id}`)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 20px',
                background: chat.highlighted ? '#f0f4f1' : 'white',
                cursor: 'pointer',
              }}
            >
              {/* Avatar */}
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: chat.color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 20, color: 'white', fontWeight: 600 }}>{chat.name[0]}</span>
              </div>
              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#191c1b', lineHeight: '20px' }}>{chat.name}</p>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: '#3f4944', lineHeight: '16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{chat.event}</p>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: chat.status.includes('going') ? '#006b56' : '#6f7975', lineHeight: '16px' }}>{chat.status}</p>
              </div>
            </div>
            {i < CHATS.length - 1 && <div style={{ height: 1, background: '#e8ece9', marginLeft: 88 }} />}
          </div>
        ))}
      </div>

      {/* FAB */}
      <div style={{
        position: 'absolute', bottom: 105, right: 20,
        width: 56, height: 56, borderRadius: '50%',
        background: '#006b56', boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', zIndex: 15,
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>

      <BottomNav active="Chats" />
    </div>
  );
}
