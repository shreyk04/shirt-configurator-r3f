import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Canvas, useFrame } from '@react-three/fiber'
import { AccumulativeShadows, Center, Environment, OrbitControls, RandomizedLight, useGLTF } from '@react-three/drei'
import { Shirt } from './components/Shirt'
import { easing } from 'maath'
import Overlay from './components/Overlay'
import { useSnapshot } from 'valtio'
import { state } from './store'

function App({ position = [0, 0, 2.5], fov = 25 }) {

  return (
    <>

      <Canvas
        gl={{ preserveDrawingBuffer: true }}
        shadows
        camera={{ position, fov }}
        eventSource={document.getElementById('root')}
        eventPrefix="client">
        <ambientLight intensity={0.5} />
        <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />

        <CameraRig>
          <Center>
            <Shirt />
          </Center>
        </CameraRig>

      </Canvas>

      <Overlay />

    </>

  )
}



export default App


function Backdrop() {
  return <AccumulativeShadows
    temporal
    frames={60}
    alphaTest={0.85}
    scale={10}
    rotation={[Math.PI / 2, 0, 0]}
    position={[0, 0, -0.14]}>


    <RandomizedLight
      amount={4}
      radius={5}
      intensity={0.25}
      ambient={0.55}
      position={[-5, 5, -9]}
    />  </AccumulativeShadows>
}



function CameraRig({ children }) {
  const group = useRef();
  const snap = useSnapshot(state)

  useFrame((state, delta) => {
    if (group.current) {

      easing.damp3(
        state.camera.position,
        [snap.intro ? -state.viewport.width / 9 : 0, 0, 2],
        0.25,
        delta
      )

      // Dampen rotation smoothly based on pointer movement
      easing.dampE(
        group.current.rotation,
        [state.pointer.y / 10, -state.pointer.x / 5, 0],
        0.25,
        delta
      );
    }
  });

  return <group ref={group}>{children}</group>;
}
