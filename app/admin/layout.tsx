import SectionTitle from "@/components/global/SectionTitle";
import { Separator } from "@/components/ui/separator";
import React from "react";
import SideLateral from "./SideLateral";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>
        <h2 className="text-2xl pl-4">Dashboard</h2>
        <Separator className="mt-2" />
      </div>
      <section className="grid lg:grid-cols-12 gap-12 mt-12">
        <div className="lg:col-span-2">
          <SideLateral />
        </div>
        <div className="lg:col-span-10 px-4">{children}</div>
      </section>
    </>
  );
}

export default layout;
