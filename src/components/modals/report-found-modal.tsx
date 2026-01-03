"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Package, Upload, X } from "lucide-react";
import Image from "next/image";

const CATEGORIES = [
  "Electronics",
  "Identification",
  "Academic",
  "Personal Items",
  "Accessories",
  "Clothing",
  "Keys",
  "Other",
];

interface ReportFoundModalProps {
  securityId: number;
  onSuccess?: () => void;
}

export function ReportFoundModal({
  securityId,
  onSuccess,
}: ReportFoundModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    foundLocation: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const supabase = createClient();

      let imageUrl = null;

      // Upload image if provided
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `found_${securityId}_${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("found-items")
          .upload(fileName, imageFile);

        if (uploadError) throw new Error("Failed to upload image");

        const {
          data: { publicUrl },
        } = supabase.storage.from("found-items").getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      // Insert found item
      const { error: insertError } = await supabase.from("FoundItem").insert({
        security_id: securityId,
        item_name: formData.itemName,
        image_url: imageUrl,
        category: formData.category,
        found_location: formData.foundLocation,
        status: "pending",
      });

      if (insertError) throw new Error("Failed to submit found item");

      toast.success("Success!", {
        description: "Found item has been logged successfully.",
      });

      // Reset form
      setFormData({
        itemName: "",
        category: "",
        foundLocation: "",
      });
      setImageFile(null);
      setImagePreview(null);
      setOpen(false);
      onSuccess?.();
    } catch (error: any) {
      toast.error("Error", {
        description: error.message || "Failed to submit. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" size="lg">
          <Package className="mr-2 h-5 w-5" />
          Log Found Item
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Log Found Item</DialogTitle>
          <DialogDescription>
            Register an item that has been found on campus.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="itemName">Item Name *</Label>
            <Input
              id="itemName"
              required
              value={formData.itemName}
              onChange={(e) =>
                setFormData({ ...formData, itemName: e.target.value })
              }
              placeholder="e.g., Blue Backpack, iPhone, Wallet"
            />
          </div>

          <div>
            <Label htmlFor="category">Category *</Label>
            <Select
              required
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="foundLocation">Found Location *</Label>
            <Input
              id="foundLocation"
              required
              value={formData.foundLocation}
              onChange={(e) =>
                setFormData({ ...formData, foundLocation: e.target.value })
              }
              placeholder="e.g., Library 2nd Floor, Main Gate"
            />
          </div>

          <div>
            <Label>Item Photo (Required)</Label>
            <p className="text-xs text-gray-500 mb-2">
              Upload a clear photo of the item
            </p>

            {!imagePreview ? (
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 hover:bg-gray-100">
                <Upload className="h-8 w-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Click to upload image
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  required
                />
              </label>
            ) : (
              <div className="relative">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute right-2 top-2 rounded-full bg-red-600 p-1 text-white hover:bg-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Submitting..." : "Log Found Item"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
