import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ProjectShowcase from '@/components/sections/project-showcase';

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ProjectShowcase />
      </main>
      <Footer />
    </div>
  );
}
