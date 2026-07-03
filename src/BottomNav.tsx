import { useNavigate } from 'react-router-dom';

type Tab = 'Explore' | 'Favorite' | 'Chats' | 'Profile';

const NAV: { icon: string; label: Tab; route: string }[] = [
  { icon: '/assets/aa016a63e5440d3d8146097bae15fd18815e4c12.svg', label: 'Explore', route: '/home' },
  { icon: 'heart', label: 'Favorite', route: '/favorites' },
  { icon: '/assets/bb94a0a92a909847e2cac397cb680ab2707ecae5.svg', label: 'Chats', route: '/chats' },
  { icon: '/assets/5ee7039ca95a81bf379a4743147d79d5798ecde0.svg', label: 'Profile', route: '/profile' },
];

// Heart icon for Favorite — clearly distinct from the Chats speech bubble.
function HeartIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#006b56' : 'none'} stroke={active ? '#006b56' : '#6f7975'} strokeWidth="2">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" strokeLinejoin="round" />
    </svg>
  );
}

export default function BottomNav({ active }: { active: Tab }) {
  const navigate = useNavigate();
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, width: 390, height: 72, background: 'white', borderTop: '1px solid #e8f1ed', zIndex: 20, display: 'flex', alignItems: 'flex-start', paddingTop: 12 }}>
      {NAV.map(item => {
        const isActive = item.label === active;
        return (
          <div
            key={item.label}
            onClick={() => navigate(item.route)}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }}
          >
            {item.icon === 'heart' ? (
              <HeartIcon active={isActive} />
            ) : (
              <img
                src={item.icon}
                alt={item.label}
                style={{ width: 22, height: 22, filter: isActive ? 'invert(29%) sepia(85%) saturate(400%) hue-rotate(131deg) brightness(85%)' : 'invert(45%) sepia(8%) saturate(400%) hue-rotate(100deg) brightness(90%)' }}
              />
            )}
            <span style={{ fontSize: 11, fontWeight: 500, color: isActive ? '#006b56' : '#6f7975' }}>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}
