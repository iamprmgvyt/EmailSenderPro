'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import DashboardView from '../DashboardView';

const formSchema = z.object({
  fromName: z.string().optional(),
  defaultSubject: z.string().optional(),
});

type EmailConfig = z.infer<typeof formSchema>;

export default function EditEmailPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [apiKey, setApiKey] = useState('');

  const form = useForm<EmailConfig>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fromName: '',
      defaultSubject: '',
    },
  });

  useEffect(() => {
    async function fetchConfig() {
      setIsFetching(true);
      try {
        const response = await fetch('/api/user/email-config');
        if (response.ok) {
          const data = await response.json();
          form.reset(data.emailConfig);
        } else {
          toast({
            variant: 'destructive',
            title: 'Failed to load config',
            description: 'Could not fetch your current email settings.',
          });
        }
        
        // Also fetch dashboard data for header
        const dashRes = await fetch('/api/dashboard-data');
        if (dashRes.ok) {
            const dashData = await dashRes.json();
            setApiKey(dashData.apiKey);
        }

      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'An unexpected error occurred while fetching settings.',
        });
      } finally {
        setIsFetching(false);
      }
    }
    fetchConfig();
  }, [form, toast]);

  async function onSubmit(values: EmailConfig) {
    setIsLoading(true);
    try {
      const response = await fetch('/api/user/email-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast({
          title: 'Success!',
          description: 'Your email settings have been updated.',
        });
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update settings.');
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-4">
        <h1 className="font-headline text-2xl font-bold text-primary">Email Settings</h1>
        {apiKey && <DashboardView apiKey={apiKey} />}
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Configure Email Sending</CardTitle>
            <CardDescription>
              Set a default sender name and subject for your emails. These can be overridden in the API call.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isFetching ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fromName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sender Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Company Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="defaultSubject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Default Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="A message from us" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </main>
    </>
  );
}
