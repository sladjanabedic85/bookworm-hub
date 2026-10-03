import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/_authenticated/members/")({
  head: () => ({
    meta: [
      { title: "Members — Shelfmark" },
      { name: "description", content: "All library members and their borrowed books." },
      { property: "og:title", content: "Members — Shelfmark" },
      { property: "og:description", content: "All library members and their borrowed books." },
    ],
  }),
  component: MembersPage,
});

function MembersPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, email, borrowings(id, returned)")
        .order("full_name");
      if (error) throw error;
      return data;
    },
  });

  return (
    <div>
      <h1 className="text-4xl font-semibold">Members</h1>
      <p className="mt-2 text-muted-foreground">Click a name to see the books they've borrowed.</p>
      <div className="mt-8 overflow-hidden rounded-2xl border bg-card shadow-soft">
        {isLoading && <p className="p-6 text-muted-foreground">Loading members…</p>}
        {error && <p className="p-6 text-destructive">{(error as Error).message}</p>}
        {data?.length === 0 && <p className="p-6 text-muted-foreground">No members yet.</p>}
        <ul className="divide-y">
          {data?.map((m) => {
            const active = m.borrowings.filter((b) => !b.returned).length;
            return (
              <li key={m.id}>
                <Link
                  to="/members/$userId"
                  params={{ userId: m.id }}
                  className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-muted"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary font-display font-semibold">
                    {(m.full_name || "?").charAt(0).toUpperCase()}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold">{m.full_name || "Unnamed"}</span>
                    <span className="block truncate text-sm text-muted-foreground">{m.email}</span>
                  </span>
                  <span className="hidden text-right text-sm sm:block">
                    <span className="font-semibold">{m.borrowings.length}</span> total ·{" "}
                    <span className="text-accent-foreground">{active} on loan</span>
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
