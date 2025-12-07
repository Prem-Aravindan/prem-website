/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useTexture, Environment, Lightformer, RoundedBox } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

import lanyardTexture from '@/assets/lanyard.png';
import premImage from '@/assets/prem.png';

import * as THREE from 'three';

extend({ MeshLineGeometry, MeshLineMaterial });

// Loading placeholder component
function LanyardLoader() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      {/* Animated lanyard placeholder */}
      <div className="relative">
        {/* String */}
        <div className="w-0.5 h-24 bg-gradient-to-b from-gray-600 to-gray-500 mx-auto animate-pulse" />
        {/* Clip */}
        <div className="w-4 h-2 bg-gray-500 rounded-full mx-auto -mt-0.5 animate-pulse" />
        {/* Card */}
        <div className="w-20 h-28 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg mt-1 mx-auto border border-gray-700 animate-pulse flex items-center justify-center">
          <div className="w-12 h-12 bg-gray-700 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
}

export default function Lanyard({ position = [0, 0, 20], gravity = [0, -40, 0], fov = 20, transparent = true }: LanyardProps) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative z-0 w-full h-full flex justify-center items-center touch-none">
      {/* Show loader until canvas is ready */}
      {!isLoaded && <LanyardLoader />}
      <Canvas
        camera={{ position: position as unknown as THREE.Vector3, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl, camera }) => {
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1);
          camera.lookAt(position[0], position[1], 0);
          // Mark as loaded after a brief delay for physics to initialize
          setTimeout(() => setIsLoaded(true), 500);
        }}
        style={{ touchAction: 'none' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.5} />
          <Physics gravity={gravity as [number, number, number]} timeStep={isMobile ? 1 / 30 : 1 / 60}>
            <Band isMobile={isMobile} />
          </Physics>
          <Environment blur={0.75}>
          <Lightformer
            intensity={1.5}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={1.5}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={1.5}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={2}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }: BandProps) {
  const band = useRef<THREE.Mesh>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);
  
  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();
  
  const segmentProps = { canSleep: true, linearDamping: 4, angularDamping: 4 };
  
  const texture = useTexture(lanyardTexture);
  const premTexture = useTexture(premImage);
  
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState<boolean | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.5]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.5]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.5]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 0.8, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && typeof dragged === 'object') {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current) return;
        const lerped = (ref.current as any).lerped || new THREE.Vector3();
        if (!lerped) (ref.current as any).lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, lerped.distanceTo(ref.current.translation())));
        lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
        (ref.current as any).lerped = lerped;
      });
      curve.points[0].copy(j3.current!.translation());
      curve.points[1].copy(((j2.current as any)?.lerped as THREE.Vector3) || j2.current!.translation());
      curve.points[2].copy(((j1.current as any)?.lerped as THREE.Vector3) || j1.current!.translation());
      curve.points[3].copy(fixed.current.translation());
      if (band.current && band.current.geometry) {
        (band.current.geometry as any).setPoints(curve.getPoints(isMobile ? 16 : 32));
      }
      ang.copy(card.current!.angvel());
      rot.copy(card.current!.rotation());
      card.current!.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged && typeof dragged === 'object' ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              const target = e.target as HTMLElement & { releasePointerCapture: (id: number) => void };
              if (target?.releasePointerCapture) {
                target.releasePointerCapture(e.pointerId);
              }
              drag(false);
            }}
            onPointerDown={(e) => {
              const target = e.target as HTMLElement & { setPointerCapture: (id: number) => void };
              if (target?.setPointerCapture) {
                target.setPointerCapture(e.pointerId);
              }
              const cardPos = card.current?.translation() || { x: 0, y: 0, z: 0 };
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(cardPos as THREE.Vector3)));
            }}
          >
            {/* Card Body */}
            <RoundedBox args={[1, 1.5, 0.02]} radius={0.05} smoothness={4}>
              <meshStandardMaterial
                map={premTexture}
                roughness={1}
                metalness={0}
              />
            </RoundedBox>
            
            {/* Clip Ring */}
            <mesh position={[0, 0.8, 0]}>
              <torusGeometry args={[0.08, 0.01, 16, 32]} />
              <meshStandardMaterial color="#888888" metalness={1} roughness={0.2} />
            </mesh>
            
            {/* Clamp */}
            <mesh position={[0, 0.75, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.1, 16]} />
              <meshStandardMaterial color="#888888" metalness={1} roughness={0.2} />
            </mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        {/* @ts-ignore */}
        <meshLineGeometry attach="geometry" />
        {/* @ts-ignore */}
        <meshLineMaterial
          attach="material"
          color="#1a1a1a"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}
