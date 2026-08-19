# Scroll Frame Narrative — Design Direction

## Three possible approaches

| Theme Name | Very Brief Intro | Probability |
| --- | --- | --- |
| **City as Current** | A cinematic urban ascent that treats the supplied aerial sequence as a living current, with bright editorial type moving in measured counterpoint. | 0.08 |
| **Night Signal Ledger** | A monochrome urban research notebook with technical labels, thin rules, and unusually quiet cinematic pauses. | 0.05 |
| **Luminous Cartography** | A high-contrast route map in motion, using directional markers, staccato typography, and spatial fragments from the skyline. | 0.07 |

## Chosen Direction — City as Current

**Design Movement:** A blend of contemporary editorial cinema titles and neo-noir architectural photography.

**Core Principles:**

1. **Frame-first storytelling:** The city sequence is the primary visual object; text reveals give it narrative pressure without covering its defining landmarks.
2. **Alternating cadence:** Copy enters in a zig-zag path across the scroll so the page feels choreographed, not vertically stacked.
3. **Cinematic restraint:** Inky overlays, pale warm-white type, and a single kinetic red signal create enough hierarchy without competing with the footage.
4. **Visible continuity:** Frame changes interpolate through a smoothed scroll value, while copy transitions use only opacity and transform.

**Color Philosophy:** Midnight blue and near-black preserve the depth of the night footage. Warm ivory adds human editorial presence, while a brief vermilion accent behaves like a pulse or signal—not a decorative fill.

**Layout Paradigm:** A tall scroll canvas holds one sticky 16:9 frame viewport. A sequence of staggered copy blocks is positioned along the scroll track and alternates from left to right. A vertical progress line remains at the edge as an analogue marker of movement.

**Signature Elements:**

1. A fine red **signal index** that advances in sync with the frame sequence.
2. Offset editorial **text stations** whose alignment alternates on every narrative beat.
3. Frame count and location-like metadata set in a narrow monospaced face.

**Interaction Philosophy:** Scroll is the director. The page responds continuously rather than snapping between scenes; the user can scrub the footage forward and backward with the same visual coherence.

**Animation:** Frame selection follows a low-pass smoothing loop rendered through `requestAnimationFrame`. Text stations fade and translate by a maximum of 28 pixels. The visual system honours `prefers-reduced-motion` by removing copy drift while keeping static frame changes functional.

**Typography System:** **DM Serif Display** provides expansive, high-contrast headline moments; **Manrope** maintains clean body legibility; **IBM Plex Mono** handles frame counts, sequence labels, and indicators. Text is never centered by default.

**Brand Essence:** **An immersive city-flight narrative for audiences who want to feel the scale of a place before they understand it.** Personality: **cinematic, magnetic, composed**.

**Brand Voice:** Headlines are short, spatial, and declarative; microcopy behaves like a film slate. Example lines: “The city does not stand still.” and “Altitude changes the story.”

**Wordmark & Logo:** A small, abstract three-bar beacon mark rises out of a baseline, suggesting a skyline, a signal tower, and a frame counter at once.

**Signature Brand Color:** **Signal Vermilion — #FF4C3D.**
