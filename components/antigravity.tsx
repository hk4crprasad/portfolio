"use client";

/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type ParticleShape = "capsule" | "sphere" | "box" | "tetrahedron";

type AntigravityProps = {
  count?: number;
  magnetRadius?: number;
  ringRadius?: number;
  waveSpeed?: number;
  waveAmplitude?: number;
  particleSize?: number;
  lerpSpeed?: number;
  color?: string;
  autoAnimate?: boolean;
  particleVariance?: number;
  rotationSpeed?: number;
  depthFactor?: number;
  pulseSpeed?: number;
  particleShape?: ParticleShape;
  fieldStrength?: number;
};

type Particle = {
  t: number; speed: number; mx: number; my: number; mz: number;
  cx: number; cy: number; cz: number; randomRadiusOffset: number;
};

function AntigravityInner({
  count = 180,
  magnetRadius = 8,
  ringRadius = 6.5,
  waveSpeed = .45,
  waveAmplitude = .9,
  particleSize = .92,
  lerpSpeed = .07,
  color = "#c7f46d",
  autoAnimate = true,
  particleVariance = .7,
  rotationSpeed = .08,
  depthFactor = .75,
  pulseSpeed = 2.5,
  particleShape = "capsule",
  fieldStrength = 10,
}: AntigravityProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const lastMouseMoveTime = useRef(0);
  const virtualMouse = useRef({ x: 0, y: 0 });

  const particles = useMemo<Particle[]>(() => {
    const width = viewport.width || 100;
    const height = viewport.height || 100;
    return Array.from({ length: count }, () => {
      const x = (Math.random() - .5) * width;
      const y = (Math.random() - .5) * height;
      const z = (Math.random() - .5) * 20;
      return {
        t: Math.random() * 100,
        speed: .01 + Math.random() / 200,
        mx: x, my: y, mz: z,
        cx: x, cy: y, cz: z,
        randomRadiusOffset: (Math.random() - .5) * 2,
      };
    });
  }, [count, viewport.height, viewport.width]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const mouseDistance = Math.hypot(state.pointer.x - lastMousePosition.current.x, state.pointer.y - lastMousePosition.current.y);
    if (mouseDistance > .001) {
      lastMouseMoveTime.current = Date.now();
      lastMousePosition.current = { x: state.pointer.x, y: state.pointer.y };
    }

    let destinationX = state.pointer.x * viewport.width / 2;
    let destinationY = state.pointer.y * viewport.height / 2;
    if (autoAnimate && Date.now() - lastMouseMoveTime.current > 2000) {
      const time = state.clock.getElapsedTime();
      destinationX = Math.sin(time * .5) * viewport.width / 4;
      destinationY = Math.cos(time) * viewport.height / 4;
    }
    virtualMouse.current.x += (destinationX - virtualMouse.current.x) * .05;
    virtualMouse.current.y += (destinationY - virtualMouse.current.y) * .05;
    const rotation = state.clock.getElapsedTime() * rotationSpeed;

    particles.forEach((particle, index) => {
      particle.t += particle.speed / 2;
      const projection = 1 - particle.cz / 50;
      const targetX = virtualMouse.current.x * projection;
      const targetY = virtualMouse.current.y * projection;
      const dx = particle.mx - targetX;
      const dy = particle.my - targetY;
      const distance = Math.hypot(dx, dy);
      let x = particle.mx;
      let y = particle.my;
      let z = particle.mz * depthFactor;

      if (distance < magnetRadius) {
        const angle = Math.atan2(dy, dx) + rotation;
        const wave = Math.sin(particle.t * waveSpeed + angle) * .5 * waveAmplitude;
        const deviation = particle.randomRadiusOffset * (5 / (fieldStrength + .1));
        const currentRingRadius = ringRadius + wave + deviation;
        x = targetX + currentRingRadius * Math.cos(angle);
        y = targetY + currentRingRadius * Math.sin(angle);
        z = particle.mz * depthFactor + Math.sin(particle.t) * waveAmplitude * depthFactor;
      }

      particle.cx += (x - particle.cx) * lerpSpeed;
      particle.cy += (y - particle.cy) * lerpSpeed;
      particle.cz += (z - particle.cz) * lerpSpeed;
      dummy.position.set(particle.cx, particle.cy, particle.cz);
      dummy.lookAt(targetX, targetY, particle.cz);
      dummy.rotateX(Math.PI / 2);
      const distanceToMouse = Math.hypot(particle.cx - targetX, particle.cy - targetY);
      const scale = Math.max(0, Math.min(1, 1 - Math.abs(distanceToMouse - ringRadius) / 10));
      const pulse = .8 + Math.sin(particle.t * pulseSpeed) * .2 * particleVariance;
      const finalScale = scale * pulse * particleSize;
      dummy.scale.set(finalScale, finalScale, finalScale);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {particleShape === "capsule" && <capsuleGeometry args={[.07, .27, 4, 8]} />}
      {particleShape === "sphere" && <sphereGeometry args={[.14, 12, 12]} />}
      {particleShape === "box" && <boxGeometry args={[.18, .18, .18]} />}
      {particleShape === "tetrahedron" && <tetrahedronGeometry args={[.18]} />}
      <meshBasicMaterial color={color} transparent opacity={.92} />
    </instancedMesh>
  );
}

export default function Antigravity(props: AntigravityProps) {
  return (
    <Canvas camera={{ position: [0, 0, 50], fov: 35 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
      <AntigravityInner {...props} />
    </Canvas>
  );
}
