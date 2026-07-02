import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  function handleSubmit() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowSuccess(true);
    timerRef.current = setTimeout(() => {
      setShowSuccess(false);
      timerRef.current = null;
    }, 3000);
  }

  const floated = focused || value.length > 0;

  return (
    <div className="w-[390px] min-h-screen bg-white overflow-hidden">

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 pt-2 pb-1 text-[12px] text-black h-[37px]">
        <span className="font-normal">Tsel</span>
        <span>100%</span>
      </div>

      {/* Back button */}
      <div className="px-8 pt-4">
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-1 text-[#006b56] bg-transparent border-none cursor-pointer p-0 text-[14px] leading-[20px]"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </button>
      </div>

      {/* Content */}
      <div className="px-8 pt-6">
        {/* Title */}
        <h1
          className="text-[36px] leading-[44px] font-normal text-[#007860] mb-0"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          Forgot Password
        </h1>

        {/* Subtitle */}
        <p
          className="text-[14px] leading-[20px] tracking-[0.25px] text-black mt-4 mb-6"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          Enter your email and we'll send you a reset link.
        </p>

        {/* Email field — floating label */}
        <div className="w-full mb-6">
          <div
            className={`relative rounded-[4px] h-[56px] transition-colors duration-150 ${
              focused ? 'border-2 border-[#007860]' : 'border border-[#6f7975]'
            }`}
          >
            <label
              className="absolute left-[12px] transition-all duration-150 pointer-events-none select-none"
              style={{
                fontFamily: 'Roboto, sans-serif',
                top: floated ? 0 : '50%',
                transform: floated ? 'translateY(-50%) scale(0.75)' : 'translateY(-50%)',
                transformOrigin: 'left center',
                color: focused ? '#007860' : '#3f4945',
                fontSize: '16px',
                lineHeight: '24px',
                letterSpacing: '0.5px',
                background: floated ? 'white' : 'transparent',
                paddingLeft: floated ? '4px' : '0',
                paddingRight: floated ? '4px' : '0',
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={value}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onChange={e => setValue(e.target.value)}
              className="absolute inset-0 w-full h-full bg-transparent outline-none border-none px-4 pt-4 text-[16px] text-black"
              style={{ fontFamily: 'Roboto, sans-serif', letterSpacing: '0.5px' }}
            />
          </div>
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          className="w-full h-[40px] bg-[#006b56] rounded-[10px] text-white text-[14px] leading-[20px] tracking-[0.1px] font-medium cursor-pointer border-none"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          Send Reset Link
        </button>

        {/* Success message — reserved slot so layout doesn't shift */}
        <div className="h-[20px] flex items-center mt-2">
          {showSuccess && (
            <p
              className="text-[12px] leading-[16px] text-[#007860]"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Reset link sent! Check your email.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
