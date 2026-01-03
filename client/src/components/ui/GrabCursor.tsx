"use client";

import { useEffect, useRef, useState } from "react";

export default function GrabCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(false);

    useEffect(() => {
        const move = (e: MouseEvent) => {
            if (!cursorRef.current) return;
            cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        };

        const onEnter = () => setActive(true);
        const onLeave = () => setActive(false);

        window.addEventListener("mousemove", move);
        document.querySelectorAll("[data-grab]").forEach((el) => {
            el.addEventListener("mouseenter", onEnter);
            el.addEventListener("mouseleave", onLeave);
        });

        return () => {
            window.removeEventListener("mousemove", move);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className={`fixed top-0 left-0 pointer-events-none z-40
                -translate-x-1/2 -translate-y-1/2
                rounded-full border
                transition-all duration-200 ease-out
                ${active
                    ? "w-20 h-20 border-blue-400 bg-blue-400/10 backdrop-blur-md"
                    : "w-4 h-4 border-white/50"}
            `}
        />
    );
}
