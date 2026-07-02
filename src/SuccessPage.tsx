import { useNavigate } from 'react-router-dom';

export default function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="w-[390px] min-h-screen bg-white overflow-hidden">

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 pt-2 pb-1 text-[12px] text-black h-[37px]">
        <span className="font-normal">Tsel</span>
        <span>100%</span>
      </div>

      {/* Content — vertically centred */}
      <div className="flex flex-col items-center justify-center px-8 pt-16 pb-12">

        {/* Check circle icon */}
        <div className="w-[96px] h-[96px] rounded-full bg-[#e6f2ef] flex items-center justify-center mb-8">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="18" stroke="#007860" strokeWidth="2.5" fill="none"/>
            <path d="M15 24l7 7 11-12" stroke="#007860" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Heading */}
        <h1
          className="text-[36px] leading-[44px] font-normal text-[#007860] text-center mb-4"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          Success!
        </h1>

        {/* Body */}
        <p
          className="text-[14px] leading-[20px] tracking-[0.25px] text-[#3f4945] text-center mb-10"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          Your email has been verified. You're all set — welcome to HOF!
        </p>

        {/* Login button — filled */}
        <button
          onClick={() => navigate('/login')}
          className="w-full h-[40px] bg-[#006b56] rounded-[10px] text-white text-[14px] leading-[20px] tracking-[0.1px] font-medium cursor-pointer border-none"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
