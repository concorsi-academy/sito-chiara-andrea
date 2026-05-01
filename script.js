const SVG_NS = "http://www.w3.org/2000/svg";

const cornerPositions = ["tl", "tr", "bl", "br"];

const cornerShape = [
  { kind: "guide", delay: 0.0, d: "M24 204 C24 128 24 76 24 24 C76 24 128 24 204 24" },
  { kind: "guide", delay: 0.08, d: "M54 166 C54 112 54 68 54 24 C98 24 142 24 186 24" },
  { kind: "filigree", delay: 0.14, d: "M24 238 C36 210 60 188 94 174" },
  { kind: "filigree", delay: 0.2, d: "M78 54 C60 44 42 35 28 28" },
  { kind: "filigree", delay: 0.28, d: "M182 42 C160 50 140 62 123 79" },
  { kind: "stem", delay: 0.32, d: "M58 366 C67 314 82 266 106 220 C129 175 159 132 205 74" },
  { kind: "stem", delay: 0.42, d: "M78 386 C98 338 124 293 161 251" },
  { kind: "twig", delay: 0.54, d: "M98 280 C134 268 171 248 205 220" },
  { kind: "twig", delay: 0.62, d: "M117 232 C97 210 80 183 66 151" },
  { kind: "twig", delay: 0.7, d: "M155 186 C189 173 223 152 257 124" },
  { kind: "twig", delay: 0.78, d: "M190 144 C173 122 156 95 138 63" },
  { kind: "twig", delay: 0.86, d: "M214 116 C246 105 278 89 311 62" },
  { kind: "twig", delay: 0.94, d: "M178 254 C209 246 240 231 268 209" },
  { kind: "twig", delay: 1.02, d: "M226 205 C252 196 278 182 304 160" },
  { kind: "twig", delay: 1.1, d: "M144 313 C168 331 189 354 206 384" },
  { kind: "leaf", delay: 0.74, d: "M44 108 C67 73 104 47 147 38 C138 82 120 118 90 148 C57 143 37 129 44 108 Z" },
  { kind: "vein", delay: 0.88, d: "M95 47 C101 78 97 110 82 140" },
  { kind: "leaf", delay: 0.88, d: "M82 166 C116 145 158 135 202 140 C174 173 145 205 108 230 C76 216 68 186 82 166 Z" },
  { kind: "vein", delay: 1.0, d: "M126 147 C134 174 128 203 108 224" },
  { kind: "leaf", delay: 1.02, d: "M132 218 C166 198 208 188 251 194 C224 225 196 258 160 283 C127 269 117 239 132 218 Z" },
  { kind: "vein", delay: 1.14, d: "M176 199 C184 227 177 255 158 277" },
  { kind: "leaf", delay: 1.16, d: "M182 68 C219 56 259 56 300 67 C273 89 241 115 202 133 C178 117 169 88 182 68 Z" },
  { kind: "vein", delay: 1.28, d: "M223 63 C229 86 221 109 204 129" },
  { kind: "leaf", delay: 1.28, d: "M236 116 C270 106 306 109 342 124 C315 144 285 168 249 182 C226 166 220 138 236 116 Z" },
  { kind: "vein", delay: 1.4, d: "M275 112 C281 134 273 156 256 176" },
  { kind: "leaf", delay: 1.4, d: "M286 170 C320 162 356 166 391 182 C364 201 335 223 301 236 C277 220 271 191 286 170 Z" },
  { kind: "vein", delay: 1.52, d: "M324 167 C329 189 321 210 305 229" },
  { kind: "leaf", delay: 1.52, d: "M165 270 C183 306 182 347 167 386 C131 361 105 330 89 291 C112 270 138 262 165 270 Z" },
  { kind: "vein", delay: 1.64, d: "M153 282 C151 317 141 350 121 379" },
  { kind: "leaf", delay: 1.64, d: "M226 226 C242 262 241 300 226 338 C191 312 165 282 148 244 C171 225 198 217 226 226 Z" },
  { kind: "vein", delay: 1.76, d: "M214 238 C212 271 203 302 184 330" },
  { kind: "leaf", delay: 1.76, d: "M92 332 C122 347 150 369 173 399 C141 401 111 394 84 381 C79 360 81 345 92 332 Z" },
  { kind: "vein", delay: 1.88, d: "M112 345 C134 360 151 377 164 395" },
  { kind: "berry", delay: 1.3, d: "M145 166 C153 160 163 161 168 169 C167 179 160 186 151 188 C143 184 140 176 145 166 Z" },
  { kind: "berry", delay: 1.48, d: "M234 196 C242 190 251 191 257 199 C255 208 248 214 240 216 C233 212 230 204 234 196 Z" },
  { kind: "berry", delay: 1.66, d: "M306 246 C314 240 323 241 329 249 C328 258 321 264 313 266 C305 262 302 254 306 246 Z" },
  { kind: "berry", delay: 1.82, d: "M184 317 C192 311 201 312 207 320 C206 329 199 336 191 338 C183 334 180 325 184 317 Z" },
];

function createSvgNode(tagName) {
  return document.createElementNS(SVG_NS, tagName);
}

function createGradient(id, stops) {
  const gradient = createSvgNode("linearGradient");

  gradient.setAttribute("id", id);
  gradient.setAttribute("x1", "0%");
  gradient.setAttribute("y1", "0%");
  gradient.setAttribute("x2", "100%");
  gradient.setAttribute("y2", "100%");

  stops.forEach(({ offset, color, opacity }) => {
    const stop = createSvgNode("stop");
    stop.setAttribute("offset", offset);
    stop.setAttribute("stop-color", color);
    stop.setAttribute("stop-opacity", opacity);
    gradient.appendChild(stop);
  });

  return gradient;
}

function createRadialGradient(id, stops) {
  const gradient = createSvgNode("radialGradient");

  gradient.setAttribute("id", id);
  gradient.setAttribute("cx", "50%");
  gradient.setAttribute("cy", "50%");
  gradient.setAttribute("r", "58%");
  gradient.setAttribute("fx", "35%");
  gradient.setAttribute("fy", "32%");

  stops.forEach(({ offset, color, opacity }) => {
    const stop = createSvgNode("stop");
    stop.setAttribute("offset", offset);
    stop.setAttribute("stop-color", color);
    stop.setAttribute("stop-opacity", opacity);
    gradient.appendChild(stop);
  });

  return gradient;
}

function createCornerDefs(frameIndex, cornerIndex) {
  const defs = createSvgNode("defs");
  const suffix = `${frameIndex}-${cornerIndex}`;

  defs.appendChild(
    createGradient(`leafGradient-${suffix}`, [
      { offset: "0%", color: "#eef3dd", opacity: "0.82" },
      { offset: "56%", color: "#a8ba7f", opacity: "0.32" },
      { offset: "100%", color: "#6f7e53", opacity: "0.08" },
    ]),
  );

  defs.appendChild(
    createGradient(`berryGradient-${suffix}`, [
      { offset: "0%", color: "#ddd4b6", opacity: "0.88" },
      { offset: "45%", color: "#9da66e", opacity: "0.48" },
      { offset: "100%", color: "#7f8456", opacity: "0.16" },
    ]),
  );

  return defs;
}

const peonyShape = [
  { kind: "stem", delay: 0.0, d: "M42 292 C84 256 120 216 154 176 C188 136 230 102 286 70" },
  { kind: "stem", delay: 0.08, d: "M118 282 C140 244 165 212 198 184" },
  { kind: "accent", delay: 0.16, d: "M194 182 C216 167 241 154 270 146" },
  { kind: "leaf", delay: 0.18, d: "M118 252 C88 231 67 198 58 161 C96 166 131 180 160 206 C156 237 142 254 118 252 Z" },
  { kind: "leaf-vein", delay: 0.32, d: "M74 168 C103 184 128 206 149 233" },
  { kind: "leaf", delay: 0.3, d: "M174 226 C150 194 141 152 146 108 C186 128 215 154 236 189 C222 216 200 228 174 226 Z" },
  { kind: "leaf-vein", delay: 0.44, d: "M160 121 C184 145 201 169 214 198" },
  { kind: "leaf", delay: 0.42, d: "M228 178 C215 145 216 108 231 72 C265 91 290 117 309 151 C301 176 274 186 228 178 Z" },
  { kind: "leaf-vein", delay: 0.56, d: "M241 84 C261 107 277 129 291 155" },
  { kind: "petal-soft", delay: 0.52, d: "M226 118 C210 89 211 56 231 28 C256 42 274 69 284 102 C271 124 247 129 226 118 Z" },
  { kind: "petal", delay: 0.6, d: "M247 122 C227 103 216 76 216 47 C248 49 277 60 301 82 C299 109 277 124 247 122 Z" },
  { kind: "petal-soft", delay: 0.68, d: "M272 124 C261 94 267 60 289 33 C312 54 325 84 327 117 C312 134 288 137 272 124 Z" },
  { kind: "petal", delay: 0.76, d: "M295 135 C291 104 301 75 326 53 C342 77 348 108 344 139 C329 150 307 150 295 135 Z" },
  { kind: "petal-soft", delay: 0.84, d: "M307 151 C319 123 341 103 369 89 C373 118 367 146 351 170 C331 177 314 169 307 151 Z" },
  { kind: "petal", delay: 0.92, d: "M290 160 C320 151 349 157 374 177 C357 199 332 214 302 220 C283 205 278 178 290 160 Z" },
  { kind: "petal-soft", delay: 1.0, d: "M257 160 C281 165 301 181 313 205 C287 215 261 215 237 204 C223 186 231 165 257 160 Z" },
  { kind: "petal", delay: 1.08, d: "M225 146 C249 147 270 158 286 177 C272 201 250 215 221 220 C200 202 198 173 225 146 Z" },
  { kind: "center", delay: 1.18, d: "M260 130 C278 120 298 121 313 136 C309 158 292 171 270 176 C252 166 247 145 260 130 Z" },
  { kind: "calyx", delay: 1.24, d: "M206 138 C222 128 241 126 261 132 C248 149 233 162 214 172 C201 162 197 148 206 138 Z" },
  { kind: "petal-soft", delay: 0.92, d: "M133 150 C120 128 118 102 128 79 C149 88 166 102 179 121 C173 141 156 152 133 150 Z" },
  { kind: "petal", delay: 1.0, d: "M151 154 C145 129 150 105 166 87 C185 103 197 123 201 148 C190 161 168 165 151 154 Z" },
  { kind: "petal-soft", delay: 1.08, d: "M170 168 C171 143 181 121 198 104 C214 122 221 144 220 168 C208 180 187 182 170 168 Z" },
  { kind: "petal", delay: 1.16, d: "M147 176 C170 173 192 179 211 192 C199 210 180 222 156 227 C139 216 133 192 147 176 Z" },
  { kind: "center", delay: 1.28, d: "M162 155 C174 149 186 151 195 161 C191 176 179 184 165 186 C154 178 152 165 162 155 Z" },
  { kind: "calyx", delay: 1.34, d: "M120 167 C133 158 148 154 164 156 C154 171 141 184 124 193 C114 185 112 174 120 167 Z" },
  { kind: "petal-deep", delay: 1.18, d: "M93 114 C89 95 93 78 105 64 C122 73 134 86 141 102 C135 117 118 122 93 114 Z" },
  { kind: "calyx", delay: 1.3, d: "M84 118 C94 112 106 109 118 111 C111 122 101 132 90 139 C82 133 79 125 84 118 Z" },
  { kind: "accent", delay: 1.38, d: "M214 108 C229 96 246 87 265 81" },
  { kind: "accent", delay: 1.46, d: "M152 138 C165 129 179 123 194 119" },
];

function createPeonyDefs(frameIndex) {
  const defs = createSvgNode("defs");

  defs.appendChild(
    createRadialGradient(`peonyPetalSoft-${frameIndex}`, [
      { offset: "0%", color: "#fff8f5", opacity: "0.96" },
      { offset: "46%", color: "#f1d8da", opacity: "0.88" },
      { offset: "100%", color: "#d39aa4", opacity: "0.52" },
    ]),
  );

  defs.appendChild(
    createRadialGradient(`peonyPetalDeep-${frameIndex}`, [
      { offset: "0%", color: "#f9eeee", opacity: "0.94" },
      { offset: "38%", color: "#e2b8c0", opacity: "0.92" },
      { offset: "100%", color: "#b87582", opacity: "0.62" },
    ]),
  );

  defs.appendChild(
    createGradient(`peonyLeafGradient-${frameIndex}`, [
      { offset: "0%", color: "#f0f4e6", opacity: "0.82" },
      { offset: "48%", color: "#a8b68a", opacity: "0.44" },
      { offset: "100%", color: "#76825c", opacity: "0.16" },
    ]),
  );

  defs.appendChild(
    createRadialGradient(`peonyCenterGradient-${frameIndex}`, [
      { offset: "0%", color: "#fff4db", opacity: "0.98" },
      { offset: "42%", color: "#e7c396", opacity: "0.82" },
      { offset: "100%", color: "#b9874f", opacity: "0.48" },
    ]),
  );

  return defs;
}

function createCornerSvg(position, frameIndex, cornerIndex) {
  const svg = createSvgNode("svg");

  svg.setAttribute("class", `olive-corner olive-corner--${position}`);
  svg.setAttribute("viewBox", "0 0 420 420");
  svg.setAttribute("aria-hidden", "true");
  svg.appendChild(createCornerDefs(frameIndex, cornerIndex));

  cornerShape.forEach(({ kind, delay, d }) => {
    const path = createSvgNode("path");
    const stagger = cornerIndex * 0.12;

    path.setAttribute("class", `draw-path olive-corner__${kind}`);
    path.setAttribute("d", d);
    path.dataset.delay = `${(delay + stagger).toFixed(2)}`;

    if (kind === "leaf") {
      path.setAttribute("fill", `url(#leafGradient-${frameIndex}-${cornerIndex})`);
    } else if (kind === "berry") {
      path.setAttribute("fill", `url(#berryGradient-${frameIndex}-${cornerIndex})`);
    } else {
      path.setAttribute("fill", "none");
    }

    svg.appendChild(path);
  });

  return svg;
}

function createPeonySvg(frameIndex) {
  const svg = createSvgNode("svg");

  svg.setAttribute("class", "peony-corner peony-corner--tr");
  svg.setAttribute("viewBox", "0 0 380 320");
  svg.setAttribute("aria-hidden", "true");
  svg.appendChild(createPeonyDefs(frameIndex));

  peonyShape.forEach(({ kind, delay, d }) => {
    const path = createSvgNode("path");

    path.setAttribute("class", `draw-path peony-corner__${kind}`);
    path.setAttribute("d", d);
    path.dataset.delay = `${delay.toFixed(2)}`;

    if (kind === "leaf" || kind === "calyx") {
      path.setAttribute("fill", `url(#peonyLeafGradient-${frameIndex})`);
    } else if (kind === "petal-soft") {
      path.setAttribute("fill", `url(#peonyPetalSoft-${frameIndex})`);
    } else if (kind === "petal" || kind === "petal-deep") {
      path.setAttribute("fill", `url(#peonyPetalDeep-${frameIndex})`);
    } else if (kind === "center") {
      path.setAttribute("fill", `url(#peonyCenterGradient-${frameIndex})`);
    } else {
      path.setAttribute("fill", "none");
    }

    svg.appendChild(path);
  });

  return svg;
}

function shouldOrnamentSection(heading) {
  return !heading.closest(".venue");
}

function ornamentSections() {
  const headings = [...document.querySelectorAll(".section-heading")].filter(
    (heading) => shouldOrnamentSection(heading) && !heading.classList.contains("olive-section-frame"),
  );

  headings.forEach((heading, frameIndex) => {
    const ornament = heading.dataset.ornament === "peony" ? "peony" : "olive";

    heading.classList.add("olive-section-frame", `olive-section-frame--${ornament}`);

    if (ornament === "peony") {
      heading.appendChild(createPeonySvg(frameIndex));
      return;
    }

    cornerPositions.forEach((position, cornerIndex) => {
      heading.appendChild(createCornerSvg(position, frameIndex, cornerIndex));
    });
  });
}

function prepareOrnamentFrames() {
  const frames = [...document.querySelectorAll(".olive-section-frame")];
  const paths = document.querySelectorAll(".olive-section-frame .draw-path");

  paths.forEach((path) => {
    const delay = Number(path.dataset.delay || 0);
    const length = typeof path.getTotalLength === "function" ? path.getTotalLength() : 1;

    path.style.setProperty("--path-length", `${length}`);
    path.style.setProperty("--delay", `${delay}s`);
  });

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    frames.forEach((frame) => frame.classList.add("olive-section-frame--ready"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("olive-section-frame--ready");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.28,
      rootMargin: "0px 0px -10% 0px",
    },
  );

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      frames.forEach((frame) => observer.observe(frame));
    });
  });
}

function initializeScrollReveal() {
  const revealItems = [...document.querySelectorAll(".scroll-reveal")];
  if (!revealItems.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.24,
      rootMargin: "0px 0px -12% 0px",
    },
  );

  revealItems.forEach((item) => observer.observe(item));
}

function initializeAmbientVideos() {
  const videos = document.querySelectorAll(".ambient-video, .wind-video");
  if (!videos.length) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  videos.forEach((video) => {
    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    const playAttempt = video.play();
    if (playAttempt && typeof playAttempt.catch === "function") {
      playAttempt.catch(() => {});
    }
  });
}

function activateForms() {
  const forms = document.querySelectorAll(".detail-form");

  forms.forEach((form) => {
    const status = form.querySelector(".form-status");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!status) return;

      const formName = form.getAttribute("data-form-name") || "modulo";
      status.textContent = `${formName} pronto: per renderlo operativo bastera collegarlo a email, database o servizio form.`;
      form.reset();
    });
  });
}

function initializeGiftEnvelope() {
  const envelopeButton = document.querySelector(".envelope-button");
  const bankCard = document.getElementById("iban-regalo");

  if (!envelopeButton || !bankCard) return;

  envelopeButton.addEventListener("click", () => {
    const isOpen = envelopeButton.getAttribute("aria-expanded") === "true";

    envelopeButton.setAttribute("aria-expanded", `${!isOpen}`);
    bankCard.hidden = isOpen;
  });
}

initializeScrollReveal();
initializeAmbientVideos();
activateForms();
initializeGiftEnvelope();
