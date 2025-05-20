import { ReactNode } from 'react';
 
export default function Splash({ children, bgColor }: { children: ReactNode, bgColor: string }) {
  return (
    <div className={`flex h-dvh min-h-dvh ${bgColor} text-center items-center justify-center`}>
      { children }
    </div>
  );
};