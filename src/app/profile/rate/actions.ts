"use server";

import { createClient } from "@/utils/supabase/server";

interface RatingData {
  userId: string;
  rating: number;
  feedback: string;
  displayName: string | null;
  showOnLanding: boolean;
  userType: string;
}

export async function submitRating(data: RatingData) {
  const supabase = await createClient();

  const { error } = await supabase.from("ratings").insert({
    user_id: data.userId,
    rating: data.rating,
    feedback: data.feedback,
    display_name: data.displayName,
    show_on_landing: data.showOnLanding,
    approved: false, 
    created_at: new Date().toISOString(),
  });

  if (error) {
    console.error("Rating submission error:", error);
    return { error: error.message };
  }

  return { success: true };
}