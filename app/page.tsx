import Image from "next/image";
import { Button } from "@/components/ui/button";
import Containers from "@/components/global/Containers";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl">HomePage</h1>
      <Button variant="outline" size="lg" className="capitalize m-8">
        click me
      </Button>
    </div>
  );
}
