import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const imgHofLogo04 = "/assets/dde02f017669068f92b03dd15a8db54793e9ce55.png";
const imgHofLogo05 = "/assets/fddd17df2f7f04ee5202c313a1ed487fa8bb982e.png";
const imgBackArrow = "/assets/a59b32806f2c2ec3c42df101c476fdc775f5247c.svg";
const imgSearchIcon = "/assets/db655f4e5b1c365bbe92e5c4aa70c15c6c735a49.svg";

const DOT_COLORS: Record<number, string[]> = {
  1: ['#60dbb9', 'white', 'white', 'white'],
  2: ['#60dbb9', '#7ef8d4', 'white', 'white'],
  3: ['#60dbb9', '#7ef8d4', '#7ef8d4', 'white'],
  4: ['#60dbb9', '#7ef8d4', '#7ef8d4', '#7ef8d4'],
};

function ProgressDots({ step }: { step: number }) {
  const colors = DOT_COLORS[step] ?? ['#60dbb9', 'white', 'white', 'white'];
  return (
    <div className="absolute left-[5.8%] right-[5.8%] h-[6px]" style={{ top: '75%', display: 'flex', gap: 0 }}>
      {colors.map((color, i) => (
        <div key={i} className="flex-1 rounded-[10px]" style={{ background: color, marginLeft: i === 0 ? 0 : '4px' }} />
      ))}
    </div>
  );
}

function StatusBar() {
  return (
    <div className="absolute flex items-center justify-between text-[12px] text-white" style={{ fontFamily: 'Roboto, sans-serif', left: '12px', top: '11px', width: '366px', height: '15px' }}>
      <div className="flex items-center gap-[5px]">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="white" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="8" width="3" height="4" rx="0.5" />
          <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.5" />
          <rect x="9" y="3" width="3" height="9" rx="0.5" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="10.5" r="1.25" fill="white" />
          <path d="M5 8.2 Q8 5.8 11 8.2" stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          <path d="M2.5 5.5 Q8 1.5 13.5 5.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        </svg>
        <span className="font-normal">Tsel</span>
      </div>
      <div className="flex items-center gap-[5px]">
        <span>100%</span>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="1" width="21" height="10" rx="2.5" stroke="white" strokeOpacity="0.4" />
          <rect x="1.5" y="2" width="19" height="8" rx="1.8" fill="white" />
          <path d="M22.5 4.5 C23.5 4.5 24 5 24 6 C24 7 23.5 7.5 22.5 7.5 L22.5 4.5Z" fill="white" fillOpacity="0.45" />
        </svg>
      </div>
    </div>
  );
}

// Back arrow + Skip for now row, anchored 16px below the status bar (status bar bottom = 26px, so top = 42px)
function TopNav({ onBack, onSkip }: { onBack: () => void; onSkip: () => void }) {
  return (
    <>
      <button
        onClick={onBack}
        className="absolute flex items-center justify-center bg-transparent border-none cursor-pointer w-[24px] h-[24px]"
        style={{ left: 'calc(8.33% + 10.5px)', top: '42px' }}
      >
        <img alt="back" className="w-full h-full block" src={imgBackArrow} />
      </button>
      <button
        onClick={onSkip}
        className="absolute h-[24px] flex items-center justify-center bg-transparent border-none cursor-pointer text-white text-[14px] font-medium tracking-[0.1px]"
        style={{ fontFamily: 'Roboto, sans-serif', right: 'calc(8.33% + 10.5px)', top: '42px' }}
      >
        Skip for now
      </button>
    </>
  );
}

// Option button — yellow border, fills yellow when selected
function OptionBtn({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="h-[40px] rounded-[10px] flex items-center justify-center cursor-pointer text-[14px] font-medium tracking-[0.1px] w-[170px]"
      style={{
        fontFamily: 'Roboto, sans-serif',
        border: '1px solid #ffe084',
        background: selected ? '#ffe084' : 'transparent',
        color: selected ? '#006b56' : '#ffe084',
      }}
    >
      {label}
    </button>
  );
}

// Shared watermark — clipped to container bottom
function Watermark({ src }: { src: string }) {
  return (
    <div
      className="absolute pointer-events-none overflow-hidden"
      style={{ top: '88.28%', right: '19.81%', bottom: '0', left: '20.05%' }}
    >
      <img alt="" className="absolute left-0 top-0 w-full max-w-none" style={{ height: 'auto' }} src={src} />
    </div>
  );
}

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [sportType, setSportType] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [vibe, setVibe] = useState<string | null>(null);
  const [location, setLocation] = useState('');

  const goNext = () => setStep(s => Math.min(s + 1, 5));
  const goBack = () => setStep(s => Math.max(s - 1, 0));

  // Title position consistent across screens 1-4
  const TITLE_STYLE = { fontFamily: 'Roboto, sans-serif', top: '120px', left: 'calc(8.33% + 22.5px)' };

  // ── Screen 0: Welcome ─────────────────────────────────────────────────────
  if (step === 0) {
    return (
      <div className="w-[390px] h-[844px] bg-white relative" style={{ overflow: 'hidden' }}>
        <div className="absolute bg-[#006b56] inset-[0_0_17.52%_0] rounded-bl-[30px] rounded-br-[30px]" />
        <div className="absolute pointer-events-none overflow-hidden" style={{ top: '69.2%', right: '0', bottom: '0', left: '64.49%' }}>
          <img alt="" className="absolute left-0 top-0 w-full max-w-none" style={{ height: 'auto' }} src={imgHofLogo04} />
        </div>
        <StatusBar />
        <p className="absolute text-[32px] leading-[40px] font-normal text-white w-[301px]" style={{ fontFamily: 'Roboto, sans-serif', top: '159px', left: 'calc(8.33% + 22.5px)' }}>
          Your best watching experience starts from here!
        </p>
        <button
          onClick={goNext}
          className="absolute h-[40px] bg-[#ffe084] rounded-[10px] flex items-center justify-center cursor-pointer border-none w-[301px]"
          style={{ fontFamily: 'Roboto, sans-serif', top: '351px', left: 'calc(8.33% + 22.5px)', fontSize: '14px', fontWeight: 500, color: '#231b00', letterSpacing: '0.1px' }}
        >
          Discover Your Preferences
        </button>
        <button
          onClick={() => navigate('/home')}
          className="absolute h-[24px] flex items-center justify-center cursor-pointer border-none bg-transparent text-[#ffe084] text-[14px] font-medium tracking-[0.1px]"
          style={{ fontFamily: 'Roboto, sans-serif', top: '415px', left: 'calc(33.33% + 13px)', width: '112px' }}
        >
          Skip for now
        </button>
      </div>
    );
  }

  // ── Screen 1: What sports ─────────────────────────────────────────────────
  if (step === 1) {
    return (
      <div className="w-[390px] h-[844px] bg-white relative" style={{ overflow: 'hidden' }}>
        <div className="absolute bg-[#006b56] inset-[0_0_17.52%_0] rounded-bl-[30px] rounded-br-[30px]" />
        <Watermark src={imgHofLogo05} />
        <StatusBar />
        <TopNav onBack={goBack} onSkip={goNext} />
        <p className="absolute text-[32px] leading-[40px] font-normal text-white w-[301px]" style={{ ...TITLE_STYLE }}>
          What sports are your favorites?
        </p>
        <div className="absolute flex flex-col gap-[14px]" style={{ top: '240px', left: 'calc(8.33% + 22.5px)' }}>
          <OptionBtn label="Team sports" selected={sportType === 'Team sports'} onClick={() => { setSportType('Team sports'); goNext(); }} />
          <OptionBtn label="Individual sports" selected={sportType === 'Individual sports'} onClick={() => { setSportType('Individual sports'); goNext(); }} />
        </div>
        <ProgressDots step={1} />
      </div>
    );
  }

  // ── Screen 2: Role ────────────────────────────────────────────────────────
  if (step === 2) {
    return (
      <div className="w-[390px] h-[844px] bg-white relative" style={{ overflow: 'hidden' }}>
        <div className="absolute bg-[#006b56] inset-[0_0_17.52%_0] rounded-bl-[30px] rounded-br-[30px]" />
        <Watermark src={imgHofLogo05} />
        <StatusBar />
        <TopNav onBack={goBack} onSkip={goNext} />
        <p className="absolute text-[32px] leading-[40px] font-normal text-white w-[301px]" style={{ ...TITLE_STYLE }}>
          Are you joining this app as what?
        </p>
        <div className="absolute flex flex-col gap-[14px]" style={{ top: '240px', left: 'calc(8.33% + 22.5px)' }}>
          <OptionBtn label="As a host" selected={role === 'As a host'} onClick={() => { setRole('As a host'); goNext(); }} />
          <OptionBtn label="As a guest" selected={role === 'As a guest'} onClick={() => { setRole('As a guest'); goNext(); }} />
        </div>
        <ProgressDots step={2} />
      </div>
    );
  }

  // ── Screen 3: Vibe ────────────────────────────────────────────────────────
  if (step === 3) {
    return (
      <div className="w-[390px] h-[844px] bg-white relative" style={{ overflow: 'hidden' }}>
        <div className="absolute bg-[#006b56] inset-[0_0_17.52%_0] rounded-bl-[30px] rounded-br-[30px]" />
        <Watermark src={imgHofLogo05} />
        <StatusBar />
        <TopNav onBack={goBack} onSkip={goNext} />
        <p className="absolute text-[32px] leading-[40px] font-normal text-white w-[301px]" style={{ ...TITLE_STYLE }}>
          How do you like the vibe of watching sports?
        </p>
        <div className="absolute flex flex-col gap-[14px]" style={{ top: '304px', left: 'calc(8.33% + 22.5px)' }}>
          {(['Calm', 'Moderate', 'Energetic and loud'] as const).map(opt => (
            <OptionBtn key={opt} label={opt} selected={vibe === opt} onClick={() => { setVibe(opt); goNext(); }} />
          ))}
        </div>
        <ProgressDots step={3} />
      </div>
    );
  }

  // ── Screen 4: Location ────────────────────────────────────────────────────
  if (step === 4) {
    return (
      <div className="w-[390px] h-[844px] bg-white relative" style={{ overflow: 'hidden' }}>
        <div className="absolute bg-[#006b56] inset-[0_0_17.52%_0] rounded-bl-[30px] rounded-br-[30px]" />
        <Watermark src={imgHofLogo05} />
        <StatusBar />
        <TopNav onBack={goBack} onSkip={goNext} />
        <p className="absolute text-[32px] leading-[40px] font-normal text-white w-[301px]" style={{ ...TITLE_STYLE }}>
          And lastly, where do you located?
        </p>
        <div className="absolute w-[301px] h-[56px]" style={{ top: '240px', left: 'calc(8.33% + 22.5px)' }}>
          <div className="border border-white rounded-[4px] flex items-center pl-[16px] pr-0 w-full h-full">
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="Munich, Germany"
              className="flex-1 bg-transparent outline-none border-none text-[16px] text-white tracking-[0.5px] placeholder:text-white"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            />
            <div className="flex items-center justify-center w-[48px] h-[48px] shrink-0">
              <img alt="" className="block w-[24px] h-[24px]" src={imgSearchIcon} />
            </div>
          </div>
        </div>
        <button
          onClick={goNext}
          className="absolute h-[40px] bg-[#ffe084] rounded-[10px] flex items-center justify-center cursor-pointer border-none w-[301px]"
          style={{ fontFamily: 'Roboto, sans-serif', top: '316px', left: 'calc(8.33% + 22.5px)', fontSize: '14px', fontWeight: 500, color: '#231b00', letterSpacing: '0.1px' }}
        >
          Continue
        </button>
        <button
          onClick={goNext}
          className="absolute h-[24px] flex items-center justify-center bg-transparent border-none cursor-pointer text-[#ffe084] text-[14px] font-medium tracking-[0.1px]"
          style={{ fontFamily: 'Roboto, sans-serif', left: 'calc(8.33% + 22.5px)', top: '374px' }}
        >
          Maybe later
        </button>
        <ProgressDots step={4} />
      </div>
    );
  }

  // ── Screen 5: Done! ───────────────────────────────────────────────────────
  return (
    <div className="w-[390px] h-[844px] bg-white relative" style={{ overflow: 'hidden' }}>
      <div className="absolute bg-[#006b56] inset-[0_0_17.52%_0] rounded-bl-[30px] rounded-br-[30px]" />
      <Watermark src={imgHofLogo05} />
      <StatusBar />
      <button
        onClick={() => navigate('/home')}
        className="absolute h-[24px] flex items-center justify-center bg-transparent border-none cursor-pointer text-white text-[14px] font-medium tracking-[0.1px]"
        style={{ fontFamily: 'Roboto, sans-serif', right: 'calc(8.33% + 10.5px)', top: '42px' }}
      >
        Skip for now
      </button>
      <p className="absolute text-[32px] leading-[40px] font-normal text-white w-[301px]" style={{ fontFamily: 'Roboto, sans-serif', top: '159px', left: 'calc(8.33% + 22.5px)' }}>
        Done!{' '}
      </p>
      <p className="absolute text-[16px] leading-[24px] font-normal text-white w-[301px] tracking-[0.5px]" style={{ fontFamily: 'Roboto, sans-serif', top: '223px', left: 'calc(8.33% + 22.5px)' }}>
        Thanks for sharing your preferences with us! We're excited to make your experience even better.
      </p>
      <button
        onClick={() => navigate('/home')}
        className="absolute h-[40px] bg-[#ffe084] rounded-[10px] flex items-center justify-center cursor-pointer border-none w-[301px]"
        style={{ fontFamily: 'Roboto, sans-serif', top: '351px', left: 'calc(8.33% + 22.5px)', fontSize: '14px', fontWeight: 500, color: '#231b00', letterSpacing: '0.1px' }}
      >
        Go to Homepage
      </button>
    </div>
  );
}
