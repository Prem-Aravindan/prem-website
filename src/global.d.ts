export { };

declare module '*.glb';
declare module '*.png';

declare module 'meshline' {
  export class MeshLineGeometry {
    setPoints(points: any[]): void;
  }
  export const MeshLineMaterial: any;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: React.DetailedHTMLProps<React.HTMLAttributes<any>, any> & { attach?: string };
      meshLineMaterial: React.DetailedHTMLProps<React.HTMLAttributes<any>, any> & { attach?: string; [key: string]: any };
    }
  }
}
