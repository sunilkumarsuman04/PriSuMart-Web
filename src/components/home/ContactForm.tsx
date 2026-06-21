import { useState, type FormEvent } from 'react';
import { HiOutlineCheckCircle } from 'react-icons/hi2';
import { Button } from '../ui/Button';

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Frontend-only placeholder: wire this up to an email service or API later.
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  if (isSubmitted) {
    return (
      <div
        role="status"
        className="flex flex-col items-center justify-center text-center gap-3 py-12 px-6 rounded-2xl bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800"
      >
        <HiOutlineCheckCircle className="text-5xl text-brand-600 dark:text-brand-400" />
        <h3 className="text-xl font-bold text-ink-900 dark:text-cream-50">Message sent</h3>
        <p className="text-ink-800/70 dark:text-cream-50/65 max-w-sm">
          Thanks for reaching out — our team will get back to you shortly.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-sm font-semibold text-brand-700 dark:text-brand-300 mt-2 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" aria-label="Contact form">
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-semibold text-ink-900 dark:text-cream-50">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Riya Sharma"
            className="px-4 py-3 rounded-xl border border-ink-900/10 dark:border-white/15 bg-white dark:bg-ink-900 text-ink-900 dark:text-cream-50 placeholder:text-ink-800/35 dark:placeholder:text-cream-50/30 focus:border-brand-500 outline-none transition-colors min-h-[44px]"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-semibold text-ink-900 dark:text-cream-50">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="riya@example.com"
            className="px-4 py-3 rounded-xl border border-ink-900/10 dark:border-white/15 bg-white dark:bg-ink-900 text-ink-900 dark:text-cream-50 placeholder:text-ink-800/35 dark:placeholder:text-cream-50/30 focus:border-brand-500 outline-none transition-colors min-h-[44px]"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="subject" className="text-sm font-semibold text-ink-900 dark:text-cream-50">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          placeholder="What's this about?"
          className="px-4 py-3 rounded-xl border border-ink-900/10 dark:border-white/15 bg-white dark:bg-ink-900 text-ink-900 dark:text-cream-50 placeholder:text-ink-800/35 dark:placeholder:text-cream-50/30 focus:border-brand-500 outline-none transition-colors min-h-[44px]"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-semibold text-ink-900 dark:text-cream-50">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us how we can help..."
          className="px-4 py-3 rounded-xl border border-ink-900/10 dark:border-white/15 bg-white dark:bg-ink-900 text-ink-900 dark:text-cream-50 placeholder:text-ink-800/35 dark:placeholder:text-cream-50/30 focus:border-brand-500 outline-none transition-colors resize-none"
        />
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} fullWidth>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
