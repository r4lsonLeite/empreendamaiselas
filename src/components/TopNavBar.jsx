import { Link } from 'react-router-dom';

export default function TopNavBar() {
  return (
    <nav className="bg-surface/80 backdrop-blur-md fixed top-0 left-0 w-full z-50 flex justify-between items-center px-container-padding-mobile md:px-container-padding-desktop py-4 max-w-7xl mx-auto">
      <Link className="font-headline-md text-2xl font-bold text-primary" to="/">
        Empreenda Mais Elas
      </Link>
    </nav>
  );
}
