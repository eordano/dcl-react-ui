

export interface ParcelCoord {
  x: number
  y: number
}

export interface LiveSceneInfo {
  hash: string
  base_url?: string
  title: string
  parcels: ParcelCoord[]
  isPortable: boolean
  isBroken: boolean
  isBlocked: boolean
  isSuper: boolean
  sdkVersion: string
}

export type EditorTool = 'select' | 'translate' | 'rotate' | 'scale'

export type CameraMode = 'off' | 'free' | 'target'

export type NodeDisplay = 'always' | 'selected' | 'selecting'

export interface EditorEntityNode {
  id: string
  name: string | null
  parent: string
}

export type PageToSceneMessage =
  | { type: 'init' }
  | { type: 'set-tool'; tool: EditorTool }
  | {
      type: 'set-flags'
      orientGlobal?: boolean
      pivotEach?: boolean
      nodeDisplay?: NodeDisplay
      showLinks?: boolean
    }
  | { type: 'set-selection'; selected: string[]; active: string | null }
  | { type: 'set-camera'; mode: CameraMode; axis?: string }
  | { type: 'focus'; entity: string; orbit?: boolean }
  | { type: 'refresh' }
  | { type: 'pointer-up' }
  | { type: 'fly-speed'; factor: number }
  | {
      type: 'camera-input'
      orbitYaw?: number
      orbitPitch?: number
      panX?: number
      panY?: number
      dolly?: number
    }
  | {
      type: 'camera-settings'
      preset: 'blender' | 'blender-lmb' | 'maya'
      sensitivity: { orbit: number; pan: number; zoom: number }
      invertY: boolean
    }
  | { type: 'set-camera-projection'; ortho: 'toggle' | 'ortho' | 'perspective' }
  | { type: 'resync' }
  | { type: 'component-written'; entity: string; name: string; json: string }
  | { type: 'set-component'; entity: string; name: string; json: string }
  | { type: 'add-component'; entity: string; name: string }
  | { type: 'delete-component'; entity: string; name: string }
  | { type: 'load-scene'; composite: string; replace?: boolean }
  | {
      type: 'add-entity'
      name: string
      parent: number
      components?: Record<string, unknown> | null
    }
  | { type: 'entity-deleted'; entity: string; recursive: boolean }
  | { type: 'rpc'; id: number | string; method: string; args?: unknown[] }

export type SceneToPageMessage =
  | {
      type: 'scene-ready'
      bridge?: number
      scene: LiveSceneInfo | null
      frozen: boolean
      tool: EditorTool
      orientGlobal: boolean
      pivotEach: boolean
      selected: string[]
      active: string | null
    }
  | {
      type: 'selection'
      selected: string[]
      active: string | null
      components?: Record<string, Record<string, unknown>>
    }
  | { type: 'entities'; entities: EditorEntityNode[] }
  | { type: 'drag-start' }
  | { type: 'drag-end'; transforms: Record<string, unknown> }
  | { type: 'tool'; tool: EditorTool }
  | { type: 'rpc-reply'; id: number | string; ok: boolean; result?: unknown; error?: string }

export const SCENE_BRIDGE_VERSION = 8
