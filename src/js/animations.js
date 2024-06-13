import { gsap } from "gsap";

export function toggleOn(element) {
  gsap.to(element, {
    duration: 0.5,
    backgroundColor: "#E6EDF2",
    color: "#e0e0ef",
    ease: "power2.out",
    scale: 5,
  });
}

export function toggleOff(element) {
  gsap.to(element, {
    duration: 0.5,
    backgroundColor: "#FAFCFC",
    color: "#798E90",
    ease: "power2.out",
    scale: 1,
  });
}

export function gsapAnimations() {
  gsap.from(".track", {
    opacity: 0,
    y: 10,
    duration: 0.8,
    stagger: 0.1,
    ease: "power4.out",
    scale: 1.05,
  });
}
