# Frame Sequence Findings

The supplied archive contains **75 PNG frames**, each rendered at **1280 × 720**. The sequence opens on a wide blue-hour city panorama and resolves into a close aerial night view of an illuminated broadcast tower. The central and right-hand sides are visually active, while the upper-left and lower-left regions can support high-contrast editorial type when protected by a subtle overlay.

The scroll experience will map page progress to these 75 frames with a request-animation-frame render loop and a smoothed target value, avoiding a one-frame-per-scroll-jump feel. Text will be staggered through the sequence in alternating left and right positions so it feels like a composed route through the city rather than a static caption layer.

Browser verification confirmed that the initial sticky sequence frame renders successfully behind the first left-aligned text station after the image-loading retry safeguard was added.

At approximately 25% scroll progress, browser verification showed **frame 019 / 075** alongside the second, right-aligned “LIGHT FINDS A WAY FORWARD.” text station. This confirms the zig-zag station timing and smoothed frame mapping remain synchronized beyond the initial sequence state.

The production Netlify verification confirmed that the homepage renders at the public URL and completes the optimized 75-frame preload successfully.

The high-resolution refinement preview confirmed that the opening section now uses the full original city frame rather than a solid fill, with no dark vignette applied and a visibly lighter, lower-opacity type overlay.

Production verification confirmed the same unfiltered high-resolution opening frame and reduced-opacity typography are live on the Netlify site.

Live diagnostics confirm that the production page requests the restored original PNG frame sequence from Netlify, including the first, middle, and final sequence frames.

The original frame requests completed in the browser, but the visual loading indicator did not advance consistently. The loader now records already-cached image completions as well as normal load/error events so the high-resolution sequence initializes reliably across reloads.

The first high-resolution upload completed successfully; a follow-up upload for the loader resilience adjustment received a Netlify 502 provider error. The site is therefore still serving the requested transparent high-resolution visual treatment, while the resilient loader adjustment awaits a successful retry.

The frame-only local verification starts directly on frame 001 and advances to frame 008 at 10% scroll without any opening, closing, or black spacer section. The supplied imagery now provides the entire visible surface.

The external full-resolution asset verification completed with the complete 75-frame sequence preloaded at 100%, preserving original frame quality while keeping the deployable application bundle small.

The tour-section verification confirmed the final **Book a Tour to Guangzhou, China** content is present after the accelerated frame sequence, and its content container applies the requested 70% opacity.

The motion refinement retains a smooth final frame progression with subtle text offset, while the tour finale is now corrected to use only a soft black surface rather than the final city frame.

Live Netlify verification after the refinement confirms that the tour section reports `background-image: none`, `background-color: rgba(8, 9, 12, 0.92)`, and the revised label `CITY / CURRENT — TOUR`. The first text station exposes a non-identity transform while scrolling, confirming the parallax offset is active.

The Netlify settings page did not render its interactive controls in the browser session during the requested site rename, so the configured hosting integration is used for the site-name update.

The renamed public endpoints have been verified: `https://guangzhou-tour.netlify.app` serves the production experience, and `https://github.com/V3DANT-lab/GUANGZHOU-TOUR` resolves as a public repository.
