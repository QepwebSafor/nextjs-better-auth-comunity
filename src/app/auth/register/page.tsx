import { RegisterForm } from "@/components/register-form";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function Page() {
  return (
    <div className="mx-auto md:w-1/3 sm:w-1/2 xs:w-1/2 w-full lg:w-1/3 flex flex-col ">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-cyan-400">Register</CardTitle>
        </CardHeader>
        <CardContent>
     
          <RegisterForm />

          <p className="text-muted-foreground text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="hover:text-foreground">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
