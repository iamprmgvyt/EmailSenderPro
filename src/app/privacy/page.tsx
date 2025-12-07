import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <main className="container mx-auto max-w-4xl py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            <strong>Last Updated: December 2nd, 2025</strong>
          </p>
          <p>
            Your privacy is important to us. It is EmailSenderPro's policy to respect your privacy regarding any
            information we may collect from you across our website, and other sites we own and operate.
          </p>
          <h3 className="font-bold text-lg text-foreground pt-4">1. Information We Collect</h3>
          <p>
            We only ask for personal information when we truly need it to provide a service to you. We collect it by
            fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and
            how it will be used. The personal information we collect includes your email address, username, and
            password (which is hashed and cannot be seen by us). We also collect your IP address upon login for security purposes.
          </p>
          <h3 className="font-bold text-lg text-foreground pt-4">2. How We Use Your Information</h3>
          <p>
            We use your email address and username to uniquely identify you as a user of our service. We use your email sending
            data (count and date) solely to enforce daily sending limits. We do not inspect the content of your
            emails. Your IP address is used to monitor for suspicious activity and protect your account from unauthorized access.
          </p>
          <h3 className="font-bold text-lg text-foreground pt-4">3. Security and Account Locking</h3>
          <p>
            We take the security of your data seriously. We protect your information with commercially acceptable
            means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or
            modification. Your password is encrypted and stored securely. Your API key is your responsibility to
            keep secure. To protect your account, if we detect a login from a new, unrecognized IP address, we may
            temporarily lock your account and disable your API key for a period of 15 days.
          </p>
          <h3 className="font-bold text-lg text-foreground pt-4">4. Links to Other Sites</h3>
          <p>
            Our website may link to external sites that are not operated by us. Please be aware that we have no
            control over the content and practices of these sites, and cannot accept responsibility or liability for
            their respective privacy policies.
          </p>
          <h3 className="font-bold text-lg text-foreground pt-4">5. Changes to This Policy</h3>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </p>
          <h3 className="font-bold text-lg text-foreground pt-4">6. Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy, please contact us.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
