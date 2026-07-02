import { useNavigate } from 'react-router-dom';

const imgImage = "/assets/34914eb2dc76bd5020d200328b914071d1610284.png";
const imgHofLogo07 = "/assets/135b877b3f995a59183303464ed046ada7ed5317.png";

export default function SplashPage() {
  const navigate = useNavigate();

  return (
    <div className="relative w-[390px] h-screen overflow-hidden bg-white">
      {/* Background photo */}
      <img
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={imgImage}
      />

      {/* Status bar */}
      <div className="relative flex items-center justify-between px-4 pt-3 text-[12px] text-white h-[37px]">
        <span className="font-normal">Tsel</span>
        <span>100%</span>
      </div>

      {/* Logo + tagline */}
      <div className="absolute top-[161px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <img
          alt="HOF"
          src={imgHofLogo07}
          className="h-[58px] w-[171px] object-contain"
        />
        <p
          className="text-white text-[16px] leading-[24px] tracking-[0.15px] font-bold whitespace-nowrap"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          No More Watching Sports Alone
        </p>
      </div>

      {/* Buttons */}
      <div className="absolute bottom-[152px] left-0 right-0 flex flex-col items-center gap-4 px-8">
        <button
          onClick={() => navigate('/login')}
          className="w-full h-[40px] bg-[#006b56] rounded-[10px] text-white text-[14px] leading-[20px] tracking-[0.1px] font-bold cursor-pointer border-none"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          Login
        </button>
        <button
          onClick={() => navigate('/signup')}
          className="w-full h-[40px] border border-white rounded-[10px] text-white text-[14px] leading-[20px] tracking-[0.1px] font-bold cursor-pointer bg-transparent"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          Sign up
        </button>
      </div>
    </div>
  );
}
