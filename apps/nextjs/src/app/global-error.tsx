"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md text-center">
            <h1 className="text-6xl font-bold text-destructive">Error</h1>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
              Something went wrong!
            </h2>
            <p className="mt-4 text-muted-foreground">
              An unexpected error occurred. Please try again.
            </p>
            <button
              onClick={reset}
              className="mt-6 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}