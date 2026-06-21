import { Container } from '../components/ui/Primitives';
import { SITE } from '../data/site';

export function TermsPage() {
  return (
    <main id="main-content" className="pt-28 sm:pt-32 pb-20">
      <Container className="max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-ink-900 dark:text-cream-50 mb-3">Terms & Conditions</h1>
        <p className="text-sm text-ink-800/55 dark:text-cream-50/50 mb-10">Last updated: June 2026</p>

        <div className="flex flex-col gap-6 text-ink-800/80 dark:text-cream-50/75 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-ink-900 dark:text-cream-50 mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing this website or using the {SITE.name} app, you agree to be bound by these Terms &
              Conditions. If you do not agree, please discontinue use of our services.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-ink-900 dark:text-cream-50 mb-2">2. Orders & Delivery</h2>
            <p>
              Delivery times shown (typically {SITE.deliveryWindow}) are estimates and may vary due to weather,
              traffic, or store availability. We make every reasonable effort to meet stated delivery windows.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-ink-900 dark:text-cream-50 mb-2">3. Pricing & Payments</h2>
            <p>
              Prices displayed are inclusive of applicable taxes unless stated otherwise and are subject to change
              without prior notice. Payments are processed securely through our payment partners.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-ink-900 dark:text-cream-50 mb-2">4. Returns & Refunds</h2>
            <p>
              If you receive damaged, expired, or incorrect items, contact our support team within 24 hours of
              delivery for a replacement or refund.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-ink-900 dark:text-cream-50 mb-2">5. User Conduct</h2>
            <p>
              You agree not to misuse the platform, including placing fraudulent orders or attempting to access
              accounts that are not your own.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-ink-900 dark:text-cream-50 mb-2">6. Limitation of Liability</h2>
            <p>
              {SITE.name} is not liable for indirect or consequential damages arising from use of our platform,
              to the extent permitted by applicable law.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-ink-900 dark:text-cream-50 mb-2">7. Contact</h2>
            <p>Questions about these terms can be sent to {SITE.email}.</p>
          </section>
        </div>
      </Container>
    </main>
  );
}
