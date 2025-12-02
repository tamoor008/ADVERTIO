// Water shader effect
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;

varying vec3 vPosition;
varying vec3 vNormal;

void main() {
  vec3 normal = normalize(vNormal);
  
  // Fresnel effect
  float fresnel = pow(1.0 - dot(normal, vec3(0.0, 0.0, 1.0)), 2.0);
  
  // Animated waves
  float wave = sin(vPosition.y * 5.0 + uTime * 2.0) * 0.5 + 0.5;
  float wave2 = cos(vPosition.x * 3.0 + uTime * 1.5) * 0.5 + 0.5;
  
  // Combine waves
  float combinedWave = (wave + wave2) * 0.5;
  
  // Mix colors
  vec3 color = mix(uColor1, uColor2, combinedWave);
  
  // Add fresnel to alpha
  gl_FragColor = vec4(color, fresnel * 0.8 + 0.2);
}

