import Image from "next/image";
import { profile } from "@/data/portfolio";
export function ProfilePixelTransition({
  variant = "hero",
}: {
  variant?: "hero" | "about";
}) {
  return (
    <div
      className={`profile-pixel-transition profile-pixel-transition-${variant}`}
    >
      <Image
        className="profile-source-image"
        src={profile.avatar}
        alt="Haraprasad Hota"
        fill
        priority={variant === "hero"}
        sizes="(max-width: 560px) 240px, (max-width: 950px) 340px, 460px"
      />
    </div>
  );
}
