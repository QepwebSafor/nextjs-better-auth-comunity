import { LoginForm } from "@/components/login-form";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function Page() {
  return (
    <div className="mx-auto md:w-1/3 sm:w-1/2 xs:w-1/2 w-full lg:w-1/3 flex flex-col mt-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-cyan-400">Login</CardTitle>
        </CardHeader>
        <CardContent>
      
          <div className="space-y-4">
          <LoginForm />

          <p className="text-muted-foreground text-sm text-center mt-5">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="hover:text-foreground">
              Register
            </Link>
          </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
