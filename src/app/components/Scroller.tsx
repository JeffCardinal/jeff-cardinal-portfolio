export default function Scroller({ pad=false, children }: { pad: boolean, children: React.ReactNode }) {
  return (
    <div className="bg-yellow-300 pt-8 pb-8 pr-[20px] h-12 flex items-center justify-center text-white">
      <span 
        className="w-full block text-4xl text-center text-black font-distancia"
        style={{ paddingTop: pad ? "5px" : "0px" }}
      > 
        {children} 
      </span>
    </div>
  );
};
