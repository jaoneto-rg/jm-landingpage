'use client'

import React, { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, useGLTF } from '@react-three/drei'

// Sub-componente interno para usar o hook useGLTF dentro do Canvas
function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

// Fallback enquanto o modelo carrega
function LoadingFallback() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          border: '2px solid rgba(255,255,255,0.1)',
          borderTop: '2px solid rgba(255,255,255,0.6)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', letterSpacing: '0.05em' }}>
        Carregando modelo 3D…
      </span>
    </div>
  )
}

export default function ModelViewer3D({ modelUrl }: { modelUrl: string }) {
  const [isMobile, setIsMobile] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Configurações adaptadas por device
  const dpr: [number, number] = isMobile ? [1, 1] : [1, 1.5]

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#0a0a0a', position: 'relative' }}>
      {/* Spinner de loading enquanto o Canvas não terminou de montar */}
      {!isLoaded && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          <LoadingFallback />
        </div>
      )}

      <Canvas
        shadows={false}             // sombras custosas — desligadas para ganho de performance
        dpr={dpr}                   // DPR máximo 1 no mobile, 1.5 no desktop
        frameloop="demand"          // só renderiza frames quando há interação (enorme ganho de CPU/GPU)
        gl={{
          antialias: !isMobile,     // antialias só no desktop
          powerPreference: 'high-performance',
          alpha: false,
        }}
        camera={{ position: [0, 0, 5], fov: 45 }}
        onCreated={() => setIsLoaded(true)}
        style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.4s ease' }}
      >
        <Suspense fallback={null}>
          <Stage
            environment={isMobile ? null : 'city'} // sem HDR environment no mobile
            intensity={isMobile ? 0.8 : 0.5}
            shadows={false}                         // sombras de Stage também desligadas
          >
            <Model url={modelUrl} />
          </Stage>
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={!isMobile}     // zoom desabilitado no mobile para evitar conflito com scroll
          minDistance={2}
          maxDistance={10}
          autoRotate
          autoRotateSpeed={isMobile ? 0.3 : 0.5}  // rotação mais lenta no mobile
          enableDamping                             // damping suaviza movimento e reduz frames
          dampingFactor={0.08}
        />
      </Canvas>
    </div>
  )
}
