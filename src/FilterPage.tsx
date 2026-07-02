import { useState } from 'react';
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

const SPORTS = [
  { label: '⚽️ Football', value: 'football' },
  { label: '🏀 Basketball', value: 'basketball' },
  { label: '⚾️ Baseball', value: 'baseball' },
  { label: '🏎️ Formula One', value: 'formula1' },
];

export default function FilterPage() {
  const navigate = useNavigate();
  const [selectedSports, setSelectedSports] = useState<string[]>(['football']);
  const [venueType, setVenueType] = useState<'indoor' | 'outdoor' | null>('indoor');
  const [rating, setRating] = useState(1);
  const [sportSearch, setSportSearch] = useState('');

  function toggleSport(value: string) {
    setSelectedSports(prev => prev.includes(value) ? prev.filter(s => s !== value) : [...prev, value]);
  }

  const filteredSports = SPORTS.filter(s => s.label.toLowerCase().includes(sportSearch.toLowerCase()));

  return (
    <div className="w-[390px] bg-white relative" style={{ height: 880, overflow: 'hidden', fontFamily: "'Roboto', sans-serif" }}>
      <StatusBar />

      {/* Back */}
      <button onClick={() => navigate(-1)} style={{ position: 'absolute', top: 62, left: 33, zIndex: 20, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
        <img src="/assets/4c05635826a75c06c376304f17fa5fc3a1f1919b.svg" alt="back" style={{ width: 20, height: 20 }} />
      </button>

      {/* Title */}
      <p style={{ position: 'absolute', top: 99, left: 33, fontSize: 32, fontWeight: 700, color: '#006b56', margin: 0 }}>Filter</p>

      {/* Scrollable content */}
      <div style={{ position: 'absolute', top: 155, left: 0, right: 0, bottom: 89, overflowY: 'auto', padding: '0 20px 24px' }}>

        {/* Sports */}
        <p style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 600, color: '#000' }}>Sports</p>

        {/* Sport search bar */}
        <div style={{ height: 40, background: '#f0f4f1', borderRadius: 8, display: 'flex', alignItems: 'center', padding: '0 12px', gap: 8, marginBottom: 8 }}>
          <input
            value={sportSearch}
            onChange={e => setSportSearch(e.target.value)}
            placeholder="Search sports"
            style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: 14, color: '#191c1b' }}
          />
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM18 18l-4-4" stroke="#6f7975" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Sport checkboxes */}
        {filteredSports.map(sport => (
          <div key={sport.value} onClick={() => toggleSport(sport.value)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', cursor: 'pointer' }}>
            <span style={{ fontSize: 14, color: '#191c1b' }}>{sport.label}</span>
            <div style={{
              width: 20, height: 20, borderRadius: 4,
              border: selectedSports.includes(sport.value) ? 'none' : '2px solid #bfc9c3',
              background: selectedSports.includes(sport.value) ? '#006b56' : 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              {selectedSports.includes(sport.value) && (
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path d="M1 5l3.5 3.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          </div>
        ))}

        {/* Divider */}
        <div style={{ height: 1, background: '#e8ece9', margin: '8px -20px 20px' }} />

        {/* Venue Type */}
        <p style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600, color: '#000' }}>Venue Type</p>
        <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
          {[
            { key: 'indoor', label: 'Indoor', icon: '🏢' },
            { key: 'outdoor', label: 'Outdoor', icon: '🌳' },
          ].map(({ key, label, icon }) => (
            <div
              key={key}
              onClick={() => setVenueType(key as 'indoor' | 'outdoor')}
              style={{
                flex: 1, height: 77, border: `1.5px solid ${venueType === key ? '#006b56' : '#e0e0e0'}`,
                borderRadius: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 6, cursor: 'pointer', background: venueType === key ? '#f0faf7' : 'white',
              }}
            >
              <span style={{ fontSize: 28 }}>{icon}</span>
              <span style={{ fontSize: 14, color: venueType === key ? '#006b56' : '#191c1b', fontWeight: venueType === key ? 600 : 400 }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: '#e8ece9', margin: '16px -20px 20px' }} />

        {/* Host Ratings */}
        <p style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 600, color: '#000' }}>Host Ratings</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 14, color: '#191c1b' }}>1 ⭐️</span>
          <span style={{ fontSize: 14, color: '#191c1b' }}>5 ⭐️</span>
        </div>
        <div style={{ position: 'relative', height: 20, marginBottom: 8 }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 4, background: '#e0e0e0', borderRadius: 2, transform: 'translateY(-50%)' }} />
          <div style={{ position: 'absolute', top: '50%', left: 0, width: `${((rating - 1) / 4) * 100}%`, height: 4, background: '#006b56', borderRadius: 2, transform: 'translateY(-50%)' }} />
          <input
            type="range" min={1} max={5} step={0.5} value={rating}
            onChange={e => setRating(Number(e.target.value))}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', margin: 0 }}
          />
          <div style={{ position: 'absolute', top: '50%', left: `calc(${((rating - 1) / 4) * 100}% - 10px)`, transform: 'translateY(-50%)', width: 20, height: 20, borderRadius: '50%', background: '#006b56', boxShadow: '0 1px 4px rgba(0,0,0,0.3)', pointerEvents: 'none' }} />
        </div>
        <p style={{ margin: '4px 0 0', fontSize: 12, color: '#6f7975' }}>Min rating: {rating} ⭐️</p>

        {/* Apply button */}
        <button
          onClick={() => navigate(-1)}
          style={{ width: '100%', height: 48, background: '#006b56', border: 'none', borderRadius: 100, color: 'white', fontSize: 16, fontWeight: 600, cursor: 'pointer', marginTop: 32 }}
        >
          Apply Filters
        </button>
      </div>

      <BottomNav active="Explore" />
    </div>
  );
}
