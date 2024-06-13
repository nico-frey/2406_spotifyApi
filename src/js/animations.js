import { gsap } from "gsap";

export function gsapAnimations() {
  gsap.from(".track", {
    opacity: 0,
    y: 10,
    duration: 1,
    stagger: 0.1,
    ease: "power2.out",
  });
}

export function playTrackAnimation(element) {
  gsap.to(element, {
    backgroundColor: "red",
    color: "#03191B",
    duration: 0.5,
  });
}

export function pauseTrackAnimation(element) {
  gsap.to(element, {
    backgroundColor: "#FAFCFC",
    color: "#798E90",
    duration: 0.5,
  });
}
