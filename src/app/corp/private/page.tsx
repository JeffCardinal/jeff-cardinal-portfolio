export default function PrivatePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#10151c] px-6 text-white">
      <section className="w-full max-w-xl rounded-2xl border border-purple-400/25 bg-[#15121e]/90 p-8 shadow-[0_0_30px_rgba(168,85,247,0.12)]">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-purple-300">
          Corp · Private
        </p>
        <h1 className="font-distancia text-3xl">You’re in.</h1>
        <p className="mt-4 text-purple-100/70">
          This page is protected by the corp session. Replace this starter content with the private content you want to add.
        </p>
      </section>
    </main>
  );
}
