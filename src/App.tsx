import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import SplashPage from './SplashPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import RegisterConfirmedPage from './RegisterConfirmedPage';
import SuccessPage from './SuccessPage';
import OnboardingPage from './OnboardingPage';
import HomePage from './HomePage';
import SearchResultsPage from './SearchResultsPage';
import EventDetailPage from './EventDetailPage';
import HostProfilePage from './HostProfilePage';
import MapPage from './MapPage';
import ChatsPage from './ChatsPage';
import ChatConversationPage from './ChatConversationPage';
import FavoritesPage from './FavoritesPage';
import FilterPage from './FilterPage';
import DiscoverPage from './DiscoverPage';
import PaymentPage from './PaymentPage';
import MyProfilePage from './MyProfilePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/register-confirmed" element={<RegisterConfirmedPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/search-results" element={<SearchResultsPage />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route path="/host/:id" element={<HostProfilePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/chats" element={<ChatsPage />} />
        <Route path="/chat/:id" element={<ChatConversationPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/filter" element={<FilterPage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/payment/:id" element={<PaymentPage />} />
        <Route path="/profile" element={<MyProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
