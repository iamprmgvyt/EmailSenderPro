import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BarChart, Key, Eye, EyeOff } from 'lucide-react';
import DashboardView from './DashboardView';

interface DashboardData {
    apiKey: string;
    dailySent: {
        count: number;
        date: string;
    };
}

async function getDashboardData(): Promise<DashboardData | null> {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) return null;

    // In a real app, you might want to use a more robust way to get the base URL
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:9002';
    
    try {
        const res = await fetch(`${baseUrl}/api/dashboard-data`, {
            headers: {
                'Cookie': `token=${token}`
            },
            cache: 'no-store' // Ensure fresh data
        });

        if (!res.ok) {
            return null;
        }

        return res.json();
    } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        return null;
    }
}


export default async function DashboardPage() {
    const data = await getDashboardData();
    
    if (!data) {
        // This case should be handled by middleware, but as a fallback:
        redirect('/login');
    }

    const DAILY_LIMIT = 10;
    const sentToday = data.dailySent.count;
    const remaining = DAILY_LIMIT - sentToday;
    const partiallyHiddenApiKey = `${data.apiKey.substring(0, 5)}...${data.apiKey.substring(data.apiKey.length - 5)}`;

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-4">
                <h1 className="font-headline text-2xl font-bold text-primary">EmailSenderPro Dashboard</h1>
                <DashboardView apiKey={data.apiKey} />
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Emails Sent Today</CardTitle>
                            <BarChart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{sentToday}</div>
                            <p className="text-xs text-muted-foreground">
                                out of {DAILY_LIMIT} daily limit
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Emails Remaining</CardTitle>
                            <BarChart className="h-4 w-4 text-accent" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-accent">{remaining}</div>
                            <p className="text-xs text-muted-foreground">
                                Resets at midnight UTC
                            </p>
                        </CardContent>
                    </Card>
                </div>
                 <Alert className="bg-card">
                    <Key className="h-4 w-4" />
                    <AlertTitle className="font-headline">Your API Key</AlertTitle>
                    <AlertDescription className="mt-2">
                        Use this key to send emails via our service. Keep it secure!
                    </AlertDescription>
                    <div className="mt-4 flex items-center gap-4">
                        <code className="relative flex-grow rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold animate-fade-in">
                           {partiallyHiddenApiKey}
                        </code>
                    </div>
                </Alert>

                <Alert className="bg-card">
                    <AlertTitle className="font-headline">Example Usage</AlertTitle>
                    <AlertDescription className="mt-2">
                        Here&apos;s a basic example of how to use our NPM package:
                    </AlertDescription>
                    <div className="mt-4 rounded-md bg-muted p-4">
                        <pre className="text-sm font-code">
                            <code>
{`const sender = require('emailsenderpro');

sender.send({ 
  apiKey: 'YOUR_API_KEY_HERE', 
  to: 'recipient@example.com',
  subject: 'Hello World',
  body: 'This is a test email.'
});`}
                            </code>
                        </pre>
                    </div>
                </Alert>
            </main>
        </div>
    );
}
