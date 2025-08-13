import Link from "next/link";

import { Button } from "@acme/ui/button";

import { getSession } from "~/auth/server";

export async function Nav() {
  const session = await getSession();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">TurboLearn</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Add search or other nav items here */}
          </div>
          <div className="flex items-center space-x-2">
            {session ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">Welcome, {session.user.name}</span>
                <form>
                  <Button
                    variant="outline" 
                    size="sm"
                    formAction={async () => {
                      "use server";
                      const { auth } = await import("~/auth/server");
                      const { headers } = await import("next/headers");
                      const { redirect } = await import("next/navigation");
                      
                      await auth.api.signOut({
                        headers: await headers(),
                      });
                      redirect("/");
                    }}
                  >
                    Sign Out
                  </Button>
                </form>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}