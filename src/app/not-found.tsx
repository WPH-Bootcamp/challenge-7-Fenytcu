import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h2 className="text-4xl font-bold mb-4 text-gray-900">404 - Not Found</h2>
      <p className="text-gray-500 mb-8">Could not find requested resource</p>
      <Link href="/dashboard">
        <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full">
          Return to Home
        </Button>
      </Link>
    </div>
  );
}
