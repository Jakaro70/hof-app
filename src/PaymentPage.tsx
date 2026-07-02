import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EVENTS } from './eventsData';
import { loadJSON, saveJSON, JOINED_KEY } from './storage';

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

const METHODS = [
  { id: 'visa', label: 'Visa •••• 4242', sub: 'Expires 08/27', icon: '💳' },
  { id: 'paypal', label: 'PayPal', sub: 'achmadrazzaq89@gmail.com', icon: '🅿️' },
  { id: 'apple', label: 'Apple Pay', sub: 'iPhone', icon: '' },
];

export default function PaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = EVENTS.find(e => e.id === Number(id)) ?? EVENTS[0];

  const [method, setMethod] = useState('visa');
  const [phase, setPhase] = useState<'method' | 'processing' | 'success'>('method');

  const priceNum = parseFloat(event.price) || 0;
  const fee = 1.5;
  const total = priceNum + fee;

  function pay() {
    setPhase('processing');
    setTimeout(() => setPhase('success'), 1600);
  }

  function finish() {
    const set = new Set(loadJSON<number[]>(JOINED_KEY, []));
    set.add(event.id);
    saveJSON(JOINED_KEY, [...set]);
    navigate(`/event/${event.id}`);
  }

  return (
    <div className="w-[390px] bg-white relative" style={{ height: 880, overflow: 'hidden', fontFamily: "'Roboto', sans-serif" }}>
      <StatusBar />

      {phase === 'success' ? (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', textAlign: 'center' }}>
          <div style={{ width: 88, height: 88, borderRadius: '50%', background: '#eafaf4', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#006b56" strokeWidth="2.5"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <p style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#191c1b' }}>Payment successful!</p>
          <p style={{ margin: '10px 0 0', fontSize: 14, color: '#6f7975', lineHeight: '20px' }}>You’re going to <b style={{ color: '#191c1b' }}>{event.name}</b>. See you at {event.venue}!</p>
          <button onClick={finish} style={{ marginTop: 32, width: '100%', height: 48, background: '#006b56', border: 'none', borderRadius: 100, color: 'white', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>View event</button>
        </div>
      ) : phase === 'processing' ? (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
          <div style={{ width: 44, height: 44, border: '4px solid #e8f1ed', borderTopColor: '#006b56', borderRadius: '50%', animation: 'hofspin 0.8s linear infinite' }} />
          <p style={{ margin: 0, fontSize: 15, color: '#3f4944' }}>Processing payment…</p>
          <style>{`@keyframes hofspin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : (
        <>
          {/* Back + title */}
          <button onClick={() => navigate(-1)} style={{ position: 'absolute', top: 64, left: 33, zIndex: 20, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <img src="/assets/4c05635826a75c06c376304f17fa5fc3a1f1919b.svg" alt="back" style={{ width: 20, height: 20 }} />
          </button>
          <p style={{ position: 'absolute', top: 99, left: 33, fontSize: 26, fontWeight: 700, color: '#191c1b', margin: 0 }}>Checkout</p>

          <div style={{ position: 'absolute', top: 150, left: 0, right: 0, bottom: 96, overflowY: 'auto', padding: '8px 24px 24px' }}>
            {/* Order summary */}
            <div style={{ background: '#f8faf7', border: '1px solid #e8ece9', borderRadius: 14, padding: 16, marginBottom: 24, display: 'flex', gap: 12 }}>
              <img src={event.image} alt={event.name} style={{ width: 64, height: 64, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#191c1b' }}>{event.name}</p>
                <p style={{ margin: '3px 0 0', fontSize: 12, color: '#3f4944' }}>{event.date}</p>
                <p style={{ margin: '3px 0 0', fontSize: 12, color: '#6f7975' }}>{event.venue}</p>
              </div>
            </div>

            {/* Payment method */}
            <p style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 600, color: '#191c1b' }}>Payment method</p>
            {METHODS.map(m => {
              const active = method === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', marginBottom: 10, borderRadius: 12, cursor: 'pointer', border: `1.5px solid ${active ? '#006b56' : '#e0e5e1'}`, background: active ? '#f0faf7' : 'white' }}
                >
                  <span style={{ fontSize: 22, width: 24, textAlign: 'center' }}>{m.icon || ''}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: '#191c1b' }}>{m.label}</p>
                    <p style={{ margin: '2px 0 0', fontSize: 12, color: '#6f7975' }}>{m.sub}</p>
                  </div>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${active ? '#006b56' : '#bfc9c3'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {active && <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#006b56' }} />}
                  </div>
                </div>
              );
            })}

            {/* Price breakdown */}
            <div style={{ marginTop: 20, borderTop: '1px solid #e8ece9', paddingTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 14, color: '#3f4944' }}>Ticket</span>
                <span style={{ fontSize: 14, color: '#191c1b' }}>{priceNum.toFixed(2)}€</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 14, color: '#3f4944' }}>Service fee</span>
                <span style={{ fontSize: 14, color: '#191c1b' }}>{fee.toFixed(2)}€</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <span style={{ fontSize: 16, fontWeight: 600, color: '#191c1b' }}>Total</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: '#191c1b' }}>{total.toFixed(2)}€</span>
              </div>
            </div>
          </div>

          {/* Pay button */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 24px 24px', background: 'white', borderTop: '1px solid #f0f0f0' }}>
            <button onClick={pay} style={{ width: '100%', height: 48, background: '#006b56', border: 'none', borderRadius: 100, color: 'white', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>
              Pay {total.toFixed(2)}€
            </button>
          </div>
        </>
      )}
    </div>
  );
}
