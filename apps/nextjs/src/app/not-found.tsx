import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-9xl font-bold text-muted-foreground">404</h1>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground">
          Page not found
        </h2>
        <p className="mt-4 text-muted-foreground">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}