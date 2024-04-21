import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gray-500 text-white p-4 z-30">
      <div className="container mx-auto">
        <p className="text-center">&copy; 2024 Institut Teknologi Bandung. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
