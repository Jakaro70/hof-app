import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterConfirmedPage() {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clean up timer on unmount so there's no setState-after-unmount warning
  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  function handleResend() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowConfirmation(true);
    timerRef.current = setTimeout(() => {
      setShowConfirmation(false);
      timerRef.current = null;
    }, 3000);
  }

  return (
    <div className="w-[390px] min-h-screen bg-white overflow-hidden">

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 pt-2 pb-1 text-[12px] text-black h-[37px]">
        <span className="font-normal">Tsel</span>
        <span>100%</span>
      </div>

      {/* Content — vertically centred in remaining space */}
      <div className="flex flex-col items-center justify-center px-8 pt-16 pb-12">

        {/* Envelope icon */}
        <div className="w-[96px] h-[96px] rounded-full bg-[#e6f2ef] flex items-center justify-center mb-8">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="12" width="36" height="26" rx="3" stroke="#007860" strokeWidth="2.5" fill="none"/>
            <path d="M6 16l18 13L42 16" stroke="#007860" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Heading */}
        <h1
          className="text-[28px] leading-[36px] font-normal text-[#007860] text-center mb-4"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          Confirmation Link Sent!
        </h1>

        {/* Body */}
        <p
          className="text-[14px] leading-[20px] tracking-[0.25px] text-[#3f4945] text-center mb-10"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          We've sent a confirmation link to your email address. Please check your inbox and click the link to activate your account.
        </p>

        {/* Resend button — outlined */}
        <button
          onClick={handleResend}
          className="w-full h-[40px] border border-[#007860] rounded-[10px] text-[#007860] text-[14px] leading-[20px] tracking-[0.1px] font-medium cursor-pointer bg-white mb-2"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          Resend confirmation link
        </button>

        {/* Inline success message — takes up reserved space so layout doesn't shift */}
        <div className="h-[20px] flex items-center justify-center mb-2">
          {showConfirmation && (
            <p
              className="text-[12px] leading-[16px] text-[#007860]"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Confirmation email sent!
            </p>
          )}
        </div>

        {/* Back to login */}
        <p
          className="text-[12px] leading-[16px] text-black mt-2"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          Already confirmed?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-[#007860] bg-transparent border-none cursor-pointer p-0 text-[12px]"
            style={{ fontFamily: 'Roboto, sans-serif' }}
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
