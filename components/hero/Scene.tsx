"use client";

import * as THREE from "three";
import { useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { interaction } from "@/lib/interaction";

// Deterministic PRNG so the scene is identical on every load.
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeGlowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(195,236,255,1)");
  g.addColorStop(0.4, "rgba(95,212,255,0.4)");
  g.addColorStop(1, "rgba(95,212,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

/** Central neural core: wireframe icosahedron + glowing nucleus. */
function Core({ glow }: { glow: THREE.Texture }) {
  const objs = useMemo(() => {
    const group = new THREE.Group();
    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.15, 1),
      new THREE.MeshBasicMaterial({ color: 0x5fd4ff, wireframe: true, transparent: true, opacity: 0.28 })
    );
    const inner = new THREE.Mesh(
      new THREE.SphereGeometry(0.4, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0xd8f2ff })
    );
    const halo = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: glow, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending })
    );
    halo.scale.set(5.4, 5.4, 1);
    group.add(wire, inner, halo);
    return { group, wire, inner };
  }, [glow]);

  useFrame((state, dt) => {
    if (!interaction.heroVisible) return;
    objs.wire.rotation.y += dt * 0.16;
    objs.wire.rotation.x += dt * 0.06;
    objs.inner.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 1.7) * 0.06);
  });

  return <primitive object={objs.group} />;
}

/** Orbiting node cloud with proximity links — the "neural network". */
const NODE_COUNT = 84;
function Network() {
  const data = useMemo(() => {
    const rand = mulberry32(11);
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const r = 2.2 + rand() * 2.2;
      const th = rand() * Math.PI * 2;
      const ph = Math.acos(2 * rand() - 1);
      pts.push(
        new THREE.Vector3(
          r * Math.sin(ph) * Math.cos(th),
          r * Math.cos(ph) * 0.7,
          r * Math.sin(ph) * Math.sin(th)
        )
      );
    }
    const linePos: number[] = [];
    for (let i = 0; i < NODE_COUNT; i++)
      for (let j = i + 1; j < NODE_COUNT; j++)
        if (pts[i].distanceTo(pts[j]) < 1.45)
          linePos.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);

    const mesh = new THREE.InstancedMesh(
      new THREE.SphereGeometry(0.034, 10, 10),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
      NODE_COUNT
    );
    const cyan = new THREE.Color(0x5fd4ff);
    const white = new THREE.Color(0xdff4ff);
    const m = new THREE.Matrix4();
    for (let i = 0; i < NODE_COUNT; i++) {
      m.identity().setPosition(pts[i]);
      mesh.setMatrixAt(i, m);
      mesh.setColorAt(i, rand() > 0.72 ? white.clone() : cyan.clone());
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePos, 3));
    const lines = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({
        color: 0x5fd4ff,
        transparent: true,
        opacity: 0.11,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );

    const group = new THREE.Group();
    group.add(mesh, lines);
    const phases = Array.from({ length: NODE_COUNT }, () => rand() * Math.PI * 2);
    return { group, mesh, pts, phases, m: new THREE.Matrix4() };
  }, []);

  useFrame((state, dt) => {
    if (!interaction.heroVisible) return;
    const t = state.clock.elapsedTime;
    if (!interaction.reduced) data.group.rotation.y += dt * 0.04;
    for (let i = 0; i < NODE_COUNT; i++) {
      const s = 1 + Math.sin(t * 1.8 + data.phases[i]) * 0.38;
      data.m.makeScale(s, s, s).setPosition(data.pts[i]);
      data.mesh.setMatrixAt(i, data.m);
    }
    data.mesh.instanceMatrix.needsUpdate = true;
  });

  return <primitive object={data.group} />;
}

/** Particle streams flowing from deep space into the core. */
function Streams({ glow }: { glow: THREE.Texture }) {
  const data = useMemo(() => {
    const rand = mulberry32(5);
    const SAMPLES = 240;
    const STREAMS = 5;
    const PER = 34;
    const lookups: THREE.Vector3[][] = [];
    for (let s = 0; s < STREAMS; s++) {
      const a = (s / STREAMS) * Math.PI * 2 + rand() * 0.8;
      const start = new THREE.Vector3(Math.cos(a) * 11, (rand() - 0.5) * 6, Math.sin(a) * 11);
      const mid1 = start
        .clone()
        .multiplyScalar(0.62)
        .add(new THREE.Vector3((rand() - 0.5) * 2, (rand() - 0.5) * 3, (rand() - 0.5) * 2));
      const mid2 = start.clone().multiplyScalar(0.3).applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.7);
      const curve = new THREE.CatmullRomCurve3([start, mid1, mid2, new THREE.Vector3(0, 0, 0)]);
      lookups.push(curve.getSpacedPoints(SAMPLES - 1));
    }
    const total = STREAMS * PER;
    const pos = new Float32Array(total * 3);
    const offsets = new Float32Array(total);
    const speeds = new Float32Array(total);
    for (let i = 0; i < total; i++) {
      offsets[i] = rand();
      speeds[i] = 0.045 + rand() * 0.055;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const points = new THREE.Points(
      geo,
      new THREE.PointsMaterial({
        size: 0.1,
        map: glow,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color: 0x9fe2ff,
        sizeAttenuation: true,
      })
    );
    points.frustumCulled = false;
    return { lookups, pos, offsets, speeds, geo, points, SAMPLES, STREAMS, PER };
  }, [glow]);

  useFrame((state) => {
    if (!interaction.heroVisible) return;
    const t = interaction.reduced ? 0 : state.clock.elapsedTime;
    const { lookups, pos, offsets, speeds, SAMPLES, STREAMS, PER } = data;
    let i = 0;
    for (let s = 0; s < STREAMS; s++) {
      for (let p = 0; p < PER; p++, i++) {
        const u = (offsets[i] + t * speeds[i]) % 1;
        const pt = lookups[s][Math.min(SAMPLES - 1, Math.floor(u * SAMPLES))];
        pos[i * 3] = pt.x;
        pos[i * 3 + 1] = pt.y;
        pos[i * 3 + 2] = pt.z;
      }
    }
    data.geo.attributes.position.needsUpdate = true;
  });

  return <primitive object={data.points} />;
}

/** Floating holographic panels — translucent glass slabs with data bars. */
function Panels() {
  const data = useMemo(() => {
    const group = new THREE.Group();
    const defs = [
      { x: -3.7, y: 1.15, z: 0.6, w: 1.7, h: 1.05, ry: 0.55 },
      { x: 3.4, y: 0.35, z: -0.4, w: 1.5, h: 0.95, ry: -0.5 },
      { x: 2.7, y: 2.05, z: 1.1, w: 1.1, h: 0.7, ry: -0.35 },
    ];
    const panels: THREE.Group[] = [];
    for (const d of defs) {
      const p = new THREE.Group();
      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(d.w, d.h),
        new THREE.MeshBasicMaterial({ color: 0x8fd8ff, transparent: true, opacity: 0.045, side: THREE.DoubleSide, depthWrite: false })
      );
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.PlaneGeometry(d.w, d.h)),
        new THREE.LineBasicMaterial({ color: 0x5fd4ff, transparent: true, opacity: 0.38 })
      );
      p.add(plane, edges);
      for (let b = 0; b < 3; b++) {
        const bw = d.w * (0.28 + (b % 3) * 0.16);
        const bar = new THREE.Mesh(
          new THREE.PlaneGeometry(bw, 0.045),
          new THREE.MeshBasicMaterial({ color: 0xbfeaff, transparent: true, opacity: 0.45, depthWrite: false })
        );
        bar.position.set(-d.w / 2 + bw / 2 + 0.12, d.h / 2 - 0.2 - b * 0.17, 0.002);
        p.add(bar);
      }
      p.position.set(d.x, d.y, d.z);
      p.rotation.y = d.ry;
      group.add(p);
      panels.push(p);
    }
    return { group, panels };
  }, []);

  useFrame((state) => {
    if (!interaction.heroVisible || interaction.reduced) return;
    const t = state.clock.elapsedTime;
    data.panels.forEach((p, i) => {
      p.position.y += Math.sin(t * 0.6 + i * 2.1) * 0.0014;
      p.rotation.z = Math.sin(t * 0.3 + i) * 0.015;
    });
  });

  return <primitive object={data.group} />;
}

/** Cinematic camera rig: mouse parallax, slow drift, and a scroll-driven
 *  orbit-and-dive — the camera swings around the core and closes in as the
 *  visitor scrolls through the hero's two acts. */
function Rig() {
  useFrame((state, dt) => {
    const cam = state.camera;
    const t = state.clock.elapsedTime;
    const p = interaction.reduced ? 0 : interaction.scroll;
    const drift = interaction.reduced ? 0 : Math.sin(t * 0.05) * 0.06;
    const radius = 9.5 - p * 4.6;
    const ang = drift + p * 1.15 + interaction.pointerX * 0.1;
    const tx = Math.sin(ang) * radius;
    const tz = Math.cos(ang) * radius;
    const ty = 0.55 - interaction.pointerY * 0.6 + p * 0.35;
    const k = Math.min(1, dt * 2.2);
    cam.position.x += (tx - cam.position.x) * k;
    cam.position.y += (ty - cam.position.y) * k;
    cam.position.z += (tz - cam.position.z) * k;
    cam.lookAt(0, 0.1, 0);
  });
  return null;
}

function SceneContent() {
  const glow = useMemo(() => makeGlowTexture(), []);
  return (
    <>
      <Rig />
      <Core glow={glow} />
      <Network />
      <Streams glow={glow} />
      <Panels />
      <gridHelper args={[46, 46, "#1d3950", "#0d1a26"]} position={[0, -3.4, 0]} />
    </>
  );
}

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ fov: 42, position: [0, 0.55, 9.5] }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
    >
      <fog attach="fog" args={["#05070a", 9, 24]} />
      <SceneContent />
    </Canvas>
  );
}
