import { ReactNode } from 'react';
 
export default function Header({ children }: { children: ReactNode }) {
  return (
    <div className="lg:visible md:visible invisible overflow-hidden flex text-center items-center justify-center p-4 text-2xl absolute inset-x-0 top-0 z-10">
      { children }
    </div>
  );
};
