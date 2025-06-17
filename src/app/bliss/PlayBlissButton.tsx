'use client'

import React, { useRef, useEffect, useState } from 'react'
import { usePlayback } from './PlaybackContext'

export default function PlayBlissButton() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const { audioRef, isPlaying, isBeenPlayed, play, pause } = usePlayback();

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

      {!isBeenPlayed && (
        <img
          className='animate-bounceHand'
          src="bliss/glove-hand.png"
          alt="Click me"
          style={{
            position: 'fixed',
            bottom: 100,
            right: 24,
            zIndex: 10,
            width: 64,
            pointerEvents: 'none',
            transformOrigin: 'bottom center',
          }}
        />
      )}

      <div
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 10,
          height: '64px',
          width: '64px',
          backgroundColor: '#ea43a3',
          borderRadius: '100px',
          color: 'white',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '48px',
          userSelect: 'none',
          justifyContent: 'center',
          display: 'flex',
          verticalAlign: 'middle',
          alignItems: 'center',
          textAlign: 'center',
        }}
        onClick={isPlaying ? pause : play}
      >
        {!isPlaying && !isBeenPlayed && <span className="absolute inset-0 rounded-full bg-pink-500 animate-radarPulse opacity-100 pointer-events-none -z-10"/>}
        {!isPlaying && !isBeenPlayed && <span className="absolute inset-0 rounded-full bg-pink-500 animate-radarPulse_2 delay-500 opacity-100 pointer-events-none -z-10"/>}
        <img
          src={isPlaying ? '/bliss/pause.svg' : '/bliss/play.svg'}
          alt={isPlaying ? 'Pause' : 'Play'}
          style={{
            height: '40%',
            width: '40%',
            pointerEvents: 'none',
          }}
        />
      </div>
    </>
  )
}
