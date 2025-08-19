import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-prose space-y-6 p-3 py-6">
      <h1 className="text-center text-2xl font-bold">Terms of Service</h1>
      <p className="text-center text-sm text-muted-foreground">
        Effective Date: August 12, 2025
      </p>

      <p>
        Welcome to Dracarys Resume Builder AI. These Terms of Service (&quot;Terms&quot;)
        govern your access to and use of our website, applications, and services
        (collectively, the &quot;Service&quot;). By accessing or using the Service, you
        agree to be bound by these Terms. If you do not agree to them, you may
        not use the Service.
      </p>

      <h2 className="text-xl font-semibold">1. Service Overview</h2>
      <p>
        Dracarys Resume Builder AI is a web-based platform designed to help
        users create resumes using artificial intelligence. The Service is
        available through both a free tier and paid subscription plans (&quot;Paid
        Plans&quot;). Payment processing is securely handled by Stripe, our
        third-party provider.
      </p>

      <h2 className="text-xl font-semibold">2. Eligibility</h2>
      <p>
        You must be at least 18 years old and legally capable of entering into
        binding agreements to use the Service. By using the Service, you confirm
        that you meet this requirement.
      </p>

      <h2 className="text-xl font-semibold">3. Account Registration</h2>
      <p>
        Some features require creating an account. You agree to provide
        accurate, current, and complete information. You are solely responsible
        for safeguarding your account credentials. We are not liable for any
        loss or damage resulting from unauthorized account access.
      </p>

      <h2 className="text-xl font-semibold">4. Free Tier</h2>
      <p>
        The free tier offers limited access to basic resume-building features.
        Advanced tools, templates, and customization options may only be
        available under a Paid Plan.
      </p>

      <h2 className="text-xl font-semibold">5. Paid Subscription Plans</h2>
      <p>
        Upgrading to a Paid Plan requires providing payment details via Stripe.
        By subscribing, you agree to the following:
      </p>
      <ul className="list-inside list-disc">
        <li>
          <strong>Subscription Fees:</strong> Fees are billed on a recurring
          basis (monthly or annually), based on your selected plan. Prices may
          vary by region and are subject to change with advance notice.
        </li>
        <li>
          <strong>Payment Method:</strong> You must maintain a valid payment
          method. Subscriptions renew automatically unless canceled prior to the
          renewal date.
        </li>
        <li>
          <strong>Refunds:</strong> All payments are non-refundable. You may
          cancel at any time; access to Paid Plan features will continue until
          the end of the current billing period.
        </li>
      </ul>

      <h2 className="text-xl font-semibold">6. Cancelation</h2>
      <p>
        To cancel your subscription, log into your account and follow the
        cancellation process. Cancellations become effective at the end of the
        current billing cycle.
      </p>

      <h2 className="text-xl font-semibold">
        7. Changes to Service and Pricing
      </h2>
      <p>
        We may modify or discontinue any part of the Service at any time with or
        without notice. Pricing changes will not affect current subscriptions
        until renewal and will be communicated in advance.
      </p>

      <h2 className="text-xl font-semibold">8. License and Acceptable Use</h2>
      <p>
        We grant you a limited, non-exclusive, non-transferable, and revocable
        license to use the Service for personal or professional use in
        accordance with these Terms. You may not:
      </p>
      <ul className="list-inside list-disc">
        <li>Copy, modify, or distribute the Service or its content;</li>
        <li>
          Use the Service to develop or train competing tools or software;
        </li>
        <li>
          Bypass or interfere with the platform’s security or access controls.
        </li>
      </ul>

      <h2 className="text-xl font-semibold">9. Intellectual Property</h2>
      <p>
        All platform content, branding, and related intellectual property are
        owned by Dracarys or its licensors. You may not use our trademarks,
        logos, or content without prior written consent.
      </p>

      <h2 className="text-xl font-semibold">10. User Content</h2>
      <p>
        You retain ownership of all content you create using the Service,
        including resumes. By using the platform, you grant us a limited,
        non-exclusive, royalty-free license to store, display, and process your
        content solely to operate and improve the Service.
      </p>

      <h2 className="text-xl font-semibold">11. Privacy</h2>
      <p>
        Your use of the Service is subject to our Privacy Policy, which outlines
        how we collect, use, and safeguard your information. Please review it
        [insert link].
      </p>

      <h2 className="text-xl font-semibold">12. Third-Party Services</h2>
      <p>
        The Service may integrate with third-party tools (e.g., Stripe). We are
        not responsible for their content, policies, or practices.
      </p>

      <h2 className="text-xl font-semibold">13. Disclaimer of Warranties</h2>
      <p>
        The Service is provided “as is” and “as available.” We do not guarantee
        the accuracy of resume outputs, compatibility with job applications, or
        uninterrupted availability.
      </p>

      <h2 className="text-xl font-semibold">14. Limitation of Liability</h2>
      <p>
        To the extent permitted by law, Dracarys is not liable for any indirect,
        incidental, consequential, or special damages, including loss of data,
        revenue, or opportunities, arising from use of the Service.
      </p>

      <h2 className="text-xl font-semibold">15. Governing Law</h2>
      <p>
        These Terms shall be governed by the laws of [Insert Jurisdiction],
        without regard to its conflict of law provisions. Disputes will be
        subject to the exclusive jurisdiction of the courts in [Insert
        Location].
      </p>

      <h2 className="text-xl font-semibold">16. Changes to Terms</h2>
      <p>
        We may update these Terms from time to time. Changes will be posted here
        with an updated effective date. Continued use of the Service after
        changes take effect constitutes acceptance of the revised Terms.
      </p>

      <h2 className="text-xl font-semibold">17. Contact</h2>
      <p>
        For questions or concerns regarding these Terms, please contact us at
        [Insert Contact Email or Form Link].
      </p>

      <p>
        By using Dracarys Resume Builder AI, you acknowledge that you have read,
        understood, and agree to be bound by these Terms of Service.
      </p>
    </main>
  );
}
