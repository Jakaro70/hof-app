import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';
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

const AVATAR_COLORS = ['#007860', '#b45309', '#1d4ed8', '#15803d'];

function AvatarStack({ count }: { count: number }) {
  const shown = Math.min(count, 4);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{ display: 'flex' }}>
        {Array.from({ length: shown }).map((_, i) => (
          <div key={i} style={{ width: 20, height: 20, borderRadius: '50%', background: AVATAR_COLORS[i % AVATAR_COLORS.length], border: '1.5px solid white', marginLeft: i === 0 ? 0 : -6, zIndex: shown - i, position: 'relative' }} />
        ))}
      </div>
      <span style={{ fontSize: 12, color: '#3f4944' }}>{count} people are going</span>
    </div>
  );
}

const HOSTS: Record<string, { name: string; location: string; rating: string; avatarColor: string; bio: string; interests: string[]; hasEvents: boolean }> = {
  '1': {
    name: 'John Isner',
    location: 'Munich, Germany',
    rating: '4.4',
    avatarColor: '#007860',
    bio: 'John is a passionate tennis and sports fan based in Munich. He has been hosting watch parties since 2021 and loves bringing fans together.',
    interests: ['Tennis', 'Football', 'Basketball', 'Soccer', 'Badminton'],
    hasEvents: true,
  },
  '2': {
    name: 'Tatjana H.',
    location: 'Munich, Germany',
    rating: '4.4',
    avatarColor: '#e67e22',
    bio: "Hey, I'm passionate about exploring the world through travel, indulging in culinary adventures, and admiring the intricacies of architecture.",
    interests: ['Tennis', 'American Football', 'Travelling', 'Football', 'Food'],
    hasEvents: false,
  },
};

const MOCK_REVIEWS = [
  { id: 1, reviewer: 'Alex K.', rating: 4.5, date: 'Aug 20th 2023', comment: 'Great host! The venue was perfect and everyone felt welcome. Will definitely join again.' },
  { id: 2, reviewer: 'Maria S.', rating: 5, date: 'Aug 17th 2023', comment: 'Amazing experience watching the game with fellow fans. The atmosphere was electric!' },
  { id: 3, reviewer: 'Tom R.', rating: 4, date: 'Aug 10th 2023', comment: 'Good organization, nice crowd. Could have been a bit louder but overall great fun.' },
  { id: 4, reviewer: 'Priya M.', rating: 4, date: 'Jul 28th 2023', comment: 'Very well organized. Great spot and the group was friendly and passionate.' },
  { id: 5, reviewer: 'Chris B.', rating: 5, date: 'Jul 15th 2023', comment: 'Best watch party I have been to. Can not wait for the next one!' },
];

type Tab = 'about' | 'events' | 'reviews';

export default function HostProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const host = HOSTS[id ?? '1'] ?? HOSTS['1'];
  const [activeTab, setActiveTab] = useState<Tab>(host.hasEvents ? 'events' : 'about');

  const happeningEvents = EVENTS.slice(0, 2);
  const pastEvents = EVENTS.slice(2, 4);

  function EventCard({ event, faded = false }: { event: typeof EVENTS[0]; faded?: boolean }) {
    return (
      <div style={{ position: 'relative', marginBottom: 8 }}>
        <div
          onClick={faded ? undefined : () => navigate(`/event/${event.id}`)}
          style={{ display: 'flex', background: '#f8faf7', border: '1px solid #bfc9c3', borderRadius: 12, overflow: 'hidden', height: 112, cursor: faded ? 'default' : 'pointer', opacity: faded ? 0.5 : 1 }}
        >
          <div style={{ flex: 1, padding: 16, display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ position: 'relative', width: 56, height: 56, flexShrink: 0 }}>
              <img src="/assets/98725e85c99b521c41a52014073757399ba95a74.svg" alt="" style={{ width: '100%', height: '100%' }} />
              <span style={{ position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 14, fontWeight: 500, color: '#191c1b' }}>{event.rating}</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: '#191c1b', lineHeight: '20px' }}>{event.name}</p>
              <p style={{ margin: '2px 0 8px', fontSize: 12, color: '#3f4944', lineHeight: '16px' }}>{event.date}</p>
              <AvatarStack count={event.people} />
            </div>
          </div>
          <div style={{ width: 80, flexShrink: 0, borderLeft: '1px solid #bfc9c3' }}>
            <img src={event.image} alt={event.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
        {faded && <div style={{ position: 'absolute', inset: 0, background: 'rgba(217,217,217,0.5)', borderRadius: 12, pointerEvents: 'none' }} />}
      </div>
    );
  }

  return (
    <div className="w-[390px] bg-white relative" style={{ height: 880, overflow: 'hidden', fontFamily: "'Roboto', sans-serif" }}>
      <StatusBar />

      {/* Back + slim hamburger */}
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
      <div style={{ position: 'absolute', top: 112, left: 34, width: 96, height: 96, borderRadius: '50%', overflow: 'hidden', border: '3px solid white', zIndex: 5, background: host.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {id === '1'
          ? <img src="/assets/bcee3a929e05a9984bb4131d21f7fd7ac52c7c7d.png" alt={host.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span style={{ fontSize: 36, color: 'white', fontWeight: 600 }}>{host.name[0]}</span>
        }
      </div>
      <p style={{ position: 'absolute', top: 134, left: 154, fontSize: 24, fontWeight: 400, color: '#000', margin: 0, lineHeight: '32px' }}>{host.name}</p>
      <p style={{ position: 'absolute', top: 174, left: 154, fontSize: 14, fontWeight: 400, color: '#000', margin: 0, letterSpacing: 0.25 }}>{host.location}</p>
      <div style={{ position: 'absolute', top: 149, right: 32, display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 22, color: '#000', lineHeight: '28px' }}>{host.rating}</span>
        <span style={{ fontSize: 22 }}>⭐️</span>
      </div>

      {/* Tab bar */}
      <div style={{ position: 'absolute', top: 234, left: 0, right: 0, background: 'white' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #e0e0e0' }}>
          {([{ key: 'about', label: 'About' }, { key: 'events', label: 'Events Hosted' }, { key: 'reviews', label: 'Reviews' }] as { key: Tab; label: string }[]).map(tab => (
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
      <div style={{ position: 'absolute', top: 299, left: 0, right: 0, bottom: 89, overflowY: 'auto' }}>

        {/* ABOUT TAB */}
        {activeTab === 'about' && (
          <div style={{ padding: '16px 20px' }}>
            <p style={{ margin: '0 0 16px', fontSize: 14, color: '#3f4944', lineHeight: '20px' }}>{host.bio}</p>
            <div style={{ height: 1, background: '#e8ece9', margin: '0 -20px 16px' }} />
            <p style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 500, color: '#000', letterSpacing: 0.15 }}>Interests</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              <button style={{ height: 32, padding: '0 12px', border: '1px solid #006b56', borderRadius: 8, background: 'none', color: '#006b56', fontSize: 14, cursor: 'pointer' }}>+ Add</button>
              {host.interests.map(interest => (
                <div key={interest} style={{ height: 32, padding: '0 12px', border: '1px solid #bfc9c3', borderRadius: 8, background: 'white', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#191c1b' }}>
                  <span>{interest}</span>
                  <span style={{ color: '#6f7975', cursor: 'pointer' }}>×</span>
                </div>
              ))}
            </div>
            <div style={{ height: 1, background: '#e8ece9', margin: '0 -20px 16px' }} />
            <p style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 500, color: '#000', letterSpacing: 0.15 }}>Past events</p>
            {pastEvents.map(event => <EventCard key={event.id} event={event} faded />)}
          </div>
        )}

        {/* EVENTS HOSTED TAB */}
        {activeTab === 'events' && (
          host.hasEvents ? (
            <div style={{ padding: '0 20px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px 0' }}>
                <span style={{ fontSize: 16, fontWeight: 500, color: '#000' }}>Happening</span>
                <div><span style={{ fontSize: 12, color: '#006b56', cursor: 'pointer' }}>see more</span><div style={{ height: 1, background: '#006b56', marginTop: 1 }} /></div>
              </div>
              {happeningEvents.map(event => <EventCard key={event.id} event={event} />)}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '16px 0 12px' }}>
                <span style={{ fontSize: 16, fontWeight: 500, color: '#000' }}>Past events</span>
                <div><span style={{ fontSize: 12, color: '#006b56', cursor: 'pointer' }}>see more</span><div style={{ height: 1, background: '#006b56', marginTop: 1 }} /></div>
              </div>
              {pastEvents.map(event => <EventCard key={event.id} event={event} faded />)}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60%', padding: '0 40px', textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: '#6f7975', lineHeight: '20px', marginBottom: 32 }}>You never create any events. Let's make it happen. Create your event now.</p>
              <button style={{ width: 177, height: 40, background: '#006b56', border: 'none', borderRadius: 100, color: 'white', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Create event</button>
            </div>
          )
        )}

        {/* REVIEWS TAB */}
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
