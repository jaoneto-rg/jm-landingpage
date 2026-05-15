'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, useGLTF, PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

export default function ModelViewer3D({ modelUrl }: { modelUrl: string }) {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#0a0a0a' }}>
      <Canvas shadows dpr={[1, 2]}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5} shadows={{ type: 'contact', opacity: 0.7, blur: 2 }}>
            <Model url={modelUrl} />
          </Stage>
        </Suspense>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minDistance={2} 
          maxDistance={10}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
