import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ChoreographyCatalog from '@/components/sections/choreography-catalog';
import LuxurySection from '@/components/ui/luxury-section';

export default function GalleryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <LuxurySection>
            <ChoreographyCatalog />
        </LuxurySection>
      </main>
      <Footer />
    </div>
  );
}
