"use client";

import { inquiryTypes } from "@/components/contact/ContactInformation";
import { Reveal } from "@/components/visual/motion";
import { AlertCircle, ArrowRight, Check, Loader2 } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type FormEvent, useId, useState } from "react";

type FormState = "idle" | "error" | "submitting" | "success";
type FieldName = "name" | "email" | "subject" | "message";
type Errors = Partial<Record<FieldName, string>>;

const initialForm = { name: "", email: "", subject: "", inquiryType: inquiryTypes[0], message: "" };

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const reduce = useReducedMotion();

  const validate = (): Errors => {
    const nextErrors: Errors = {};
    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!form.email.trim()) nextErrors.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Please enter a valid email.";
    if (!form.subject.trim()) nextErrors.subject = "Please enter a subject.";
    if (!form.message.trim()) nextErrors.message = "Please enter a message.";
    return nextErrors;
  };

  const update = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (state === "error") setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state === "submitting") return;
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) { setState("error"); return; }
    setState("submitting");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setState("success");
    setForm(initialForm);
    setErrors({});
  };

  const sendAnother = () => { setState("idle"); setErrors({}); };

  return <Reveal delay={0.12}><AnimatePresence mode="wait">{state === "success" ? <SuccessPanel reduce={reduce} onSendAnother={sendAnother} /> : <ContactFields form={form} errors={errors} state={state} onUpdate={update} onSubmit={handleSubmit} reduce={reduce} />}</AnimatePresence></Reveal>;
}

function ContactFields({ form, errors, state, onUpdate, onSubmit, reduce }: { form: typeof initialForm; errors: Errors; state: FormState; onUpdate: (field: keyof typeof initialForm, value: string) => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void; reduce: boolean | null }) {
  const disabled = state === "submitting";
  const id = useId();
  return <motion.form key="form" noValidate onSubmit={onSubmit} initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }} className="space-y-6 rounded-2xl border border-black/[0.08] bg-white p-6 sm:p-8 lg:p-10">
    <fieldset disabled={disabled} className="space-y-6 disabled:opacity-60"><div className="grid gap-6 sm:grid-cols-2"><TextField id={`${id}-name`} label="Name" value={form.name} onChange={(value) => onUpdate("name", value)} error={errors.name} placeholder="Your full name" /><TextField id={`${id}-email`} label="Email" type="email" value={form.email} onChange={(value) => onUpdate("email", value)} error={errors.email} placeholder="you@example.com" /></div><TextField id={`${id}-subject`} label="Subject" value={form.subject} onChange={(value) => onUpdate("subject", value)} error={errors.subject} placeholder="What&apos;s this about?" /><div><p id={`${id}-inquiry-label`} className="mb-3 text-sm font-semibold text-ink">Inquiry Type</p><div className="flex flex-wrap gap-2" role="group" aria-labelledby={`${id}-inquiry-label`}>{inquiryTypes.map((type) => <button key={type} type="button" onClick={() => onUpdate("inquiryType", type)} aria-pressed={form.inquiryType === type} className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${form.inquiryType === type ? "bg-ink text-white" : "bg-canvas text-mutedText hover:bg-black/[0.05] hover:text-ink"}`}>{type}</button>)}</div></div><MessageField id={`${id}-message`} value={form.message} onChange={(value) => onUpdate("message", value)} error={errors.message} /></fieldset>{state === "error" && Object.keys(errors).length > 0 && <div role="alert" className="flex items-center gap-2 rounded-lg bg-coral/10 px-4 py-3 text-sm text-coral"><AlertCircle className="h-4 w-4 shrink-0" />Please fill in all required fields correctly.</div>}<button type="submit" disabled={disabled} className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-indigo disabled:cursor-not-allowed sm:w-auto">{disabled ? <><Loader2 className="h-4 w-4 animate-spin" />Sending...</> : <>Send Message<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>}</button>
  </motion.form>;
}

function TextField({ id, label, value, onChange, error, placeholder, type = "text" }: { id: string; label: string; value: string; onChange: (value: string) => void; error?: string; placeholder: string; type?: "text" | "email" }) { return <div><label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink">{label}</label><input id={id} type={type} required value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className={`w-full rounded-lg border bg-canvas px-4 py-3 text-base text-ink placeholder:text-mutedText/60 transition-all focus:outline-none focus:ring-2 focus:ring-indigo ${error ? "border-coral" : "border-black/[0.1]"}`} />{error && <FieldError id={`${id}-error`} message={error} />}</div>; }

function MessageField({ id, value, onChange, error }: { id: string; value: string; onChange: (value: string) => void; error?: string }) { return <div><label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink">Message</label><textarea id={id} required rows={5} value={value} onChange={(event) => onChange(event.target.value)} placeholder="Tell us more..." aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className={`w-full resize-none rounded-lg border bg-canvas px-4 py-3 text-base text-ink placeholder:text-mutedText/60 transition-all focus:outline-none focus:ring-2 focus:ring-indigo ${error ? "border-coral" : "border-black/[0.1]"}`} />{error && <FieldError id={`${id}-error`} message={error} />}</div>; }

function FieldError({ id, message }: { id: string; message: string }) { return <p id={id} role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-coral"><AlertCircle className="h-4 w-4" />{message}</p>; }

function SuccessPanel({ reduce, onSendAnother }: { reduce: boolean | null; onSendAnother: () => void }) { return <motion.section key="success" initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? { opacity: 0 } : { opacity: 0, y: -20 }} className="flex min-h-[430px] flex-col items-center justify-center rounded-2xl border border-black/[0.08] bg-white p-8 text-center sm:p-12"><div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo/10"><Check className="h-8 w-8 text-indigo" /></div><h2 className="mt-6 font-display text-2xl font-bold tracking-tightest text-ink">Message sent.</h2><p className="mt-3 max-w-sm text-mutedText text-pretty">Thank you for reaching out. We&apos;ll get back to you soon.</p><button type="button" onClick={onSendAnother} className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo">Send Another<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button></motion.section>; }
