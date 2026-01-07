import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { userApi, getErrorMessage } from "@/lib/api";
import { generalSettingsSchema, GeneralSettingsSchema } from "@/lib/zod-schemas";
import { User } from "@/types/user";

export function useGeneralSettingForm({ user }: { user: User }) {
  const { update } = useSession();
  const [isUploading, setIsUploading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.image || null);

  const form = useForm<GeneralSettingsSchema>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      name: user?.name || "",
      image: user?.image || ""
    }
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    setValue
  } = form;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

      // Show local preview image immediately
      const objectUrl = URL.createObjectURL(file);
      setAvatarPreview(objectUrl);

      // Replace the old image with the new one
      const result = await userApi.uploadFile(file);

      if (result.success) {
        setValue("image", result.url);
      } else {
        toast.error(result.message || "Error while uploading avatar");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const result = await userApi.updateProfile(data);

      if (result.success) {
        update();
        toast.success("Profile updated successfully");
      } else {
        toast.error(result.message || "Error while updating profile");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  });

  return {
    form,
    isUploading,
    avatarPreview,
    isSubmitting,
    handleFileChange,
    onSubmit
  };
}
