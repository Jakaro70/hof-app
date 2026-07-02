import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';
import { EVENTS } from './eventsData';

const SPORTS = ['All', 'Football', 'Basketball', 'Tennis', 'Baseball', 'Hockey', 'Soccer'];

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

function EventHorizontalCard({ event, onClick }: { event: { id: number; name: string; date: string; image: string; people: number; rating: number }; onClick: () => void }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', background: '#f8faf7', border: '1px solid #bfc9c3', borderRadius: 12, overflow: 'hidden', marginBottom: 8, cursor: 'pointer', height: 112 }}>
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
  );
}

function StatusBar() {
  return (
    <div style={{ position: 'absolute', top: 11, left: 12, right: 0, height: 15, overflow: 'hidden', zIndex: 10 }}>
      {/* Left: signal group */}
      <div style={{ position: 'absolute', left: 0, top: 1, height: 14, width: 84, overflow: 'hidden' }}>
        <span style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', fontSize: 12, fontWeight: 400, color: '#030303', whiteSpace: 'nowrap' }}>Tsel</span>
        <img src="/assets/4e32eb6c77b4c639a6a5bf754ab0e24414d70175.svg" alt="" style={{ position: 'absolute', top: '7.14%', left: 0, bottom: '21.43%', width: '17.86%', height: '71.43%' }} />
        <img src="/assets/77b158f52252216a70b8544a0b377b107f01038d.svg" alt="" style={{ position: 'absolute', top: '7.14%', left: '83.33%', bottom: '21.43%', right: 0, height: '71.43%' }} />
      </div>
      {/* Right: bluetooth + 100% + battery */}
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

export default function HomePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'events' | 'map'>('events');
  const [activeSport, setActiveSport] = useState('All');
  const [hasEvents, setHasEvents] = useState(true);

  const filteredEvents = activeSport === 'All'
    ? EVENTS
    : EVENTS.filter(e => e.sport === activeSport);

  const showEmpty = !hasEvents || (activeTab === 'events' && filteredEvents.length === 0);

  return (
    <div
      className="w-[390px] bg-white relative"
      style={{ height: 880, overflow: 'hidden', fontFamily: "'Roboto', sans-serif" }}
    >
      <StatusBar />

      {/* Search bar */}
      <div onClick={() => navigate('/search-results')} style={{ position: 'absolute', top: 74, left: 31, width: 316, height: 40, background: '#eff1ee', borderRadius: 10, overflow: 'hidden', cursor: 'pointer' }}>
        <div style={{ position: 'absolute', left: 20, top: 0, width: 276, height: 40, display: 'flex', alignItems: 'center', gap: 4, padding: 4 }}>
          <span style={{ flex: 1, fontSize: 16, color: '#3f4945', whiteSpace: 'nowrap', letterSpacing: 0.5 }}>Search events or sports</span>
          <div style={{ width: 48, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <img src="/assets/0b96acfaa973753040085e149a1e06b213e6cfef.svg" alt="search" style={{ width: 24, height: 24 }} />
          </div>
        </div>
      </div>
      {/* Filter icon — 8px gap from search bar (31+316+8=355px), vertically centered with search bar (74+(40-24)/2=82px) */}
      <div onClick={() => navigate('/filter')} style={{ position: 'absolute', top: 82, left: 355, width: 24, height: 24, cursor: 'pointer' }}>
        <img src="/assets/00cfa13b3feb8f028561d46219d843db1e683196.svg" alt="filter" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Sport filter chips — populated state only */}
      {hasEvents && (
        <div style={{ position: 'absolute', top: 118, left: 0, right: 0, height: 32, display: 'flex', alignItems: 'center', overflowX: 'auto', paddingLeft: 16, paddingRight: 16, gap: 8, scrollbarWidth: 'none' }}>
          {SPORTS.map(sport => (
            <button
              key={sport}
              onClick={() => setActiveSport(sport)}
              style={{
                flexShrink: 0,
                height: 28,
                paddingLeft: 14,
                paddingRight: 14,
                borderRadius: 20,
                border: activeSport === sport ? 'none' : '1px solid #d0d5d1',
                background: activeSport === sport ? '#007860' : 'white',
                color: activeSport === sport ? 'white' : '#3f4945',
                fontSize: 13,
                fontWeight: activeSport === sport ? 500 : 400,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {sport}
            </button>
          ))}
        </div>
      )}

      {/* Tabs — when empty state: no chips so sit higher at 118px; when populated: sit below chips at 155px */}
      <div style={{ position: 'absolute', top: hasEvents ? 155 : 118, left: 31, width: 349, background: 'white' }}>
        <div style={{ display: 'flex' }}>
          {(['events', 'map'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => { if (tab === 'map') navigate('/map'); else setActiveTab(tab); }}
              style={{
                flex: 1,
                height: 48,
                border: 'none',
                background: 'white',
                fontSize: 14,
                fontWeight: 500,
                color: activeTab === tab ? '#006b56' : '#3f4945',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                padding: '0 16px',
                letterSpacing: 0.1,
                position: 'relative',
              }}
            >
              <span>{tab === 'events' ? 'Event List' : 'Map'}</span>
              {/* Always reserve 14px indicator space so text never shifts */}
              <div style={{ height: 14, width: '100%', position: 'relative', flexShrink: 0 }}>
                {activeTab === tab && (
                  <div style={{ position: 'absolute', bottom: 0, left: 2, right: 2, height: 3, background: '#006b56', borderRadius: '100px 100px 0 0' }} />
                )}
              </div>
            </button>
          ))}
        </div>
        {/* Divider */}
        <div style={{ height: 1, background: '#e0e5e1', width: '100%' }} />
      </div>

      {/* Content area — empty: tabs at 118+49=167; populated: tabs at 155+49=204 */}
      <div style={{ position: 'absolute', top: hasEvents ? 204 : 167, left: 0, right: 0, bottom: 53, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none' }}>
        {showEmpty ? (
          <div style={{ position: 'relative', height: '100%', minHeight: 500 }}>
            {/* Illustration: centered, ~60% of original Figma size (500→300, 346→208) */}
            <img
              src="/assets/bda89e3b391a9b5b09ffc4f6b5ac152fa29dd9a1.png"
              alt="no events"
              style={{ position: 'absolute', top: 30, left: '50%', transform: 'translateX(-50%)', width: 300, height: 208, objectFit: 'contain', pointerEvents: 'none', userSelect: 'none' }}
            />
            {/* Text: Figma top 579px → 579-204=375px from content top, centered at that point */}
            <div style={{ position: 'absolute', top: 375, left: 'calc(50% + 2px)', transform: 'translate(-50%, -50%)', width: 284, textAlign: 'center' }}>
              <p style={{ fontSize: 16, fontWeight: 400, color: '#000', margin: 0, lineHeight: '24px', letterSpacing: 0.5 }}>
                {`Ready to get started? No events yet? Let's start searching now!`}
              </p>
            </div>
            {/* CTA → sports & date discovery */}
            <button
              onClick={() => navigate('/discover')}
              style={{ position: 'absolute', top: 448, left: '50%', transform: 'translateX(-50%)', width: 220, height: 48, border: 'none', borderRadius: 100, background: '#006b56', color: 'white', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}
            >
              Find events
            </button>
          </div>
        ) : activeTab === 'map' ? (
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: '#9ea89d', fontSize: 14 }}>Map view coming soon</p>
          </div>
        ) : (
          <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 8, paddingBottom: 16 }}>
            {/* Discover banner → sports & date picker */}
            <div
              onClick={() => navigate('/discover')}
              style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#eafaf4', border: '1px solid #cdeadf', borderRadius: 12, padding: '12px 14px', marginBottom: 16, cursor: 'pointer' }}
            >
              <span style={{ fontSize: 22 }}>🎯</span>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#006b56' }}>Find your match</p>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: '#3f4944' }}>Pick your sports & dates</p>
              </div>
              <span style={{ fontSize: 18, color: '#006b56' }}>›</span>
            </div>

            {/* Going section */}
            <p style={{ margin: '4px 0 10px', fontSize: 16, fontWeight: 600, color: '#000', letterSpacing: -0.32 }}>Going</p>
            {filteredEvents.slice(0, 1).map(event => (
              <EventHorizontalCard key={event.id} event={event} onClick={() => navigate(`/event/${event.id}`)} />
            ))}

            {/* Other events section */}
            <p style={{ margin: '16px 0 10px', fontSize: 16, fontWeight: 600, color: '#000', letterSpacing: -0.32 }}>Other events in Munich</p>
            {filteredEvents.slice(1).map(event => (
              <EventHorizontalCard key={event.id} event={event} onClick={() => navigate(`/event/${event.id}`)} />
            ))}
          </div>
        )}
      </div>

      <BottomNav active="Explore" />

      {/* Dev toggle — switch between empty and populated states */}
      <button
        onClick={() => setHasEvents(p => !p)}
        style={{
          position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
          fontSize: 10, color: '#fff', background: 'rgba(0,0,0,0.35)',
          border: 'none', borderRadius: 4, padding: '2px 7px', cursor: 'pointer', zIndex: 50,
        }}
      >
        {hasEvents ? 'Switch to Empty' : 'Switch to Populated'}
      </button>
    </div>
  );
}
