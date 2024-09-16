import SubmitButton from "@/components/form/Buttons";
import CheckBoxInput from "@/components/form/CheckBoxInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInput from "@/components/form/ImageInput";
import ImageInputContainer from "@/components/form/ImageInputContainer";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import {
  fetchAdminProductDetails,
  updateProductAction,
  updateProductImageAction,
} from "@/utils/actions";
import React from "react";

async function Edit({ params }: { params: { id: string } }) {
  const { id } = params;
  const { name, company, description, featured, price, image } =
    await fetchAdminProductDetails(id);

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">update product</h1>{" "}
      <div className="border p-8 rounded-md">
        <ImageInputContainer
          image={image}
          name={name}
          action={updateProductImageAction}
          text="update image"
        >
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="url" value={image} />
        </ImageInputContainer>
        <FormContainer action={updateProductAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <input type="hidden" name="id" value={id} />
            <FormInput
              name="name"
              type="text"
              label="Product Name"
              defaultValue={name}
            />
            <PriceInput defaultValue={String(price)} />
            <FormInput
              name="company"
              type="text"
              label="Company"
              defaultValue={company}
            />

            <TextAreaInput
              name="description"
              labelText="Product Description"
              defaultValue={description}
            />
          </div>

          <CheckBoxInput
            name="featured"
            label="Featured"
            defaultChecked={featured}
          />
          <SubmitButton text="Update Product" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}

export default Edit;
