import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);
const bucket_name = "NextJS-store-images";

export const uploadImage = async (image: File) => {
  const timestamp = Date.now();
  const newName = `${timestamp}-${image.name}`;
  const { data, error } = await supabase.storage
    .from(bucket_name)
    .upload(newName, image, {
      cacheControl: "3600",
    });

  if (!data) {
    throw new Error("Image Upload failed");
  }
  return supabase.storage.from(bucket_name).getPublicUrl(newName).data
    .publicUrl;
};
