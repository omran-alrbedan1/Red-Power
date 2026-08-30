import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center gap-5 px-6 py-20">
      <p className="text-sm uppercase tracking-[0.35em] text-zinc-400">404</p>
      <h1 className="max-w-2xl text-4xl font-semibold text-white">
        The page you requested was not found.
      </h1>
      <p className="max-w-xl text-zinc-400">
        This foundation is being rebuilt phase by phase for the new Red Power
        Garage public website.
      </p>
      <Link
        href="/ar"
        className="inline-flex w-fit rounded-full border border-red-700/60 bg-red-700/15 px-5 py-3 text-sm font-medium text-white transition hover:border-red-500 hover:bg-red-700/25"
      >
        Return to homepage
      </Link>
    </section>
  );
}
