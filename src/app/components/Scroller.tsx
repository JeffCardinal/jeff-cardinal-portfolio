export default function Scroller({ title }: { title: string }) {
  return (
    <div className="bg-yellow-300 pt-8 pb-8 pr-[20px] h-12 flex items-center justify-center text-white">
      <span className="w-full block text-4xl text-center text-black font-distancia pt-[5px]"> { title } </span>
    </div>
  );
};
