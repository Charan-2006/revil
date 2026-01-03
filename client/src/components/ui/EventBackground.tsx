"use client";

import Dither from "@/components/ui/Dither";

export default function EventBackground() {
    return (
        <div className="absolute inset-0 z-0">
            {/* Animated Dither Background */}
            <Dither
                waveColor={[0.5, 0.5, 0.5]}
                disableAnimation={false}
                enableMouseInteraction={true}
                mouseRadius={0.15}
                colorNum={4}
                waveAmplitude={0.3}
                waveFrequency={3}
                waveSpeed={0.05}
            />

            {/* Dark overlay for contrast */}
            <div className="absolute inset-0 bg-black/30" />
        </div>
    );
}
