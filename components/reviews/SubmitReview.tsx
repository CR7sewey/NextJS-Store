"use client";
import React, { useState } from "react";
import RatingInput from "./RatingInput";
import { Button } from "../ui/button";
import FormContainer from "../form/FormContainer";
import { createReviewAction } from "@/utils/actions";
import FormInput from "../form/FormInput";
import TextAreaInput from "../form/TextAreaInput";
import SubmitButton from "../form/Buttons";
import { Separator } from "../ui/separator";
import SectionTitle from "../global/SectionTitle";
import { Card } from "../ui/card";
import { useUser } from "@clerk/nextjs";

export default function SubmitReview({ productId }: { productId: string }) {
  const [leaveReview, setLeaveReview] = useState(false);
  const { user } = useUser();
  return (
    <section>
      <Button
        size="lg"
        className="capitalize"
        onClick={() => setLeaveReview(!leaveReview)}
      >
        Leave Review
      </Button>
      {leaveReview && (
        <Card className="p-8 mt-8">
          <FormContainer action={createReviewAction}>
            <input type="hidden" value={productId} name="productId" />
            <input
              type="hidden"
              name="authorName"
              value={user?.firstName || "user"}
            />
            <input
              type="hidden"
              name="authorImageUrl"
              value={user?.imageUrl || ""}
            />
            <RatingInput name="rating" />
            <TextAreaInput
              name="comment"
              labelText="feedback"
              defaultValue="What an amazing product!"
            />

            <SubmitButton text="Submit" className="mt-4" />
          </FormContainer>
        </Card>
      )}
    </section>
  );
}
