import { Container } from '../components/ui/Primitives';
import { SITE } from '../data/site';

export function PrivacyPolicyPage() {
  return (
    <main id="main-content" className="pt-28 sm:pt-32 pb-20">
      <Container className="max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-ink-900 dark:text-cream-50 mb-3">Privacy Policy</h1>
        <p className="text-sm text-ink-800/55 dark:text-cream-50/50 mb-10">Last updated: June 2026</p>

        <div className="prose-section flex flex-col gap-6 text-ink-800/80 dark:text-cream-50/75 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-ink-900 dark:text-cream-50 mb-2">1. Information We Collect</h2>
            <p>
              When you use {SITE.name}, we may collect information you provide directly, such as your name, email
              address, phone number, and delivery address, along with order history and payment details processed
              through secure third-party gateways.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-ink-900 dark:text-cream-50 mb-2">2. How We Use Your Information</h2>
            <p>
              We use collected information to process orders, provide customer support, improve our services, and
              communicate updates about your account or deliveries.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-ink-900 dark:text-cream-50 mb-2">3. Data Sharing</h2>
            <p>
              We do not sell your personal data. We share information only with delivery partners and payment
              processors as necessary to fulfil your orders, and as required by law.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-ink-900 dark:text-cream-50 mb-2">4. Data Security</h2>
            <p>
              We use industry-standard encryption and security practices to protect your information from
              unauthorised access, alteration, or disclosure.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-ink-900 dark:text-cream-50 mb-2">5. Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal data at any time by contacting
              us at {SITE.email}.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-ink-900 dark:text-cream-50 mb-2">6. Contact Us</h2>
            <p>
              For questions about this policy, reach out to us at {SITE.email} or {SITE.phone}.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
