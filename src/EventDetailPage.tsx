import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { EVENTS } from './eventsData';
import { loadJSON, saveJSON, JOINED_KEY } from './storage';

const AVATAR_COLORS = ['#007860', '#b45309', '#1d4ed8', '#15803d', '#7c3aed'];

function AvatarStack({ count }: { count: number }) {
  const shown = Math.min(count, 5);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ display: 'flex' }}>
        {Array.from({ length: shown }).map((_, i) => (
          <div key={i} style={{
            width: 24, height: 24, borderRadius: '50%',
            background: AVATAR_COLORS[i % AVATAR_COLORS.length],
            border: '2px solid white',
            marginLeft: i === 0 ? 0 : -8,
            position: 'relative', zIndex: shown - i,
          }} />
        ))}
      </div>
      <span style={{ fontSize: 12, color: '#3f4944' }}>{count} people are going</span>
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: '#e0e0e0', margin: '0 16px' }} />;
}

export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = EVENTS.find(e => e.id === Number(id)) ?? EVENTS[0];

  // Joined state persists across refreshes via localStorage.
  const [joined, setJoined] = useState<boolean>(() => loadJSON<number[]>(JOINED_KEY, []).includes(event.id));

  function toggleJoin(next: boolean) {
    const set = new Set(loadJSON<number[]>(JOINED_KEY, []));
    if (next) set.add(event.id); else set.delete(event.id);
    saveJSON(JOINED_KEY, [...set]);
    setJoined(next);
  }

  return (
    <div className="w-[390px] bg-white relative" style={{ height: 880, overflow: 'hidden', fontFamily: "'Roboto', sans-serif" }}>
      {/* Joined banner (1.22) */}
      {joined && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 20,
          background: '#006b56', zIndex: 50,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 11, color: '#f5f5f5', fontWeight: 500 }}>You are set, see you during the event!</span>
        </div>
      )}

      {/* Hero image */}
      <div style={{ position: 'absolute', top: joined ? 20 : 0, left: 0, right: 0, height: 313 }}>
        <img
          src={event.heroImage}
          alt={event.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Dark overlay for readability */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 60%)' }} />
      </div>

      {/* White status bar over hero */}
      <div style={{ position: 'absolute', top: joined ? 31 : 11, left: 12, right: 0, height: 15, overflow: 'hidden', zIndex: 10 }}>
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

      {/* Back arrow */}
      <button
        onClick={() => navigate(-1)}
        style={{ position: 'absolute', top: joined ? 106 : 86, left: 31, zIndex: 20, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        <img src="/assets/a59b32806f2c2ec3c42df101c476fdc775f5247c.svg" alt="back" style={{ width: 20, height: 20, filter: 'brightness(0) invert(1)' }} />
      </button>

      {/* Bookmark */}
      <button style={{ position: 'absolute', top: joined ? 106 : 86, left: 313, zIndex: 20, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
        <img src="/assets/7ca35e4fddf804bd02ab89858d885674a5fb768f.svg" alt="bookmark" style={{ width: 20, height: 20, filter: 'brightness(0) invert(1)' }} />
      </button>

      {/* Three-dot vertical menu */}
      <button style={{ position: 'absolute', top: joined ? 106 : 86, left: 343, zIndex: 20, background: 'none', border: 'none', cursor: 'pointer', padding: 0, width: 20, height: 20 }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
          <circle cx="10" cy="4" r="1.6" />
          <circle cx="10" cy="10" r="1.6" />
          <circle cx="10" cy="16" r="1.6" />
        </svg>
      </button>

      {/* Scrollable content */}
      <div style={{
        position: 'absolute',
        top: (joined ? 20 : 0) + 313,
        left: 0, right: 0,
        bottom: 89,
        overflowY: 'auto',
        background: 'white',
      }}>
        {/* Title */}
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

        {/* Host */}
        <div style={{ padding: '16px 31px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#007860', flexShrink: 0, overflow: 'hidden' }}>
            <img src="/assets/9bc599a0b52d3c1421c53ff612508a364c2c18b2.png" alt={event.host} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: '#191c1b' }}>{event.host} (host)</p>
            <Link to="/host/1" style={{ margin: '2px 0 0', fontSize: 12, color: '#007860', textDecoration: 'none', display: 'block' }}>See his reviews here</Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: '#191c1b' }}>4.4</span>
            <span style={{ fontSize: 16 }}>⭐</span>
          </div>
        </div>

        <Divider />

        {/* Attendees */}
        <div style={{ padding: '16px 31px' }}>
          <AvatarStack count={joined ? event.people + 1 : event.people} />
        </div>

        <Divider />

        {/* Description */}
        <div style={{ padding: '16px 31px 32px' }}>
          <p style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 600, color: '#191c1b' }}>Description</p>
          <p style={{ margin: 0, fontSize: 14, color: '#3f4944', lineHeight: '20px' }}>{event.description}</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 89,
        background: 'white', borderTop: '1px solid #e8f1ed',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 31px', zIndex: 20,
      }}>
        <div>
          <p style={{ margin: 0, fontSize: 12, color: '#6f7975' }}>Price</p>
          <p style={{ margin: '2px 0 0', fontSize: 16, fontWeight: 600, color: '#191c1b' }}>{event.price}</p>
        </div>

        {joined ? (
          <button
            onClick={() => toggleJoin(false)}
            style={{
              width: 151, height: 48, border: '1.5px solid #006b56', borderRadius: 100,
              background: 'white', color: '#006b56', fontSize: 16, fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        ) : (
          <button
            onClick={() => toggleJoin(true)}
            style={{
              width: 151, height: 48, border: 'none', borderRadius: 100,
              background: '#006b56', color: 'white', fontSize: 16, fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Join
          </button>
        )}
      </div>
    </div>
  );
}
