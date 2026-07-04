
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Pricing from '@/components/sections/pricing';
import PremiumAddOns from '@/components/sections/premium-add-ons';
import CustomPackageCTA from '@/components/sections/custom-package-cta';

export default function PackagesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Pricing />
        <PremiumAddOns />
        <CustomPackageCTA />
      </main>
      <Footer />
    </div>
  );
}
