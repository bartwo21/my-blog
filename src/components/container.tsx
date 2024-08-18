export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[1400px] mx-auto border-l border-r border-zinc-800 bg-zinc-900 min-h-screen flex flex-col shadow-zinc-900 shadow-xl">
      {children}
    </div>
  );
}
