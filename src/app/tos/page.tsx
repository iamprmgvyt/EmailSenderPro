import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsOfServicePage() {
  return (
    <main className="container mx-auto max-w-4xl py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            <strong>Last Updated: December 2nd, 2025</strong>
          </p>
          <p>
            By accessing the website at EmailSenderPro, you are agreeing to be bound by these terms of service, all
            applicable laws and regulations, and agree that you are responsible for compliance with any applicable
            local laws.
          </p>
          <h3 className="font-bold text-lg text-foreground pt-4">1. Use License</h3>
          <p>
            Permission is granted to temporarily download one copy of the materials (information or software) on
            EmailSenderPro's website for personal, non-commercial transitory viewing only. This is the grant of a
            license, not a transfer of title.
          </p>
          <h3 className="font-bold text-lg text-foreground pt-4">2. Disclaimer</h3>
          <p>
            The materials on EmailSenderPro's website are provided on an 'as is' basis. EmailSenderPro makes no
            warranties, expressed or implied, and hereby disclaims and negates all other warranties including,
            without limitation, implied warranties or conditions of merchantability, fitness for a particular
            purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
          <h3 className="font-bold text-lg text-foreground pt-4">3. Limitations</h3>
          <p>
            In no event shall EmailSenderPro or its suppliers be liable for any damages (including, without
            limitation, damages for loss of data or profit, or due to business interruption) arising out of the use
            or inability to use the materials on EmailSenderPro's website, even if EmailSenderPro or a
            EmailSenderPro authorized representative has been notified orally or in writing of the possibility of
            such damage.
          </p>
          <h3 className="font-bold text-lg text-foreground pt-4">4. Abuse and Fair Use</h3>
          <p>
            You agree not to use the service for any illegal or abusive purposes, including but not limited to
            sending spam, unsolicited emails, or malicious content. We reserve the right to terminate your account
            and access to the service without notice if we detect a violation of this policy. The daily sending
            limit is in place to ensure fair usage for all users.
          </p>
          <h3 className="font-bold text-lg text-foreground pt-4">5. Governing Law</h3>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of our jurisdiction
            and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
