export function LoadingSpinner({ className = "" }: { className?: string }) {
  return <div className={`animate-spin rounded-full border-2 border-muted border-t-primary ${className}`} />
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <LoadingSpinner className="w-8 h-8 mx-auto" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}
