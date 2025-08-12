'use client'

import React, { useEffect, useMemo, useState, useRef } from 'react'
import { animate, motion, useAnimation } from 'framer-motion'
import SparkleSvg from "../svg/SparkleSvg";
import SineWavesBackground from './SineWaveBackground';
import { useIsMobileDevice } from '../hooks/useIsMobileDevice';

export default function CDSlideOutDemo() {
  const [isOut, setIsOut] = useState(false)
  const [spin, setSpin] = useState(true)
  const [coverUrl, setCoverUrl] = useState('windows-angel/WindowsAngel1kjpg.jpg')
  const [title, setTitle] = useState('Windows Angel')
  const [artist, setArtist] = useState('Dreaming Diary')
  const [tiltX, setTiltX] = useState(0)
  const [tiltY, setTiltY] = useState(0)
  const [wideX, setWideX] = useState(-200)
  const [wideX2, setWideX2] = useState(-200)
  const [glareX, setGlareX] = useState(50)
  const [glareY, setGlareY] = useState(50)
  const [barsOpaque, setBarsOpaque] = useState(true)
  const [lockTilt, setLockTilt] = useState(true) // intro lock
  const wrapperRef = useRef<HTMLDivElement>(null)

  const cdCtrl = useAnimation() //Jacket + CD
  const cd2Ctrl = useAnimation() //CD only
  const textCtrl = useAnimation()
  const infoCtrl = useAnimation()
  const rectCtrl = useAnimation()
  const rectCtrl2 = useAnimation()
  
  const rainbow = useMemo(() => buildCdGradient(), [])

  const [started, setStarted] = useState(false);

  const isMobile = useIsMobileDevice()
  const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 500

   // Mouse tilt handler (ignored during intro)
   useEffect(() => {
    const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))
    const handleMouseMove = (e: MouseEvent) => {
      if (!wrapperRef.current || lockTilt) return
      const rect = wrapperRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const maxTilt = 20

      const newTiltY = ((e.clientX - centerX) / (rect.width / 2)) * maxTilt
      const newTiltX = ((centerY - e.clientY) / (rect.height / 2)) * maxTilt

      setTiltX(clamp(newTiltX, -maxTilt, maxTilt))
      setTiltY(clamp(newTiltY, -maxTilt, maxTilt))

      const glareXPct = ((e.clientX - rect.left) / rect.width) * 100 + 25
      const glareYPct = ((e.clientY - rect.top) / rect.height) * 100
      setGlareX(clamp(glareXPct, 0, 100))
      setGlareY(clamp(glareYPct, 0, 100))
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [lockTilt])

 // Intro sequence
 useEffect(() => {
    let mounted = true
    const run = async () => {
      setTiltX(20)
      setTiltY(0)
      setGlareX(0)
      setGlareY(0)
  
      await cdCtrl.set({ x: '0%', y: -512, opacity: 0 })
  
      await cdCtrl.start({
        y: 0,
        opacity: 1,
        filter: ['blur(32px)', 'blur(0px)'],
        scale: [0.6, 1],
        transition: { duration: 0.3, ease: [0.42, 0.0, 1.0, 1.0] }
      })
      cdCtrl.set({ filter: 'none' })

      const tiltXAnim = animate(20, 0, {
        duration: 0.8, ease: [0.22, 1, 0.36, 1],
        onUpdate: v => mounted && setTiltX(v),
      })
      const tiltYAnim = animate(0, -20, {
        duration: 0.8, ease: [0.22, 1, 0.36, 1],
        onUpdate: v => mounted && setTiltY(v),
      })

      const glareXAnim = animate(100, 0, {
        duration: 0.8, ease: [0.22, 1, 0.36, 1],
        onUpdate: v => mounted && setGlareX(v),
      })
      const glareYAnim = animate(0, 50, {
        duration: 0.8, ease: [0.22, 1, 0.36, 1],
        onUpdate: v => mounted && setGlareY(v),
      })

      animate(0, 1, {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: latest => infoCtrl.set({ opacity: latest })
      })
      setTimeout(() => {
        animate(
          { x: '-100%', opacity: 0 },
          { x: '0%', opacity: 1 },
          {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: latest => textCtrl.set(latest)
          }
        )
      }, 100)
  
      const textIn = textCtrl.start({
        x: '0%',
        opacity: 1,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }
      })

      setTimeout(() => {
        animate(-100, 500, {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: v => mounted && setWideX(v),
        })
      }, 200) 

      setTimeout(() => {
        animate(-100, 500, {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: v => mounted && setWideX2(v),
        })
      }, 100) 
      
      cdCtrl.start({
        x: '-25%',
        // opacity: 1,
        // filter: ['blur(32px)', 'blur(0px)'],
        // scale: [0.6, 1],
        transition: { type: 'spring', stiffness: 1000, damping: 100 }
      })

      cd2Ctrl.start({
        x: (isMobile || isSmallScreen) ? '50%' : '50%',
        transition: { type: 'spring', stiffness: 1000, damping: 100 }
      })
    
      await textIn
      textCtrl.start({
        x: '300%',
        opacity: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
      })

      setLockTilt(false)
      await Promise.all([tiltXAnim.finished, tiltYAnim.finished])
    }
  
    run()
    return () => { mounted = false }
  }, [])
  

  const dropDur = 0.0
  const tiltDelay = dropDur
  const ejectDelay = tiltDelay
  const textDelay = ejectDelay + 0.15

  const jacketRotateY = isOut ? 0 : 0

  const sharpShadow = (px = 1, a = 0.5) => `${px}px ${px}px 2px rgba(0,0,0,${a})`

  return (
    <>
    <SineWavesBackground/>
    <div className="w-full min-h-[100dvh] flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white px-6">
  <div className="w-full max-w-5xl mx-auto h-full">
    <div className="flex items-center justify-center h-full">
          <div
            ref={wrapperRef}
            style={{ perspective: '800px' }}
            className="relative md:[perspective:1000px]"
          >
            <motion.div
              animate={cdCtrl}
              className="relative w-[240px] sm:w-[240px] md:w-[440px] aspect-square [transform-style:preserve-3d] will-change-transform"
              style={{
                rotateX: tiltX,
                rotateY: tiltY,
                transformOrigin: 'center center',
                // filter: 'blur(var(--blur, 0px))'
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 12 }}
            >
                <motion.div animate={infoCtrl} className="opacity-0 absolute -top-4 -left-4 z-50" style={{ transform: 'translateZ(24px)' }}>
                    <div className="bg-white/50 border border-white/80 rounded-xl px-2 pt-1 shadow-lg relative">
                    <div className="text-xs text-white tracking-widest uppercase" style={{ textShadow: sharpShadow(1, 0.5) }}>{artist}</div>
                    <div className="text-lg text-white sm:text-xl font-semibold tracking-wide" style={{ textShadow: sharpShadow(1, 0.5) }}>{title}</div>
                    </div>
                </motion.div>
                <motion.div animate={infoCtrl} className="opacity-0 absolute -bottom-4 -right-4 z-50" style={{ transform: 'translateZ(24px)' }}>
                    <div className="bg-purple-800/50 border border-purple-200/80 rounded-xl p-1 px-2 shadow-lg">
                        <span className="text-lg text-purple-200 tracking-widest font-bold uppercase inline-flex items-center gap-1" style={{ textShadow: sharpShadow(1, 0.5) }}>
                            <SparkleSvg color="white" dim="12px" />
                            RARE
                        </span>
                    </div>
                </motion.div>
              <motion.div
                animate={infoCtrl}
                className="absolute opacity-0 inset-0 rounded-[24px] pointer-events-none"
                style={{
                  transform: 'translateZ(-48px) scale(1.25)',
                  background:
                    'radial-gradient(120% 90% at 20% 20%, rgba(251,133,193,.5), transparent 50%), radial-gradient(120% 90% at 80% 80%, rgba(56,189,248,.5), transparent 50%)',
                  filter: 'blur(16px)'
                }}
              />

              <div
                className="relative w-[240px] sm:w-[240px] md:w-[440px] aspect-square [transform-style:preserve-3d]"
                onMouseEnter={() => setIsOut(true)}
                onMouseLeave={() => setIsOut(false)}
              >
                {/* Cover Jacket */}
                <motion.div
                  animate={{ y: isOut ? 0 : 0, rotateY: isOut ? jacketRotateY : 0 }}
                  className="absolute inset-0 rounded-[12px] shadow-xl overflow-visible ring-1 ring-white/50 will-change-transform z-30"
                >
                  {/* COVER ART as real layer so blend-modes work */}
                  <div className="absolute inset-0 rounded-[12px] overflow-hidden z-0">
                    <div className="absolute inset-0" style={{
                      background: coverUrl
                        ? `url(${coverUrl}) center/cover no-repeat`
                        : `linear-gradient(135deg, #0b1020 0%, #101827 38%, #0f172a 100%)`
                    }} />
                  </div>

                  {/* subtle holo gradient that blends with cover */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none z-10"
                    style={{
                      background:       `linear-gradient(45deg, rgba(255,0,200,.5), rgba(0,255,255,.5) 40%, rgba(255,255,0,.5) 70%, rgba(255,0,200,.5))`,
                      mixBlendMode:     'hard-light',
                      WebkitMaskImage:  `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,1) 0%, rgba(255,255,255,.90) 20%, rgba(255,255,255,0) 50%)`,
                      maskImage:        `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,1) 0%, rgba(255,255,255,.90) 20%, rgba(255,255,255,0) 50%)`,
                      opacity: 1
                    }}
                  />
                  
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none z-10"
                    style={{
                      background:       `linear-gradient(45deg, rgba(255,0,200,.5), rgba(0,255,255,.5) 40%, rgba(255,255,0,.5) 70%, rgba(255,0,200,.5))`,
                      mixBlendMode:     'hard-light',
                      WebkitMaskImage:  `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,1) 0%, rgba(255,255,255,.90) 25%, rgba(255,255,255,0) 50%)`,
                      maskImage:        `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,1) 0%, rgba(255,255,255,.90) 25%, rgba(255,255,255,0) 50%)`,
                      opacity: 1
                    }}
                  />

                  {/* HOLOTEX overlay (simple + radial mask that tracks mouse) */}
                  <div
                    className="absolute inset-0 rounded-2xl z-10 pointer-events-none"
                    style={{
                      backgroundImage: `url(windows-angel/holotex-sparkle-1k.png)`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      mixBlendMode: 'hard-light',
                      WebkitMaskImage: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,1) 0%, rgba(255,255,255,.75) 10%, rgba(255,255,255,.50) 20%, rgba(255,255,255,0) 40%)`,
                      maskImage:       `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,1) 0%, rgba(255,255,255,.75) 10%, rgba(255,255,255,.50) 20%, rgba(255,255,255,0) 40%)`,
                      opacity: 1
                    }}
                  />

                  <div
                    className="absolute inset-0 rounded-2xl z-10 pointer-events-none"
                    style={{
                      backgroundImage: `url(windows-angel/holotex-sparkle-1k-blur.png)`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      mixBlendMode: 'hard-light',
                      WebkitMaskImage: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,1) 0%, rgba(255,255,255,.75) 10%, rgba(255,255,255,.50) 50%, rgba(255,255,255,0) 75%)`,
                      maskImage:       `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,1) 0%, rgba(255,255,255,.75) 10%, rgba(255,255,255,.50) 50%, rgba(255,255,255,0) 75%)`,
                      opacity: 1
                    }}
                  />

                  {/* Parallax rectangle glares (clipped to jacket, above holotex, below pills) */}
                  <motion.div animate={rectCtrl} className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden" style={{ zIndex: 22 }}>
                    <div
                      style={{
                        position: 'absolute',
                        top: '-100%',
                        width: '22%', height: '300%',
                        background: barsOpaque ? '#ffffff' : 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.45) 40%, rgba(255,255,255,0.12) 70%, rgba(255,255,255,0) 100%)',
                        transform: `translateX(${wideX}px) rotate(15deg)`,
                        opacity: 1,
                        mixBlendMode: 'screen',
                        filter: 'blur(64px)'
                      }}
                    />
                  </motion.div>
                  <motion.div animate={rectCtrl2} className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden" style={{ zIndex: 22 }}>
                    <div
                      style={{
                        position: 'absolute',
                        top: '-100%',
                        width: '11%', height: '300%',
                        background: barsOpaque ? '#ffffff' : 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.45) 40%, rgba(255,255,255,0.12) 70%, rgba(255,255,255,0) 100%)',
                        transform: `translateX(${wideX2}px) rotate(15deg)`,
                        opacity: 1,
                        mixBlendMode: 'screen',
                        filter: 'blur(16px)'
                      }}
                    />
                  </motion.div>
                </motion.div>

                {/* CD */}
                <motion.div
                    aria-label="CD"
                    initial={{ x: 0, y: 0 }}
                    animate={cd2Ctrl}
                    transition={{
                        x: { delay: ejectDelay, type: 'spring', stiffness: 1000, damping: 100 },
                    }}
                    className="absolute -top-0 right-[-0%] size-[240px] sm:size-[240px] md:size-[440px] z-20 will-change-transform overflow-hidden rounded-full"
                    
                    // Fully transparent hole
                    style={{
                        transform: `${isOut ? 'translateZ(16px)' : 'translateZ(-24px)'} rotateY(12deg) translateY(-50%)`,
                        // filter: 'drop-shadow(0 10px 30px rgba(0,0,0,.6))',
                        WebkitMaskImage: 'radial-gradient(circle at 50% 50%, transparent 0 9.25%, #000 9.25% 100%)',
                        maskImage:       'radial-gradient(circle at 50% 50%, transparent 0 9.25%, #000 9.25% 100%)',
                    }}
                    >

                    {/* CD Soft Glass — 9.25% → 30% */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            WebkitMaskImage: 'radial-gradient(circle at center, transparent 0 9.25%, #000 9.25% 30%, transparent 30% 100%)',
                            maskImage:       'radial-gradient(circle at center, transparent 0 9.25%, #000 9.25% 30%, transparent 30% 100%)',
                        }}
                    />

                    {/* CD Light Ring — 24% → 25% */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle at 50% 10%, #FFFFFF 0%, #EEEEEE 30%, rgba(0,0,0,0) 55%)',
                            WebkitMaskImage: 'radial-gradient(circle at center, transparent 0 24%, #000 24% 25%, transparent 25% 100%)',
                            maskImage:       'radial-gradient(circle at center, transparent 0 24%, #000 24% 25%, transparent 25% 100%)',
                            mixBlendMode: 'hard-light',
                        }}
                    />

                    {/* CD Light Ring — 15% → 16% */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle at 50% 10%, #FFFFFF 35%, #808080 40%, rgba(0,0,0,0) 45%)',
                            WebkitMaskImage: 'radial-gradient(circle at center, transparent 0 9.25%, #000 9.25% 10.25%, transparent 10.25% 100%)',
                            maskImage:       'radial-gradient(circle at center, transparent 0 9.25%, #000 9.25% 10.25%, transparent 10.25% 100%)',
                            mixBlendMode: 'hard-light',
                        }}
                    />

                    {/* CD Black Ring — 28% → 30% */}
                    <div
                        className="absolute inset-0  pointer-events-none"
                        style={{
                            background: 'radial-gradient(at top, #808080, #333333, #000000)',
                            WebkitMaskImage: 'radial-gradient(circle at center, transparent 0 28%, #000 28% 30%, transparent 30% 100%)',
                            maskImage:       'radial-gradient(circle at center, transparent 0 28%, #000 28% 30%, transparent 30% 100%)',
                        }}
                    />

                    {/* Rainbow ring — 30% → 98% */}
                    <motion.div
                        animate={{ rotateZ: spin ? 360 : 0 }}
                        transition={{
                            rotateZ: spin ? { repeat: Infinity, ease: 'linear', duration: 6 } : { duration: 0.3 },
                        }}
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: rainbow,
                            WebkitMaskImage: 'radial-gradient(circle at center, transparent 0 30%, #000 30% 100%)',
                            maskImage:       'radial-gradient(circle at center, transparent 0 30%, #000 30% 100%)',
                        }}
                    />

                    {/* CD HOLE glare */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.0) 40%)`,
                        mixBlendMode: 'screen',
                        WebkitMaskImage: 'radial-gradient(circle at center, transparent 9.25%, black 9.25%, black 100%, transparent 100%)',
                        maskImage: 'radial-gradient(circle at center, transparent 9.25%, black 9.25%, black 100%, transparent 100%)',
                        opacity: 0.5
                        }}
                    />
                </motion.div>

                <motion.div
                  initial={{ x: '-100%', opacity: 0 }}
                //   animate={{ x: isOut ? '0%' : '-100%', opacity: isOut ? 1 : 0 }}
                    animate={textCtrl}
                  transition={{ delay: textDelay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-10 left-0 z-10 will-change-transform"
                //   style={{ transform: 'translateZ(30px)' }}
                >
                  <span className="text-3xl md:text-4xl font-distancia">GOT IT!</span>
                </motion.div>

              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

function buildCdGradient() {
    // Base metallic disc
    const metallicBase =
      'radial-gradient(circle at 50% 50%, rgba(255,255,255,.9) 0%, rgba(242,242,242,1) 30%, rgba(218,218,218,1) 58%, rgba(195,195,195,1) 75%, rgba(175,175,175,1) 100%)'
  
    // Conic banding (gives that pressed foil vibe)
    const silverBanding =
      'repeating-conic-gradient(from 0deg, rgba(255,255,255,.06) 0deg 2deg, rgba(0,0,0,.04) 2deg 4deg, transparent 4deg 6deg)'
  
    // Rainbow diffraction (primary)
    const rainbowMain =
      'conic-gradient(from 0deg at 50% 50%, rgba(255,255,0,.9) 0deg, rgba(255,0,255,.9) 30deg, rgba(0,255,255,.9) 60deg, rgba(120,255,120,.9) 90deg, rgba(80,160,255,.9) 120deg, rgba(255,160,80,.9) 150deg, rgba(255,255,0,.9) 180deg, rgba(255,0,255,.9) 210deg, rgba(0,255,255,.9) 240deg, rgba(120,255,120,.9) 270deg, rgba(80,160,255,.9) 300deg, rgba(255,160,80,.9) 330deg, rgba(255,255,0,.9) 360deg)'
  
    // Secondary white sheen bands to break up color for silver look
    const rainbowSheen =
      'conic-gradient(from 20deg at 50% 50%, rgba(255,255,255,.35) 0 20deg, transparent 20deg 60deg, rgba(255,255,255,.25) 60deg 90deg, transparent 90deg 130deg, rgba(255,255,255,.35) 130deg 170deg, transparent 170deg 210deg, rgba(255,255,255,.25) 210deg 260deg, transparent 260deg 320deg, rgba(255,255,255,.35) 320deg 360deg)'
  
    // Rim + inner ring sheen to simulate pressed edge
    const ringSheen =
      'radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 54%, rgba(255,255,255,.10) 60%, rgba(255,255,255,.16) 66%, rgba(0,0,0,.12) 70%, rgba(0,0,0,0) 78%)'

    const ringSheen2 =
      'radial-gradient(circle closest-side at 50% 50%, rgba(255,255,255,0) 98%, rgba(255,255,255,1) 99% 100%)';
  
    // Order matters: first = topmost
    return [
    //   ringSheen,
      ringSheen2,
      rainbowSheen,
      rainbowMain,
      silverBanding,
      metallicBase
    ].join(', ')
}
