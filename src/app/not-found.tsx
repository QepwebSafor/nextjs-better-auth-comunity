
import { AlertTriangle } from "lucide-react";

import { headers } from "next/headers";

export default async function NotFound() {
  const headersList = await headers();
  const domain = headersList.get("host");
  console.log(domain, "domain");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4  text-white">
      <div className="text-center max-w-md w-full">
        <div className="flex justify-center mb-6">
          <AlertTriangle
            className="w-24 h-24 text-destructive"
            strokeWidth={1.5}
          />
        </div>
        <h4 className="text-4xl font-bold mb-4 ">404 - Page Not Found</h4>

        <p className="text-muted-foreground mb-6">
          Oops! The page you are looking for seems to have wandered off into the
          digital wilderness.
        </p>
      </div>
    </div>
  );
}
