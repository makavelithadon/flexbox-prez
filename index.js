import { throttle } from "./utils.js";

const flexClassnames = [
  "flex-start",
  "flex-end",
  "center",
  "space-between",
  "space-around",
  "space-evenly",
  "reverse",
  "align-items-center",
  "align-self",
  "custom-star",
  "custom-star-closest",
  "margin-auto-last",
];

function init() {
  Reveal.initialize({
    width: 1024,
    plugins: [RevealHighlight],
  });

  const basesSlide = document.querySelector(".bases");

  const demoSlide = document.querySelector(".demo");
  const demoContainer = document.querySelector(".demo .container");
  const demoFlexItems = demoContainer.querySelectorAll(".flex-item");

  const isDemoSlide = () => demoSlide.classList.contains("present");
  const isBasesSlide = () => basesSlide.classList.contains("present");

  const getDataSetProps = (element, key) => element?.dataset?.[key] ?? "";

  const appendFlexClassnameToFlexContainer = (flexClassname) => {
    for (const flexCls of flexClassnames.filter(
      (cls) => cls !== flexClassname
    )) {
      demoContainer.classList.remove(flexCls);
    }
    if (!demoContainer.classList.contains(flexClassname)) {
      demoContainer.classList.add(flexClassname);
    }
  };

  function setDemoFlexItemsSizes() {
    for (const flexItem of demoFlexItems) {
      const newWidth = `${(demoContainer.clientWidth * 12) / 100}px`;
      flexItem.style.width = newWidth;
      flexItem.style.height = newWidth;
    }
  }

  function unknownFlexClassname(flexClassname) {
    console.error(
      `[FLEX CLASSNAME]: ${flexClassname} classname is not allowed`
    );
  }

  let throttled;

  Reveal.on("slidechanged", (event) => {
    if (event.currentSlide.classList.contains("demo")) {
      throttled = throttle(setDemoFlexItemsSizes, 1000);

      throttled();

      window.addEventListener("resize", throttled);
      return;
    }

    if (throttled) {
      window.removeEventListener("resize", throttled);
      throttled = undefined;
    }
  });

  Reveal.on("fragmentshown", (event) => {
    const toTrigger = getDataSetProps(event.fragment, "trigger");
    if (toTrigger) {
      toTrigger.split(",").forEach((target) => {
        const element = document.querySelector(target);
        element.classList.add(getDataSetProps(element, "addclass"));
      });
    }
    if (isBasesSlide()) {
      event.fragment.classList.add("pulse");
    }
    if (isDemoSlide()) {
      const flex = getDataSetProps(event.fragment, "flex");
      if (flex) {
        if (!flexClassnames.includes(flex)) {
          unknownFlexClassname(flex);
        } else {
          appendFlexClassnameToFlexContainer(flex);
        }
      }
    }
  });

  Reveal.on("fragmenthidden", (event) => {
    const toTrigger = getDataSetProps(event.fragment, "trigger");
    if (toTrigger) {
      toTrigger.split(",").forEach((target) => {
        const element = document.querySelector(target);
        element.classList.remove(getDataSetProps(element, "addclass"));
      });
    }
    if (isDemoSlide()) {
      const fragmentToShow = demoSlide.querySelector(
        `[data-fragment-index="${
          getDataSetProps(event.fragment, "fragmentIndex") - 1
        }"]`
      );

      if (fragmentToShow) {
        const flex = getDataSetProps(fragmentToShow, "flex");
        if (flex) {
          if (!flexClassnames.includes(flex)) {
            unknownFlexClassname(flex);
          } else {
            appendFlexClassnameToFlexContainer(flex);
          }
        }
      }
    }
  });
}

function displayCurrentYear() {
  const copyrightElement = document.querySelector(".copyright");
  const currentYear = new Date().getFullYear();
  copyrightElement.innerHTML = copyrightElement.innerHTML.replace(
    "{{currentYear}}",
    currentYear
  );
}

function removeHiddenClassNames() {
  Array.from(document.querySelectorAll(".hidden")).forEach((node) => {
    node.classList.remove("hidden");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  init();

  removeHiddenClassNames();

  displayCurrentYear();
});
