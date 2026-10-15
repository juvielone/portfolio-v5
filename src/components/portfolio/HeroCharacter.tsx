import Image from "next/image";

export default function HeroCharacter() {
  return (
    <div className="relative mx-auto mb-10 w-full max-w-sm overflow-hidden rounded-2xl">
      <Image
        src="/hero/profile.png"
        width={311}
        height={311}
        alt="Portrait of Juvie Lagos"
        loading="eager"
        fetchPriority="high"
        sizes="(min-width: 432px) 384px, calc(100vw - 48px)"
        className="h-auto w-full"
      />
    </div>
  );
}
