import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";

function ImageInput() {
  return (
    <div className="mb-2">
      <Label htmlFor="image" className="capitalize">
        Image
      </Label>
      <Input type="file" id="image" name="image" required accept="image/*" />
    </div>
  );
}

export default ImageInput;
