import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const imgHofLogo05 = "/assets/fddd17df2f7f04ee5202c313a1ed487fa8bb982e.png";
const imgVector  = "/assets/6860447766f415577e88dc13f6a5a7de096bec8d.svg";
const imgVector1 = "/assets/65bd087735bf6b2f86d23fdabea0a5b36157ca33.svg";
const imgVector2 = "/assets/00e3b969b0adf4bac7bde8a5bfaf725346267f96.svg";
const imgVector3 = "/assets/d89124098a48a0a1de59feeee5ce9f91e328c5b3.svg";

function InputField({
  placeholder,
  type = 'text',
}: {
  placeholder: string;
  type?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div
      className={`relative rounded-[4px] h-[56px] flex items-center px-4 transition-colors duration-150 ${
        focused ? 'border-2 border-[#007860]' : 'border border-[#6f7975]'
      }`}
    >
      <input
        type={type}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent outline-none border-none text-[16px] leading-[24px] tracking-[0.5px] text-black placeholder:text-[#3f4945]"
        style={{ fontFamily: 'Roboto, sans-serif' }}
      />
    </div>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="w-[390px] min-h-screen bg-white overflow-hidden">

      {/* Status Bar */}
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
          Login
        </h1>

        {/* Subtitle */}
        <p
          className="text-[14px] leading-[20px] tracking-[0.25px] text-black mt-4 mb-6"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          Welcome back! Please enter your details
        </p>

        {/* Username field */}
        <div className="mb-4">
          <InputField placeholder="Username" type="text" />
        </div>

        {/* Password field */}
        <InputField placeholder="Password" type="password" />

        {/* Forget password */}
        <div className="flex justify-end mt-1">
          <button
            onClick={() => navigate('/forgot-password')}
            className="text-[12px] leading-[16px] text-[#006b56] bg-transparent border-none cursor-pointer p-0"
            style={{ fontFamily: 'Roboto, sans-serif' }}
          >
            Forget password?
          </button>
        </div>

        {/* Continue button */}
        <button
          onClick={() => navigate('/onboarding')}
          className="w-full h-[40px] bg-[#006b56] rounded-[10px] text-white text-[14px] leading-[20px] tracking-[0.1px] font-medium mt-6 cursor-pointer border-none"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          Continue
        </button>

        {/* Login with Google button */}
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
          Login with Google
        </button>

        {/* Sign up link */}
        <p
          className="text-center text-[12px] leading-[16px] text-black mt-6"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-[#007860] bg-transparent border-none cursor-pointer p-0 text-[12px]"
            style={{ fontFamily: 'Roboto, sans-serif' }}
          >
            sign up
          </button>
        </p>
      </div>

      {/* Background logo watermark */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[249px] h-[249px] opacity-30 pointer-events-none">
        <img alt="" className="w-full h-full object-contain" src={imgHofLogo05} />
      </div>
    </div>
  );
}
