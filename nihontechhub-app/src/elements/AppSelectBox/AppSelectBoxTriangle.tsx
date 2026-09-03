import React from 'react';

import { Canvas, Path, Skia, Group } from '@shopify/react-native-skia';
import { useAppTheme } from '@utils/modules';

interface TriangleProps {
  size?: number; // size of triangle (width and height of square bounds)
  color?: string; // fill color
  backgroundColor?: string;
  shadowOffset?: number;
  blur?: number;
}

export const AppSelectBoxTriangle = ({
  size = 30,
  color,
  shadowOffset = 3,
  blur = 3,
}: TriangleProps) => {
  const { Colors } = useAppTheme();
  const half = size / 2;

  // Triangle points (right-pointing triangle)
  const p1 = { x: size, y: half }; // right point
  const p2 = { x: 0, y: 0 }; // top-left
  const p3 = { x: 0, y: size }; // bottom-left

  // Function to create triangle path with optional offset
  const makePath = (dx = 0, dy = 0) => {
    const path = Skia.Path.Make();
    path.moveTo(p1.x + dx, p1.y + dy);
    path.lineTo(p2.x + dx, p2.y + dy);
    path.lineTo(p3.x + dx, p3.y + dy);
    path.close();
    return path;
  };

  // Function to create paint with blur shadow
  const createShadowPaint = (hex: string) => {
    const paint = Skia.Paint();
    paint.setColor(Skia.Color(hex));
    paint.setMaskFilter(Skia.MaskFilter.MakeBlur(shadowOffset, blur, true)); // ✅ Accessed from Skia
    return paint;
  };

  const darkShadow = createShadowPaint(Colors.app.Shape_Border as string); // shadow below
  const lightShadow = createShadowPaint(Colors.app.Shape_Base as string); // highlight above

  const fillPaint = Skia.Paint();
  fillPaint.setColor(Skia.Color(color ?? (Colors.app.Primary as string)));

  return (
    <Canvas style={{ width: size + shadowOffset, height: size + shadowOffset }}>
      <Group>
        {/* Bottom-right dark shadow */}
        <Path path={makePath(shadowOffset, shadowOffset)} paint={darkShadow} />
        {/* Top-left light highlight */}
        <Path
          path={makePath(-shadowOffset, -shadowOffset)}
          paint={lightShadow}
        />
        {/* Main triangle */}
        <Path path={makePath()} paint={fillPaint} />
      </Group>
    </Canvas>
  );
};
