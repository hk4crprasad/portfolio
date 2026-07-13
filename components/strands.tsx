"use client";

import { CSSProperties, useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";
import styles from "./strands.module.css";

type StrandsProps = {
  colors?: string[];
  count?: number;
  speed?: number;
  amplitude?: number;
  waviness?: number;
  thickness?: number;
  glow?: number;
  taper?: number;
  spread?: number;
  hueShift?: number;
  intensity?: number;
  saturation?: number;
  opacity?: number;
  scale?: number;
  glass?: boolean;
  refraction?: number;
  dispersion?: number;
  glassSize?: number;
  className?: string;
  style?: CSSProperties;
};

const maxStrands = 12;
const maxColors = 8;

const vertex = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const fragment = `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColors[${maxColors}];
uniform int uColorCount;
uniform int uStrandCount;
uniform float uSpeed;
uniform float uAmplitude;
uniform float uWaviness;
uniform float uThickness;
uniform float uGlow;
uniform float uTaper;
uniform float uSpread;
uniform float uHueShift;
uniform float uIntensity;
uniform float uOpacity;
uniform float uScale;
uniform float uSaturation;

const float PI = 3.14159265;

vec3 spectrum(float t) { return .5 + .5 * cos(2.0 * PI * (t + vec3(0.0, .33, .67))); }
vec3 palette(float t) {
  if (uColorCount == 0) return spectrum(t);
  float wrapped = fract(t);
  float scaled = wrapped * float(uColorCount);
  int index = int(floor(scaled));
  int nextIndex = index + 1;
  if (nextIndex >= uColorCount) nextIndex = 0;
  return mix(uColors[index], uColors[nextIndex], fract(scaled));
}

void main() {
  vec2 uv = (gl_FragCoord.xy - .5 * uResolution) / uResolution.y;
  uv /= max(uScale, .0001);
  float energy = .06 + uIntensity * .94;
  float envelope = pow(max(cos(uv.x * PI * 1.3), 0.0), uTaper);
  vec3 colour = vec3(0.0);
  for (int i = 0; i < ${maxStrands}; i++) {
    if (i >= uStrandCount) break;
    float fi = float(i);
    float phase = fi * 1.7 * uSpread;
    float frequency = (2.0 + fi * .35) * uWaviness;
    float velocity = 1.4 + fi * 1.2;
    float time = uTime * uSpeed;
    float wave = sin(uv.x * frequency + time * velocity + phase) * .6
      + sin(uv.x * frequency * 1.1 - time * velocity * .7 + phase * 1.7) * .4;
    float y = wave * (.1 + .02 * energy) * envelope * uAmplitude;
    float distanceToLine = abs(uv.y - y);
    float lineThickness = (.001 + .05 * energy) * (.35 + envelope) * uThickness;
    float glow = lineThickness / (distanceToLine + lineThickness * .45);
    glow *= glow;
    colour += palette(fi / float(uStrandCount) + uv.x * .3 + uTime * .04 + uHueShift) * glow * envelope;
  }
  colour *= .45 + .7 * energy;
  colour = 1.0 - exp(-colour * uGlow);
  float grayscale = dot(colour, vec3(.2126, .7152, .0722));
  colour = max(mix(vec3(grayscale), colour, uSaturation), 0.0);
  float alpha = clamp(max(max(colour.r, colour.g), colour.b), 0.0, 1.0) * uOpacity;
  gl_FragColor = vec4(colour * uOpacity, alpha);
}
`;

function colorToRgb(value: string) {
  const normalized = value.replace("#", "");
  const expanded = normalized.length === 3 ? normalized.split("").map((piece) => piece + piece).join("") : normalized;
  const numeric = Number.parseInt(expanded.slice(0, 6), 16);
  if (Number.isNaN(numeric)) return [1, 1, 1];
  return [((numeric >> 16) & 255) / 255, ((numeric >> 8) & 255) / 255, (numeric & 255) / 255];
}

function createPalette(colors: string[]) {
  const source = colors.length ? colors : ["#ffffff"];
  return Array.from({ length: maxColors }, (_, index) => colorToRgb(source[index] ?? source[source.length - 1]));
}

/** WebGL strand field from React Bits, adapted for a transparent section background. */
export default function Strands({
  colors = ["#c7f46d", "#fa8559", "#9fb5ff"],
  count = 7,
  speed = .5,
  amplitude = 1,
  waviness = 2,
  thickness = .7,
  glow = 2.6,
  taper = 3.7,
  spread = 1,
  hueShift = 0,
  intensity = .15,
  saturation = 1.5,
  opacity = 1,
  scale = 2.4,
  glass = false,
  refraction = 1,
  dispersion = 1,
  glassSize = 1,
  className = "",
  style,
}: StrandsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const configRef = useRef({ colors, count, speed, amplitude, waviness, thickness, glow, taper, spread, hueShift, intensity, saturation, opacity, scale, glass, refraction, dispersion, glassSize });
  configRef.current = { colors, count, speed, amplitude, waviness, thickness, glow, taper, spread, hueShift, intensity, saturation, opacity, scale, glass, refraction, dispersion, glassSize };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) delete geometry.attributes.uv;
    const program = new Program(gl, {
      vertex,
      fragment,
      transparent: true,
      uniforms: {
        uTime: { value: 0 }, uResolution: { value: [container.offsetWidth, container.offsetHeight] },
        uColors: { value: createPalette(configRef.current.colors) }, uColorCount: { value: Math.min(configRef.current.colors.length, maxColors) },
        uStrandCount: { value: Math.min(Math.max(Math.round(configRef.current.count), 1), maxStrands) },
        uSpeed: { value: configRef.current.speed }, uAmplitude: { value: configRef.current.amplitude }, uWaviness: { value: configRef.current.waviness },
        uThickness: { value: configRef.current.thickness }, uGlow: { value: configRef.current.glow }, uTaper: { value: configRef.current.taper },
        uSpread: { value: configRef.current.spread }, uHueShift: { value: configRef.current.hueShift }, uIntensity: { value: configRef.current.intensity },
        uOpacity: { value: configRef.current.opacity }, uScale: { value: configRef.current.scale }, uSaturation: { value: configRef.current.saturation },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });
    container.appendChild(gl.canvas);

    function resize() {
      const width = container?.offsetWidth || 1;
      const height = container?.offsetHeight || 1;
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [width, height];
    }
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    let animationFrame = 0;
    function animate(time: number) {
      animationFrame = requestAnimationFrame(animate);
      const current = configRef.current;
      program.uniforms.uTime.value = time * .001;
      program.uniforms.uColors.value = createPalette(current.colors);
      program.uniforms.uColorCount.value = Math.min(current.colors.length, maxColors);
      program.uniforms.uStrandCount.value = Math.min(Math.max(Math.round(current.count), 1), maxStrands);
      program.uniforms.uSpeed.value = current.speed; program.uniforms.uAmplitude.value = current.amplitude; program.uniforms.uWaviness.value = current.waviness;
      program.uniforms.uThickness.value = current.thickness; program.uniforms.uGlow.value = current.glow; program.uniforms.uTaper.value = current.taper;
      program.uniforms.uSpread.value = current.spread; program.uniforms.uHueShift.value = current.hueShift; program.uniforms.uIntensity.value = current.intensity;
      program.uniforms.uOpacity.value = current.opacity; program.uniforms.uScale.value = current.scale; program.uniforms.uSaturation.value = current.saturation;
      renderer.render({ scene: mesh });
    }
    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      if (gl.canvas.parentNode === container) container.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <div ref={containerRef} className={`${styles.container} ${className}`} style={style} />;
}
