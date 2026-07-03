import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';
import EventCard from './EventCard';
import { EVENTS } from './eventsData';

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

// Marcel's own profile
const ME = {
  name: 'Marcel Wolff',
  location: 'Munich, Germany',
  rating: '4.7',
  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
  bio: "Munich-based football fanatic and weekend 5-a-side player. I never miss a Bundesliga matchday and love meeting fellow fans over a good game.",
  interests: ['Football', 'Basketball', 'Formula One', 'Travelling', 'Food'],
};

// Marcel attends events but hasn't hosted any yet — the "Events hosted" section
// stays hidden. (Set both to [] to see the full empty state.)
const ATTENDED = EVENTS.slice(0, 3);
const HOSTED: typeof EVENTS = [];

const MOCK_REVIEWS = [
  { id: 1, reviewer: 'Alex K.', rating: 5, date: 'Aug 20th 2023', comment: 'Marcel is great company at a watch party — friendly and knows his football!' },
  { id: 2, reviewer: 'Maria S.', rating: 4.5, date: 'Aug 17th 2023', comment: 'Really nice to meet at the Champions League night. Would hang out again.' },
  { id: 3, reviewer: 'Tom R.', rating: 4, date: 'Aug 10th 2023', comment: 'Good vibes, respectful and welcoming to newcomers.' },
];

type Tab = 'about' | 'activities' | 'reviews';

export default function MyProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('about');
  const hasActivities = ATTENDED.length > 0 || HOSTED.length > 0;

  return (
    <div className="w-[390px] bg-white relative" style={{ height: 880, overflow: 'hidden', fontFamily: "'Roboto', sans-serif" }}>
      <StatusBar />

      {/* Settings menu (own profile — no back button) */}
      <button style={{ position: 'absolute', top: 64, right: 33, zIndex: 20, background: 'none', border: 'none', cursor: 'pointer', padding: 0, width: 20, height: 20 }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="#191c1b">
          <circle cx="10" cy="4" r="1.6" />
          <circle cx="10" cy="10" r="1.6" />
          <circle cx="10" cy="16" r="1.6" />
        </svg>
      </button>

      {/* Profile header */}
      <div style={{ position: 'absolute', top: 112, left: 34, width: 96, height: 96, borderRadius: '50%', overflow: 'hidden', border: '3px solid white', zIndex: 5, background: '#1d4ed8' }}>
        <img src={ME.photo} alt={ME.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <p style={{ position: 'absolute', top: 134, left: 154, fontSize: 24, fontWeight: 400, color: '#000', margin: 0, lineHeight: '32px' }}>{ME.name}</p>
      <p style={{ position: 'absolute', top: 174, left: 154, fontSize: 14, fontWeight: 400, color: '#000', margin: 0, letterSpacing: 0.25 }}>{ME.location}</p>
      <div style={{ position: 'absolute', top: 149, right: 32, display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 22, color: '#000', lineHeight: '28px' }}>{ME.rating}</span>
        <span style={{ fontSize: 22 }}>⭐️</span>
      </div>

      {/* Tab bar */}
      <div style={{ position: 'absolute', top: 234, left: 0, right: 0, background: 'white' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #e0e0e0' }}>
          {([{ key: 'about', label: 'About' }, { key: 'activities', label: 'Activities' }, { key: 'reviews', label: 'Reviews' }] as { key: Tab; label: string }[]).map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{ flex: 1, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 0 0', color: activeTab === tab.key ? '#006b56' : '#3f4945', fontSize: 14, fontWeight: 500 }}>
              <span>{tab.label}</span>
              <div style={{ height: 14, width: '100%', position: 'relative', flexShrink: 0 }}>
                {activeTab === tab.key && <div style={{ position: 'absolute', bottom: 0, left: 2, right: 2, height: 3, background: '#006b56', borderRadius: '100px 100px 0 0' }} />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ position: 'absolute', top: 299, left: 0, right: 0, bottom: 72, overflowY: 'auto' }}>

        {/* ABOUT */}
        {activeTab === 'about' && (
          <div style={{ padding: '16px 20px' }}>
            <p style={{ margin: '0 0 16px', fontSize: 14, color: '#3f4944', lineHeight: '20px' }}>{ME.bio}</p>
            <div style={{ height: 1, background: '#e8ece9', margin: '0 -20px 16px' }} />
            <p style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 500, color: '#000', letterSpacing: 0.15 }}>Interests</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <button style={{ height: 32, padding: '0 12px', border: '1px solid #006b56', borderRadius: 8, background: 'none', color: '#006b56', fontSize: 14, cursor: 'pointer' }}>+ Add</button>
              {ME.interests.map(interest => (
                <div key={interest} style={{ height: 32, padding: '0 12px', border: '1px solid #bfc9c3', borderRadius: 8, background: 'white', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#191c1b' }}>
                  <span>{interest}</span>
                  <span style={{ color: '#6f7975', cursor: 'pointer' }}>×</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ACTIVITIES */}
        {activeTab === 'activities' && (
          hasActivities ? (
            <div style={{ padding: '16px 20px' }}>
              {ATTENDED.length > 0 && (
                <>
                  <p style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 600, color: '#000' }}>Events attended</p>
                  {ATTENDED.map(event => (
                    <EventCard key={event.id} event={event} onClick={() => navigate(`/event/${event.id}`)} />
                  ))}
                </>
              )}
              {HOSTED.length > 0 && (
                <>
                  <p style={{ margin: '20px 0 12px', fontSize: 16, fontWeight: 600, color: '#000' }}>Events hosted</p>
                  {HOSTED.map(event => (
                    <EventCard key={event.id} event={event} onClick={() => navigate(`/event/${event.id}`)} />
                  ))}
                </>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80%', padding: '0 40px', textAlign: 'center' }}>
              <img src="/assets/bda89e3b391a9b5b09ffc4f6b5ac152fa29dd9a1.png" alt="" style={{ width: 220, height: 152, objectFit: 'contain', marginBottom: 24 }} />
              <p style={{ fontSize: 15, color: '#3f4944', lineHeight: '22px', marginBottom: 24 }}>No activities yet. Join a watch party or host your own to get started!</p>
              <button onClick={() => navigate('/discover')} style={{ width: 200, height: 46, background: '#006b56', border: 'none', borderRadius: 100, color: 'white', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Find events</button>
            </div>
          )
        )}

        {/* REVIEWS */}
        {activeTab === 'reviews' && (
          <div style={{ padding: '12px 20px 16px' }}>
            {MOCK_REVIEWS.map(review => (
              <div key={review.id} style={{ background: '#f8faf7', border: '1px solid #bfc9c3', borderRadius: 12, padding: 16, marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: '#191c1b' }}>{review.reviewer}</span>
                  <span style={{ fontSize: 12, color: '#6f7975' }}>{review.date}</span>
                </div>
                <div style={{ display: 'flex', gap: 2, marginBottom: 6 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} style={{ fontSize: 14, color: i < Math.floor(review.rating) ? '#f59e0b' : '#d1d5db' }}>★</span>
                  ))}
                </div>
                <p style={{ margin: 0, fontSize: 12, color: '#3f4944', lineHeight: '18px' }}>{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav active="Profile" />
    </div>
  );
}
