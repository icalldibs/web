import type { Metadata } from "next";
import { LegalHeader } from "@/components/legal-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Dibs",
  description: "How Dibs collects, uses, and protects information in the Dibs alpha.",
};

const sections = [
  ["information-we-collect", "Information We Collect"],
  ["how-we-use-information", "How We Use Information"],
  ["ai-processing", "AI Processing"],
  ["text-messaging-and-imessage", "Text Messaging and iMessage"],
  ["follow-up-messages", "Follow-Up Messages"],
  ["how-we-share-information", "How We Share Information"],
  ["cookies-and-similar-technologies", "Cookies and Similar Technologies"],
  ["analytics-and-product-events", "Analytics and Product Events"],
  ["ip-addresses-and-technical-information", "IP Addresses and Technical Information"],
  ["how-dibs-protects-your-information", "How Dibs Protects Your Information"],
  ["your-information-and-your-choices", "Your Information and Your Choices"],
  ["childrens-privacy", "Children's Privacy"],
  ["third-party-services", "Third-Party Services"],
  ["data-retention", "Data Retention"],
  ["changes-to-this-privacy-policy", "Changes to This Privacy Policy"],
  ["contact-dibs", "Contact Dibs"],
] as const;

function Contents() {
  return (
    <nav className="privacy-contents" aria-label="Privacy policy sections">
      <p>On this page</p>
      <ol>
        {sections.map(([id, title]) => <li key={id}><a href={`#${id}`}>{title}</a></li>)}
      </ol>
    </nav>
  );
}

export default function PrivacyPage() {
  return (
    <div className="privacy-page">
      <LegalHeader />
      <main id="main-content">
        <div className="privacy-hero">
          <p className="privacy-eyebrow">Privacy</p>
          <h1>Your privacy matters.</h1>
          <div className="privacy-intro">
            <p>Dibs is built around a simple idea: you should be able to text what you want and let Dibs handle the rest.</p>
            <p>This Privacy Policy explains what information Dibs collects, how we use it, how we share it, and the choices available to you when you use Dibs.</p>
          </div>
          <p className="privacy-updated">Last updated: <time dateTime="2026-08-16">August 16, 2026</time></p>
        </div>

        <div className="privacy-layout">
          <Contents />
          <article className="privacy-policy">
            <section id="information-we-collect">
              <h2><span>1.</span> Information We Collect</h2>
              <p>Dibs collects information needed to operate the marketplace and provide the services you ask for.</p>
              <p>Depending on how you use Dibs, this may include:</p>
              <h3>Phone number and account information</h3>
              <p>When you sign up through the Dibs website or use Dibs through iMessage, we may collect your phone number in international format or an iMessage email address.</p>
              <p>For web accounts, Dibs may also collect information such as your name, email address, city or Miami-area location, account timestamps, internal account identifiers, acquisition source, and related account information.</p>
              <p>For iMessage users, Dibs may collect your phone number or iMessage email address, conversation-space information, internal user identifiers, onboarding status, onboarding timestamps, and messaging-provider identifiers.</p>
              <h3>Messages and conversations</h3>
              <p>Dibs stores messages exchanged with Dibs and, where applicable, messages exchanged between buyers and sellers through Dibs.</p>
              <p>This can include:</p>
              <ul><li>messages you send to Dibs</li><li>Dibs-generated responses</li><li>buyer and seller messages</li><li>relayed messages</li><li>timestamps</li><li>message identifiers</li><li>conversation associations</li><li>AI conversation history</li><li>AI tool results and assistant responses</li></ul>
              <p>Your messages may contain information that you choose to provide.</p>
              <h3>Marketplace listings</h3>
              <p>If you use Dibs to sell something, Dibs may collect information about the item, including:</p>
              <ul><li>title</li><li>description</li><li>price</li><li>condition</li><li>category</li><li>city or area</li><li>photos</li><li>item details such as size, dimensions, material, defects, included items, or packaging information when you provide them</li><li>listing status and timestamps</li></ul>
              <p>Photos uploaded to Dibs are stored as provided. Photos may contain metadata embedded in the original file, including metadata that could potentially contain device or location information.</p>
              <h3>Public listing information</h3>
              <p>When you publish a listing, information such as the listing title, description, price, condition, city or area, photos, and listing status may be publicly visible.</p>
              <p>Public listing pages do not expose your phone number or email address.</p>
              <p>Dibs may also include listing information and the first listing photo in social-sharing previews.</p>
              <h3>Searches and requests</h3>
              <p>When you use Dibs through the website, Dibs receives the natural-language request you submit. This may include the product you want, a budget, a city or area, or anything else you choose to include.</p>
              <p>Ordinary web search requests are not explicitly saved to Dibs&apos; database as search-history records.</p>
              <p>Requests sent through iMessage are different: they become part of your Dibs conversation history and may be processed by Dibs&apos; AI systems.</p>
              <h3>Deal information</h3>
              <p>Dibs does not process payments.</p>
              <p>However, when buyers and sellers interact through Dibs, Dibs may store information associated with marketplace activity, such as:</p>
              <ul><li>buyer and seller identifiers</li><li>listing and conversation identifiers</li><li>agreed prices</li><li>descriptions of what happened</li><li>deal status</li><li>confidence information</li><li>timestamps</li><li>evidence derived from messages</li></ul>
              <p>Dibs may automatically analyze messages for signals suggesting that a deal may have occurred.</p>
              <h3>Payment information</h3>
              <p>Dibs does not currently collect:</p>
              <ul><li>credit or debit card numbers</li><li>bank account details</li><li>payment credentials</li><li>in-app payment transaction records</li></ul>
              <p>Buyers and sellers arrange payment and meetups themselves.</p>
            </section>

            <section id="how-we-use-information">
              <h2><span>2.</span> How We Use Information</h2>
              <p>We use information to operate Dibs and provide the marketplace experience you ask for.</p><p>This includes:</p>
              <ul><li>sending and receiving messages</li><li>responding to requests</li><li>helping you find products</li><li>helping you sell products</li><li>understanding your requests</li><li>showing relevant marketplace information</li><li>helping buyers and sellers communicate</li><li>operating listings and conversations</li><li>detecting potential marketplace activity</li><li>preventing abuse and misuse</li><li>maintaining and troubleshooting the service</li><li>improving Dibs</li></ul>
              <p>For example, if you text Dibs:</p><blockquote>“find me a PS5 under $300”</blockquote>
              <p>Dibs may process that message to understand what you want and return relevant marketplace information.</p>
              <p>If you send Dibs a photo of something you want to sell, Dibs may process the image and accompanying information to understand what you are selling and help you create or manage a listing.</p>
            </section>

            <section id="ai-processing">
              <h2><span>3.</span> AI Processing</h2><p>AI is a core part of Dibs.</p>
              <p>Dibs uses OpenAI to process certain information needed to understand requests, search marketplace information, generate responses, and make contextual product decisions.</p>
              <p>Depending on the interaction, information sent to OpenAI may include:</p>
              <ul><li>the current message</li><li>recent conversation history</li><li>previous assistant messages</li><li>tool results</li><li>listing titles and descriptions</li><li>prices</li><li>cities</li><li>item conditions</li><li>listing status</li><li>marketplace search results</li><li>seller draft information</li><li>information used to evaluate whether a follow-up message is appropriate</li></ul>
              <p>Dibs does not intentionally include your phone number, email address, or name in the structured information sent to OpenAI.</p>
              <p>In the current Dibs implementation, listing photo bytes are not sent to OpenAI as part of the AI request.</p>
              <p>However, if you voluntarily include personal information in the text you send to Dibs, that information may be processed by OpenAI as part of your message.</p>
              <p>Dibs does not use your conversations to train AI models.</p>
            </section>

            <section id="text-messaging-and-imessage">
              <h2><span>4.</span> Text Messaging and iMessage</h2><p>Dibs is a text-first product.</p>
              <p>Your phone number is used so Dibs can communicate with you through iMessage.</p><p>Dibs uses Photon/Spectrum to provide iMessage functionality.</p>
              <p>This means Photon/Spectrum may process information necessary to deliver the messaging service, including:</p>
              <ul><li>phone number or iMessage email address</li><li>incoming and outgoing messages</li><li>attachments and attachment metadata</li><li>message identifiers</li><li>timestamps</li><li>conversation-space information</li><li>delivery and failure information</li></ul>
              <p>Apple also processes iMessage communications under Apple&apos;s own terms and privacy practices.</p>
              <p>Dibs may send messages in response to requests you make and may send contextual follow-up messages when the product determines that a follow-up is appropriate.</p>
              <p>Dibs does not use your phone number to send unrelated third-party advertising.</p>
            </section>

            <section id="follow-up-messages">
              <h2><span>5.</span> Follow-Up Messages</h2><p>Dibs may sometimes schedule a follow-up when a conversation appears to need one.</p><p>To support this feature, Dibs may store:</p>
              <ul><li>relevant inbound and outbound message identifiers</li><li>your Dibs user identifier</li><li>conversation-space information</li><li>follow-up type and stage</li><li>scheduled and processing status</li><li>the AI-generated decision about whether a follow-up should be sent</li><li>a short reason for that decision</li><li>follow-up message text</li><li>delivery information</li><li>attempt information</li></ul>
              <p>The purpose of this information is to operate Dibs&apos; contextual follow-up functionality.</p>
            </section>

            <section id="how-we-share-information">
              <h2><span>6.</span> How We Share Information</h2><p>Dibs may share information with service providers that help us operate Dibs.</p><p>These providers currently include:</p>
              <dl><dt>Supabase</dt><dd>Used for Dibs&apos; database and listing-photo storage.</dd><dt>OpenAI</dt><dd>Used for AI processing of messages, conversation context, marketplace information, and follow-up decisions.</dd><dt>Photon/Spectrum</dt><dd>Used to provide iMessage functionality and process the messaging information required to deliver that service.</dd><dt>Apple</dt><dd>Apple provides the underlying iMessage service and processes iMessage communications under Apple&apos;s own policies.</dd><dt>Vercel</dt><dd>Dibs may use Vercel for website hosting and network delivery where applicable.</dd></dl>
              <p>These providers receive information as necessary to provide the services they perform for Dibs.</p><p>Dibs may also disclose information when reasonably necessary to:</p>
              <ul><li>comply with applicable law</li><li>respond to valid legal requests</li><li>prevent fraud or abuse</li><li>protect Dibs, users, or others</li><li>enforce applicable agreements</li><li>protect the security of the service</li></ul>
              <p>Dibs does not sell your personal information for money.</p>
            </section>

            <section id="cookies-and-similar-technologies">
              <h2><span>7.</span> Cookies and Similar Technologies</h2><p>Dibs uses a small number of first-party cookies to operate accounts, understand how people discover Dibs, and measure basic product activity.</p><p>These may include cookies used for:</p>
              <ul><li>authenticated sessions</li><li>pseudonymous visitor identification</li><li>attribution</li><li>identifying the listing from which a visit originated</li><li>recording acquisition source</li></ul>
              <p>These cookies are first-party cookies.</p><p>The current Dibs website does not use Google Analytics, Meta Pixel, PostHog, Mixpanel, Hotjar, or similar third-party browser analytics products.</p><p>Dibs does not currently use browser localStorage or sessionStorage.</p>
            </section>

            <section id="analytics-and-product-events">
              <h2><span>8.</span> Analytics and Product Events</h2><p>Dibs records limited first-party product events to understand how the product is being used and to improve it.</p><p>Events may include:</p>
              <ul><li>listing views</li><li>listing contact actions</li><li>share-link generation</li><li>account activation</li><li>onboarding events</li><li>first iMessage events</li><li>buyer/seller conversation activity</li><li>deal signals</li></ul><p>Depending on the event, this may include:</p>
              <ul><li>event name</li><li>timestamp</li><li>internal user identifier</li><li>listing identifier</li><li>conversation identifier</li><li>pseudonymous visitor identifier</li><li>acquisition information</li><li>limited marketplace metadata</li></ul>
              <p>Dibs does not currently use third-party browser analytics platforms such as Google Analytics, Meta Pixel, PostHog, Mixpanel, or Hotjar.</p>
            </section>

            <section id="ip-addresses-and-technical-information">
              <h2><span>9.</span> IP Addresses and Technical Information</h2><p>Dibs may process technical request information for purposes such as abuse prevention and rate limiting.</p>
              <p>For example, Dibs may temporarily use an IP address associated with a request to limit repeated onboarding or public-event requests.</p>
              <p>Dibs&apos; application-level rate-limiting system keeps these values temporarily in memory rather than writing them to the Dibs database.</p>
              <p>Infrastructure providers used by Dibs may independently maintain network, access, or security logs according to their own systems and policies.</p>
            </section>

            <section id="how-dibs-protects-your-information">
              <h2><span>10.</span> How Dibs Protects Your Information</h2><p>Dibs takes reasonable measures to protect information used by the service against unauthorized access, loss, misuse, alteration, or disclosure.</p>
              <p>These measures include technical and operational controls used to protect Dibs&apos; accounts, database, messaging infrastructure, and application systems.</p><p>No internet service can guarantee complete security.</p>
              <p>If we become aware of a security incident affecting your information, we will take appropriate steps as required by applicable law.</p>
            </section>

            <section id="your-information-and-your-choices">
              <h2><span>11.</span> Your Information and Your Choices</h2><p>You control what you choose to send to Dibs.</p><p>You do not need to provide information that is not necessary for the request you are making.</p>
              <p>If you have a question about personal information associated with your use of Dibs, you can contact us at:</p><p><a href="mailto:yutish@dibs.chat">yutish@dibs.chat</a></p><p>We will handle privacy requests in accordance with applicable law.</p>
            </section>

            <section id="childrens-privacy">
              <h2><span>12.</span> Children&apos;s Privacy</h2><p>Dibs is intended for people who are at least 16 years old.</p><p>Dibs does not knowingly provide the service to children under 16.</p>
              <p>If you believe a person under 16 has provided personal information to Dibs, please contact us at:</p><p><a href="mailto:yutish@dibs.chat">yutish@dibs.chat</a></p>
            </section>

            <section id="third-party-services">
              <h2><span>13.</span> Third-Party Services</h2><p>Dibs relies on third-party infrastructure to operate parts of the service.</p><p>These currently include services such as:</p>
              <ul><li>Supabase</li><li>OpenAI</li><li>Photon/Spectrum</li><li>Apple</li><li>Vercel, where applicable</li></ul><p>Each third-party service may have its own privacy practices and terms.</p>
              <p>This Privacy Policy describes how Dibs handles information within its own service. It does not control the independent privacy practices of third-party services.</p>
            </section>

            <section id="data-retention">
              <h2><span>14.</span> Data Retention</h2><p>Dibs retains information for as long as it is reasonably necessary to operate the service, provide the features you use, maintain marketplace records, protect the service, resolve disputes, enforce agreements, and comply with applicable legal obligations.</p>
              <p>Different types of information may be retained for different periods.</p><p>Dibs does not currently promise a fixed deletion period for all information.</p>
            </section>

            <section id="changes-to-this-privacy-policy">
              <h2><span>15.</span> Changes to This Privacy Policy</h2><p>We may update this Privacy Policy as Dibs evolves.</p><p>When we make changes, we will update the “Last updated” date at the top of this page.</p>
              <p>If we make a material change to how we handle personal information, we will take reasonable steps to provide appropriate notice.</p>
            </section>

            <section id="contact-dibs">
              <h2><span>16.</span> Contact Dibs</h2><p>Questions about privacy?</p><p>We&apos;d rather you ask.</p><p>Email:</p><p className="privacy-email"><a href="mailto:yutish@dibs.chat">yutish@dibs.chat</a></p>
            </section>
          </article>
        </div>

        <aside className="privacy-closing" aria-label="Our privacy commitment">
          <p>Dibs is built to handle the everyday stuff.<br />We try to handle your information with the same care.</p>
        </aside>
      </main>
      <SiteFooter currentPage="privacy" />
    </div>
  );
}