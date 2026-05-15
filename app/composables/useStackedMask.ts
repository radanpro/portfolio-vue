import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const useStackedMask = (mainContainer: Ref<HTMLElement | null>) => {
  let ctx: gsap.Context;

  onMounted(() => {
    gsap.registerPlugin(Observer, ScrollTrigger);

    if (!mainContainer.value) return;

    ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(
        mainContainer.value!.querySelectorAll(".mask-card"),
      );

      if (!cards.length) return;

      const total = cards.length;
      let current = 0;
      let animating = false;

      gsap.set(cards, { yPercent: (i) => (i === 0 ? 0 : 100) });

      cards.forEach((card) => {
        const maskText = card.querySelector<SVGTextElement>(".mask-text");
        if (maskText) gsap.set(maskText, { svgOrigin: "50 50" });
      });

      function gotoPanel(index: number, direction: 1 | -1) {
        if (animating || index === current) return;
        
        const outgoing = cards[current];
        const incoming = cards[index];

        if (!outgoing || !incoming) return;

        animating = true;

        const outMaskText = outgoing.querySelector<SVGTextElement>(".mask-text");
        const outContent = outgoing.querySelector<HTMLElement>(".card-content");
        const outImage = outgoing.querySelector<HTMLImageElement>("img");

        const inMaskText = incoming.querySelector<SVGTextElement>(".mask-text");
        const inContent = incoming.querySelector<HTMLElement>(".card-content");

        gsap.set(incoming, {
          yPercent: direction > 0 ? 100 : -100,
          opacity: 1,
          visibility: "visible",
        });

        if (inMaskText) gsap.set(inMaskText, { scale: 1 });
        if (inContent)
          gsap.set(inContent, { y: direction > 0 ? 40 : -40, opacity: 0 });

        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(outgoing, { visibility: "hidden" });
            current = index;
            animating = false;
          },
        });

        if (outMaskText) {
          tl.to(
            outMaskText,
            { scale: 60, duration: 0.7, ease: "power2.in" },
            0,
          );
        }

        if (outContent) {
          tl.to(
            outContent,
            {
              y: direction > 0 ? -60 : 60,
              opacity: 0,
              duration: 0.45,
              ease: "power1.in",
            },
            0,
          );
        }

        if (outImage) {
          tl.to(outImage, { scale: 1.12, duration: 0.7, ease: "none" }, 0);
        }

        tl.to(
          outgoing,
          {
            yPercent: direction > 0 ? -100 : 100,
            duration: 0.75,
            ease: "power2.inOut",
          },
          0.3,
        );

        tl.to(
          incoming,
          { yPercent: 0, duration: 0.75, ease: "power2.inOut" },
          0.3,
        );

        if (inContent) {
          tl.to(
            inContent,
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
            0.65,
          );
        }
      }

      function next() {
        const nextIndex = (current + 1) % total;
        gotoPanel(nextIndex, 1);
      }

      function prev() {
        const prevIndex = (current - 1 + total) % total;
        gotoPanel(prevIndex, -1);
      }

      ScrollTrigger.create({
        trigger: mainContainer.value,
        start: "top top",
        end: "+=1",
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
      });

      Observer.create({
        target: mainContainer.value,
        type: "wheel,touch,pointer",
        wheelSpeed: -1,
        onDown: prev,
        onUp: next,
        tolerance: 10,
        preventDefault: true,
      });
    });
  });

  onUnmounted(() => {
    ctx?.revert();
  });
};
