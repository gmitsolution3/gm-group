export default function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-dashed bg-muted/20 px-4 py-6 text-center">
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
