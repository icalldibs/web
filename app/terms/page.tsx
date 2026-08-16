import type { Metadata } from "next";
import Link from "next/link";
import { LegalHeader } from "@/components/legal-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Terms of Service — Dibs",
  description: "The terms that govern access to and use of the Dibs alpha.",
};

const sections = [
  ["accepting-these-terms", "Accepting These Terms"],
  ["who-can-use-dibs", "Who Can Use Dibs"],
  ["what-dibs-does", "What Dibs Does"],
  ["ai-generated-information", "AI-Generated Information"],
  ["buying-products", "Buying Products"],
  ["selling-products", "Selling Products"],
  ["marketplace-transactions", "Marketplace Transactions"],
  ["communications-and-relay", "Communications and Relay"],
  ["text-messages", "Text Messages"],
  ["user-content", "User Content"],
  ["prohibited-uses", "Prohibited Uses"],
  ["third-party-services-and-links", "Third-Party Services and Links"],
  ["no-warranties", "No Warranties"],
  ["limitation-of-liability", "Limitation of Liability"],
  ["indemnification", "Indemnification"],
  ["suspension-and-termination", "Suspension and Termination"],
  ["changes-to-dibs", "Changes to Dibs"],
  ["changes-to-these-terms", "Changes to These Terms"],
  ["privacy", "Privacy"],
  ["governing-law-and-disputes", "Governing Law and Disputes"],
  ["general-terms", "General Terms"],
  ["contact", "Contact"],
] as const;

function Contents() {
  return (
    <nav className="privacy-contents" aria-label="Terms of Service sections">
      <p>On this page</p>
      <ol>
        {sections.map(([id, title]) => <li key={id}><a href={`#${id}`}>{title}</a></li>)}
      </ol>
    </nav>
  );
}

export default function TermsPage() {
  return (
    <div className="privacy-page">
      <LegalHeader currentPage="terms" />
      <main id="main-content">
        <div className="privacy-hero terms-hero">
          <p className="privacy-eyebrow">Legal</p>
          <h1>Terms of Service</h1>
          <p className="privacy-updated">Last updated: <time dateTime="2026-08-16">August 16, 2026</time></p>
          <div className="privacy-intro">
            <p>These Terms of Service govern your access to and use of Dibs, including the Dibs website and text-messaging experience.</p>
          </div>
        </div>

        <div className="privacy-layout">
          <Contents />
          <article className="privacy-policy">
            <section id="accepting-these-terms">
              <h2><span>1.</span> Accepting These Terms</h2>
              <p>By accessing or using Dibs—including by submitting a phone number, interacting with Dibs through text messages, using the website, or otherwise using the service—you agree to these Terms and the <Link href="/privacy">Privacy Policy</Link>.</p>
              <p>If you do not agree, do not use Dibs.</p>
              <p>These Terms apply to the current Dibs alpha. Dibs is an early-access product, and these Terms may evolve as the service evolves.</p>
            </section>

            <section id="who-can-use-dibs">
              <h2><span>2.</span> Who Can Use Dibs</h2>
              <p>You must be at least 16 years old to use Dibs. You must provide accurate information, must not impersonate another person, and must not use Dibs for fraudulent purposes.</p>
              <p>Dibs may restrict or terminate access if it reasonably believes that someone is violating these Terms or abusing the service.</p>
            </section>

            <section id="what-dibs-does">
              <h2><span>3.</span> What Dibs Does</h2>
              <p>Dibs is an AI-powered marketplace that helps people buy and sell products. Dibs can help you discover products and nearby listings, evaluate product and pricing information, estimate what a product may be worth, identify potential buyers or sellers, and communicate with people involved in a possible transaction.</p>
              <p>Dibs may interact with you through text messaging and may help relay communications when appropriate.</p>
              <p>Dibs is an intermediary technology layer. Unless Dibs explicitly says otherwise for a particular transaction, Dibs is not the seller, buyer, owner, manufacturer, shipper, or payment processor for products you discover through the service.</p>
            </section>

            <section id="ai-generated-information">
              <h2><span>4.</span> AI-Generated Information</h2>
              <p>Dibs uses artificial intelligence to analyze information and generate responses, recommendations, estimates, summaries, and other assistance. This can make buying and selling easier, but AI outputs may be incomplete, inaccurate, outdated, or wrong.</p>
              <p>You should independently verify information that matters before buying or selling something. Dibs does not guarantee that:</p>
              <ul>
                <li>a product exists or a listing is still available;</li>
                <li>a seller or buyer is legitimate;</li>
                <li>a price or estimated value is accurate;</li>
                <li>a product is authentic or in the condition described;</li>
                <li>a transaction will happen or another person will respond; or</li>
                <li>a product will be delivered.</li>
              </ul>
              <p>Dibs is an intelligent assistant, not a guarantee of every marketplace fact or outcome.</p>
            </section>

            <section id="buying-products">
              <h2><span>5.</span> Buying Products</h2>
              <p>Dibs can help you discover products and potential sellers. Unless Dibs explicitly states otherwise for a particular transaction, Dibs does not itself sell the product. The actual transaction may occur directly between a buyer and seller or through another platform or payment method.</p>
              <p>Before buying, you are responsible for reviewing:</p>
              <ul>
                <li>the product&apos;s condition, authenticity, and price;</li>
                <li>the seller&apos;s identity;</li>
                <li>shipping or pickup and payment arrangements;</li>
                <li>return or refund arrangements; and</li>
                <li>any other terms of the transaction.</li>
              </ul>
              <p>Dibs is not responsible for a seller&apos;s conduct or for the product itself.</p>
            </section>

            <section id="selling-products">
              <h2><span>6.</span> Selling Products</h2>
              <p>You may use Dibs to help sell products you own. You are responsible for having the legal right to sell anything you submit to Dibs.</p>
              <p>You must provide truthful information about a product, including its condition and material facts that would reasonably affect a buyer&apos;s decision. You must not use Dibs to sell illegal, stolen, counterfeit, dangerous, or otherwise prohibited goods.</p>
              <p>Dibs may remove or restrict listings, requests, or interactions that violate these Terms or create safety, legal, or trust concerns.</p>
            </section>

            <section id="marketplace-transactions">
              <h2><span>7.</span> Marketplace Transactions</h2>
              <p>Dibs does not currently process payments, hold user funds, provide escrow, guarantee transactions, or guarantee delivery. If Dibs introduces any such feature, it will say so explicitly and additional terms may apply.</p>
              <p>Dibs is not a party to every transaction that users discover or arrange through the service. Unless Dibs explicitly states otherwise, any agreement between a buyer and seller is between those parties.</p>
              <p>Use reasonable caution when meeting strangers, sending money, sharing personal information, receiving products, or arranging pickup or delivery.</p>
            </section>

            <section id="communications-and-relay">
              <h2><span>8.</span> Communications and Relay</h2>
              <p>Dibs may communicate with users through text messages. If you ask Dibs to connect you with another person, Dibs may facilitate or relay communications between the relevant people as part of the service.</p>
              <p>You must not use Dibs to harass, threaten, impersonate, spam, scam, or otherwise abuse another person. You are responsible for communications you initiate through Dibs.</p>
              <p>Dibs may restrict or terminate relay functionality when reasonably necessary to protect users, prevent abuse, or comply with law.</p>
            </section>

            <section id="text-messages">
              <h2><span>9.</span> Text Messages</h2>
              <p>By providing a phone number and using Dibs&apos; texting experience, you understand that Dibs may send service-related text messages about onboarding, marketplace activity, requested interactions, responses, and the operation of the Dibs service.</p>
              <p>You should provide only a phone number that you own or are authorized to use. Message and data rates imposed by your carrier may apply. You can stop using the texting experience at any time.</p>
            </section>

            <section id="user-content">
              <h2><span>10.</span> User Content</h2>
              <p>“User Content” means product photos, product descriptions, messages, listings, information, and other material you submit to Dibs.</p>
              <p>You retain ownership of your User Content. You give Dibs a limited license to host, process, analyze, transmit, display, and use that content only as reasonably necessary to operate, maintain, secure, and improve the service and to fulfill your requests.</p>
              <p>You represent that you have the rights needed to submit your User Content and allow Dibs to use it for those limited purposes. This license ends when the content is no longer reasonably needed for those purposes, subject to reasonable technical retention and legal obligations.</p>
            </section>

            <section id="prohibited-uses">
              <h2><span>11.</span> Prohibited Uses</h2>
              <p>You may not use Dibs to:</p>
              <ul>
                <li>break the law, commit fraud, scam another person, or facilitate an unlawful transaction;</li>
                <li>sell stolen, counterfeit, illegal, dangerous, or prohibited goods;</li>
                <li>impersonate, harass, threaten, or spam another person;</li>
                <li>submit someone else&apos;s phone number without authorization;</li>
                <li>send malicious code or interfere with Dibs;</li>
                <li>attempt unauthorized access to Dibs or related systems;</li>
                <li>scrape or extract Dibs data abusively;</li>
                <li>reverse engineer the service, except where applicable law expressly permits it; or</li>
                <li>abuse the texting or relay system.</li>
              </ul>
              <p>Dibs may also prohibit conduct that materially threatens the security, integrity, safety, or legitimate operation of the service.</p>
            </section>

            <section id="third-party-services-and-links">
              <h2><span>12.</span> Third-Party Services and Links</h2>
              <p>Dibs may rely on third-party technology, messaging, AI, infrastructure, marketplace, website, and other service providers. Dibs is not responsible for third-party services it does not control.</p>
              <p>If Dibs links to or helps you interact with another platform, that platform&apos;s own terms and policies may also apply. A link or integration does not mean Dibs controls or guarantees that third party.</p>
            </section>

            <section id="no-warranties">
              <h2><span>13.</span> No Warranties</h2>
              <p>To the extent permitted by law, Dibs is provided on an “as is” and “as available” basis. Dibs does not guarantee that the service will always be available, accurate, error-free, secure, complete, or uninterrupted.</p>
              <p>Nothing in these Terms excludes warranties or rights that cannot legally be excluded, including mandatory consumer protections that apply to you.</p>
            </section>

            <section id="limitation-of-liability">
              <h2><span>14.</span> Limitation of Liability</h2>
              <p>To the maximum extent permitted by applicable law, Dibs will not be liable for indirect, incidental, special, consequential, or punitive damages, or for lost profits, arising from or relating to the service.</p>
              <p>This includes losses connected with marketplace transactions between users, products bought or sold through the service, inaccurate AI outputs, third-party services, or user communications.</p>
              <p>To the maximum extent permitted by law, Dibs&apos; total aggregate liability for all claims arising from or relating to the service will not exceed the amount you paid Dibs for the service during the 12 months before the event giving rise to the claim or, if you paid nothing, US $100.</p>
              <p>These limitations do not apply to liability that cannot legally be limited or excluded.</p>
            </section>

            <section id="indemnification">
              <h2><span>15.</span> Indemnification</h2>
              <p>To the extent permitted by law, you agree to indemnify and hold harmless Dibs and the people who operate it from third-party claims, losses, and reasonable costs arising from your violation of these Terms, misuse of Dibs, User Content, unlawful conduct, or transactions or interactions with other users.</p>
              <p>This obligation applies only to the extent the claim was caused by your conduct and does not require you to indemnify Dibs for its own unlawful conduct.</p>
            </section>

            <section id="suspension-and-termination">
              <h2><span>16.</span> Suspension and Termination</h2>
              <p>Dibs may suspend or terminate access when reasonably necessary, including because of a violation of these Terms, fraud, abuse, a security threat, illegal activity, misuse of messaging or relay functionality, or behavior that threatens other users or Dibs.</p>
              <p>You may stop using Dibs at any time. Provisions that by their nature should survive termination will survive, including provisions about intellectual property, disclaimers, limitations of liability, indemnification, and disputes.</p>
            </section>

            <section id="changes-to-dibs">
              <h2><span>17.</span> Changes to Dibs</h2>
              <p>Dibs is an evolving alpha product. Features may change, be removed, or be introduced, and Dibs may modify or discontinue parts of the service. These Terms do not promise permanent access to any feature.</p>
            </section>

            <section id="changes-to-these-terms">
              <h2><span>18.</span> Changes to These Terms</h2>
              <p>Dibs may update these Terms as the service and applicable requirements evolve. If a change is material, Dibs will communicate it in a reasonable manner before it takes effect where required.</p>
              <p>The updated Terms will display a new “Last updated” date. Your continued use after updated Terms take effect means you accept them; if you do not agree, you should stop using Dibs.</p>
            </section>

            <section id="privacy">
              <h2><span>19.</span> Privacy</h2>
              <p>The <Link href="/privacy">Privacy Policy</Link> explains how Dibs collects, uses, stores, and shares personal information. Please read it when deciding whether to use Dibs.</p>
            </section>

            <section id="governing-law-and-disputes">
              <h2><span>20.</span> Governing Law and Disputes</h2>
              <p>These Terms are governed by applicable law, except to the extent that applicable law requires otherwise. Any dispute arising from or relating to Dibs will be handled in accordance with applicable law and any mandatory consumer protections that apply to you.</p>
              <p>Before starting formal proceedings, you and Dibs are encouraged to try to resolve the issue informally by contacting Dibs.</p>
            </section>

            <section id="general-terms">
              <h2><span>21.</span> General Terms</h2>
              <p><strong>Severability.</strong> If a provision of these Terms is found unenforceable, the remaining provisions will continue in effect, and the affected provision will be enforced to the fullest extent permitted by law.</p>
              <p><strong>Waiver.</strong> A failure to enforce a provision is not a waiver of the right to enforce it later.</p>
              <p><strong>Assignment.</strong> You may not transfer these Terms or your rights under them without Dibs&apos; consent. Dibs may transfer these Terms as part of a reorganization, financing, merger, acquisition, or transfer of the service, subject to applicable law.</p>
              <p><strong>Entire agreement.</strong> These Terms and the Privacy Policy are the entire agreement between you and Dibs concerning the service, except where additional terms are presented for a specific feature.</p>
              <p><strong>Force majeure.</strong> Dibs is not responsible for delay or failure caused by events reasonably beyond its control.</p>
              <p><strong>Interpretation.</strong> Section headings are for convenience. “Including” means “including without limitation,” and these Terms will not be interpreted against either party merely because that party drafted them.</p>
              <p>The Dibs service, including its software, branding, and original content other than User Content, belongs to Dibs or its licensors and is protected by applicable intellectual-property laws.</p>
            </section>

            <section id="contact">
              <h2><span>22.</span> Contact</h2>
              <p>For questions about these Terms, contact Dibs at:</p>
              <p className="privacy-email"><a href="mailto:yutish@dibs.chat">yutish@dibs.chat</a></p>
            </section>
          </article>
        </div>
      </main>
      <SiteFooter currentPage="terms" />
    </div>
  );
}