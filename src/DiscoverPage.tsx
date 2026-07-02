import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  { label: 'Football', emoji: '⚽️' },
  { label: 'Basketball', emoji: '🏀' },
  { label: 'Tennis', emoji: '🎾' },
  { label: 'American Football', emoji: '🏈' },
  { label: 'Baseball', emoji: '⚾️' },
  { label: 'Formula One', emoji: '🏎️' },
  { label: 'MMA', emoji: '🥊' },
  { label: 'Badminton', emoji: '🏸' },
  { label: 'Volleyball', emoji: '🏐' },
  { label: 'Futsal', emoji: '🥅' },
];

const QUICK_DATES = ['Today', 'Tomorrow', 'This weekend', 'Next week'];
const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function DiscoverPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'sports' | 'dates'>('sports');
  const [sports, setSports] = useState<string[]>([]);
  const [quickDates, setQuickDates] = useState<string[]>([]);
  const [days, setDays] = useState<number[]>([]);

  const now = new Date();
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [viewYear, setViewYear] = useState(now.getFullYear());

  function toggle<T>(list: T[], value: T, set: (v: T[]) => void) {
    set(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);
  }

  function shiftMonth(dir: number) {
    let m = viewMonth + dir;
    let y = viewYear;
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    setViewMonth(m); setViewYear(y); setDays([]);
  }

  const firstWeekday = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const canContinue = step === 'sports' ? sports.length > 0 : (quickDates.length > 0 || days.length > 0);

  return (
    <div className="w-[390px] bg-white relative" style={{ height: 880, overflow: 'hidden', fontFamily: "'Roboto', sans-serif" }}>
      <StatusBar />

      {/* Back */}
      <button
        onClick={() => (step === 'dates' ? setStep('sports') : navigate(-1))}
        style={{ position: 'absolute', top: 64, left: 33, zIndex: 20, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        <img src="/assets/4c05635826a75c06c376304f17fa5fc3a1f1919b.svg" alt="back" style={{ width: 20, height: 20 }} />
      </button>

      {/* Step indicator */}
      <div style={{ position: 'absolute', top: 68, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
        {['sports', 'dates'].map(s => (
          <div key={s} style={{ width: 28, height: 4, borderRadius: 2, background: step === s || (s === 'sports' && step === 'dates') ? '#006b56' : '#e0e5e1' }} />
        ))}
      </div>

      {/* Title */}
      <div style={{ position: 'absolute', top: 100, left: 24, right: 24 }}>
        <p style={{ margin: 0, fontSize: 26, fontWeight: 700, color: '#191c1b' }}>
          {step === 'sports' ? 'What are you into?' : 'When works for you?'}
        </p>
        <p style={{ margin: '6px 0 0', fontSize: 14, color: '#6f7975' }}>
          {step === 'sports' ? 'Pick the sports you want to watch live.' : 'Choose when you’d like to attend an event.'}
        </p>
      </div>

      {/* Scroll content */}
      <div style={{ position: 'absolute', top: 168, left: 0, right: 0, bottom: 96, overflowY: 'auto', padding: '8px 24px 24px' }}>
        {step === 'sports' ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {SPORTS.map(sport => {
              const active = sports.includes(sport.label);
              return (
                <div
                  key={sport.label}
                  onClick={() => toggle(sports, sport.label, setSports)}
                  style={{
                    position: 'relative', height: 96, borderRadius: 14, cursor: 'pointer',
                    border: `1.5px solid ${active ? '#006b56' : '#e0e5e1'}`,
                    background: active ? '#eafaf4' : 'white',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}
                >
                  <span style={{ fontSize: 30 }}>{sport.emoji}</span>
                  <span style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? '#006b56' : '#191c1b', textAlign: 'center', padding: '0 6px' }}>{sport.label}</span>
                  {active && (
                    <div style={{ position: 'absolute', top: 8, right: 8, width: 18, height: 18, borderRadius: '50%', background: '#006b56', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="10" height="8" viewBox="0 0 12 10" fill="none"><path d="M1 5l3.5 3.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <>
            {/* Quick date chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
              {QUICK_DATES.map(d => {
                const active = quickDates.includes(d);
                return (
                  <button
                    key={d}
                    onClick={() => toggle(quickDates, d, setQuickDates)}
                    style={{
                      height: 36, padding: '0 16px', borderRadius: 20, cursor: 'pointer',
                      border: active ? 'none' : '1px solid #d0d5d1',
                      background: active ? '#006b56' : 'white',
                      color: active ? 'white' : '#3f4945', fontSize: 13, fontWeight: active ? 600 : 400,
                    }}
                  >
                    {d}
                  </button>
                );
              })}
            </div>

            {/* Calendar */}
            <div style={{ border: '1px solid #e8ece9', borderRadius: 16, padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <button onClick={() => shiftMonth(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#6f7975', padding: 4 }}>‹</button>
                <span style={{ fontSize: 15, fontWeight: 600, color: '#191c1b' }}>{MONTHS[viewMonth]} {viewYear}</span>
                <button onClick={() => shiftMonth(1)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#6f7975', padding: 4 }}>›</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 4 }}>
                {WEEKDAYS.map((w, i) => (
                  <span key={i} style={{ textAlign: 'center', fontSize: 11, color: '#9ea89d', padding: '4px 0' }}>{w}</span>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
                {cells.map((day, i) => {
                  if (day === null) return <div key={i} />;
                  const active = days.includes(day);
                  const isToday = day === now.getDate() && viewMonth === now.getMonth() && viewYear === now.getFullYear();
                  return (
                    <button
                      key={i}
                      onClick={() => toggle(days, day, setDays)}
                      style={{
                        aspectRatio: '1', border: 'none', borderRadius: '50%', cursor: 'pointer',
                        background: active ? '#006b56' : 'transparent',
                        color: active ? 'white' : '#191c1b',
                        fontSize: 13, fontWeight: active || isToday ? 600 : 400,
                        outline: isToday && !active ? '1px solid #006b56' : 'none',
                      }}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Sticky bottom CTA */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 24px 24px', background: 'white', borderTop: '1px solid #f0f0f0' }}>
        <button
          disabled={!canContinue}
          onClick={() => (step === 'sports' ? setStep('dates') : navigate('/search-results'))}
          style={{
            width: '100%', height: 48, border: 'none', borderRadius: 100,
            background: canContinue ? '#006b56' : '#c8d3ce', color: 'white',
            fontSize: 16, fontWeight: 600, cursor: canContinue ? 'pointer' : 'default',
          }}
        >
          {step === 'sports' ? 'Continue' : 'Show events'}
        </button>
      </div>
    </div>
  );
}
