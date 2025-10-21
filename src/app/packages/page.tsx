import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Pricing from '@/components/sections/pricing';

export default function PackagesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
