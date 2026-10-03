import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { BookOpen, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

const linkCls = "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground";
const activeCls = { className: "rounded-md px-3 py-2 text-sm font-semibold text-foreground bg-secondary" };

export function SiteHeader() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <header className="sticky top-0 z-30 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <BookOpen className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-semibold">Shelfmark</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-1">
          <Link to="/" className={linkCls} activeProps={activeCls} activeOptions={{ exact: true }}>Home</Link>
          <Link to="/borrow" className={linkCls} activeProps={activeCls}>Borrow a book</Link>
          <Link to="/members" className={linkCls} activeProps={activeCls}>Members</Link>
          {user ? (
            <Button variant="ghost" size="sm" onClick={signOut} className="ml-2">
              <LogOut className="h-4 w-4" /> Log out
            </Button>
          ) : (
            <Button asChild size="sm" className="ml-2">
              <Link to="/auth">Log in</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
