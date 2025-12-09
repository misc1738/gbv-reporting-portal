import { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/auth-bg.png')] bg-cover bg-center -z-10 opacity-50 contrast-125 saturate-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent -z-10" />
            <div className="w-full max-w-md space-y-8">
                {children}
            </div>
        </div>
    )
}
