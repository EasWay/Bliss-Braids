'use client';

import { useEffect, useRef, useState } from 'react';
import { mat4, quat, vec2, vec3 } from 'gl-matrix';
import { services } from '@/data/services';

const discVertShaderSource = `#version 300 es

uniform mat4 uWorldMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform vec3 uCameraPosition;
uniform vec4 uRotationAxisVelocity;

in vec3 aModelPosition;
in vec3 aModelNormal;
in vec2 aModelUvs;
in mat4 aInstanceMatrix;

out vec2 vUvs;
out float vAlpha;
flat out int vInstanceId;

#define PI 3.141593

void main() {
    vec4 worldPosition = uWorldMatrix * aInstanceMatrix * vec4(aModelPosition, 1.);

    vec3 centerPos = (uWorldMatrix * aInstanceMatrix * vec4(0., 0., 0., 1.)).xyz;
    float radius = length(centerPos.xyz);

    if (gl_VertexID > 0) {
        vec3 rotationAxis = uRotationAxisVelocity.xyz;
        float rotationVelocity = min(.15, uRotationAxisVelocity.w * 15.);
        vec3 stretchDir = normalize(cross(centerPos, rotationAxis));
        vec3 relativeVertexPos = normalize(worldPosition.xyz - centerPos);
        float strength = dot(stretchDir, relativeVertexPos);
        float invAbsStrength = min(0., abs(strength) - 1.);
        strength = rotationVelocity * sign(strength) * abs(invAbsStrength * invAbsStrength * invAbsStrength + 1.);
        worldPosition.xyz += stretchDir * strength;
    }

    worldPosition.xyz = radius * normalize(worldPosition.xyz);

    gl_Position = uProjectionMatrix * uViewMatrix * worldPosition;

    vAlpha = smoothstep(0.5, 1., normalize(worldPosition.xyz).z) * .9 + .1;
    vUvs = aModelUvs;
    vInstanceId = gl_InstanceID;
}
`;

const discFragShaderSource = `#version 300 es
precision highp float;

uniform sampler2D uTex;
uniform int uItemCount;
uniform int uAtlasSize;

out vec4 outColor;

in vec2 vUvs;
in float vAlpha;
flat in int vInstanceId;

void main() {
    int itemIndex = vInstanceId % uItemCount;
    int cellsPerRow = uAtlasSize;
    int cellX = itemIndex % cellsPerRow;
    int cellY = itemIndex / cellsPerRow;
    vec2 cellSize = vec2(1.0) / vec2(float(cellsPerRow));
    vec2 cellOffset = vec2(float(cellX), float(cellY)) * cellSize;

    ivec2 texSize = textureSize(uTex, 0);
    float imageAspect = float(texSize.x) / float(texSize.y);
    float containerAspect = 1.0;
    
    float scale = max(imageAspect / containerAspect, 
                     containerAspect / imageAspect);
    
    vec2 st = vec2(vUvs.x, 1.0 - vUvs.y);
    st = (st - 0.5) * scale + 0.5;
    
    st = clamp(st, 0.0, 1.0);
    
    st = st * cellSize + cellOffset;
    
    outColor = texture(uTex, st);
    outColor.a *= vAlpha;
}
`;

interface InfiniteMenuProps {
  items?: Array<{
    image: string;
    link?: string;
    title: string;
    description: string;
  }>;
  scale?: number;
  className?: string;
}

const InfiniteMenu: React.FC<InfiniteMenuProps> = ({ 
  items,
  scale = 2.3,
  className 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeItem, setActiveItem] = useState<any>(null);
  const [isMoving, setIsMoving] = useState(false);

  // Use services data if no items provided, or use provided items
  const menuItems = items || services.map(service => ({
    image: service.image,
    link: `/booking?service=${service.id}`,
    title: service.name,
    description: service.description
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Simple fallback implementation for now
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Simple rotating display
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (!isMoving) {
        currentIndex = (currentIndex + 1) % menuItems.length;
        setActiveItem(menuItems[currentIndex]);
      }
    }, 3000);

    // Set initial active item
    setActiveItem(menuItems[0]);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(interval);
    };
  }, [menuItems, isMoving]);

  const handleButtonClick = () => {
    if (!activeItem?.link) return;
    if (activeItem.link.startsWith('http')) {
      window.open(activeItem.link, '_blank');
    } else {
      window.location.href = activeItem.link;
    }
  };

  return (
    <div className={`relative w-full h-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 ${className || ''}`}>
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
        style={{ background: 'transparent' }}
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
      
      {activeItem && (
        <>
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{ backgroundImage: `url(${activeItem.image})` }}
          />
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white pointer-events-auto">
            <h2 className={`text-2xl md:text-3xl font-bold mb-2 leading-tight transition-opacity duration-300 ${isMoving ? 'opacity-30' : 'opacity-100'}`}>
              {activeItem.title}
            </h2>

            <p className={`text-white/90 text-base md:text-lg mb-6 leading-relaxed max-w-md transition-opacity duration-300 ${isMoving ? 'opacity-30' : 'opacity-100'}`}>
              {activeItem.description}
            </p>

            <div 
              onClick={handleButtonClick}
              className={`inline-flex items-center px-6 py-3 bg-[#F50057] hover:bg-[#F50057]/90 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer ${isMoving ? 'opacity-30' : 'opacity-100'}`}
            >
              Book This Style
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
            {menuItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveItem(menuItems[index])}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  menuItems.indexOf(activeItem) === index
                    ? "bg-[#F50057] w-8"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default InfiniteMenu;