import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const MAP_IMG = '/assets/a371e0c767963ca05ec6106e617dbbe8bc2a1b73.png';
const ICON = {
  Soccer: '/assets/b63021dda7eddae06cfee8f22d4e677fb5dc74b4.svg',
  Basketball: '/assets/4506dd0f4a12a03bc76f67400d0012fe5f59e756.svg',
  Tennis: '/assets/ffa7522168b1c17af1b215606c2c67c55a1afa0a.svg',
  Football: '/assets/fce129e6d86dafa46eb126d3872ee2e78f494fb3.svg',
};
const PIN_GREEN = '/assets/efaba6e657051b7eebbbadc2e841d1f5dce7e29b.svg';
const PIN_YELLOW = '/assets/7ebf6ca46145bcd106bbe1e4c3f6e86edfb75302.svg';

const S = 390 / 414; // scale Figma 414-wide frame to our 390 shell

// Pins in Figma frame coordinates (x, y). `going` = highlighted yellow pin.
// eventId maps each pin to an event in EVENTS for the detail card.
const PINS: { sport: keyof typeof ICON; x: number; y: number; going?: boolean; eventId: number }[] = [
  { sport: 'Soccer', x: 62, y: 419, going: true, eventId: 2 },
  { sport: 'Soccer', x: 363, y: 624, eventId: 2 },
  { sport: 'Soccer', x: 265, y: 729, eventId: 3 },
  { sport: 'Basketball', x: 165, y: 233, eventId: 4 },
  { sport: 'Basketball', x: 356, y: 424, eventId: 4 },
  { sport: 'Basketball', x: 221, y: 568, eventId: 5 },
  { sport: 'Tennis', x: 70, y: 659, eventId: 1 },
  { sport: 'Tennis', x: 47, y: 275, eventId: 1 },
  { sport: 'Tennis', x: 319, y: 300, eventId: 5 },
  { sport: 'Football', x: 260, y: 361, eventId: 3 },
];

// The user's preferred sports (from onboarding). Toggle switches between these and all.
const PREFERRED: (keyof typeof ICON)[] = ['Soccer', 'Tennis', 'Football'];

const MAP_TOP = 204; // where the map viewport begins (below tabs) — matches HomePage content top

export default function MapPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'events' | 'map'>('map');
  const [forYou, setForYou] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);
  const [lastId, setLastId] = useState<number>(1);

  function openCard(id: number) { setLastId(id); setSelected(id); }

  const pins = forYou ? PINS.filter(p => PREFERRED.includes(p.sport)) : PINS;
  // Card content stays mounted during slide-out so it can fully clear the screen.
  const cardEvent = EVENTS.find(e => e.id === lastId);

  return (
    <div className="w-[390px] bg-white relative" style={{ height: 880, overflow: 'hidden', fontFamily: "'Roboto', sans-serif" }}>
      <StatusBar />

      {/* Search bar — same position/style as HomePage so there is no jump */}
      <div onClick={() => navigate('/search-results')} style={{ position: 'absolute', top: 74, left: 31, width: 316, height: 40, background: '#eff1ee', borderRadius: 10, overflow: 'hidden', cursor: 'pointer' }}>
        <div style={{ position: 'absolute', left: 20, top: 0, width: 276, height: 40, display: 'flex', alignItems: 'center', gap: 4, padding: 4 }}>
          <span style={{ flex: 1, fontSize: 16, color: '#3f4945', whiteSpace: 'nowrap', letterSpacing: 0.5 }}>Search events or sports</span>
          <div style={{ width: 48, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <img src="/assets/0b96acfaa973753040085e149a1e06b213e6cfef.svg" alt="search" style={{ width: 18, height: 18 }} />
          </div>
        </div>
      </div>

      {/* Filter icon */}
      <div onClick={() => navigate('/filter')} style={{ position: 'absolute', top: 85, right: 20, width: 17, height: 17, cursor: 'pointer' }}>
        <img src="/assets/00cfa13b3feb8f028561d46219d843db1e683196.svg" alt="filter" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Tabs — same structure/position as HomePage */}
      <div style={{ position: 'absolute', top: 155, left: 31, width: 349, background: 'white' }}>
        <div style={{ display: 'flex' }}>
          {(['events', 'map'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => { if (tab === 'events') navigate('/home'); else setActiveTab('map'); }}
              style={{
                flex: 1, height: 48, border: 'none', background: 'white',
                fontSize: 14, fontWeight: 500,
                color: activeTab === tab ? '#006b56' : '#3f4945',
                cursor: 'pointer', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'flex-end', padding: '0 16px',
                letterSpacing: 0.1, position: 'relative',
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
        {/* Divider */}
        <div style={{ height: 1, background: '#e0e5e1', width: '100%' }} />
      </div>

      {/* Map area */}
      <div style={{ position: 'absolute', top: MAP_TOP, left: 0, right: 0, bottom: 72, overflow: 'hidden', background: '#e8ece3' }}>
        {/* Real map image, placed to match Figma crop */}
        <img
          src={MAP_IMG}
          alt="map"
          style={{ position: 'absolute', left: -311 * S, top: (179 - MAP_TOP) * S, width: 861 * S, height: 703 * S, maxWidth: 'none', pointerEvents: 'none', userSelect: 'none' }}
        />

        {/* Sport pins */}
        {pins.map((pin, i) => {
          const isSel = selected === pin.eventId;
          return (
            <div
              key={i}
              onClick={() => openCard(pin.eventId)}
              style={{
                position: 'absolute',
                left: pin.x * S, top: (pin.y - MAP_TOP) * S,
                width: 30 * S, height: 30 * S,
                cursor: 'pointer', zIndex: isSel ? 8 : 5,
                transform: isSel ? 'scale(1.25)' : 'scale(1)',
                transition: 'transform 0.15s',
              }}
            >
              <img src={pin.going ? PIN_YELLOW : PIN_GREEN} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
              <img
                src={ICON[pin.sport]}
                alt={pin.sport}
                style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 18 * S, height: 18 * S }}
              />
            </div>
          );
        })}

        {/* Legend */}
        <div style={{
          position: 'absolute', bottom: 16, left: 33,
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'white', borderRadius: 20, padding: '6px 12px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.2)', zIndex: 6,
        }}>
          <img src={PIN_YELLOW} alt="" style={{ width: 18, height: 18 }} />
          <span style={{ fontSize: 12, color: '#191c1b' }}>You're going to this event</span>
        </div>
      </div>

      {/* Preference toggle — segmented pill over the map */}
      <div style={{
        position: 'absolute', top: MAP_TOP + 12, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', background: 'white', borderRadius: 100, padding: 4,
        boxShadow: '0 1px 6px rgba(0,0,0,0.15)', zIndex: 7,
      }}>
        {([['For you', true], ['All events', false]] as const).map(([label, val]) => (
          <button
            key={label}
            onClick={() => setForYou(val)}
            style={{
              border: 'none', cursor: 'pointer', borderRadius: 100,
              padding: '7px 16px', fontSize: 13, fontWeight: forYou === val ? 600 : 400,
              background: forYou === val ? '#006b56' : 'transparent',
              color: forYou === val ? 'white' : '#3f4944',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Slide-up event detail card */}
      <div
        onClick={() => setSelected(null)}
        style={{
          position: 'absolute', inset: 0, zIndex: 24, background: 'rgba(0,0,0,0.12)',
          opacity: selected ? 1 : 0, pointerEvents: selected ? 'auto' : 'none',
          transition: 'opacity 0.28s',
        }}
      />
      <div
        style={{
          position: 'absolute', left: 0, right: 0, bottom: 72, zIndex: 25,
          background: 'white', borderRadius: '20px 20px 0 0',
          boxShadow: '0 -2px 16px rgba(0,0,0,0.15)', padding: '10px 20px 20px',
          transform: selected ? 'translateY(0)' : 'translateY(calc(100% + 80px))',
          transition: 'transform 0.28s cubic-bezier(0.2,0.8,0.2,1)',
        }}
      >
        {/* Grab handle */}
        <div style={{ width: 40, height: 4, borderRadius: 2, background: '#d0d5d1', margin: '0 auto 14px' }} />
        {cardEvent && (
          <>
            <div style={{ display: 'flex', gap: 14 }}>
              <img src={cardEvent.image} alt={cardEvent.name} style={{ width: 92, height: 92, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#191c1b', lineHeight: '20px' }}>{cardEvent.name}</p>
                <p style={{ margin: '4px 0 0', fontSize: 12, color: '#3f4944' }}>{cardEvent.date}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '6px 0 0' }}>
                  <span style={{ fontSize: 12, color: '#191c1b' }}>⭐️ {cardEvent.rating}</span>
                  <span style={{ fontSize: 12, color: '#3f4944' }}>{cardEvent.people} going</span>
                </div>
                <p style={{ margin: '6px 0 0', fontSize: 12, color: '#3f4944', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>📍 {cardEvent.venue}</p>
              </div>
            </div>
            <button
              onClick={() => navigate(`/event/${cardEvent.id}`)}
              style={{ width: '100%', height: 46, marginTop: 16, background: '#006b56', border: 'none', borderRadius: 100, color: 'white', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}
            >
              View details
            </button>
          </>
        )}
      </div>

      <BottomNav active="Explore" />
    </div>
  );
}
