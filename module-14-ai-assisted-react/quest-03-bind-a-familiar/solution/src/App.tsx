import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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

const KINDS = ["owl", "cat", "raven", "fox"] as const;

type FamiliarKind = (typeof KINDS)[number];

interface Binding {
  id: string;
  name: string;
  kind: FamiliarKind;
}

export default function App() {
  const [name, setName] = useState("");
  const [kind, setKind] = useState<FamiliarKind>("owl");
  const [bindings, setBindings] = useState<Binding[]>([]);
  const [pendingUnbind, setPendingUnbind] = useState<Binding | null>(null);

  function handleBind(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    setBindings((current) => [
      ...current,
      { id: `b-${Date.now()}`, name: trimmed, kind },
    ]);
    setName("");
    setKind("owl");
  }

  function confirmUnbind() {
    if (!pendingUnbind) return;
    setBindings((current) =>
      current.filter((binding) => binding.id !== pendingUnbind.id),
    );
    setPendingUnbind(null);
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-2xl font-semibold">Familiar bindings</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Form, table, dialog — composed from primitives in this repo. The Bind
        button uses the Academy <code>arcane</code> variant.
      </p>

      <form
        className="mt-8 grid gap-4 rounded-lg border bg-card p-6 sm:grid-cols-3"
        onSubmit={handleBind}
      >
        <div className="grid gap-2 sm:col-span-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Archimedes"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="kind">Kind</Label>
          <select
            id="kind"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={kind}
            onChange={(event) => setKind(event.target.value as FamiliarKind)}
          >
            {KINDS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <Button type="submit" variant="arcane" className="w-full">
            Bind
          </Button>
        </div>
      </form>

      <div className="mt-8">
        {bindings.length === 0 ? (
          <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
            No familiars bound yet.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Kind</TableHead>
                <TableHead className="text-right"> </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bindings.map((binding) => (
                <TableRow key={binding.id}>
                  <TableCell className="font-medium">{binding.name}</TableCell>
                  <TableCell className="capitalize">{binding.kind}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setPendingUnbind(binding)}
                    >
                      Unbind
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog
        open={pendingUnbind !== null}
        onOpenChange={(open) => {
          if (!open) setPendingUnbind(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unbind this familiar?</DialogTitle>
            <DialogDescription>
              {pendingUnbind
                ? `${pendingUnbind.name} the ${pendingUnbind.kind} will leave the ledger.`
                : ""}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setPendingUnbind(null)}>
              Keep
            </Button>
            <Button variant="destructive" onClick={confirmUnbind}>
              Unbind
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
