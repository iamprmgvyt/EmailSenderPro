import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BarChart, Key, Package, Info, History } from 'lucide-react';
import DashboardView from './DashboardView';
import { jwtVerify } from 'jose';
import dbConnect from '@/lib/dbConnect';
import User, { IUser, ILoginHistory } from '@/models/User';
import { formatDistanceToNow } from 'date-fns';

interface DashboardData {
    apiKey: string;
    dailySent: {
        count: number;
        date: string;
    };
    loginHistory: ILoginHistory[];
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
        const user: IUser | null = await User.findById(userId).select('apiKey dailySent loginHistory');

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

        return JSON.parse(JSON.stringify({ // Serialize to plain object to avoid Next.js warnings
            apiKey: user.apiKey,
            dailySent: {
                count: user.dailySent.count,
                date: user.dailySent.date,
            },
            loginHistory: user.loginHistory,
        }));

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
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3">
                <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
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
                            Use this key in the 'x-api-key' header to send emails. Keep it secure!
                        </AlertDescription>
                        <div className="mt-4 flex items-center gap-4">
                            <code className="relative flex-grow rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                               {partiallyHiddenApiKey}
                            </code>
                        </div>
                    </Alert>

                    <Alert className="bg-card animate-fade-in [animation-delay:200ms]">
                        <Package className="h-4 w-4" />
                        <AlertTitle className="font-headline">Node.js Example</AlertTitle>
                        <AlertDescription className="mt-2">
                            Here&apos;s a quick example of how to send an email using our NPM package.
                        </AlertDescription>
                        <div className="mt-4 rounded-md bg-muted p-4">
                            <pre className="text-sm font-code overflow-x-auto">
                                <code>
{`const { send } = require('emailsenderpro');

async function main() {
  try {
    const result = await send({ 
      apiKey: 'YOUR_API_KEY_HERE', 
      to: 'recipient@example.com',
      subject: 'Hello from Node.js!',
      body: '<h1>This is a test email.</h1>'
    });
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();`}
                                </code>
                            </pre>
                        </div>
                    </Alert>

                    <Alert className="bg-card animate-fade-in [animation-delay:400ms]">
                        <Info className="h-4 w-4" />
                        <AlertTitle className="font-headline">cURL Example</AlertTitle>
                        <AlertDescription className="mt-2">
                            You can also send emails directly via a cURL command.
                        </AlertDescription>
                        <div className="mt-4 rounded-md bg-muted p-4">
                             <pre className="text-sm font-code overflow-x-auto">
                                <code>
{`curl -X POST https://yourapp.com/api/send-email \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY_HERE" \\
  -d '{
    "to": "recipient@example.com",
    "subject": "Hello from cURL",
    "body": "This is a test."
  }'`}
                                </code>
                            </pre>
                        </div>
                    </Alert>
                </div>
                <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
                     <Card className="animate-fade-in [animation-delay:600ms]">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><History className="h-5 w-5 text-primary" /> Login History</CardTitle>
                            <CardDescription>Your 5 most recent logins.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {data.loginHistory && data.loginHistory.length > 0 ? (
                                    data.loginHistory.map((login, index) => (
                                        <li key={index} className="flex items-center justify-between text-sm">
                                            <span className="font-mono text-muted-foreground">{login.ip}</span>
                                            <span className="text-xs text-muted-foreground">
                                                {formatDistanceToNow(new Date(login.timestamp), { addSuffix: true })}
                                            </span>
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground">No login history available yet.</p>
                                )}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>
    );
}