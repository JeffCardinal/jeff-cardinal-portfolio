import { ReactNode } from 'react';
 
export default function Header({ children }: { children: ReactNode }) {
  return (
    <div className="lg:visible md:visible invisible overflow-hidden flex bg-sky-400 text-center items-center justify-center p-4 text-2xl absolute inset-x-0 top-0">
      { children }
    </div>
  );
};
