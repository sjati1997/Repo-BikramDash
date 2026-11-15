/**
 * Light panel that holds a page's sections. It is inset from the viewport
 * edges on larger screens, so the live background stays visible around it.
 */
export function PageSheet({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[100rem] overflow-hidden bg-background shadow-[0_-30px_80px_-40px_rgb(0_0_0/0.6)] sm:w-[calc(100%-2rem)] sm:rounded-leaf-lg lg:w-[calc(100%-4rem)]">
      {children}
    </div>
  )
}
