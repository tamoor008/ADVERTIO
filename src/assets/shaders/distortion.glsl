// Distortion shader for water/fluid effects
uniform float uTime;
uniform float uIntensity;
uniform vec2 uResolution;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  
  // Wave distortion
  float wave1 = sin(uv.y * 10.0 + uTime * 2.0) * 0.01;
  float wave2 = cos(uv.x * 8.0 + uTime * 1.5) * 0.01;
  
  vec2 distortedUv = uv + vec2(wave1, wave2) * uIntensity;
  
  gl_FragColor = vec4(distortedUv, 0.0, 1.0);
}

