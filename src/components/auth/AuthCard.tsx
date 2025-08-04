import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export function AuthCard({
  title,
  description,
  children,
  linkText,
  linkHref,
}: {
  title: string
  description: string
  children: React.ReactNode
  linkText?: string
  linkHref?: string
}) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="grid gap-4">
        {children}
        {linkText && linkHref && (
          <>
            <Separator />
            <div className="text-center text-sm">
              <Link href={linkHref} className="text-primary hover:underline">
                {linkText}
              </Link>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}