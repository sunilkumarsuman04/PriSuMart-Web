import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { DownloadBanner } from './components/shared/DownloadBanner';
import { ScrollManager } from './components/shared/ScrollManager';

const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then((m) => ({ default: m.TermsPage })));
const ChatWidget = lazy(() => import('./chatbot/components/ChatWidget'));

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <Helmet>
            <title>PriSuMart — Fresh Groceries Delivered Fast</title>
          </Helmet>
          <ScrollManager />
          <Navbar />
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-and-conditions" element={<TermsPage />} />
            </Routes>
          </Suspense>
          <Footer />
          <DownloadBanner />
          <Suspense fallback={null}>
            <ChatWidget />
          </Suspense>
        </BrowserRouter>
        </MotionConfig>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
