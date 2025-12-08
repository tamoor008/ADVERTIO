import '../index.css';
import '../App.css';
import '../styles/tokens.css';
import '../components/sections/sectionStyles.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import BookMeetingButton from '../components/ui/BookMeetingButton';

export default function App({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-white" style={{ backgroundColor: '#FFFFFF', background: '#FFFFFF' }}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
      <WhatsAppButton />
      <BookMeetingButton />
    </div>
  );
}
