import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ChoreographyCatalog from '@/components/sections/choreography-catalog';

export default function GalleryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ChoreographyCatalog />
      </main>
      <Footer />
    </div>
  );
}
