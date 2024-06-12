import { gsap } from "gsap";

export function gsapAnimations() {
  gsap.from(".track", {
    opacity: 0,
    y: 30,
    duration: 5,
    stagger: 0.05,
    ease: "power2.out",
  });
}
