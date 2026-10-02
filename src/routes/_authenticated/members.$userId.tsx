import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/members/$userId")({
  head: () => ({
    meta: [
      { title: "Member loans — Shelfmark" },
      { name: "description", content: "Books borrowed by this library member." },
      { property: "og:title", content: "Member loans — Shelfmark" },
      { property: "og:description", content: "Books borrowed by this library member." },
    ],
  }),
  component: MemberDetail,
});

function MemberDetail() {
  const { userId } = Route.useParams();
  const { user } = Route.useRouteContext();
  const qc = useQueryClient();
  const isMe = user.id === userId;

  const { data, isLoading } = useQuery({
    queryKey: ["member", userId],
    queryFn: async () => {
      const [p, b] = await Promise.all([
        supabase.from("profiles").select("full_name, email").eq("id", userId).maybeSingle(),
        supabase.from("borrowings").select("*").eq("user_id", userId).order("borrowed_at", { ascending: false }),
      ]);
      if (p.error) throw p.error;
      if (b.error) throw b.error;
      return { profile: p.data, books: b.data };
    },
  });

  async function toggleReturned(id: string, returned: boolean) {
    const { error } = await supabase.from("borrowings").update({ returned: !returned }).eq("id", id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries();
  }
  async function remove(id: string) {
    const { error } = await supabase.from("borrowings").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Loan removed");
    qc.invalidateQueries();
  }

  const todayStr = new Date().toISOString().slice(0, 10);

  return (
    <div>
      <Link to="/members" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All members
      </Link>
      {isLoading ? (
        <p className="mt-6 text-muted-foreground">Loading…</p>
      ) : !data?.profile ? (
        <p className="mt-6">Member not found.</p>
      ) : (
        <>
          <h1 className="mt-4 text-4xl font-semibold">{data.profile.full_name}</h1>
          <p className="mt-1 text-muted-foreground">{data.profile.email}</p>
          <div className="mt-8 overflow-hidden rounded-2xl border bg-card shadow-soft">
            {data.books.length === 0 ? (
              <p className="p-6 text-muted-foreground">No books borrowed yet.</p>
            ) : (
              <ul className="divide-y">
                {data.books.map((b) => {
                  const overdue = !b.returned && b.due_date && b.due_date < todayStr;
                  return (
                    <li key={b.id} className="flex flex-wrap items-center gap-4 px-6 py-4">
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-lg font-semibold">{b.book_title}</p>
                        <p className="text-sm text-muted-foreground">
                          {b.author || "Unknown author"} · borrowed {b.borrowed_at}
                          {b.due_date && ` · due ${b.due_date}`}
                        </p>
                      </div>
                      {b.returned ? (
                        <Badge variant="secondary">Returned</Badge>
                      ) : overdue ? (
                        <Badge variant="destructive">Overdue</Badge>
                      ) : (
                        <Badge>On loan</Badge>
                      )}
                      {isMe && (
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" onClick={() => toggleReturned(b.id, b.returned)}>
                            {b.returned ? "Mark on loan" : "Mark returned"}
                          </Button>
                          <Button size="icon" variant="ghost" aria-label="Delete loan" onClick={() => remove(b.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}
