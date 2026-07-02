import { useNavigate } from 'react-router-dom';

type Tab = 'Explore' | 'Favorite' | 'Chats' | 'Profile';

const NAV: { icon: string; label: Tab; route: string }[] = [
  { icon: '/assets/aa016a63e5440d3d8146097bae15fd18815e4c12.svg', label: 'Explore', route: '/home' },
  { icon: '/assets/250ed105c5fdb21014c9f42a0b49040266ecd41d.svg', label: 'Favorite', route: '/favorites' },
  { icon: '/assets/bb94a0a92a909847e2cac397cb680ab2707ecae5.svg', label: 'Chats', route: '/chats' },
  { icon: '/assets/5ee7039ca95a81bf379a4743147d79d5798ecde0.svg', label: 'Profile', route: '/host/2' },
];

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
            <img
              src={item.icon}
              alt={item.label}
              style={{ width: 22, height: 22, filter: isActive ? 'invert(29%) sepia(85%) saturate(400%) hue-rotate(131deg) brightness(85%)' : 'invert(45%) sepia(8%) saturate(400%) hue-rotate(100deg) brightness(90%)' }}
            />
            <span style={{ fontSize: 11, fontWeight: 500, color: isActive ? '#006b56' : '#6f7975' }}>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}
