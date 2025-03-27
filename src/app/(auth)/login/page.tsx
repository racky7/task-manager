import LoginForm from "@/components/auth/login-form";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerAuthSession();

  if (session) {
    return redirect("/");
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-gray-100">
      <LoginForm />
    </div>
  );
}
