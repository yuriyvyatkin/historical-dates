export default function matrixToDegrees(matrix: string): number {
  const values = matrix.split('(')[1].split(')')[0].split(',');
  const a = Number(values[0]);
  const b = Number(values[1]);
  let angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));

  return (360 + angle) % 360;
}
