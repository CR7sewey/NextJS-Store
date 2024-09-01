import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { faker } from "@faker-js/faker";
import FormInput from "@/components/form/FormInput";
import PriceInput from "@/components/form/PriceInput";
import ImageInput from "@/components/form/ImageInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import CheckBoxInput from "@/components/form/CheckBoxInput";
import SubmitButton from "@/components/form/Buttons";

const handleSubmitServerAction = async (formData: FormData) => {
  "use server";
  const name = formData.get("name") as string;
  console.log(name, "this");
};

function page() {
  // faker - to spped up the development
  const name = faker.commerce.productName();
  const company = faker.company.name();
  const description = faker.commerce.productDescription(); //  const description = faker.lorem.paragraph({ min: 10, max: 12 });

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">create product</h1>{" "}
      <div className="border p-8 rounded-md">
        <form action={handleSubmitServerAction}>
          <FormInput
            name="name"
            type="text"
            label="Product Name"
            defaultValue={name}
          />
          <PriceInput />
          <FormInput
            name="company"
            type="text"
            label="Company"
            defaultValue={company}
          />
          <ImageInput />
          <TextAreaInput
            name="description"
            labelText="Product Description"
            defaultValue={description}
          />
          <CheckBoxInput name="featured" label="Featured" />
          <SubmitButton className="mt-8" />
        </form>
      </div>
    </section>
  );
}

export default page;
