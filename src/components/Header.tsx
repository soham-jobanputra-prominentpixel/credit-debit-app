import { cn } from "./ui/lib/utils.ts";

export default function Header() {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-white/10",
        "bg-black/20 backdrop-blur-md supports-[backdrop-filter]:bg-black/20",
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <h1
          className={cn(
            "text-2xl font-bold text-white",
            "flex-1 text-center md:text-left",
          )}
        >
          Credit Debit App
        </h1>
      </div>
    </header>
  );
}
