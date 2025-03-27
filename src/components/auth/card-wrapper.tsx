import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

type CardWrapperProps = {
  headerLabel: string;
  backbuttonhref: string;
  backbuttonlabel: string;
  children: React.ReactNode;
};

export default function CardWrapper({
  children,
  headerLabel,
  backbuttonhref,
  backbuttonlabel,
}: CardWrapperProps) {
  return (
    <>
      <Card className="w-[400px] shadow-md">
        <CardHeader>
          <div className="flex w-full flex-col items-center justify-center gap-y-4">
            <h1 className="text-primary text-3xl font-semibold">
              Task Manager
            </h1>
            {headerLabel}
          </div>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter>
          <Button className="w-full font-normal" variant="link" asChild>
            <Link href={backbuttonhref}>{backbuttonlabel}</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
