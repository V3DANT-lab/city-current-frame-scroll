# Frame Sequence Findings

The supplied archive contains **75 PNG frames**, each rendered at **1280 × 720**. The sequence opens on a wide blue-hour city panorama and resolves into a close aerial night view of an illuminated broadcast tower. The central and right-hand sides are visually active, while the upper-left and lower-left regions can support high-contrast editorial type when protected by a subtle overlay.

The scroll experience will map page progress to these 75 frames with a request-animation-frame render loop and a smoothed target value, avoiding a one-frame-per-scroll-jump feel. Text will be staggered through the sequence in alternating left and right positions so it feels like a composed route through the city rather than a static caption layer.

Browser verification confirmed that the initial sticky sequence frame renders successfully behind the first left-aligned text station after the image-loading retry safeguard was added.

At approximately 25% scroll progress, browser verification showed **frame 019 / 075** alongside the second, right-aligned “LIGHT FINDS A WAY FORWARD.” text station. This confirms the zig-zag station timing and smoothed frame mapping remain synchronized beyond the initial sequence state.
