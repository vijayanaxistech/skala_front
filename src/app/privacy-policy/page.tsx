import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PrivacyPolicy | Suvarnakala Pvt. Ltd',
};

const PrivacyPolicy = () => {
  return (
    <div className=" p-5 max-w-4xl mx-auto bg-light  rounded-lg p-8 text-justify">
      <h1 className="text-3xl font-bold text-gray-900 fraunces mb-6">Privacy Policy</h1>

      <section className="mb-8">
        <p className="text-dark mb-4">
          Suvarnakala Pvt. Ltd. respects your privacy. This Privacy Policy outlines how your data is
          collected and used. By accessing the services provided by suvarnakala.com, you agree to
          the collection and use of your data as described in this Privacy Policy. If you have
          questions or concerns, please contact us at{' '}
          <a href="mailto:sales@suvarnakala.com" className="text-blue-600 hover:underline fraunces">
            sales@suvarnakala.com
          </a>
          .
        </p>
        <p className="text-dark ">
          This policy does not apply to entities or individuals not managed, owned, or controlled by
          Suvarnakala Pvt. Ltd.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 fraunces">Our Commitment</h2>
        <p className="text-dark">We aim to:</p>
        <ul className="list-disc list-inside text-dark mb-4">
          <li>Ensure you feel at ease while using our websites.</li>
          <li>Build confidence in sharing information with us.</li>
          <li>Make you aware that you can contact us with privacy concerns.</li>
          <li>
            Inform you that using our websites implies agreement to data collection as outlined.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 fraunces">
          Information We Collect
        </h2>
        <p className="text-dark mb-4">
          We collect details provided during registration, information from your use of our
          services, and visits to our website or linked sites. We do not access or store your
          Payment Card details (e.g., credit/debit card number, expiration date, CVV). These are
          securely transmitted to your card issuer for authorization.
        </p>
        <p className="text-dark mb-4">
          Additional information may be collected from promotions, contests, feedback, or profile
          forms. We monitor traffic patterns and website usage to improve our services. Only
          necessary and relevant information is collected.
        </p>
        <p className="text-dark mb-4">Automatically collected anonymous information includes:</p>
        <ul className="list-disc list-inside text-dark mb-4">
          <li>Computer-identification information</li>
          <li>IP address</li>
          <li>Domain server</li>
          <li>Type of computer and web browser</li>
        </ul>
        <p className="text-dark mb-4">Personally identifiable information may include:</p>
        <ul className="list-disc list-inside text-dark mb-4">
          <li>First and last name</li>
          <li>Email addresses</li>
          <li>Contact details (phone numbers, PIN/ZIP code)</li>
          <li>Demographic profile (age, gender, occupation, education, address)</li>
          <li>Personal preferences and interests</li>
          <li>Opinions on our services, products, and features</li>
        </ul>
        <p className="text-dark">
          We also track pages visited, links clicked, items added to bag or wishlist, and other
          websites opened simultaneously.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 fraunces">
          How We Collect Information
        </h2>
        <p className="text-dark mb-4">
          Anonymous traffic information is collected when you visit our website. Personally
          identifiable information is collected during registration, guest checkout, online surveys,
          or contests. Required information includes name, email, date of birth, gender,
          billing/delivery address, PIN code, and mobile number.
        </p>
        <p className="text-dark">
          We use this information to contact you about services, fulfill orders, and process
          payments. We are the sole owners of the information collected.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 fraunces">
          How We Use Your Information
        </h2>
        <p className="text-dark mb-4">Contact information is used to send:</p>
        <ul className="list-disc list-inside text-dark mb-4">
          <li>Password reminders and registration confirmations</li>
          <li>Special offers</li>
          <li>Changes in service policies or terms of use</li>
          <li>Order information, renewal notices, invites, and reminders</li>
        </ul>
        <p className="text-dark mb-4">Personal information is used to:</p>
        <ul className="list-disc list-inside text-dark mb-4">
          <li>Enhance personalized features</li>
          <li>Contact you for account-related matters</li>
          <li>Deliver requested services (e.g., merchandise)</li>
          <li>Preserve social history as required by law</li>
        </ul>
        <p className="text-dark">
          Anonymous traffic information helps us deliver personalized services, manage website
          functionality, and understand user behavior.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 fraunces">
          Who We Share Information With
        </h2>
        <p className="text-dark mb-4">
          We do not share or rent your information with third parties except our agents and alliance
          partners, such as shipping companies and payment processors, who use it only to fulfill
          orders. Alliance partners may use email addresses to confirm deliveries or offer related
          services.
        </p>
        <p className="text-dark">
          We may disclose information if required by law, to investigate illegal activities, or with
          your permission to provide requested products or services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 fraunces">Cookies</h2>
        <p className="text-dark mb-4">
          We use session and persistent cookies to enhance security and user experience. Session
          cookies expire when you close your browser, while persistent cookies store preferences
          like username and interests. You can reject cookies, but this may limit website
          functionality. Cookies do not contain personal information unless you provide it.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 fraunces">Security</h2>
        <p className="text-dark mb-4">
          We follow industry standards to protect your information during transmission and storage,
          but no method is 100% secure. Our servers are password-protected and accessible only to
          authorized personnel. Information is shared on a need-to-know basis to complete
          transactions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 fraunces">
          Managing Your Information
        </h2>
        <p className="text-dark mb-4">
          You can update or correct your information online or by emailing{' '}
          <a href="mailto:sales@suvarnakala.com" className="text-blue-600 hover:underline fraunces">
            sales@suvarnakala.com
          </a>
          . To terminate your account, email us with “Please close my suvarnakala.com account” in
          the subject line. Your account will be disabled within 2 working days, though information
          may remain in our archives.
        </p>
        <p className="text-dark">
          You can opt-out of marketing communications via “My Account” or by contacting us.
          Service-related communications are mandatory and cannot be opted out.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 fraunces">Policy Updates</h2>
        <p className="text-dark">
          We may update this policy, with changes posted on our website. Material changes will be
          notified on the homepage or other appropriate places. Information use will remain
          consistent with the policy under which it was collected.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 fraunces">Contact Us</h2>
        <p className="text-dark">
          For questions or feedback, contact Suvarnakala Pvt. Ltd. at{' '}
          <a href="mailto:sales@suvarnakala.com" className="text-blue-600 hover:underline fraunces">
            sales@suvarnakala.com
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
