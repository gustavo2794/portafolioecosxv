import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Pricing from '@/components/sections/pricing';
import PremiumAddOns from '@/components/sections/premium-add-ons';

export default function PackagesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Pricing />
        <PremiumAddOns />
      </main>
      <Footer />
    </div>
  );
}
