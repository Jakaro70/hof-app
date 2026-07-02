import { useNavigate } from 'react-router-dom';
import { EVENTS } from './eventsData';
import BottomNav from './BottomNav';
import EventCard from './EventCard';

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

export default function FavoritesPage() {
  const navigate = useNavigate();

  return (
    <div className="w-[390px] bg-white relative" style={{ height: 880, overflow: 'hidden', fontFamily: "'Roboto', sans-serif" }}>
      <StatusBar />

      {/* Back (smaller) + three-dot vertical menu */}
      <button onClick={() => navigate(-1)} style={{ position: 'absolute', top: 64, left: 33, zIndex: 20, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
        <img src="/assets/4c05635826a75c06c376304f17fa5fc3a1f1919b.svg" alt="back" style={{ width: 20, height: 20 }} />
      </button>
      <button style={{ position: 'absolute', top: 64, right: 33, zIndex: 20, background: 'none', border: 'none', cursor: 'pointer', padding: 0, width: 20, height: 20 }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="#191c1b">
          <circle cx="10" cy="4" r="1.6" />
          <circle cx="10" cy="10" r="1.6" />
          <circle cx="10" cy="16" r="1.6" />
        </svg>
      </button>

      {/* Profile header */}
      {/* Avatar with photo */}
      <div style={{ position: 'absolute', top: 108, left: 34, width: 96, height: 96, borderRadius: '50%', overflow: 'hidden', border: '3px solid white', zIndex: 5, background: '#e67e22' }}>
        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" alt="Tatjana" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      {/* Name / location / rating — no background */}
      <p style={{ position: 'absolute', top: 130, left: 146, fontSize: 22, fontWeight: 500, color: '#191c1b', margin: 0 }}>Tatjana H.</p>
      <p style={{ position: 'absolute', top: 166, left: 146, fontSize: 13, color: '#3f4944', margin: 0 }}>Munich, Germany</p>
      <div style={{ position: 'absolute', top: 138, right: 24, display: 'flex', alignItems: 'center', gap: 3 }}>
        <span style={{ fontSize: 18, fontWeight: 500, color: '#191c1b' }}>4.4</span>
        <span style={{ fontSize: 18 }}>⭐️</span>
      </div>

      {/* Going section */}
      <div style={{ position: 'absolute', top: 232, left: 0, right: 0, bottom: 80, overflowY: 'auto', padding: '12px 20px 16px' }}>
        <p style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 600, color: '#000', letterSpacing: -0.32 }}>Going</p>
        {EVENTS.map(event => (
          <EventCard key={event.id} event={event} onClick={() => navigate(`/event/${event.id}`)} />
        ))}
      </div>

      <BottomNav active="Favorite" />
    </div>
  );
}
