import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./components/ui/alert-dialog"
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import './index.css';

function App() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-extrabold">Check out components/ui folder</h1>
      <h1 className="text-3xl font-extrabold">Shadcn UI - Components</h1>
      <Button variant="default" size="default" className="bg-red-500">
        Default Button
      </Button>

      <Input />

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Show Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default App;
