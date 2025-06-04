import React from 'react';

interface AuthPageLayoutProps {
  children: React.ReactNode;
  title?: string; // Optional title for the auth section
  // You could add a prop for a logo or brand element here if needed
  // logo?: React.ReactNode;
}

const AuthPageLayout: React.FC<AuthPageLayoutProps> = ({ children, title }) => {
  console.log("Rendering AuthPageLayout");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Optional: Placeholder for a logo or brand name */}
        {/* 
        {logo && <div className="mx-auto h-12 w-auto">{logo}</div>}
        */}
        {title && (
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {title}
          </h2>
        )}
        {/* The main content, typically a Card with a Form, will be passed as children */}
        {children}
      </div>
    </div>
  );
};

export default AuthPageLayout;