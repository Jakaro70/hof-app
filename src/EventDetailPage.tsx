import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EVENTS } from './eventsData';
import { loadJSON, saveJSON, JOINED_KEY } from './storage';

const AVATAR_COLORS = ['#007860', '#b45309', '#1d4ed8', '#15803d', '#7c3aed'];

// Mock attendees for the "who's going" safe-space list.
const ATTENDEES = [
  { name: 'Ayla Dimitri', color: '#1d4ed8', verified: true },
  { name: 'Marco Reus', color: '#b45309', verified: true },
  { name: 'Sofia Lindqvist', color: '#7c3aed', verified: false },
  { name: 'Kenji Tanaka', color: '#15803d', verified: true },
  { name: 'Amara Okafor', color: '#dc2626', verified: true },
  { name: 'Luca Bianchi', color: '#007860', verified: false },
];

function AvatarStack({ count }: { count: number }) {
  const shown = Math.min(count, 5);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ display: 'flex' }}>
        {Array.from({ length: shown }).map((_, i) => (
          <div key={i} style={{ width: 24, height: 24, borderRadius: '50%', background: AVATAR_COLORS[i % AVATAR_COLORS.length], border: '2px solid white', marginLeft: i === 0 ? 0 : -8, position: 'relative', zIndex: shown - i }} />
        ))}
      </div>
      <span style={{ fontSize: 12, color: '#3f4944' }}>{count} people are going</span>
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: '#e0e0e0', margin: '0 16px' }} />;
}

function VerifiedBadge() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#006b56" style={{ flexShrink: 0 }}>
      <path d="M12 1l2.4 2.1 3.2-.3 1.3 2.9 2.9 1.3-.3 3.2L23 12l-2.1 2.4.3 3.2-2.9 1.3-1.3 2.9-3.2-.3L12 23l-2.4-2.1-3.2.3-1.3-2.9L2.2 17l.3-3.2L1 12l2.1-2.4-.3-3.2 2.9-1.3L7 2.2l3.2.3z" />
      <path d="M10.5 14.6l-2.1-2.1-1.2 1.2 3.3 3.3 6-6-1.2-1.2z" fill="white" />
    </svg>
  );
}

export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = EVENTS.find(e => e.id === Number(id)) ?? EVENTS[0];

  const [joined, setJoined] = useState<boolean>(() => loadJSON<number[]>(JOINED_KEY, []).includes(event.id));
  const [saved, setSaved] = useState(false);
  const [showAttendees, setShowAttendees] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  function cancelJoin() {
    const set = new Set(loadJSON<number[]>(JOINED_KEY, []));
    set.delete(event.id);
    saveJSON(JOINED_KEY, [...set]);
    setJoined(false);
  }

  const iconTop = 72;

  return (
    <div className="w-[390px] bg-white relative" style={{ height: 880, overflow: 'hidden', fontFamily: "'Roboto', sans-serif" }}>
      {/* Joined banner — overlay on top layer, does NOT shift the page */}
      {joined && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 26, background: '#006b56', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 12, color: '#f5f5f5', fontWeight: 500 }}>You are set, see you during the event!</span>
        </div>
      )}

      {/* Hero image */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 313 }}>
        <img src={event.heroImage} alt={event.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 60%)' }} />
      </div>

      {/* White status bar over hero */}
      <div style={{ position: 'absolute', top: 11, left: 12, right: 0, height: 15, overflow: 'hidden', zIndex: 10 }}>
        <div style={{ position: 'absolute', left: 0, top: 1, height: 14, width: 84, overflow: 'hidden' }}>
          <span style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', fontSize: 12, fontWeight: 400, color: '#f5f5f5', whiteSpace: 'nowrap' }}>Tsel</span>
          <img src="/assets/4e32eb6c77b4c639a6a5bf754ab0e24414d70175.svg" alt="" style={{ position: 'absolute', top: '7.14%', left: 0, bottom: '21.43%', width: '17.86%', height: '71.43%', filter: 'brightness(0) invert(1)' }} />
          <img src="/assets/77b158f52252216a70b8544a0b377b107f01038d.svg" alt="" style={{ position: 'absolute', top: '7.14%', left: '83.33%', bottom: '21.43%', right: 0, height: '71.43%', filter: 'brightness(0) invert(1)' }} />
        </div>
        <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', height: 15, width: 72, overflow: 'hidden' }}>
          <img src="/assets/35c6012564d77c53cc9ab8ef9c73b68aec493f0c.svg" alt="" style={{ position: 'absolute', left: 0.5, top: 2, width: 6, height: 10, filter: 'brightness(0) invert(1)' }} />
          <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', height: 15, width: 63, overflow: 'hidden' }}>
            <span style={{ position: 'absolute', right: '47.62%', top: '50%', transform: 'translateY(-50%)', fontSize: 12, fontWeight: 400, color: '#f5f5f5', textAlign: 'right' }}>100%</span>
            <img src="/assets/68c46f4c007b927c51c5ed47fae81ad30b923944.svg" alt="" style={{ position: 'absolute', top: '10%', left: '57.14%', bottom: '13.33%', right: '0.79%', filter: 'brightness(0) invert(1)' }} />
          </div>
        </div>
      </div>

      {/* Back */}
      <button onClick={() => navigate(-1)} style={{ position: 'absolute', top: iconTop, left: 31, zIndex: 20, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
        <img src="/assets/a59b32806f2c2ec3c42df101c476fdc775f5247c.svg" alt="back" style={{ width: 20, height: 20, filter: 'brightness(0) invert(1)' }} />
      </button>

      {/* Heart (save) */}
      <button onClick={() => setSaved(s => !s)} style={{ position: 'absolute', top: iconTop, left: 313, zIndex: 20, background: 'none', border: 'none', cursor: 'pointer', padding: 0, width: 22, height: 22 }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill={saved ? 'white' : 'none'} stroke="white" strokeWidth="2">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Three-dot menu */}
      <button onClick={() => setShowMenu(true)} style={{ position: 'absolute', top: iconTop, left: 343, zIndex: 20, background: 'none', border: 'none', cursor: 'pointer', padding: 0, width: 20, height: 20 }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
          <circle cx="10" cy="4" r="1.6" />
          <circle cx="10" cy="10" r="1.6" />
          <circle cx="10" cy="16" r="1.6" />
        </svg>
      </button>

      {/* Scrollable content */}
      <div style={{ position: 'absolute', top: 313, left: 0, right: 0, bottom: 89, overflowY: 'auto', background: 'white' }}>
        <div style={{ padding: '16px 31px 12px' }}>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 400, color: '#191c1b', lineHeight: '32px' }}>{event.name}</h1>
        </div>

        <Divider />

        {/* Date & Time */}
        <div style={{ padding: '16px 31px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <span style={{ fontSize: 22, lineHeight: 1 }}>🕛</span>
          <div>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: '#191c1b' }}>Sunday, August 24th 2025</p>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: '#6f7975' }}>{event.time}</p>
          </div>
        </div>

        <Divider />

        {/* Venue */}
        <div style={{ padding: '16px 31px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <span style={{ fontSize: 22, lineHeight: 1 }}>📍</span>
          <div>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: '#191c1b' }}>{event.venue}</p>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: '#6f7975' }}>{event.address}</p>
          </div>
        </div>

        <Divider />

        {/* Host — clickable → host profile */}
        <div onClick={() => navigate('/host/1')} style={{ padding: '16px 31px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#007860', flexShrink: 0, overflow: 'hidden' }}>
            <img src="/assets/9bc599a0b52d3c1421c53ff612508a364c2c18b2.png" alt={event.host} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: '#191c1b' }}>{event.host} (host)</p>
            <span style={{ fontSize: 12, color: '#007860' }}>See his reviews here</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: '#191c1b' }}>4.4</span>
            <span style={{ fontSize: 16 }}>⭐</span>
          </div>
        </div>

        <Divider />

        {/* Attendees — clickable → who's going modal */}
        <div onClick={() => setShowAttendees(true)} style={{ padding: '16px 31px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
          <AvatarStack count={joined ? event.people + 1 : event.people} />
          <span style={{ fontSize: 18, color: '#6f7975' }}>›</span>
        </div>

        <Divider />

        {/* Description */}
        <div style={{ padding: '16px 31px 32px' }}>
          <p style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 600, color: '#191c1b' }}>Description</p>
          <p style={{ margin: 0, fontSize: 14, color: '#3f4944', lineHeight: '20px' }}>{event.description}</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 89, background: 'white', borderTop: '1px solid #e8f1ed', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 31px', zIndex: 20 }}>
        <div>
          <p style={{ margin: 0, fontSize: 12, color: '#6f7975' }}>Price</p>
          <p style={{ margin: '2px 0 0', fontSize: 16, fontWeight: 600, color: '#191c1b' }}>{event.price}</p>
        </div>
        {joined ? (
          <button onClick={cancelJoin} style={{ width: 151, height: 48, border: '1.5px solid #006b56', borderRadius: 100, background: 'white', color: '#006b56', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
        ) : (
          <button onClick={() => navigate(`/payment/${event.id}`)} style={{ width: 151, height: 48, border: 'none', borderRadius: 100, background: '#006b56', color: 'white', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Join</button>
        )}
      </div>

      {/* Who's going modal */}
      {showAttendees && (
        <div onClick={() => setShowAttendees(false)} style={{ position: 'absolute', inset: 0, zIndex: 70, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'flex-end' }}>
          <div onClick={e => e.stopPropagation()} style={{ width: '100%', background: 'white', borderRadius: '20px 20px 0 0', padding: '10px 24px 28px', maxHeight: 560, overflowY: 'auto' }}>
            <div style={{ width: 40, height: 4, borderRadius: 2, background: '#d0d5d1', margin: '0 auto 16px' }} />
            <p style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#191c1b' }}>Who’s going ({joined ? event.people + 1 : event.people})</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#eafaf4', border: '1px solid #cdeadf', borderRadius: 10, padding: '10px 12px', margin: '12px 0 16px' }}>
              <span style={{ fontSize: 18 }}>🛡️</span>
              <span style={{ fontSize: 12, color: '#006b56', lineHeight: '16px' }}>Members are verified. HOF keeps every event a welcoming, safe space.</span>
            </div>
            {ATTENDEES.map(p => (
              <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: p.color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 16, color: 'white', fontWeight: 600 }}>{p.name[0]}</span>
                </div>
                <span style={{ flex: 1, fontSize: 14, color: '#191c1b' }}>{p.name}</span>
                {p.verified && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <VerifiedBadge />
                    <span style={{ fontSize: 12, color: '#006b56' }}>Verified</span>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Kebab action sheet */}
      {showMenu && (
        <div onClick={() => setShowMenu(false)} style={{ position: 'absolute', inset: 0, zIndex: 70, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'flex-end' }}>
          <div onClick={e => e.stopPropagation()} style={{ width: '100%', background: 'white', borderRadius: '20px 20px 0 0', padding: '10px 0 24px' }}>
            <div style={{ width: 40, height: 4, borderRadius: 2, background: '#d0d5d1', margin: '0 auto 8px' }} />
            <button onClick={() => setShowMenu(false)} style={{ width: '100%', textAlign: 'left', padding: '16px 24px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 15, color: '#191c1b' }}>🔗 Share event</button>
            <button onClick={() => setShowMenu(false)} style={{ width: '100%', textAlign: 'left', padding: '16px 24px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 15, color: '#191c1b' }}>🚩 Report a concern</button>
            <button onClick={() => setShowMenu(false)} style={{ width: '100%', textAlign: 'left', padding: '16px 24px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 15, color: '#6f7975' }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
