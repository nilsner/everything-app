import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-4 mt-auto">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Nils Rocks. Don't steal it, but please use it!</p>
      </div>
    </footer>
  );
};

export default Footer;
