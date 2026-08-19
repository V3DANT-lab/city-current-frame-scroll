# City / Current

> **A scroll-directed, frame-by-frame city narrative built in React.**

City / Current turns a supplied aerial city sequence into an immersive web experience. Scrolling through the page smoothly advances a 75-frame canvas animation while editorial text stations alternate from left to right, creating a deliberate zig-zag narrative through the image sequence.

| Experience element | Implementation |
| --- | --- |
| **Frame sequence** | Seventy-five supplied frames, optimized as WebP assets for a lightweight full-viewport canvas sequence. |
| **Scroll synchronisation** | Page progress maps to the frame index through a smoothed `requestAnimationFrame` loop. |
| **Text choreography** | Five editorial text stations fade and move in alternating left/right positions at defined sequence progress points. |
| **Typography** | DM Serif Display for cinematic headline moments, Manrope for supporting copy, and IBM Plex Mono for sequence metadata. |
| **Responsive design** | The frame viewport, typography scale, progress rail, and text positioning adapt for compact screens. |

## Live site

The published frame-scroll experience is available at **[city-current-frame-scroll.netlify.app](https://city-current-frame-scroll.netlify.app)**.

## Local development

Install dependencies and start the local Vite development server with the following commands.

```bash
pnpm install
pnpm dev
```

Create an optimized production build with:

```bash
pnpm build
```

## Project structure

| Path | Purpose |
| --- | --- |
| `src/App.tsx` | Canvas renderer, image preloading, smoothed scroll-frame mapping, and narrative text stations. |
| `src/App.css` | The City as Current visual system, responsive composition, and frame-stage presentation. |
| `public/frames/` | The 75-frame WebP sequence used by the canvas renderer. |
| `ideas.md` | The approved design direction and interaction philosophy. |
| `frame-sequence-notes.md` | Frame analysis and browser verification notes. |

## Interaction model

The page uses a tall scroll track with a sticky viewport. Its current scroll position is transformed into a normalized value between 0 and 1, which selects the relevant animation frame. The displayed value follows the target through a short low-pass smoothing step, allowing the canvas and text stations to move cohesively in both scroll directions.

The implementation preloads the sequence in the browser and caps canvas device-pixel density to balance visual fidelity with smoothness. If reduced motion is requested, nonessential transition effects are removed while the frame sequence remains controllable by scroll.

## Author

**Vedu**  
Sales & Marketing

---

Built with React and Vite for an immersive frame-scroll study.
