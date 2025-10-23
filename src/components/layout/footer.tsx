
import { Facebook, Instagram } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col items-center text-center">
          <Image
            src="https://res.cloudinary.com/drylg7prb/image/upload/v1761183133/Letra_E_Ecos_vikchj.png"
            alt="Logo Ecos del Sur"
            width={40}
            height={40}
            className="mb-3"
            style={{ width: 'auto', height: '40px' }}
          />
          <p className="max-w-md mx-auto text-muted-foreground text-sm mb-3">
            Creando momentos inolvidables, un baile a la vez.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="https://www.facebook.com/profile.php?id=100068861814273" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://www.instagram.com/ecosdelsur2025?igsh=MThteTByODM4OWN2bQ==" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
        <hr className="my-3 border-border" />
        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Compañia de Danza Ecos del Sur. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
