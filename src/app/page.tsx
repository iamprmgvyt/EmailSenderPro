import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Zap, Shield } from 'lucide-react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;

export default async function LandingPage() {
  const token = cookies().get('token')?.value;

  if (token && JWT_SECRET) {
    try {
      await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
      // If token is valid, redirect to dashboard
      redirect('/dashboard');
    } catch (e) {
      // Invalid token, do nothing, just show the landing page
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40 xl:py-48 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline text-primary">
                    Reliable Email Sending, Simplified.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    EmailSenderPro provides a dead-simple API to send emails for your application. Secure, fast, and easy to integrate.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="font-bold">
                    <Link href="/signup">
                      Get Started for Free
                    </Link>
                  </Button>
                  <Button asChild variant="secondary" size="lg" className="font-bold">
                    <Link href="/login">
                      Login
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                 <div className="w-full max-w-md p-8 space-y-4 rounded-lg shadow-2xl bg-card">
                    <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-full bg-primary/10 text-primary">
                            <Zap className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold">Simple API</h3>
                            <p className="text-sm text-muted-foreground">Easy to integrate with any stack.</p>
                        </div>
                    </div>
                     <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-full bg-primary/10 text-primary">
                            <Shield className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold">Secure</h3>
                            <p className="text-sm text-muted-foreground">API key authentication and rate limiting.</p>
                        </div>
                    </div>
                     <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-full bg-primary/10 text-primary">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold">Free to Use</h3>
                            <p className="text-sm text-muted-foreground">Generous free tier for all users.</p>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Everything You Need to Get Sending</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We've packed EmailSenderPro with features to make your developer life easier, while keeping the API simple.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Zap className="w-5 h-5 text-primary" /> Lightning-Fast Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Use our simple NPM package or a cURL command to start sending emails in minutes. No complex SDKs needed.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Shield className="w-5 h-5 text-primary" /> API Key Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Your unique API key is available on your dashboard. Keep it secret, keep it safe!</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-primary" /> Email Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Set a default sender name and subject to streamline your API calls, while still allowing for overrides.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
