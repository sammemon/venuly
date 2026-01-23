import Footer from '@/components/Footer';
import HomeClient from '@/components/HomeClient';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <HomeClient />
      </div>
      <Footer />
    </div>
  );
}
