"use client";
import { Mascot } from "page-mascot";

export default function MascotProfile() {
  return (
    <div className="relative mx-auto mb-10 w-full max-w-sm overflow-hidden rounded-2xl">
      <Mascot
        directions="/mascots/jl-directions.webp"
        reactions="/mascots/jl-reactions.webp"
        size={300}
        label="JL"
      />
    </div>
  );
}
