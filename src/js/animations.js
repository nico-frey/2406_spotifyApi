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

export function playTrackAnimation(item) {
  gsap.to(item, {
    backgroundColor: "red",
    //color: "#03191B",
    duration: 5,
  });
}

export function unplayTrackAnimation(item) {
  gsap.to(item, {
    backgroundColor: "green",
    //color: "#03191B",
    duration: 5,
  });
}
