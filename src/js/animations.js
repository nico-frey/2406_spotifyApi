import { gsap } from "gsap";

export function toggleOn(element) {
  const image = element.querySelector(".coverImage");
  const trackName = element.querySelector(".trackName");
  const artistName = element.querySelector(".artistName");
  const trackInfo = element.querySelector(".trackInfo");
  const track = element.querySelector(".li");
  //const trackArtist = document.querySelector("p:nth-child(1)");

  gsap
    .timeline()
    .to(element, {
      duration: 0.5,
      backgroundColor: "#E6EDF2",
      ease: "power4.out",
      padding: "2.5rem",
    })
    .to(
      image,
      {
        height: "10rem",
        width: "10rem",
        duration: 0.5,
        scale: 1.1,
        ease: "power4.out",
      },
      "<"
    )
    .to(
      trackName,
      {
        fontSize: "2.5rem",
        duration: 0.8,
        color: "#057882",
        ease: "power4.out",
      },
      "<"
    )
    .to(
      artistName,
      {
        duration: 0.8,
        color: "#057882",
        ease: "power4.out",
        fontSize: "1.5rem",
      },
      "<"
    )
    .to(trackInfo, { marginLeft: "3.5rem" }, "<");
}

export function toggleOff(element) {
  const image = element.querySelector(".coverImage");
  const trackName = element.querySelector(".trackName");
  const artistName = element.querySelector(".artistName");
  const trackInfo = element.querySelector(".trackInfo");

  gsap
    .timeline()
    .to(element, {
      duration: 0.5,
      backgroundColor: "#FAFCFC",
      ease: "power4.out",
      padding: "0.5rem",
    })
    .to(
      image,
      {
        height: "4rem",
        width: "4rem",
        duration: 0.5,
        scale: 1,
        ease: "power4.out",
      },
      "<"
    )
    .to(
      trackName,
      {
        fontSize: "1.375rem",
        duration: 0.5,
        color: "#03191b",
        ease: "power4.out",
      },
      "<"
    )
    .to(
      artistName,
      {
        duration: 0.5,
        color: "#798e90",
        ease: "powe4.out",
        fontSize: "1.125rem",
      },
      "<"
    )
    .to(trackInfo, { marginLeft: "1.5rem" }, "<");
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
