import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BarChart, Key, Eye, EyeOff } from 'lucide-react';
import DashboardView from './DashboardView';
import { jwtVerify } from 'jose';
import dbConnect from '@/lib/dbConnect';
import User, { IUser } from '@/models/User';


interface DashboardData {
    apiKey: string;
    dailySent: {
        count: number;
        date: string;
    };
}

interface JwtPayload {
  id: string;
}

async function getDashboardData(): Promise<DashboardData | null> {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token || !process.env.JWT_SECRET) return null;

    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
        const userId = (payload as JwtPayload).id;

        await dbConnect();
        const user: IUser | null = await User.findById(userId).select('apiKey dailySent');

        if (!user) {
            return null;
        }

        // Reset daily count if the date has changed
        const today = new Date().toISOString().split('T')[0];
        if (user.dailySent.date !== today) {
            user.dailySent.count = 0;
            user.dailySent.date = today;
            await user.save();
        }

        return {
            apiKey: user.apiKey,
            dailySent: {
                count: user.dailySent.count,
                date: user.dailySent.date,
            },
        };

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
        <>
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
                 <Alert className="bg-card animate-fade-in">
                    <Key className="h-4 w-4" />
                    <AlertTitle className="font-headline">Your API Key</AlertTitle>
                    <AlertDescription className="mt-2">
                        Use this key to send emails via our service. Keep it secure!
                    </AlertDescription>
                    <div className="mt-4 flex items-center gap-4">
                        <code className="relative flex-grow rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                           {partiallyHiddenApiKey}
                        </code>
                    </div>
                </Alert>

                <Alert className="bg-card animate-fade-in [animation-delay:200ms]">
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
        </>
    );
}
