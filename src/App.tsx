/* Design direction: City as Current — editorial cinematic titles, alternating text stations, and a restrained Signal Vermilion scroll index. */
import { useEffect, useRef, useState } from 'react'
import { FRAME_SOURCES } from './frameSources'
import './App.css'

const FRAME_COUNT = FRAME_SOURCES.length
const frameSources = FRAME_SOURCES

const stations = [
  {
    at: 0.04,
    side: 'left',
    label: 'Sequence / 01',
    copy: ['THE CITY', 'DOES NOT', 'STAND STILL.'],
    note: 'Blue hour: the grid begins to hum.',
  },
  {
    at: 0.25,
    side: 'right',
    label: 'Sequence / 02',
    copy: ['LIGHT FINDS', 'A WAY', 'FORWARD.'],
    note: 'Every window holds a signal.',
  },
  {
    at: 0.49,
    side: 'left',
    label: 'Sequence / 03',
    copy: ['ALTITUDE', 'CHANGES', 'THE STORY.'],
    note: 'A climb, measured in moving frames.',
  },
  {
    at: 0.73,
    side: 'right',
    label: 'Sequence / 04',
    copy: ['KEEP THE', 'HORIZON', 'IN SIGHT.'],
    note: 'The city extends beyond the visible.',
  },
  {
    at: 0.94,
    side: 'left',
    label: 'Sequence / 05',
    copy: ['THE SIGNAL', 'REMAINS', 'ALIVE.'],
    note: 'Frame 075 — continue the ascent.',
  },
]

const clamp = (value: number, min = 0, max = 1) => Math.min(Math.max(value, min), max)

function App() {
  const scrollTrackRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const targetProgressRef = useRef(0)
  const smoothProgressRef = useRef(0)
  const lastFrameRef = useRef(-1)
  const [loadedFrames, setLoadedFrames] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let mounted = true
    let loaded = 0

    const registerLoadedFrame = () => {
      loaded += 1
      if (mounted) setLoadedFrames(loaded)
    }

    imagesRef.current = frameSources.map((source) => {
      const image = new Image()
      image.decoding = 'async'
      let recorded = false

      const markLoaded = () => {
        if (recorded) return
        recorded = true
        registerLoadedFrame()
      }

      image.onload = markLoaded
      image.onerror = markLoaded
      image.src = source

      if (image.complete) queueMicrotask(markLoaded)
      return image
    })

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    const getScrollProgress = () => {
      const track = scrollTrackRef.current
      if (!track) return 0

      const bounds = track.getBoundingClientRect()
      const distance = track.offsetHeight - window.innerHeight
      return clamp(-bounds.top / Math.max(distance, 1))
    }

    const syncTarget = () => {
      targetProgressRef.current = getScrollProgress()
    }

    syncTarget()
    window.addEventListener('scroll', syncTarget, { passive: true })
    window.addEventListener('resize', syncTarget)

    return () => {
      window.removeEventListener('scroll', syncTarget)
      window.removeEventListener('resize', syncTarget)
    }
  }, [])

  useEffect(() => {
    let animationFrame = 0

    const drawFrame = (image: HTMLImageElement) => {
      const canvas = canvasRef.current
      if (!canvas || !image.complete || !image.naturalWidth) return false

      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      if (canvas.width !== Math.floor(viewportWidth * dpr) || canvas.height !== Math.floor(viewportHeight * dpr)) {
        canvas.width = Math.floor(viewportWidth * dpr)
        canvas.height = Math.floor(viewportHeight * dpr)
        canvas.style.width = `${viewportWidth}px`
        canvas.style.height = `${viewportHeight}px`
      }

      const context = canvas.getContext('2d')
      if (!context) return false

      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.clearRect(0, 0, viewportWidth, viewportHeight)

      const scale = Math.max(viewportWidth / image.naturalWidth, viewportHeight / image.naturalHeight)
      const drawWidth = image.naturalWidth * scale
      const drawHeight = image.naturalHeight * scale
      const drawX = (viewportWidth - drawWidth) / 2
      const drawY = (viewportHeight - drawHeight) / 2
      context.drawImage(image, drawX, drawY, drawWidth, drawHeight)
      return true
    }

    const render = () => {
      const delta = targetProgressRef.current - smoothProgressRef.current
      const interpolation = 0.1 + Math.min(Math.abs(delta) * 0.16, 0.06)
      smoothProgressRef.current += delta * interpolation

      if (Math.abs(delta) < 0.00012) smoothProgressRef.current = targetProgressRef.current

      const currentProgress = smoothProgressRef.current
      const frameIndex = Math.round(currentProgress * (FRAME_COUNT - 1))
      const frame = imagesRef.current[frameIndex]

      if (frame && frameIndex !== lastFrameRef.current && drawFrame(frame)) {
        lastFrameRef.current = frameIndex
      }

      setProgress((previous) => (Math.abs(previous - currentProgress) > 0.002 ? currentProgress : previous))
      animationFrame = requestAnimationFrame(render)
    }

    animationFrame = requestAnimationFrame(render)
    window.addEventListener('resize', () => {
      lastFrameRef.current = -1
    })

    return () => cancelAnimationFrame(animationFrame)
  }, [])

  const progressPercent = Math.round(progress * 100)
  const currentFrame = Math.min(FRAME_COUNT, Math.max(1, Math.round(progress * (FRAME_COUNT - 1)) + 1))

  return (
    <main className="story-shell">
      <section className="scroll-track" ref={scrollTrackRef} aria-label="City frame sequence">
        <div className="sticky-stage">
          <canvas ref={canvasRef} className="frame-canvas" aria-label="Cinematic city sequence animated by page scroll" />
          <div className="frame-vignette" aria-hidden="true" />
          <div className="frame-grain" aria-hidden="true" />

          <header className="stage-header">
            <div className="stage-header__wordmark">CITY / CURRENT</div>
            <div className="stage-header__frame">FRAME {String(currentFrame).padStart(3, '0')} <span>/ {FRAME_COUNT}</span></div>
          </header>

          <aside className="progress-rail" aria-label={`Sequence progress ${progressPercent}%`}>
            <span className="progress-rail__label">SCROLL</span>
            <span className="progress-rail__line"><i style={{ transform: `scaleY(${Math.max(progress, 0.014)})` }} /></span>
            <span className="progress-rail__percent">{String(progressPercent).padStart(2, '0')}</span>
          </aside>

          {stations.map((station) => {
            const distance = Math.abs(progress - station.at)
            const visibility = clamp(1 - distance / 0.16)
            const offset = (1 - visibility) * 26
            const parallaxY = clamp(progress - station.at, -0.18, 0.18) * -64
            const parallaxX = clamp(progress - station.at, -0.18, 0.18) * (station.side === 'left' ? 18 : -18)
            const entranceX = station.side === 'left' ? -offset : offset

            return (
              <article
                key={station.label}
                className={`text-station text-station--${station.side}`}
                style={{
                  opacity: visibility,
                  transform: `translate3d(${entranceX + parallaxX}px, ${offset + parallaxY}px, 0)`,
                  pointerEvents: visibility > 0.6 ? 'auto' : 'none',
                }}
              >
                <p className="text-station__label"><span></span>{station.label}</p>
                <h1>{station.copy.map((line) => <span key={line}>{line}</span>)}</h1>
                <p className="text-station__note">{station.note}</p>
              </article>
            )
          })}

          <div className={`loading-state ${loadedFrames >= FRAME_COUNT ? 'loading-state--complete' : ''}`}>
            <span>LOADING SEQUENCE</span>
            <b>{String(Math.round((loadedFrames / FRAME_COUNT) * 100)).padStart(2, '0')}%</b>
          </div>

          <div className="stage-footer">
            <span>GUANGZHOU / NIGHT FLIGHT</span>
            <span>V.01 — 2026</span>
          </div>
        </div>
      </section>

      <section className="tour-section" aria-labelledby="tour-title">
        <div className="tour-section__content">
          <p className="tour-section__eyebrow">CITY / CURRENT — TOUR</p>
          <h2 id="tour-title">BOOK A TOUR<br />TO <em>GUANGZHOU, CHINA.</em></h2>
          <p className="tour-section__copy">Step beyond the sequence and meet the city at street level—where every signal, skyline, and river crossing becomes part of the route.</p>
          <a className="tour-section__link" href="mailto:hello@example.com?subject=Book%20a%20Tour%20to%20Guangzhou">PLAN YOUR VISIT <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </main>
  )
}

export default App
