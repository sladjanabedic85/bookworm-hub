import { createFileRoute, Link } from "@tanstack/react-router";
import { BookPlus, Users, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shelfmark — Library Book Borrowing" },
      { name: "description", content: "Record borrowed books and see who has what, member by member." },
      { property: "og:title", content: "Shelfmark — Library Book Borrowing" },
      { property: "og:description", content: "Record borrowed books and see who has what, member by member." },
    ],
  }),
  component: Index,
});

const features = [
  { icon: BookPlus, title: "Record a loan", text: "Log the title, author and due date in seconds." },
  { icon: Users, title: "Browse members", text: "See every reader and how many books they hold." },
  { icon: ShieldCheck, title: "Secure accounts", text: "Register and sign in to manage your own loans." },
];

function Index() {
  const { user } = useAuth();
  return (
    <div className="space-y-16">
      <section className="bg-hero overflow-hidden rounded-2xl px-6 py-16 text-primary-foreground shadow-soft sm:px-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">Community library</p>
        <h1 className="mt-3 max-w-2xl text-4xl font-semibold leading-tight sm:text-6xl">
          Every book, every borrower, one tidy shelf.
        </h1>
        <p className="mt-5 max-w-xl text-lg opacity-85">
          Shelfmark keeps track of who borrowed what and when it's due back.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" variant="secondary">
            <Link to={user ? "/borrow" : "/auth"}>
              {user ? "Borrow a book" : "Get started"} <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="ghost" className="hover:bg-primary-foreground/10 hover:text-primary-foreground">
            <Link to="/members">View members</Link>
          </Button>
        </div>
      </section>
      <section className="grid gap-5 sm:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="rounded-xl border bg-card p-6 shadow-soft">
            <f.icon className="h-6 w-6 text-accent" />
            <h3 className="mt-4 text-xl font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
