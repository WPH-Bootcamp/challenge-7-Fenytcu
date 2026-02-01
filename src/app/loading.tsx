import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col space-y-3 p-8 container mx-auto">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          {Array.from({ length: 8 }).map((_, i) => (
             <Skeleton key={i} className="h-[300px] w-full rounded-xl" />
          ))}
      </div>
    </div>
  );
}
