declare module 'three/examples/jsm/loaders/SVGLoader.js' {
  import { Loader, LoadingManager } from 'three';
  
  export interface SVGResult {
    paths: SVGPath[];
    xml: Document;
  }
  
  export interface SVGPath {
    toShapes(flatShapes?: boolean): THREE.Shape[];
  }
  
  export class SVGLoader extends Loader {
    constructor(manager?: LoadingManager);
    load(
      url: string,
      onLoad: (data: SVGResult) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (error: Error) => void
    ): void;
    loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<SVGResult>;
    parse(text: string): SVGResult;
  }
}
