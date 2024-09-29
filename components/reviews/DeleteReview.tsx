import { deleteReviewAction } from "@/utils/actions";
import React from "react";
import FormContainer from "../form/FormContainer";
import { IconButton } from "../products/IconButton";

export default function DeleteReview({ reviewId }: { reviewId: string }) {
  const deleteReview = deleteReviewAction.bind(null, { id: reviewId });
  return (
    <FormContainer action={deleteReview}>
      <IconButton type="delete" />
    </FormContainer>
  );
}
