<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Data access uses the browser Supabase client with RLS (authenticated users read all profiles/borrowings, write only their own); protected pages live under src/routes/_authenticated. Why: simple app, RLS enforces ownership.
- App data/auth use the user's own external Supabase project via src/lib/supabase.ts (not the managed client). Why: user chose their own database.
