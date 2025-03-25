import { ReactNode } from 'react';
 
export default function Header({ children }: { children: ReactNode }) {
  return (
    <div className="lg:visible md:visible invisible overflow-hidden flex justify-end py-6 text-2xl absolute inset-x-0 top-0 z-10 space-x-6 pr-6">
      { children }
    </div>
  );
};
