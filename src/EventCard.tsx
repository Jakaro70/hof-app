import type { Event } from './eventsData';

const AVATAR_COLORS = ['#007860', '#b45309', '#1d4ed8', '#15803d'];

export function AvatarStack({ count }: { count: number }) {
  const shown = Math.min(count, 4);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{ display: 'flex' }}>
        {Array.from({ length: shown }).map((_, i) => (
          <div key={i} style={{ width: 18, height: 18, borderRadius: '50%', background: AVATAR_COLORS[i % AVATAR_COLORS.length], border: '1.5px solid white', marginLeft: i === 0 ? 0 : -6, zIndex: shown - i, position: 'relative' }} />
        ))}
      </div>
      <span style={{ fontSize: 12, color: '#3f4944' }}>{count} people are going</span>
    </div>
  );
}

// "Girls Only: FIFA WC Final" → main "FIFA WC Final" + trailing tag "Girls Only"
function splitName(name: string): { main: string; tag: string | null } {
  const m = name.match(/^(.*?):\s*(.*)$/);
  if (m) return { main: m[2], tag: m[1] };
  return { main: name, tag: null };
}

// Shared horizontal event card (matches the Favorites/Profile style, no star rating).
export default function EventCard({ event, onClick }: { event: Event; onClick: () => void }) {
  const { main, tag } = splitName(event.name);
  return (
    <div
      onClick={onClick}
      style={{ display: 'flex', background: '#f8faf7', border: '1px solid #d7e0da', borderRadius: 12, overflow: 'hidden', marginBottom: 10, cursor: 'pointer', height: 104 }}
    >
      <div style={{ flex: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 6, minWidth: 0 }}>
        <div>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#191c1b', lineHeight: '18px' }}>
            {main}
            {tag && <span style={{ fontSize: 11, fontWeight: 400, color: '#6f7975' }}> · {tag}</span>}
          </p>
          <p style={{ margin: '3px 0 0', fontSize: 12, color: '#3f4944' }}>{event.date}</p>
        </div>
        <AvatarStack count={event.people} />
      </div>
      <div style={{ width: 112, flexShrink: 0 }}>
        <img src={event.image} alt={event.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    </div>
  );
}
