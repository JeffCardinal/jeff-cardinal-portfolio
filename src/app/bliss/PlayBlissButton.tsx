'use client'

import React, { useRef, useState, useEffect } from 'react'
import { xt256 } from 'react-syntax-highlighter/dist/esm/styles/hljs'

export default function PlayBlissButton() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const NUM_BARS = 128

  useEffect(() => {
    if (!isPlaying || !audioRef.current || !canvasRef.current) return

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext()
    }
    const ctx = audioContextRef.current

    if (!sourceRef.current) {
      sourceRef.current = ctx.createMediaElementSource(audioRef.current)
    }

    if (!analyserRef.current) {
      analyserRef.current = ctx.createAnalyser()
      analyserRef.current.fftSize = 128
      sourceRef.current.connect(analyserRef.current)
      analyserRef.current.connect(ctx.destination)
    }

    const analyser = analyserRef.current
    const dataArray = new Uint8Array(analyser.frequencyBinCount)

    const canvas = canvasRef.current
    const canvasCtx = canvas.getContext('2d')!
    canvas.width = window.innerWidth / 3;
    canvas.height = 128

    function draw() {
      if (!isPlaying) return
      requestAnimationFrame(draw)
      analyser.getByteFrequencyData(dataArray)
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height)

      const maxFreqBin = 7000 / 172.27
      const barWidth = canvas.width / maxFreqBin
      for (let i = 0; i < maxFreqBin; i++) {
        const logIndex = Math.log10(1 + 9 * (i / maxFreqBin))
        const dataIndex = Math.floor(logIndex * maxFreqBin)
        const val = dataArray[dataIndex] || 0
        const boosted = Math.pow(val / 255, 1) * canvas.height
      
        canvasCtx.fillStyle = '#ea43a3'
        canvasCtx.fillRect(i * barWidth, canvas.height - boosted, barWidth * 0.75, boosted)
      }
    }

    draw()
  }, [isPlaying])

  const handleClick = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/bliss/Bliss-Loop.wav')
      audioRef.current.loop = true
      audioRef.current.preload = 'auto'
    }

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <>
      {isPlaying && (
        <canvas
          ref={canvasRef}
          style={{
            position: 'fixed',
            bottom: 20,
            left: 20,
            zIndex: 9,
            borderRadius: '8px',
            pointerEvents: 'none',
            width: '33.33vw',
            height: '128px',
          }}
        />
      )}

      <div
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 10,
          height: '50px',
          width: '50px',
          backgroundColor: '#ea43a3',
          borderRadius: '100px',
          color: 'white',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '32px',
          userSelect: 'none',
          justifyContent: 'center',
          display: 'flex',
        }}
        onClick={handleClick}
      >
        {isPlaying ? '⏸' : '⏵'}
      </div>
    </>
  )
}
