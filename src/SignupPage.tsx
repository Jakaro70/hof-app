import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const imgHofLogo081 = "/assets/0d7138b821fa15025bca7445992da4ef29f5285a.png";
const imgVector  = "/assets/4c0e321225041af84e98a5a9f1c013b990207b52.svg";
const imgVector1 = "/assets/1f4ff79064d7508de26b59656008213bba72627b.svg";
const imgVector2 = "/assets/dfd31394dec09ae1598d16bd1462dbeb4ec8b49d.svg";
const imgVector3 = "/assets/db96862c00befee5c41229a2d940bfd9bb560726.svg";
const imgIcon    = "/assets/708783aaa16d578d9324e6ffb53d14107965561a.svg";

function Checkbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex items-center justify-center w-[48px] h-[48px] cursor-pointer bg-transparent border-none p-0 shrink-0"
      aria-checked={checked}
      role="checkbox"
    >
      <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full">
        <div
          className={`w-[18px] h-[18px] rounded-[2px] flex items-center justify-center ${
            checked ? 'bg-[#006b56]' : 'border-2 border-[#3f4945]'
          }`}
        >
          {checked && (
            <img alt="" src={imgIcon} className="w-[12px] h-[9.4px]" />
          )}
        </div>
      </div>
    </button>
  );
}

/** Floating-label input field matching M3 outlined text field */
function FloatingLabelInput({
  label,
  type = 'text',
  hint,
}: {
  label: string;
  type?: string;
  hint?: string;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  const floated = focused || value.length > 0;

  return (
    <div className="w-full">
      <div
        className={`relative rounded-[4px] border h-[56px] transition-colors duration-150 ${
          focused ? 'border-[#007860] border-2' : 'border-[#6f7975] border'
        }`}
      >
        {/* Floating label */}
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
            // When floated, sit on the border line and have a white bg gap
            background: floated ? 'white' : 'transparent',
            paddingLeft: floated ? '4px' : '0',
            paddingRight: floated ? '4px' : '0',
          }}
        >
          {label}
        </label>

        <input
          type={type}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={e => setValue(e.target.value)}
          className="absolute inset-0 w-full h-full bg-transparent outline-none border-none px-4 pt-4 text-[16px] text-black"
          style={{ fontFamily: 'Roboto, sans-serif', letterSpacing: '0.5px' }}
        />
      </div>
      {hint && (
        <p
          className="text-[12px] leading-[16px] text-[#6f7975] mt-1"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          {hint}
        </p>
      )}
    </div>
  );
}

export default function SignupPage() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [legalExpanded, setLegalExpanded] = useState(false);

  return (
    <div className="w-[390px] min-h-screen bg-white overflow-hidden">

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 pt-2 pb-1 text-[12px] text-black h-[37px]">
        <span className="font-normal">Tsel</span>
        <span>100%</span>
      </div>

      {/* Content */}
      <div className="px-8 pt-8">
        {/* Title */}
        <h1
          className="text-[36px] leading-[44px] font-normal text-[#007860] mb-0"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          Signup
        </h1>

        {/* Subtitle */}
        <p
          className="text-[14px] leading-[20px] tracking-[0.25px] text-black mt-4 mb-6"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          Enter your information to get started
        </p>

        {/* Email field — floating label */}
        <FloatingLabelInput label="Email" type="email" />

        <div className="mt-4" />

        {/* Password field — floating label */}
        <FloatingLabelInput
          label="Password"
          type="password"
          hint="Must be at least 8 characters"
        />

        <div className="mt-4" />

        {/* Terms checkbox + read more */}
        <div className="flex items-start gap-0 mb-4">
          <Checkbox checked={agreed} onChange={() => setAgreed(!agreed)} />
          <div className="pt-[14px]">
            <p
              className="text-[14px] leading-[19px] tracking-[-0.28px]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <span className="text-[#322d2d]">I agree to  the </span>
              <button
                type="button"
                className="text-[#006b56] bg-transparent border-none cursor-pointer p-0 text-[14px] leading-[19px]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Terms
              </button>
              <span className="text-[#322d2d]"> and </span>
              <button
                type="button"
                className="text-[#006b56] bg-transparent border-none cursor-pointer p-0 text-[14px] leading-[19px]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Privacy Policy
              </button>
            </p>

            {/* Read more — directly below the checkbox text */}
            <div className="mt-1">
              {legalExpanded && (
                <p
                  className="text-[12px] leading-[16px] text-[#5b5757] mb-1"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  By agreeing to the above terms, you are consenting that your
                  personal information will be collected, stored, and processed in
                  the United States and the European Union on behalf of Hof
                  Properties, Inc.
                </p>
              )}
              <button
                type="button"
                onClick={() => setLegalExpanded(v => !v)}
                className="text-[12px] leading-[16px] text-[#006b56] bg-transparent border-none cursor-pointer p-0"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                {legalExpanded ? 'read less' : 'read more'}
              </button>
            </div>
          </div>
        </div>

        {/* Continue button */}
        <button
          onClick={() => navigate('/register-confirmed')}
          className="w-full h-[41px] bg-[#006b56] rounded-[10px] text-white text-[14px] leading-[20px] tracking-[0.1px] font-medium cursor-pointer border-none"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          Continue
        </button>

        {/* Signup with Google */}
        <button
          className="w-full h-[40px] border border-[#006b56] rounded-[10px] text-[#006b56] text-[14px] leading-[20px] tracking-[0.1px] font-medium mt-3 cursor-pointer bg-white flex items-center justify-center gap-3"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          <div className="relative w-[24px] h-[24px]">
            <img alt="" className="absolute inset-0 w-full h-full" src={imgVector} />
            <img alt="" className="absolute inset-0 w-full h-full" src={imgVector1} />
            <img alt="" className="absolute inset-0 w-full h-full" src={imgVector2} />
            <img alt="" className="absolute inset-0 w-full h-full" src={imgVector3} />
          </div>
          Signup with Google
        </button>

        {/* Already a member */}
        <p
          className="text-center text-[12px] leading-[16px] text-black mt-6"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          Already a member?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-[#007860] bg-transparent border-none cursor-pointer p-0 text-[12px]"
            style={{ fontFamily: 'Roboto, sans-serif' }}
          >
            Login
          </button>
        </p>
      </div>

      {/* HOF logo bottom */}
      <div className="flex justify-center mt-8 pb-6">
        <img alt="HOF" src={imgHofLogo081} className="h-[24px] w-[70px] object-contain" />
      </div>
    </div>
  );
}
