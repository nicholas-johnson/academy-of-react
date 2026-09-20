import { FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FAMILIAR_KINDS,
  INITIAL_FAMILIARS,
  type Familiar,
  type FamiliarKind,
} from "@/data/familiars";

type KindFilter = "all" | FamiliarKind;

export default function App() {
  const [familiars, setFamiliars] = useState<Familiar[]>(INITIAL_FAMILIARS);
  const [filter, setFilter] = useState<KindFilter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(
    INITIAL_FAMILIARS[0]?.id ?? null,
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [kind, setKind] = useState<FamiliarKind>("owl");
  const [specialty, setSpecialty] = useState("");

  const visible = useMemo(
    () =>
      filter === "all"
        ? familiars
        : familiars.filter((familiar) => familiar.kind === filter),
    [familiars, filter],
  );

  const selected = familiars.find((familiar) => familiar.id === selectedId);

  function handleBind(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedSpecialty = specialty.trim();
    if (!trimmedName || !trimmedSpecialty) return;

    const next: Familiar = {
      id: `f-${Date.now()}`,
      name: trimmedName,
      kind,
      specialty: trimmedSpecialty,
      boundAt: "This evening",
    };

    setFamiliars((current) => [...current, next]);
    setSelectedId(next.id);
    setFilter("all");
    setName("");
    setKind("owl");
    setSpecialty("");
    setDialogOpen(false);
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-[hsl(230,35%,12%)] text-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[hsl(45,80%,72%)]">
            Arcane Academy · Phase 5
          </p>
          <h1 className="text-3xl font-semibold">The Familiar&apos;s Codex</h1>
          <p className="max-w-2xl text-sm text-white/70">
            A registry on the stack familiars already speak: React, TypeScript,
            Tailwind, and primitives that live in this repo. Read{" "}
            <code className="text-[hsl(45,80%,72%)]">src/components/ui/</code>{" "}
            the way you would read any other source file.
          </p>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl gap-6 px-6 py-8 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {(["all", ...FAMILIAR_KINDS] as KindFilter[]).map((kindOption) => (
                <Button
                  key={kindOption}
                  size="sm"
                  variant={filter === kindOption ? "default" : "outline"}
                  onClick={() => setFilter(kindOption)}
                >
                  {kindOption === "all" ? "All" : kindOption}
                </Button>
              ))}
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>Bind a familiar</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Bind a familiar</DialogTitle>
                  <DialogDescription>
                    Name, kind, and specialty. The familiar will not choose
                    these for you.
                  </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4" onSubmit={handleBind}>
                  <div className="grid gap-2">
                    <Label htmlFor="familiar-name">Name</Label>
                    <Input
                      id="familiar-name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Archimedes"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="familiar-kind">Kind</Label>
                    <select
                      id="familiar-kind"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={kind}
                      onChange={(event) =>
                        setKind(event.target.value as FamiliarKind)
                      }
                    >
                      {FAMILIAR_KINDS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="familiar-specialty">Specialty</Label>
                    <Input
                      id="familiar-specialty"
                      value={specialty}
                      onChange={(event) => setSpecialty(event.target.value)}
                      placeholder="Diff literacy"
                      required
                    />
                  </div>
                  <Button type="submit">Bind</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {visible.length === 0 ? (
            <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
              No familiars of that kind are bound. Try another filter, or bind
              one.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Kind</TableHead>
                  <TableHead>Specialty</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visible.map((familiar) => (
                  <TableRow
                    key={familiar.id}
                    data-state={
                      familiar.id === selectedId ? "selected" : undefined
                    }
                    className="cursor-pointer"
                    onClick={() => setSelectedId(familiar.id)}
                  >
                    <TableCell className="font-medium">{familiar.name}</TableCell>
                    <TableCell className="capitalize">{familiar.kind}</TableCell>
                    <TableCell>{familiar.specialty}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </section>

        <aside>
          {selected ? (
            <Card>
              <CardHeader>
                <CardTitle>{selected.name}</CardTitle>
                <CardDescription className="capitalize">
                  {selected.kind} · bound {selected.boundAt}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Specialty:</span>{" "}
                  {selected.specialty}
                </p>
                <p className="text-muted-foreground">
                  A familiar multiplies a wizard who already knows what they
                  want written.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No familiar selected</CardTitle>
                <CardDescription>
                  Choose a row, or bind a new familiar.
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </aside>
      </main>
    </div>
  );
}
