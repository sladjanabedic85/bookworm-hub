import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_authenticated/borrow")({
  head: () => ({
    meta: [
      { title: "Borrow a book — Shelfmark" },
      { name: "description", content: "Record a new book loan in the library." },
      { property: "og:title", content: "Borrow a book — Shelfmark" },
      { property: "og:description", content: "Record a new book loan in the library." },
    ],
  }),
  component: BorrowPage,
});

const today = () => new Date().toISOString().slice(0, 10);
const inTwoWeeks = () => new Date(Date.now() + 14 * 864e5).toISOString().slice(0, 10);

function BorrowPage() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [borrowedAt, setBorrowedAt] = useState(today());
  const [due, setDue] = useState(inTwoWeeks());
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) { toast.error("Please enter a book title"); return; }
    if (due < borrowedAt) { toast.error("Due date must be after the borrow date"); return; }
    setBusy(true);
    const { error } = await supabase.from("borrowings").insert({
      user_id: user.id,
      book_title: title.trim().slice(0, 200),
      author: author.trim().slice(0, 120),
      borrowed_at: borrowedAt,
      due_date: due,
    });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success(`"${title}" recorded`);
    qc.invalidateQueries();
    navigate({ to: "/members/$userId", params: { userId: user.id } });
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-4xl font-semibold">Borrow a book</h1>
      <p className="mt-2 text-muted-foreground">Fill in the details of the book you're taking home.</p>
      <form onSubmit={submit} className="mt-8 space-y-5 rounded-2xl border bg-card p-8 shadow-soft">
        <div className="space-y-2">
          <Label htmlFor="title">Book title</Label>
          <Input id="title" required maxLength={200} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. The Name of the Rose" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author">Author</Label>
          <Input id="author" maxLength={120} value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="e.g. Umberto Eco" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="borrowed">Borrowed on</Label>
            <Input id="borrowed" type="date" required value={borrowedAt} onChange={(e) => setBorrowedAt(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="due">Due back</Label>
            <Input id="due" type="date" required value={due} onChange={(e) => setDue(e.target.value)} />
          </div>
        </div>
        <Button type="submit" size="lg" className="w-full" disabled={busy}>
          {busy ? "Saving…" : "Save loan"}
        </Button>
      </form>
    </div>
  );
}
