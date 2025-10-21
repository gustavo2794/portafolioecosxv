'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/projects', label: 'Proyectos' },
  { href: '/gallery', label: 'Galería' },
  { href: '/packages', label: 'Paquetes' },
  { href: '/ai-recommender', label: 'Recomendador AI' },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary bg-black/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex flex-1 items-center justify-start">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="sr-only">Menú Principal</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 pt-6">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="text-foreground/80 transition-colors hover:text-foreground text-lg py-2"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 justify-center">
          <Link href="/" className="flex items-center">
            {/* The "E" logo has been removed as per the user's request, the watermark remains */}
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end">
            <Button asChild variant="outline" size="sm">
                <Link href="/packages">Cotiza Aquí</Link>
            </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
