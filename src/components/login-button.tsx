import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';

export default function LoginButton() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="rounded-none w-28">
          Get Started
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-2xl text-center mb-2'>Login</DialogTitle>
        </DialogHeader>
        <div>
          <div className='flex flex-col gap-2'>
            <Input placeholder="E-mail" />
            <Button className="w-full">Send magic link</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}