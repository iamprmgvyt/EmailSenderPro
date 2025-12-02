"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ModeToggle } from '@/components/mode-toggle';

interface DashboardViewProps {
    apiKey: string;
}

export default function DashboardView({ apiKey }: DashboardViewProps) {
    const router = useRouter();
    const { toast } = useToast();
    const { setIsLoggedIn } = useAuth();

    const handleCopy = () => {
        navigator.clipboard.writeText(apiKey);
        toast({
            title: 'Copied!',
            description: 'API Key has been copied to your clipboard.',
        });
    };

    const handleSignOut = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        setIsLoggedIn(false);
        router.push('/login');
        router.refresh();
        toast({
            title: 'Signed Out',
            description: 'You have been successfully signed out.',
        });
    };

    return (
        <div className="flex items-center gap-4">
             <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="mr-2 h-4 w-4" />
                Copy API Key
            </Button>
            <ModeToggle />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="overflow-hidden rounded-full"
                    >
                        <Avatar>
                            <AvatarImage src="https://picsum.photos/seed/user-avatar/32/32" alt="User Avatar" data-ai-hint="avatar user"/>
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
