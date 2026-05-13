"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase";

interface AvatarUploadProps {
  userId: string;
  displayName: string;
  currentUrl?: string | null;
  size?: number;
  onUploaded?: (url: string) => void;
}

export default function AvatarUpload({
  userId,
  displayName,
  currentUrl,
  size = 96,
  onUploaded,
}: AvatarUploadProps) {
  const supabase = createClient();
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentUrl || null);
  const [error, setError] = useState<string | null>(null);

  const initials = displayName
    ?.split(" ")
    .slice(-2)
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "?";

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    // Validate
    if (file.size > 2 * 1024 * 1024) {
      setError("Ảnh quá lớn (tối đa 2 MB)");
      return;
    }
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Chỉ chấp nhận JPG, PNG hoặc WebP");
      return;
    }

    setUploading(true);

    try {
      // Show preview immediately
      const reader = new FileReader();
      reader.onload = (ev) => setPreviewUrl(ev.target?.result as string);
      reader.readAsDataURL(file);

      // Upload to Supabase Storage: avatars/{userId}/avatar.{ext}
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `${userId}/avatar.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, file, { upsert: true, cacheControl: "3600" });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage.from("avatars").getPublicUrl(path);
      const publicUrl = `${data.publicUrl}?t=${Date.now()}`; // cache bust

      // Save URL to profile
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", userId);

      if (updateError) throw updateError;

      setPreviewUrl(publicUrl);
      onUploaded?.(publicUrl);
    } catch (err: any) {
      setError(err.message || "Lỗi không xác định");
      setPreviewUrl(currentUrl || null);
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  }

  async function removeAvatar() {
    if (!confirm("Xoá ảnh đại diện?")) return;
    setUploading(true);
    setError(null);
    try {
      // Try delete all possible extensions
      await supabase.storage
        .from("avatars")
        .remove([`${userId}/avatar.jpg`, `${userId}/avatar.png`, `${userId}/avatar.webp`, `${userId}/avatar.jpeg`]);
      await supabase.from("profiles").update({ avatar_url: null }).eq("id", userId);
      setPreviewUrl(null);
      onUploaded?.("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div
        className="relative rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-500 grid place-items-center text-white font-black flex-shrink-0 border-4 border-white shadow-md"
        style={{ width: size, height: size, fontSize: size / 3 }}
      >
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt={displayName} className="w-full h-full object-cover" />
        ) : (
          <span>{initials}</span>
        )}
        {uploading && (
          <div className="absolute inset-0 bg-black/50 grid place-items-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <input
          ref={fileInput}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFile}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          disabled={uploading}
          className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white rounded-lg font-medium block"
        >
          {previewUrl ? "📷 Đổi ảnh" : "📷 Tải ảnh lên"}
        </button>
        {previewUrl && (
          <button
            type="button"
            onClick={removeAvatar}
            disabled={uploading}
            className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg font-medium block"
          >
            🗑 Xoá ảnh
          </button>
        )}
        <p className="text-xs text-slate-500">JPG/PNG/WebP, tối đa 2 MB</p>
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    </div>
  );
}
