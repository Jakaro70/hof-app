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

export default function SearchResultsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'events' | 'map'>('events');
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();
  const results = q
    ? EVENTS.filter(e => e.name.toLowerCase().includes(q) || e.sport.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q))
    : EVENTS;

  return (
    <div className="w-[390px] bg-white relative" style={{ height: 880, overflow: 'hidden', fontFamily: "'Roboto', sans-serif" }}>
      <StatusBar />

      {/* Search bar — typeable, search icon on the right edge */}
      <div style={{ position: 'absolute', top: 38, left: 31, width: 316, height: 40, background: '#f0f4f1', borderRadius: 100, display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px' }}>
        <input
          autoFocus
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for events"
          style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: 14, color: '#191c1b' }}
        />
        {query ? (
          <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="#6f7975" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        ) : (
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
            <path d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM18 18l-4-4" stroke="#3f4944" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>

      {/* Filter icon — smaller, fully inside the screen */}
      <div onClick={() => navigate('/filter')} style={{ position: 'absolute', top: 49, right: 20, width: 17, height: 17, cursor: 'pointer' }}>
        <img src="/assets/00cfa13b3feb8f028561d46219d843db1e683196.svg" alt="filter" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Tabs */}
      <div style={{ position: 'absolute', top: 90, left: 31, width: 349, background: 'white' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #e0e0e0' }}>
          {(['events', 'map'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => { if (tab === 'map') navigate('/map'); else setActiveTab('events'); }}
              style={{
                flex: 1, background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 0 0',
                color: activeTab === tab ? '#006b56' : '#6f7975',
                fontSize: 14, fontWeight: activeTab === tab ? 600 : 400,
              }}
            >
              <span>{tab === 'events' ? 'Event List' : 'Map'}</span>
              <div style={{ height: 14, width: '100%', position: 'relative', flexShrink: 0 }}>
                {activeTab === tab && (
                  <div style={{ position: 'absolute', bottom: 0, left: 2, right: 2, height: 3, background: '#006b56', borderRadius: '100px 100px 0 0' }} />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Results label */}
      <div style={{ position: 'absolute', top: 148, left: 31 }}>
        <span style={{ fontSize: 12, color: '#6f7975' }}>{results.length} Results</span>
      </div>

      {/* Event cards */}
      <div style={{ position: 'absolute', top: 170, left: 20, right: 20, bottom: 89, overflowY: 'auto' }}>
        {results.length === 0 && (
          <p style={{ margin: '32px 0 0', textAlign: 'center', fontSize: 14, color: '#6f7975' }}>No events found for “{query}”.</p>
        )}
        {results.map(event => (
          <EventCard key={event.id} event={event} onClick={() => navigate(`/event/${event.id}`)} />
        ))}
      </div>

      <BottomNav active="Explore" />
    </div>
  );
}
