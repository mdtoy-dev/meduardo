import { Button } from "@/components/ui/button"

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button className="w-full" size="lg" variant="ghost">
          <span>Biochemistry</span>
        </Button>
        <Button className="w-full" size="lg" variant="ghost">
          <span>Immunology</span>
        </Button>
        <Button className="w-full" size="lg" variant="ghost">
          <span>Pathology</span>
        </Button>
        <Button className="w-full" size="lg" variant="ghost">
          <span>Anatomy</span>
        </Button>
        <Button className="w-full" size="lg" variant="ghost">
          <span>Microbiology</span>
        </Button>
        <Button className="w-full" size="lg" variant="ghost">
          <span>Pharmacology</span>
        </Button>
        <Button className="w-full" size="lg" variant="ghost">
          <span>Physiology</span>
        </Button>
      </div>
    </footer>
  )
}
