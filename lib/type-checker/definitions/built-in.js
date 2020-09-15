const builder = require('../types/builder').build

const BUILT_IN = [
  {
    type: 'string',
    name: 'CreateString',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'DeleteString',
    params: [
      'string'
    ]
  },
  {
    type: 'float',
    name: 'WorldToScreenX',
    params: [
      'float'
    ]
  },
  {
    type: 'float',
    name: 'WorldToScreenY',
    params: [
      'float'
    ]
  },
  {
    type: 'float',
    name: 'ScreenToWorldX',
    params: [
      'float'
    ]
  },
  {
    type: 'float',
    name: 'ScreenToWorldY',
    params: [
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetResolutionMode',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSyncRate',
    params: [
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetOrientationAllowed',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTransitionMode',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetDisplayAspect',
    params: [
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetRenderToImage',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetRenderToScreen',
    params: []
  },
  {
    type: 'string',
    name: 'GetCL',
    params: []
  },
  {
    type: 'void',
    name: 'SetScissor',
    params: [
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetIntendedDeviceSize',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'UseNewDefaultFonts',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetDeviceWidth',
    params: []
  },
  {
    type: 'integer',
    name: 'GetDeviceHeight',
    params: []
  },
  {
    type: 'void',
    name: 'SetVirtualResolution',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'UpdateDeviceSize',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetVirtualWidth',
    params: []
  },
  {
    type: 'integer',
    name: 'GetVirtualHeight',
    params: []
  },
  {
    type: 'float',
    name: 'GetScreenBoundsLeft',
    params: []
  },
  {
    type: 'float',
    name: 'GetScreenBoundsRight',
    params: []
  },
  {
    type: 'float',
    name: 'GetScreenBoundsTop',
    params: []
  },
  {
    type: 'float',
    name: 'GetScreenBoundsBottom',
    params: []
  },
  {
    type: 'float',
    name: 'GetDisplayAspect',
    params: []
  },
  {
    type: 'integer',
    name: 'GetOrientation',
    params: []
  },
  {
    type: 'integer',
    name: 'GetPaused',
    params: []
  },
  {
    type: 'integer',
    name: 'GetResumed',
    params: []
  },
  {
    type: 'void',
    name: 'SetDefaultMagFilter',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetDefaultMinFilter',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetDefaultWrapU',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetDefaultWrapV',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetViewOffset',
    params: [
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetViewZoom',
    params: [
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetViewZoomMode',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetViewOffsetX',
    params: []
  },
  {
    type: 'float',
    name: 'GetViewOffsetY',
    params: []
  },
  {
    type: 'float',
    name: 'GetViewZoom',
    params: []
  },
  {
    type: 'void',
    name: 'Sync',
    params: []
  },
  {
    type: 'void',
    name: 'Break',
    params: []
  },
  {
    type: 'void',
    name: 'StepPhysics',
    params: [
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Update',
    params: [
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Update2D',
    params: [
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Update3D',
    params: [
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Render2DBack',
    params: []
  },
  {
    type: 'void',
    name: 'Render',
    params: []
  },
  {
    type: 'void',
    name: 'Render2DFront',
    params: []
  },
  {
    type: 'void',
    name: 'Render3D',
    params: []
  },
  {
    type: 'void',
    name: 'Swap',
    params: []
  },
  {
    type: 'void',
    name: 'ClearScreen',
    params: []
  },
  {
    type: 'void',
    name: 'ClearDepthBuffer',
    params: []
  },
  {
    type: 'void',
    name: 'SetGenerateMipmaps',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'Timer',
    params: []
  },
  {
    type: 'void',
    name: 'ResetTimer',
    params: []
  },
  {
    type: 'float',
    name: 'GetRunTime',
    params: []
  },
  {
    type: 'integer',
    name: 'GetSeconds',
    params: []
  },
  {
    type: 'float',
    name: 'GetFrameTime',
    params: []
  },
  {
    type: 'integer',
    name: 'GetMilliseconds',
    params: []
  },
  {
    type: 'string',
    name: 'GetDeviceID',
    params: []
  },
  {
    type: 'integer',
    name: 'GetNumProcessors',
    params: []
  },
  {
    type: 'string',
    name: 'Sha1',
    params: [
      'string'
    ]
  },
  {
    type: 'string',
    name: 'Sha256',
    params: [
      'string'
    ]
  },
  {
    type: 'string',
    name: 'Sha512',
    params: [
      'string'
    ]
  },
  {
    type: 'string',
    name: 'HTTPEncode',
    params: [
      'string'
    ]
  },
  {
    type: 'string',
    name: 'HTTPDecode',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'SetRandomSeed',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'Random',
    params: []
  },
  {
    type: 'integer',
    name: 'Random',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'RandomSign',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetRandomSeed2',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'Random2',
    params: []
  },
  {
    type: 'integer',
    name: 'Random2',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'ATanFull',
    params: [
      'float',
      'float'
    ]
  },
  {
    type: 'float',
    name: 'ATanFullRad',
    params: [
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSortTextures',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSortDepth',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSortTransparentDepth',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSortCreated',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'ScreenFPS',
    params: []
  },
  {
    type: 'integer',
    name: 'GetPolygonsDrawn',
    params: []
  },
  {
    type: 'integer',
    name: 'GetVerticesProcessed',
    params: []
  },
  {
    type: 'void',
    name: 'EnableClearDepth',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'EnableClearColor',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetBorderColor',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetClearColor',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'cImage*',
    name: 'GetImagePtr',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetImageTextureID',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'LoadImage',
    params: [
      'integer',
      'string',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'LoadImage',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'LoadImage',
    params: [
      'string',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'LoadImage',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'LoadSubImage',
    params: [
      'integer',
      'integer',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'LoadSubImage',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'LoadImageResized',
    params: [
      'integer',
      'string',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'LoadImageResized',
    params: [
      'string',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreateImageColor',
    params: [
      'integer',
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CreateImageColor',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreateRenderImage',
    params: [
      'integer',
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CreateRenderImage',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetImageExists',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'DeleteImage',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'DeleteAllImages',
    params: []
  },
  {
    type: 'float',
    name: 'GetImageWidth',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetImageHeight',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetImageMinFilter',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetImageMagFilter',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetImageWrapU',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetImageWrapV',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetImageMask',
    params: [
      'integer',
      'integer',
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetImageTransparentColor',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SaveImage',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'GetImage',
    params: [
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'GetImage',
    params: [
      'integer',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'string',
    name: 'GetImageFilename',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CopyImage',
    params: [
      'integer',
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CopyImage',
    params: [
      'integer',
      'integer',
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'ResizeImage',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'ShowChooseImageScreen',
    params: []
  },
  {
    type: 'integer',
    name: 'IsChoosingImage',
    params: []
  },
  {
    type: 'integer',
    name: 'GetChosenImage',
    params: []
  },
  {
    type: 'integer',
    name: 'ShowImageCaptureScreen',
    params: []
  },
  {
    type: 'integer',
    name: 'IsCapturingImage',
    params: []
  },
  {
    type: 'integer',
    name: 'GetCapturedImage',
    params: []
  },
  {
    type: 'string',
    name: 'DecodeQRCode',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'EncodeQRCode',
    params: [
      'string',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'PrintImage',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetImageSavePixels',
    params: [
      'integer'
    ]
  },
  {
    type: 'cSprite*',
    name: 'GetSpritePtr',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetSpriteImageID',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreateSprite',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CreateSprite',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'LoadSprite',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'LoadSprite',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'CloneSprite',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CloneSprite',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreateDummySprite',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CreateDummySprite',
    params: []
  },
  {
    type: 'integer',
    name: 'GetSpriteExists',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'DeleteSprite',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'DeleteAllSprites',
    params: []
  },
  {
    type: 'void',
    name: 'SetSpriteImage',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteImage',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteAdditionalImage',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteUV',
    params: [
      'integer',
      'float',
      'float',
      'float',
      'float',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'ResetSpriteUV',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpritePosition',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSpritePositionByOffset',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteX',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteY',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteAngle',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteAngleRad',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteDepth',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteFlip',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteSnap',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteVisible',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteActive',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSpriteX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSpriteY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSpriteXByOffset',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSpriteYByOffset',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSpriteOffsetX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSpriteOffsetY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSpriteWidth',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSpriteAngle',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSpriteAngleRad',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSpriteHeight',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSpriteScaleX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSpriteScaleY',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetSpriteHitTest',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'GetSpriteHit',
    params: [
      'float',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'GetSpriteHitGroup',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'GetSpriteHitCategory',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'GetSpriteDepth',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetSpriteColorRed',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetSpriteColorGreen',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetSpriteColorBlue',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetSpriteColorAlpha',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetSpritePlaying',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetSpriteVisible',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetSpriteActive',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetSpriteGroup',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSpriteXFromPixel',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSpriteYFromPixel',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetSpritePixelFromX',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'GetSpritePixelFromY',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'float',
    name: 'GetWorldXFromSprite',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'float',
    name: 'GetWorldYFromSprite',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'float',
    name: 'GetSpriteXFromWorld',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'float',
    name: 'GetSpriteYFromWorld',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteSize',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteAnimation',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'AddSpriteAnimationFrame',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'ClearSpriteAnimationFrames',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteSpeed',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'PlaySprite',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'PlaySprite',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'PlaySprite',
    params: [
      'integer',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'PlaySprite',
    params: [
      'integer',
      'float',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'StopSprite',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'ResumeSprite',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteFrame',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetSpriteCurrentFrame',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetSpriteFrameCount',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteTransparency',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteOffset',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteColor',
    params: [
      'integer',
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteColorRed',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteColorGreen',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteColorBlue',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteColorAlpha',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteUVBorder',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteUVOffset',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteUVScale',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'FixSpriteToScreen',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteScale',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteScaleByOffset',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteScissor',
    params: [
      'integer',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteShader',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'DrawSprite',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetPhysicsScale',
    params: [
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetPhysicsGravity',
    params: [
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetPhysicsDebugOn',
    params: []
  },
  {
    type: 'void',
    name: 'SetPhysicsDebugOff',
    params: []
  },
  {
    type: 'void',
    name: 'SetPhysicsThreading',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetPhysicsCCD',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetPhysicsSleeping',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetPhysicsSolveTime',
    params: []
  },
  {
    type: 'integer',
    name: 'GetPhysicsIslandCount',
    params: []
  },
  {
    type: 'void',
    name: 'SetPhysicsMaxPolygonPoints',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetPhysicsWallTop',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetPhysicsWallLeft',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetPhysicsWallRight',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetPhysicsWallBottom',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CreatePhysicsForce',
    params: [
      'float',
      'float',
      'float',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'DeletePhysicsForce',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetPhysicsForcePosition',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetPhysicsForcePower',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetPhysicsForceRange',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteShape',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteShapeBox',
    params: [
      'integer',
      'float',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteShapeCircle',
    params: [
      'integer',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteShapePolygon',
    params: [
      'integer',
      'integer',
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'AddSpriteShapeBox',
    params: [
      'integer',
      'float',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'AddSpriteShapeCircle',
    params: [
      'integer',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'AddSpriteShapePolygon',
    params: [
      'integer',
      'integer',
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'ClearSpriteShapes',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpritePhysicsCOM',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'CalculateSpritePhysicsCOM',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpritePhysicsOn',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpritePhysicsOff',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpritePhysicsDelete',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpritePhysicsFriction',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSpritePhysicsRestitution',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSpritePhysicsCanRotate',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpritePhysicsVelocity',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSpritePhysicsAngularVelocity',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSpritePhysicsDamping',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSpritePhysicsAngularDamping',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSpritePhysicsIsBullet',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpritePhysicsMass',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSpritePhysicsIsSensor',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteGroup',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteCategoryBits',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteCategoryBit',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteCollideBits',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteCollideBit',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpritePhysicsForce',
    params: [
      'integer',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSpritePhysicsTorque',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSpritePhysicsImpulse',
    params: [
      'integer',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSpritePhysicsAngularImpulse',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'float',
    name: 'GetSpritePhysicsVelocityX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSpritePhysicsVelocityY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSpritePhysicsAngularVelocity',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSpritePhysicsMass',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'DeleteJoint',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetJointExists',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreateDistanceJoint',
    params: [
      'integer',
      'integer',
      'integer',
      'float',
      'float',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreateRevoluteJoint',
    params: [
      'integer',
      'integer',
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreatePrismaticJoint',
    params: [
      'integer',
      'integer',
      'integer',
      'float',
      'float',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreatePulleyJoint',
    params: [
      'integer',
      'integer',
      'integer',
      'float',
      'float',
      'float',
      'float',
      'float',
      'float',
      'float',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreateMouseJoint',
    params: [
      'integer',
      'integer',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'CreateLineJoint',
    params: [
      'integer',
      'integer',
      'integer',
      'float',
      'float',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreateWeldJoint',
    params: [
      'integer',
      'integer',
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreateGearJoint',
    params: [
      'integer',
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'CreateDistanceJoint',
    params: [
      'integer',
      'integer',
      'float',
      'float',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CreateRevoluteJoint',
    params: [
      'integer',
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CreatePrismaticJoint',
    params: [
      'integer',
      'integer',
      'float',
      'float',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreatePulleyJoint2',
    params: [
      'integer',
      'integer',
      'float',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'FinishPulleyJoint',
    params: [
      'float',
      'float',
      'float',
      'float',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'CreateMouseJoint',
    params: [
      'integer',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'CreateLineJoint',
    params: [
      'integer',
      'integer',
      'float',
      'float',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CreateWeldJoint',
    params: [
      'integer',
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CreateGearJoint',
    params: [
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetJointLimitOn',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetJointLimitOff',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetJointMotorOn',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetJointMotorOff',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetJointMouseTarget',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'float',
    name: 'GetJointReactionForceX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetJointReactionForceY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetJointReactionTorque',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'PhysicsRayCast',
    params: [
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'PhysicsRayCastGroup',
    params: [
      'integer',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'PhysicsRayCastCategory',
    params: [
      'integer',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'SpriteRayCastSingle',
    params: [
      'integer',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'SpriteRayCast',
    params: [
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'SpriteRayCastGroup',
    params: [
      'integer',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'SpriteRayCastCategory',
    params: [
      'integer',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'cSprite*',
    name: 'GetRayCastSprite',
    params: []
  },
  {
    type: 'integer',
    name: 'GetRayCastSpriteID',
    params: []
  },
  {
    type: 'float',
    name: 'GetRayCastX',
    params: []
  },
  {
    type: 'float',
    name: 'GetRayCastY',
    params: []
  },
  {
    type: 'float',
    name: 'GetRayCastNormalX',
    params: []
  },
  {
    type: 'float',
    name: 'GetRayCastNormalY',
    params: []
  },
  {
    type: 'float',
    name: 'GetRayCastFraction',
    params: []
  },
  {
    type: 'integer',
    name: 'GetSpriteInBox',
    params: [
      'integer',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'GetSpriteInCircle',
    params: [
      'integer',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'GetSpriteCollision',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSpriteDistance',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSpriteDistancePoint1X',
    params: []
  },
  {
    type: 'float',
    name: 'GetSpriteDistancePoint1Y',
    params: []
  },
  {
    type: 'float',
    name: 'GetSpriteDistancePoint2X',
    params: []
  },
  {
    type: 'float',
    name: 'GetSpriteDistancePoint2Y',
    params: []
  },
  {
    type: 'integer',
    name: 'GetFirstContact',
    params: []
  },
  {
    type: 'integer',
    name: 'GetNextContact',
    params: []
  },
  {
    type: 'float',
    name: 'GetContactWorldX',
    params: []
  },
  {
    type: 'float',
    name: 'GetContactWorldY',
    params: []
  },
  {
    type: 'integer',
    name: 'GetContactSpriteID1',
    params: []
  },
  {
    type: 'integer',
    name: 'GetContactSpriteID2',
    params: []
  },
  {
    type: 'integer',
    name: 'GetSpriteFirstContact',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetSpriteNextContact',
    params: []
  },
  {
    type: 'float',
    name: 'GetSpriteContactWorldX',
    params: []
  },
  {
    type: 'float',
    name: 'GetSpriteContactWorldY',
    params: []
  },
  {
    type: 'integer',
    name: 'GetSpriteContactSpriteID2',
    params: []
  },
  {
    type: 'integer',
    name: 'GetPhysicsCollision',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetPhysicsCollisionX',
    params: []
  },
  {
    type: 'float',
    name: 'GetPhysicsCollisionY',
    params: []
  },
  {
    type: 'float',
    name: 'GetPhysicsCollisionWorldX',
    params: []
  },
  {
    type: 'float',
    name: 'GetPhysicsCollisionWorldY',
    params: []
  },
  {
    type: 'void',
    name: 'CreateParticles',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'CreateParticles',
    params: [
      'float',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'GetParticlesExists',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'DeleteParticles',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetParticlesPosition',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetParticlesDepth',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetParticlesFrequency',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetParticlesStartZone',
    params: [
      'integer',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetParticlesDirection',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetParticlesVelocityRange',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetParticlesAngle',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetParticlesAngleRad',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetParticlesRotationRange',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetParticlesRotationRangeRad',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetParticlesFaceDirection',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetParticlesSize',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetParticlesLife',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetParticlesMax',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'ResetParticleCount',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetParticlesImage',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetParticlesVisible',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetParticlesActive',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetParticlesTransparency',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetParticlesColorInterpolation',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetParticlesX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetParticlesY',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetParticlesDepth',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetParticlesVisible',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetParticlesActive',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetParticlesFrequency',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetParticlesDirectionX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetParticlesDirectionY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetParticlesAngle',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetParticlesAngleRad',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetParticlesSize',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetParticlesLife',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetParticlesMaxReached',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'AddParticlesForce',
    params: [
      'integer',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'ClearParticlesForces',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'AddParticlesColorKeyFrame',
    params: [
      'integer',
      'float',
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'ClearParticlesColors',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'AddParticlesScaleKeyFrame',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'ClearParticlesScales',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'FixParticlesToScreen',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'UpdateParticles',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'OffsetParticles',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'CreateText',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'CreateText',
    params: [
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'GetTextExists',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'DeleteText',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'DeleteAllText',
    params: []
  },
  {
    type: 'void',
    name: 'SetTextString',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'SetTextPosition',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetTextX',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetTextY',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetTextAngle',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetTextAngleRad',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetTextAlignment',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTextSize',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetTextSpacing',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetTextLineSpacing',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetTextDepth',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTextVisible',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTextColor',
    params: [
      'integer',
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTextColorRed',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTextColorGreen',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTextColorBlue',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTextColorAlpha',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetTextColorRed',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetTextColorGreen',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetTextColorBlue',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetTextColorAlpha',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTextCharPosition',
    params: [
      'integer',
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetTextCharX',
    params: [
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetTextCharY',
    params: [
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetTextCharAngle',
    params: [
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetTextCharAngleRad',
    params: [
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetTextCharColor',
    params: [
      'integer',
      'integer',
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTextCharColorRed',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTextCharColorGreen',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTextCharColorBlue',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTextCharColorAlpha',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTextCharBold',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetTextCharX',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetTextCharY',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetTextCharAngle',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetTextCharAngleRad',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetTextCharColorRed',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetTextCharColorGreen',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetTextCharColorBlue',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetTextCharColorAlpha',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetTextX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetTextY',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetTextLength',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetTextTotalWidth',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetTextTotalHeight',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetTextHitTest',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetTextFontImage',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTextExtendedFontImage',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTextFont',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTextDefaultFontImage',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTextDefaultExtendedFontImage',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTextDefaultMinFilter',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTextDefaultMagFilter',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'FixTextToScreen',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTextMaxWidth',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetTextScissor',
    params: [
      'integer',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetTextTransparency',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTextBold',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetTextVisible',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetTextDepth',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetTextSize',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetTextSpacing',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetTextLineSpacing',
    params: [
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'GetTextString',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'LoadFont',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'LoadFont',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'GetFontExists',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetSystemFontExists',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'DeleteFont',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Print',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'Print',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Print',
    params: [
      'float'
    ]
  },
  {
    type: 'void',
    name: 'PrintC',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'PrintC',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'PrintC',
    params: [
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetPrintSize',
    params: [
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetPrintSpacing',
    params: [
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetPrintColor',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetPrintColor',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetPrintFont',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreateSkeleton2D',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CreateSkeleton2D',
    params: []
  },
  {
    type: 'integer',
    name: 'GetSkeleton2DExists',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'DeleteSkeleton2D',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'LoadSkeleton2DFromSpineFile',
    params: [
      'integer',
      'string',
      'float',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'LoadSkeleton2DFromSpineFile',
    params: [
      'string',
      'float',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'LoadSkeleton2DFromSpriterFile',
    params: [
      'integer',
      'string',
      'float',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'LoadSkeleton2DFromSpriterFile',
    params: [
      'string',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSkeleton2DPosition',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSkeleton2DRotation',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSkeleton2DFlip',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSkeleton2DDepth',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'FixSkeleton2DToScreen',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSkeleton2DVisible',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSkeleton2DX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSkeleton2DY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSkeleton2DAngle',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetSkeleton2DBone',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'GetSkeleton2DBoneParent',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSkeleton2DBoneX',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSkeleton2DBoneY',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSkeleton2DBoneAngle',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSkeleton2DBoneCurrX',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSkeleton2DBoneCurrY',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSkeleton2DBoneCurrAngle',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSkeleton2DBonePosition',
    params: [
      'integer',
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSkeleton2DBoneAngle',
    params: [
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSkeleton2DBoneScale',
    params: [
      'integer',
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSkeleton2DBoneMode',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'PlaySkeleton2DAnimation',
    params: [
      'integer',
      'string',
      'float',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSkeleton2DAnimationFrame',
    params: [
      'integer',
      'string',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSkeleton2DAnimationSpeed',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'float',
    name: 'GetSkeleton2DCurrentTime',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'StopSkeleton2DAnimation',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetSkeleton2DIsAnimating',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetSkeleton2DIsTweening',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSkeleton2DAnimationTime',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'TweenLinear',
    params: []
  },
  {
    type: 'integer',
    name: 'TweenSmooth1',
    params: []
  },
  {
    type: 'integer',
    name: 'TweenSmooth2',
    params: []
  },
  {
    type: 'integer',
    name: 'TweenEaseIn1',
    params: []
  },
  {
    type: 'integer',
    name: 'TweenEaseIn2',
    params: []
  },
  {
    type: 'integer',
    name: 'TweenEaseOut1',
    params: []
  },
  {
    type: 'integer',
    name: 'TweenEaseOut2',
    params: []
  },
  {
    type: 'integer',
    name: 'TweenBounce',
    params: []
  },
  {
    type: 'integer',
    name: 'TweenOvershoot',
    params: []
  },
  {
    type: 'void',
    name: 'DeleteTween',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetTweenExists',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenDuration',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'CreateTweenCustom',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'CreateTweenCustom',
    params: [
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'GetTweenCustomExists',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenCustomFloat1',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenCustomFloat2',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenCustomFloat3',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenCustomFloat4',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenCustomInteger1',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenCustomInteger2',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenCustomInteger3',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenCustomInteger4',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetTweenCustomFloat1',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetTweenCustomFloat2',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetTweenCustomFloat3',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetTweenCustomFloat4',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetTweenCustomInteger1',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetTweenCustomInteger2',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetTweenCustomInteger3',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetTweenCustomInteger4',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'PlayTweenCustom',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'StopTweenCustom',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetTweenCustomPlaying',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreateTweenSprite',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'CreateTweenSprite',
    params: [
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'GetTweenSpriteExists',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenSpriteX',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenSpriteY',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenSpriteXByOffset',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenSpriteYByOffset',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenSpriteAngle',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenSpriteSizeX',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenSpriteSizeY',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenSpriteRed',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenSpriteGreen',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenSpriteBlue',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenSpriteAlpha',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'PlayTweenSprite',
    params: [
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'StopTweenSprite',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetTweenSpritePlaying',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreateTweenText',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'CreateTweenText',
    params: [
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'GetTweenTextExists',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenTextX',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenTextY',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenTextAngle',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenTextSize',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenTextSpacing',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenTextLineSpacing',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenTextRed',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenTextGreen',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenTextBlue',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenTextAlpha',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'PlayTweenText',
    params: [
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'StopTweenText',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetTweenTextPlaying',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreateTweenChar',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'CreateTweenChar',
    params: [
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'GetTweenCharExists',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenCharX',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenCharY',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenCharAngle',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenCharRed',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenCharGreen',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenCharBlue',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenCharAlpha',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'PlayTweenChar',
    params: [
      'integer',
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'StopTweenChar',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetTweenCharPlaying',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreateTweenObject',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'CreateTweenObject',
    params: [
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'GetTweenObjectExists',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenObjectX',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenObjectY',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenObjectZ',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenObjectAngleX',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenObjectAngleY',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenObjectAngleZ',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenObjectScaleX',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenObjectScaleY',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenObjectScaleZ',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenObjectRed',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenObjectGreen',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenObjectBlue',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenObjectAlpha',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'PlayTweenObject',
    params: [
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'StopTweenObject',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetTweenObjectPlaying',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreateTweenCamera',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'CreateTweenCamera',
    params: [
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'GetTweenCameraExists',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenCameraX',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenCameraY',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenCameraZ',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenCameraAngleX',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenCameraAngleY',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenCameraAngleZ',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenCameraFOV',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'PlayTweenCamera',
    params: [
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'StopTweenCamera',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetTweenCameraPlaying',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreateTweenChain',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CreateTweenChain',
    params: []
  },
  {
    type: 'void',
    name: 'DeleteTweenChain',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'ClearTweenChain',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'AddTweenChainCustom',
    params: [
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'AddTweenChainSprite',
    params: [
      'integer',
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'AddTweenChainText',
    params: [
      'integer',
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'AddTweenChainChar',
    params: [
      'integer',
      'integer',
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'AddTweenChainObject',
    params: [
      'integer',
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'AddTweenChainCamera',
    params: [
      'integer',
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'PlayTweenChain',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'PauseTweenChain',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'StopTweenChain',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetTweenChainPlaying',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetTweenChainTime',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'float',
    name: 'GetTweenChainEndTime',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'UpdateAllTweens',
    params: [
      'float'
    ]
  },
  {
    type: 'void',
    name: 'UpdateTweenCustom',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'UpdateTweenSprite',
    params: [
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'UpdateTweenText',
    params: [
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'UpdateTweenChar',
    params: [
      'integer',
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'UpdateTweenObject',
    params: [
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'UpdateTweenCamera',
    params: [
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'UpdateTweenChain',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'GetRawTouchCount',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetRawFirstTouchEvent',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetRawNextTouchEvent',
    params: []
  },
  {
    type: 'integer',
    name: 'GetRawTouchType',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetRawTouchStartX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetRawTouchStartY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetRawTouchCurrentX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetRawTouchCurrentY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetRawTouchLastX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetRawTouchLastY',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetRawTouchReleased',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetRawTouchValue',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetRawTouchValue',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetRawTouchTime',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'LoadSound',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'LoadSound',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'LoadSoundOGG',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'LoadSoundOGG',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'SaveSound',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'PlaySound',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'PlaySound',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'PlaySound',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'PlaySound',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'StopSound',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'DeleteSound',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetSoundExists',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetSoundInstances',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetSoundsPlaying',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSoundSystemVolume',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSoundMaxRate',
    params: []
  },
  {
    type: 'float',
    name: 'GetSoundMinRate',
    params: []
  },
  {
    type: 'integer',
    name: 'GetSoundInstancePlaying',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetSoundInstanceVolume',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSoundInstanceRate',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSoundInstanceVolume',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSoundInstanceRate',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSoundInstanceBalance',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'GetSoundInstanceLoopCount',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'StopSoundInstance',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'LoadMusic',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'LoadMusic',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'SetMusicFileVolume',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'PlayMusic',
    params: []
  },
  {
    type: 'void',
    name: 'PlayMusic',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'PlayMusic',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'PlayMusic',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'PauseMusic',
    params: []
  },
  {
    type: 'void',
    name: 'ResumeMusic',
    params: []
  },
  {
    type: 'void',
    name: 'StopMusic',
    params: []
  },
  {
    type: 'void',
    name: 'DeleteMusic',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetMusicPlaying',
    params: []
  },
  {
    type: 'void',
    name: 'SetMusicSystemVolume',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetMusicExists',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetMusicDuration',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetMusicPosition',
    params: []
  },
  {
    type: 'void',
    name: 'SeekMusic',
    params: [
      'float',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'LoadMusicOGG',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'LoadMusicOGG',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'GetMusicExistsOGG',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetMusicVolumeOGG',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'PlayMusicOGG',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'PlayMusicOGG',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'PauseMusicOGG',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'ResumeMusicOGG',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'StopMusicOGG',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'DeleteMusicOGG',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetMusicPlayingOGG',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetMusicLoopCountOGG',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetMusicDurationOGG',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetMusicPositionOGG',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SeekMusicOGG',
    params: [
      'integer',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetMusicSystemVolumeOGG',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetMusicLoopTimesOGG',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetMusicLoopCountOGG',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'RecordSound',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'StopSoundRecording',
    params: []
  },
  {
    type: 'integer',
    name: 'IsSoundRecording',
    params: []
  },
  {
    type: 'void',
    name: 'DeleteFile',
    params: [
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'GetFileExists',
    params: [
      'string'
    ]
  },
  {
    type: 'string',
    name: 'ChooseRawFile',
    params: [
      'string'
    ]
  },
  {
    type: 'string',
    name: 'ChooseRawFile',
    params: [
      'string',
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'SimplifyPath',
    params: [
      'string'
    ]
  },
  {
    type: 'string',
    name: 'JoinPaths',
    params: [
      'string',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'IsAbsolutePath',
    params: [
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'CountWindowsDrives',
    params: []
  },
  {
    type: 'string',
    name: 'GetWindowsDrive',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'OpenRawFolder',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'CloseRawFolder',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetRawFolderNumFiles',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetRawFolderNumFolders',
    params: [
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'GetRawFolderFileName',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'GetRawFolderFolderName',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'OpenToWrite',
    params: [
      'integer',
      'string',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'OpenToWrite',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'OpenToWrite',
    params: [
      'string',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'OpenToWrite',
    params: [
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'OpenToRead',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'OpenToRead',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'FileIsOpen',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CloseFile',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'FileEOF',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetFileSize',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetFilePos',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetFilePos',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'WriteByte',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'WriteInteger',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'WriteFloat',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'WriteString',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'WriteString2',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'WriteLine',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'ReadByte',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'ReadInteger',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'ReadFloat',
    params: [
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'ReadString',
    params: [
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'ReadString2',
    params: [
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'ReadLine',
    params: [
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'Str',
    params: [
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'Str',
    params: [
      'float'
    ]
  },
  {
    type: 'string',
    name: 'Str',
    params: [
      'float',
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'Bin',
    params: [
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'Hex',
    params: [
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'StringToBase64',
    params: [
      'string'
    ]
  },
  {
    type: 'string',
    name: 'HexToBase64',
    params: [
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'Val',
    params: [
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'Val',
    params: [
      'string',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'ValFloat',
    params: [
      'string'
    ]
  },
  {
    type: 'string',
    name: 'Left',
    params: [
      'string',
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'Right',
    params: [
      'string',
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'Mid',
    params: [
      'string',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'Asc',
    params: [
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'Len',
    params: [
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'ByteLen',
    params: [
      'string'
    ]
  },
  {
    type: 'string',
    name: 'Chr',
    params: [
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'Lower',
    params: [
      'string'
    ]
  },
  {
    type: 'string',
    name: 'Upper',
    params: [
      'string'
    ]
  },
  {
    type: 'string',
    name: 'Spaces',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'FindStringCount',
    params: [
      'string',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'FindStringCount',
    params: [
      'string',
      'string',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'FindString',
    params: [
      'string',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'FindString',
    params: [
      'string',
      'string',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'FindStringReverse',
    params: [
      'string',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'FindStringReverse',
    params: [
      'string',
      'string',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CompareString',
    params: [
      'string',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'CompareString',
    params: [
      'string',
      'string',
      'integer',
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'ReplaceString',
    params: [
      'string',
      'string',
      'string',
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'StripString',
    params: [
      'string',
      'string'
    ]
  },
  {
    type: 'string',
    name: 'TrimString',
    params: [
      'string',
      'string'
    ]
  },
  {
    type: 'string',
    name: 'TruncateString',
    params: [
      'string',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'CountStringTokens',
    params: [
      'string',
      'string'
    ]
  },
  {
    type: 'string',
    name: 'GetStringToken',
    params: [
      'string',
      'string',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CountStringTokens2',
    params: [
      'string',
      'string'
    ]
  },
  {
    type: 'string',
    name: 'GetStringToken2',
    params: [
      'string',
      'string',
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'GetCurrentDir',
    params: []
  },
  {
    type: 'string',
    name: 'GetFolder',
    params: []
  },
  {
    type: 'integer',
    name: 'SetFolder',
    params: [
      'string'
    ]
  },
  {
    type: 'string',
    name: 'GetFirstFolder',
    params: []
  },
  {
    type: 'string',
    name: 'GetFirstFolder',
    params: [
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'GetNextFolder',
    params: []
  },
  {
    type: 'integer',
    name: 'GetFolderCount',
    params: []
  },
  {
    type: 'integer',
    name: 'GetFolderCount',
    params: [
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'GetFirstFile',
    params: []
  },
  {
    type: 'string',
    name: 'GetFirstFile',
    params: [
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'GetNextFile',
    params: []
  },
  {
    type: 'integer',
    name: 'GetFileCount',
    params: []
  },
  {
    type: 'integer',
    name: 'GetFileCount',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CreateBroadcastListener',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CreateBroadcastListener',
    params: [
      'string',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetBroadcastMessage',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'DeleteBroadcastListener',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'ConnectSocket',
    params: [
      'string',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'ConnectSocket',
    params: [
      'integer',
      'string',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetSocketConnected',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetSocketExists',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'DeleteSocket',
    params: [
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'GetSocketRemoteIP',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'FlushSocket',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetSocketBytesAvailable',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetSocketByte',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetSocketInteger',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSocketFloat',
    params: [
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'GetSocketString',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'SendSocketByte',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'SendSocketInteger',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'SendSocketFloat',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'SendSocketString',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'CreateSocketListener',
    params: [
      'string',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CreateSocketListener',
    params: [
      'integer',
      'string',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetSocketListenerConnection',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'DeleteSocketListener',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'HostNetwork',
    params: [
      'string',
      'string',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'HostNetwork',
    params: [
      'string',
      'string',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetNetworkNoMoreClients',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'JoinNetwork',
    params: [
      'string',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'JoinNetwork',
    params: [
      'string',
      'integer',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'IsNetworkActive',
    params: [
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'GetDeviceIP',
    params: []
  },
  {
    type: 'string',
    name: 'GetDeviceIPv6',
    params: []
  },
  {
    type: 'void',
    name: 'CloseNetwork',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetNetworkLatency',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetNetworkMyClientID',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetNetworkNumClients',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetNetworkFirstClient',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetNetworkNextClient',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetNetworkClientDisconnected',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'DeleteNetworkClient',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'GetNetworkClientName',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetNetworkClientPing',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetNetworkServerID',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetNetworkLocalInteger',
    params: [
      'integer',
      'string',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetNetworkLocalInteger',
    params: [
      'integer',
      'string',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetNetworkLocalFloat',
    params: [
      'integer',
      'string',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetNetworkLocalFloat',
    params: [
      'integer',
      'string',
      'float',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetNetworkClientInteger',
    params: [
      'integer',
      'integer',
      'string'
    ]
  },
  {
    type: 'float',
    name: 'GetNetworkClientFloat',
    params: [
      'integer',
      'integer',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'CreateNetworkMessage',
    params: []
  },
  {
    type: 'void',
    name: 'AddNetworkMessageInteger',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'AddNetworkMessageFloat',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'AddNetworkMessageString',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'string',
    name: 'GetNetworkMessageFromIP',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetNetworkMessageFromClient',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetNetworkMessageInteger',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetNetworkMessageFloat',
    params: [
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'GetNetworkMessageString',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'DeleteNetworkMessage',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SendNetworkMessage',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetNetworkMessage',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetNetworkClientUserData',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetNetworkClientUserData',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CreateHTTPConnection',
    params: []
  },
  {
    type: 'void',
    name: 'DeleteHTTPConnection',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'SetHTTPHost',
    params: [
      'integer',
      'string',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'SetHTTPHost',
    params: [
      'integer',
      'string',
      'integer',
      'string',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'CloseHTTPConnection',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetHTTPTimeout',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetHTTPVerifyCertificate',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'SendHTTPRequest',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'string',
    name: 'SendHTTPRequest',
    params: [
      'integer',
      'string',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'SendHTTPRequestASync',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'SendHTTPRequestASync',
    params: [
      'integer',
      'string',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'SendHTTPFile',
    params: [
      'integer',
      'string',
      'string',
      'string'
    ]
  },
  {
    type: 'string',
    name: 'GetHTTPResponse',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetHTTPResponseReady',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetHTTPFile',
    params: [
      'integer',
      'string',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'GetHTTPFile',
    params: [
      'integer',
      'string',
      'string',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'GetHTTPFileComplete',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetHTTPFileProgress',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetErrorMode',
    params: [
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'GetLastError',
    params: []
  },
  {
    type: 'integer',
    name: 'GetErrorOccurred',
    params: []
  },
  {
    type: 'void',
    name: 'PluginError',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'Message',
    params: [
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'GetJoystickExists',
    params: []
  },
  {
    type: 'float',
    name: 'GetRawMouseX',
    params: []
  },
  {
    type: 'float',
    name: 'GetRawMouseY',
    params: []
  },
  {
    type: 'float',
    name: 'GetRawMouseWheel',
    params: []
  },
  {
    type: 'float',
    name: 'GetRawMouseWheelDelta',
    params: []
  },
  {
    type: 'integer',
    name: 'GetRawMouseLeftPressed',
    params: []
  },
  {
    type: 'integer',
    name: 'GetRawMouseLeftState',
    params: []
  },
  {
    type: 'integer',
    name: 'GetRawMouseLeftReleased',
    params: []
  },
  {
    type: 'integer',
    name: 'GetRawMouseRightPressed',
    params: []
  },
  {
    type: 'integer',
    name: 'GetRawMouseRightState',
    params: []
  },
  {
    type: 'integer',
    name: 'GetRawMouseRightReleased',
    params: []
  },
  {
    type: 'integer',
    name: 'GetRawMouseMiddlePressed',
    params: []
  },
  {
    type: 'integer',
    name: 'GetRawMouseMiddleState',
    params: []
  },
  {
    type: 'integer',
    name: 'GetRawMouseMiddleReleased',
    params: []
  },
  {
    type: 'integer',
    name: 'GetAccelerometerExists',
    params: []
  },
  {
    type: 'integer',
    name: 'GetGyroSensorExists',
    params: []
  },
  {
    type: 'integer',
    name: 'GetProximitySensorExists',
    params: []
  },
  {
    type: 'integer',
    name: 'GetLightSensorExists',
    params: []
  },
  {
    type: 'integer',
    name: 'GetMagneticSensorExists',
    params: []
  },
  {
    type: 'integer',
    name: 'GetRotationVectorSensorExists',
    params: []
  },
  {
    type: 'float',
    name: 'GetRawAccelX',
    params: []
  },
  {
    type: 'float',
    name: 'GetRawAccelY',
    params: []
  },
  {
    type: 'float',
    name: 'GetRawAccelZ',
    params: []
  },
  {
    type: 'float',
    name: 'GetRawGyroVelocityX',
    params: []
  },
  {
    type: 'float',
    name: 'GetRawGyroVelocityY',
    params: []
  },
  {
    type: 'float',
    name: 'GetRawGyroVelocityZ',
    params: []
  },
  {
    type: 'float',
    name: 'GetRawProximityDistance',
    params: []
  },
  {
    type: 'float',
    name: 'GetRawLightLevel',
    params: []
  },
  {
    type: 'float',
    name: 'GetRawMagneticX',
    params: []
  },
  {
    type: 'float',
    name: 'GetRawMagneticY',
    params: []
  },
  {
    type: 'float',
    name: 'GetRawMagneticZ',
    params: []
  },
  {
    type: 'float',
    name: 'GetRawRotationVectorX',
    params: []
  },
  {
    type: 'float',
    name: 'GetRawRotationVectorY',
    params: []
  },
  {
    type: 'float',
    name: 'GetRawRotationVectorZ',
    params: []
  },
  {
    type: 'float',
    name: 'GetRawRotationVectorW',
    params: []
  },
  {
    type: 'float',
    name: 'GetRawRotationVectorX2',
    params: []
  },
  {
    type: 'float',
    name: 'GetRawRotationVectorY2',
    params: []
  },
  {
    type: 'float',
    name: 'GetRawRotationVectorZ2',
    params: []
  },
  {
    type: 'float',
    name: 'GetRawRotationVectorW2',
    params: []
  },
  {
    type: 'void',
    name: 'CompleteRawJoystickDetection',
    params: []
  },
  {
    type: 'integer',
    name: 'GetRawJoystickExists',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetRawJoystickConnected',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetRawJoystickX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetRawJoystickY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetRawJoystickZ',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetRawJoystickRX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetRawJoystickRY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetRawJoystickRZ',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetRawJoystickButtonPressed',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetRawJoystickButtonState',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetRawJoystickButtonReleased',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetRawJoystickDeadZone',
    params: [
      'float'
    ]
  },
  {
    type: 'void',
    name: 'AddVirtualJoystick',
    params: [
      'integer',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'DeleteVirtualJoystick',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetVirtualJoystickExists',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetVirtualJoystickX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetVirtualJoystickY',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetVirtualJoystickAlpha',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetVirtualJoystickPosition',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetVirtualJoystickSize',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetVirtualJoystickActive',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetVirtualJoystickVisible',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetVirtualJoystickImageInner',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetVirtualJoystickImageOuter',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetVirtualJoystickDeadZone',
    params: [
      'float'
    ]
  },
  {
    type: 'void',
    name: 'AddVirtualButton',
    params: [
      'integer',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'DeleteVirtualButton',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetVirtualButtonExists',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetVirtualButtonPressed',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetVirtualButtonReleased',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetVirtualButtonState',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetVirtualButtonColor',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetVirtualButtonAlpha',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetVirtualButtonPosition',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetVirtualButtonSize',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetVirtualButtonSize',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetVirtualButtonActive',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetVirtualButtonVisible',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetVirtualButtonImageUp',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetVirtualButtonImageDown',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetVirtualButtonText',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'GetRawKeyPressed',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetRawKeyState',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetRawKeyReleased',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetRawLastKey',
    params: []
  },
  {
    type: 'float',
    name: 'GetDirectionX',
    params: []
  },
  {
    type: 'float',
    name: 'GetDirectionY',
    params: []
  },
  {
    type: 'float',
    name: 'GetDirectionAngle',
    params: []
  },
  {
    type: 'float',
    name: 'GetDirectionSpeed',
    params: []
  },
  {
    type: 'integer',
    name: 'GetPointerPressed',
    params: []
  },
  {
    type: 'integer',
    name: 'GetPointerReleased',
    params: []
  },
  {
    type: 'integer',
    name: 'GetPointerState',
    params: []
  },
  {
    type: 'float',
    name: 'GetPointerX',
    params: []
  },
  {
    type: 'float',
    name: 'GetPointerY',
    params: []
  },
  {
    type: 'float',
    name: 'GetJoystickX',
    params: []
  },
  {
    type: 'float',
    name: 'GetJoystickY',
    params: []
  },
  {
    type: 'void',
    name: 'SetJoystickDeadZone',
    params: [
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetJoystickScreenPosition',
    params: [
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'GetButtonPressed',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetButtonState',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetButtonReleased',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetButtonScreenPosition',
    params: [
      'integer',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'StartTextInput',
    params: []
  },
  {
    type: 'void',
    name: 'StartTextInput',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'StopTextInput',
    params: []
  },
  {
    type: 'integer',
    name: 'GetTextInputState',
    params: []
  },
  {
    type: 'integer',
    name: 'GetTextInputCompleted',
    params: []
  },
  {
    type: 'integer',
    name: 'GetTextInputCancelled',
    params: []
  },
  {
    type: 'string',
    name: 'GetTextInput',
    params: []
  },
  {
    type: 'integer',
    name: 'GetLastChar',
    params: []
  },
  {
    type: 'void',
    name: 'SetCursorBlinkTime',
    params: [
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetTextInputMaxChars',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreateEditBox',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CreateEditBox',
    params: []
  },
  {
    type: 'integer',
    name: 'GetEditBoxExists',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'DeleteEditBox',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetEditBoxHasFocus',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetCurrentEditBox',
    params: []
  },
  {
    type: 'void',
    name: 'SetEditBoxPosition',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetEditBoxSize',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetEditBoxDepth',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetEditBoxBorderSize',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetEditBoxBorderColor',
    params: [
      'integer',
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetEditBoxBackgroundColor',
    params: [
      'integer',
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetEditBoxText',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'SetEditBoxTextColor',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetEditBoxCursorColor',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetEditBoxFontImage',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetEditBoxExtendedFontImage',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetEditBoxFont',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetEditBoxTextSize',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetEditBoxCursorPosition',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetEditBoxFocus',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetEditBoxActive',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetEditBoxVisible',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetEditBoxBorderImage',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetEditBoxBackgroundImage',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetEditBoxCursorBlinkTime',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetEditBoxCursorWidth',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetEditBoxMaxChars',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetEditBoxMaxLines',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetEditBoxMultiLine',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetEditBoxScissor',
    params: [
      'integer',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetEditBoxPasswordMode',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetEditBoxUseAlternateInput',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetEditBoxWrapMode',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'FixEditBoxToScreen',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'GetEditBoxText',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetEditBoxX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetEditBoxY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetEditBoxWidth',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetEditBoxHeight',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetEditBoxChanged',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetEditBoxActive',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetEditBoxVisible',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetEditBoxLines',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetEditBoxCursorPosition',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetManagedSpriteDrawnCount',
    params: []
  },
  {
    type: 'integer',
    name: 'GetManagedSpriteCount',
    params: []
  },
  {
    type: 'integer',
    name: 'GetManagedSpriteSortedCount',
    params: []
  },
  {
    type: 'integer',
    name: 'GetPixelsDrawn',
    params: []
  },
  {
    type: 'integer',
    name: 'GetManagedSpriteDrawCalls',
    params: []
  },
  {
    type: 'integer',
    name: 'GetParticleDrawnPointCount',
    params: []
  },
  {
    type: 'integer',
    name: 'GetParticleDrawnQuadCount',
    params: []
  },
  {
    type: 'float',
    name: 'GetUpdateTime',
    params: []
  },
  {
    type: 'float',
    name: 'GetPhysicsTime',
    params: []
  },
  {
    type: 'float',
    name: 'GetDrawingSetupTime',
    params: []
  },
  {
    type: 'float',
    name: 'GetDrawingTime',
    params: []
  },
  {
    type: 'integer',
    name: 'GetLoadedImages',
    params: []
  },
  {
    type: 'integer',
    name: 'GetUnassignedImages',
    params: []
  },
  {
    type: 'string',
    name: 'GetUnassignedImageFileName',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetImageMemoryUsage',
    params: []
  },
  {
    type: 'integer',
    name: 'GetLeapYear',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetUnixFromDate',
    params: [
      'integer',
      'integer',
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetYearFromUnix',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetMonthFromUnix',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetDaysFromUnix',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetHoursFromUnix',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetMinutesFromUnix',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetSecondsFromUnix',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetInneractiveDetails',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'SetAdMobDetails',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'SetAdMobRewardAdDetails',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'SetChartboostDetails',
    params: [
      'string',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'SetAmazonAdDetails',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'SetAmazonAdTesting',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetAdMobTesting',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'ShowFullscreenAdvertAdMob',
    params: []
  },
  {
    type: 'void',
    name: 'ShowFullscreenAdvertChartboost',
    params: []
  },
  {
    type: 'void',
    name: 'ShowFullscreenAdvertAmazon',
    params: []
  },
  {
    type: 'integer',
    name: 'GetFullscreenAdvertLoadedAdMob',
    params: []
  },
  {
    type: 'integer',
    name: 'GetFullscreenAdvertLoadedChartboost',
    params: []
  },
  {
    type: 'integer',
    name: 'GetFullscreenAdvertLoadedAmazon',
    params: []
  },
  {
    type: 'void',
    name: 'ShowRewardAdAdMob',
    params: []
  },
  {
    type: 'integer',
    name: 'GetRewardAdLoadedAdMob',
    params: []
  },
  {
    type: 'integer',
    name: 'GetRewardAdRewardedAdMob',
    params: []
  },
  {
    type: 'void',
    name: 'ResetRewardAdMob',
    params: []
  },
  {
    type: 'void',
    name: 'ShowRewardAdChartboost',
    params: []
  },
  {
    type: 'void',
    name: 'CacheRewardAdChartboost',
    params: []
  },
  {
    type: 'integer',
    name: 'GetRewardAdLoadedChartboost',
    params: []
  },
  {
    type: 'integer',
    name: 'GetRewardAdRewardedChartboost',
    params: []
  },
  {
    type: 'void',
    name: 'ResetRewardChartboost',
    params: []
  },
  {
    type: 'void',
    name: 'CreateFullscreenAdvert',
    params: []
  },
  {
    type: 'void',
    name: 'CreateAdvert',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreateAdvertEx',
    params: [
      'integer',
      'integer',
      'integer',
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetAdvertPosition',
    params: [
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetAdvertLocation',
    params: [
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetAdvertLocationEx',
    params: [
      'integer',
      'integer',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetAdvertVisible',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'RequestAdvertRefresh',
    params: []
  },
  {
    type: 'void',
    name: 'DeleteAdvert',
    params: []
  },
  {
    type: 'void',
    name: 'CreateZip',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'CreateZip',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'AddZipEntry',
    params: [
      'integer',
      'string',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'CloseZip',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'ExtractZip',
    params: [
      'string',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'Log',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'RateApp',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'RateApp',
    params: [
      'string',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'RateApp',
    params: [
      'string',
      'string',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'RequestAppReview',
    params: []
  },
  {
    type: 'void',
    name: 'InAppPurchaseSetKeys',
    params: [
      'string',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'InAppPurchaseSetTitle',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'InAppPurchaseAddProductID',
    params: [
      'string',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'InAppPurchaseSetup',
    params: []
  },
  {
    type: 'integer',
    name: 'GetInAppPurchaseAvailable',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'InAppPurchaseActivate',
    params: [
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'GetInAppPurchaseLocalPrice',
    params: [
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'GetInAppPurchaseDescription',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetInAppPurchaseState',
    params: []
  },
  {
    type: 'void',
    name: 'InAppPurchaseRestore',
    params: []
  },
  {
    type: 'string',
    name: 'GetInAppPurchaseSignature',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'TwitterSetup',
    params: [
      'string',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'TwitterMessage',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'FacebookSetup',
    params: [
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'GetFacebookLoggedIn',
    params: []
  },
  {
    type: 'string',
    name: 'FacebookGetUserID',
    params: []
  },
  {
    type: 'string',
    name: 'FacebookGetUserName',
    params: []
  },
  {
    type: 'string',
    name: 'FacebookGetAccessToken',
    params: []
  },
  {
    type: 'void',
    name: 'FacebookLogin',
    params: []
  },
  {
    type: 'void',
    name: 'FacebookLogout',
    params: []
  },
  {
    type: 'void',
    name: 'FacebookPostOnMyWall',
    params: [
      'string',
      'string',
      'string',
      'string',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'FacebookPostOnFriendsWall',
    params: [
      'string',
      'string',
      'string',
      'string',
      'string',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'FacebookInviteFriend',
    params: [
      'string',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'FacebookShowLikeButton',
    params: [
      'string',
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'FacebookDestroyLikeButton',
    params: []
  },
  {
    type: 'void',
    name: 'FacebookGetFriends',
    params: []
  },
  {
    type: 'integer',
    name: 'FacebookGetFriendsState',
    params: []
  },
  {
    type: 'integer',
    name: 'FacebookGetFriendsCount',
    params: []
  },
  {
    type: 'string',
    name: 'FacebookGetFriendsName',
    params: [
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'FacebookGetFriendsID',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'FacebookDownloadFriendsPhoto',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetFacebookDownloadState',
    params: []
  },
  {
    type: 'string',
    name: 'GetFacebookDownloadFile',
    params: []
  },
  {
    type: 'void',
    name: 'NotificationCreate',
    params: [
      'string',
      'string',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'GetNotification',
    params: []
  },
  {
    type: 'string',
    name: 'GetNotificationData',
    params: []
  },
  {
    type: 'void',
    name: 'NotificationReset',
    params: []
  },
  {
    type: 'void',
    name: 'SetLocalNotification',
    params: [
      'integer',
      'integer',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'CancelLocalNotification',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetLocalNotificationExists',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetLocalNotificationTime',
    params: [
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'GetLocalNotificationMessage',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'MakeColor',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetColorRed',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetColorGreen',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetColorBlue',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'DrawLine',
    params: [
      'float',
      'float',
      'float',
      'float',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'DrawLine',
    params: [
      'float',
      'float',
      'float',
      'float',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'DrawBox',
    params: [
      'float',
      'float',
      'float',
      'float',
      'integer',
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'DrawEllipse',
    params: [
      'float',
      'float',
      'float',
      'float',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CreateMemblock',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreateMemblock',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetMemblockExists',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'DeleteMemblock',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CopyMemblock',
    params: [
      'integer',
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetMemblockSize',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetMemblockByte',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetMemblockByteSigned',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetMemblockShort',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetMemblockInt',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetMemblockFloat',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'GetMemblockString',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetMemblockByte',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetMemblockByteSigned',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetMemblockShort',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetMemblockInt',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetMemblockFloat',
    params: [
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetMemblockString',
    params: [
      'integer',
      'integer',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'CreateMemblockFromImage',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CreateMemblockFromImage',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreateImageFromMemblock',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CreateImageFromMemblock',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreateMemblockFromSound',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CreateMemblockFromSound',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreateSoundFromMemblock',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CreateSoundFromMemblock',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreateMemblockFromFile',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'CreateMemblockFromFile',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'CreateFileFromMemblock',
    params: [
      'string',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreateMemblockFromObjectMesh',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CreateMemblockFromObjectMesh',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreateObjectFromMeshMemblock',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CreateObjectFromMeshMemblock',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectMeshFromMemblock',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'AddObjectMeshFromMemblock',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetMeshMemblockVertexPosition',
    params: [
      'integer',
      'integer',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetMeshMemblockVertexNormal',
    params: [
      'integer',
      'integer',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetMeshMemblockVertexUV',
    params: [
      'integer',
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'float',
    name: 'GetMeshMemblockVertexX',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetMeshMemblockVertexY',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetMeshMemblockVertexZ',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetMeshMemblockVertexNormalX',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetMeshMemblockVertexNormalY',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetMeshMemblockVertexNormalZ',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetMeshMemblockVertexU',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetMeshMemblockVertexV',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetGlobal3DDepth',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreateObjectBox',
    params: [
      'integer',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'CreateObjectBox',
    params: [
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'CreateObjectCapsule',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CreateObjectCapsule',
    params: [
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreateObjectSphere',
    params: [
      'integer',
      'float',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CreateObjectSphere',
    params: [
      'float',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreateObjectCone',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CreateObjectCone',
    params: [
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreateObjectCylinder',
    params: [
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CreateObjectCylinder',
    params: [
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreateObjectPlane',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'CreateObjectPlane',
    params: [
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'CreateObjectQuad',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CreateObjectQuad',
    params: []
  },
  {
    type: 'integer',
    name: 'CreateObjectFromHeightMap',
    params: [
      'string',
      'float',
      'float',
      'float',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreateObjectFromHeightMap',
    params: [
      'integer',
      'string',
      'float',
      'float',
      'float',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CreateObjectFromObjectMesh',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreateObjectFromObjectMesh',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'LoadObject',
    params: [
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'LoadObject',
    params: [
      'string',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'LoadObject',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'LoadObject',
    params: [
      'integer',
      'string',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'LoadObjectWithChildren',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'LoadObjectWithChildren',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'SaveObject',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'CloneObject',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CloneObject',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'InstanceObject',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'InstanceObject',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetObjectExists',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'DeleteObject',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'DeleteObjectWithChildren',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'DeleteAllObjects',
    params: []
  },
  {
    type: 'integer',
    name: 'GetObjectNumChildren',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetObjectChildID',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetObjectNumBones',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetObjectBoneByName',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'GetObjectNumMeshes',
    params: [
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'GetObjectMeshName',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectMeshImage',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectMeshLightMap',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectMeshShader',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'GetObjectMeshVSSource',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'GetObjectMeshPSSource',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectMeshUVOffset',
    params: [
      'integer',
      'integer',
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectMeshUVScale',
    params: [
      'integer',
      'integer',
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectMeshSizeMinX',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectMeshSizeMaxX',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectMeshSizeMinY',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectMeshSizeMaxY',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectMeshSizeMinZ',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectMeshSizeMaxZ',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'FixObjectToObject',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'FixObjectToBone',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetObjectNumAnimations',
    params: [
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'GetObjectAnimationName',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'PlayObjectAnimation',
    params: [
      'integer',
      'string',
      'float',
      'float',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectAnimationFrame',
    params: [
      'integer',
      'string',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'StopObjectAnimation',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'ResetObjectAnimation',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectAnimationSpeed',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'GetObjectIsAnimating',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetObjectIsTweening',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectAnimationTime',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectAnimationDuration',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectBonePosition',
    params: [
      'integer',
      'integer',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectBoneRotation',
    params: [
      'integer',
      'integer',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectBoneRotationQuat',
    params: [
      'integer',
      'integer',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectBoneLookAt',
    params: [
      'integer',
      'integer',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectBoneCanAnimate',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'RotateObjectBoneLocalX',
    params: [
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'RotateObjectBoneLocalY',
    params: [
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'RotateObjectBoneLocalZ',
    params: [
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'string',
    name: 'GetObjectBoneName',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectBoneX',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectBoneY',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectBoneZ',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectBoneAngleX',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectBoneAngleY',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectBoneAngleZ',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectBoneQuatW',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectBoneQuatX',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectBoneQuatY',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectBoneQuatZ',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectBoneWorldX',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectBoneWorldY',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectBoneWorldZ',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectBoneWorldAngleX',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectBoneWorldAngleY',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectBoneWorldAngleZ',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectBoneWorldQuatW',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectBoneWorldQuatX',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectBoneWorldQuatY',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectBoneWorldQuatZ',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectPosition',
    params: [
      'integer',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectRotation',
    params: [
      'integer',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectRotationQuat',
    params: [
      'integer',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectScale',
    params: [
      'integer',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectScalePermanent',
    params: [
      'integer',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'MoveObjectLocalX',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'MoveObjectLocalY',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'MoveObjectLocalZ',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'RotateObjectLocalX',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'RotateObjectLocalY',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'RotateObjectLocalZ',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'RotateObjectGlobalX',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'RotateObjectGlobalY',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'RotateObjectGlobalZ',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectZ',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectAngleX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectAngleY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectAngleZ',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectQuatW',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectQuatX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectQuatY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectQuatZ',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectWorldX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectWorldY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectWorldZ',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectWorldAngleX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectWorldAngleY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectWorldAngleZ',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectWorldQuatW',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectWorldQuatX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectWorldQuatY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectWorldQuatZ',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectSizeMinX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectSizeMaxX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectSizeMinY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectSizeMaxY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectSizeMinZ',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectSizeMaxZ',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectLookAt',
    params: [
      'integer',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'FixObjectPivot',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectHeightMapHeight',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectImage',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectLightMap',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectShader',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectColor',
    params: [
      'integer',
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectColorEmissive',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectLightMode',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectScreenCulling',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectUVOffset',
    params: [
      'integer',
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectUVScale',
    params: [
      'integer',
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectFogMode',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectDepthReadMode',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectDepthWrite',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectDepthBias',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectDepthRange',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectTransparency',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectAlphaMask',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectCullMode',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectVisible',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetObjectDepthReadMode',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetObjectDepthWrite',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectDepthBias',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetObjectTransparency',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetObjectCullMode',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetObjectVisible',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetObjectInScreen',
    params: [
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'GetObjectName',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectShaderConstantByName',
    params: [
      'integer',
      'string',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectShaderConstantArrayByName',
    params: [
      'integer',
      'string',
      'integer',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectShaderConstantDefault',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'DrawObject',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetScreenXFrom3D',
    params: [
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'float',
    name: 'GetScreenYFrom3D',
    params: [
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'float',
    name: 'Get3DVectorXFromScreen',
    params: [
      'float',
      'float'
    ]
  },
  {
    type: 'float',
    name: 'Get3DVectorYFromScreen',
    params: [
      'float',
      'float'
    ]
  },
  {
    type: 'float',
    name: 'Get3DVectorZFromScreen',
    params: [
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectCollisionMode',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'ObjectRayCast',
    params: [
      'integer',
      'float',
      'float',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'ObjectSphereCast',
    params: [
      'integer',
      'float',
      'float',
      'float',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'ObjectSphereSlide',
    params: [
      'integer',
      'float',
      'float',
      'float',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'GetObjectRayCastNumHits',
    params: []
  },
  {
    type: 'integer',
    name: 'GetObjectRayCastHitID',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectRayCastX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectRayCastY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectRayCastZ',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectRayCastSlideX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectRayCastSlideY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectRayCastSlideZ',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectRayCastNormalX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectRayCastNormalY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectRayCastNormalZ',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectRayCastBounceX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectRayCastBounceY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectRayCastBounceZ',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObjectRayCastDistance',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetFogMode',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetFogColor',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetFogSunColor',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetFogRange',
    params: [
      'float',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'GetFogMode',
    params: []
  },
  {
    type: 'void',
    name: 'SetSkyBoxVisible',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSkyBoxSkyColor',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSkyBoxHorizonColor',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSkyBoxSunColor',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSkyBoxHorizonSize',
    params: [
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSkyBoxSunVisible',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSkyBoxSunSize',
    params: [
      'float',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'LoadShader',
    params: [
      'string',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'LoadShader',
    params: [
      'integer',
      'string',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'LoadFullScreenShader',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'LoadFullScreenShader',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'LoadSpriteShader',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'LoadSpriteShader',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'SetShaderConstantByName',
    params: [
      'integer',
      'string',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetShaderConstantArrayByName',
    params: [
      'integer',
      'string',
      'integer',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetCameraPosition',
    params: [
      'integer',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetCameraRotationQuat',
    params: [
      'integer',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetCameraRotation',
    params: [
      'integer',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'MoveCameraLocalX',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'MoveCameraLocalY',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'MoveCameraLocalZ',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'RotateCameraLocalX',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'RotateCameraLocalY',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'RotateCameraLocalZ',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'RotateCameraGlobalX',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'RotateCameraGlobalY',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'RotateCameraGlobalZ',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'float',
    name: 'GetCameraX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetCameraY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetCameraZ',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetCameraAngleX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetCameraAngleY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetCameraAngleZ',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetCameraQuatW',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetCameraQuatX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetCameraQuatY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetCameraQuatZ',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetCameraLookAt',
    params: [
      'integer',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetCameraRange',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetCameraAspect',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetCameraFOV',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetCameraOrthoWidth',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetCameraBounds',
    params: [
      'integer',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetCameraOffCenter',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetCameraFOV',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreatePointLight',
    params: [
      'integer',
      'float',
      'float',
      'float',
      'float',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetPointLightExists',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'DeletePointLight',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'ClearPointLights',
    params: []
  },
  {
    type: 'void',
    name: 'SetPointLightPosition',
    params: [
      'integer',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetPointLightColor',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetPointLightRadius',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetPointLightMode',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSunDirection',
    params: [
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSunColor',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSunActive',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetAmbientColor',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Create3DPhysicsWorld',
    params: []
  },
  {
    type: 'void',
    name: 'Create3DPhysicsWorld',
    params: [
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Set3DPhysicsGravity',
    params: [
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Set3DPhysicsGravity',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Step3DPhysicsWorld',
    params: []
  },
  {
    type: 'void',
    name: 'Reset3DPhysicsWorld',
    params: []
  },
  {
    type: 'void',
    name: 'Delete3DPhysicsWorld',
    params: []
  },
  {
    type: 'void',
    name: 'Debug3DPhysicsWorld',
    params: []
  },
  {
    type: 'integer',
    name: 'Get3DPhysicsTotalObjects',
    params: []
  },
  {
    type: 'integer',
    name: 'Get3DPhysicsActiveObjects',
    params: []
  },
  {
    type: 'integer',
    name: 'Get3DPhysicsTotalJoints',
    params: []
  },
  {
    type: 'void',
    name: 'SetObjectShapeBox',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectShapeBox',
    params: [
      'integer',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectShapeBox',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectShapeSphere',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectShapeSphere',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectShapeCylinder',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectShapeCylinder',
    params: [
      'integer',
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectShapeCone',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectShapeCone',
    params: [
      'integer',
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectShapeCapsule',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectShapeCapsule',
    params: [
      'integer',
      'integer',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectShapeCapsule',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectShapeConvexHull',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectShapeStaticPolygon',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectShapeCompound',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Create3DPhysicsDynamicBody',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Create3DPhysicsStaticBody',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Create3DPhysicsKinematicBody',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Delete3DPhysicsBody',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'Create3DPhysicsStaticPlane',
    params: [
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Set3DPhysicsStaticPlanePosition',
    params: [
      'integer',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Set3DPhysicsStaticPlaneRotation',
    params: [
      'integer',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Delete3DPhysicsStaticPlane',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObject3DPhysicsGroupAndMask',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetObject3DPhysicsGroup',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetObject3DPhysicsMask',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObject3DPhysicsMass',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'float',
    name: 'GetObject3DPhysicsMass',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObject3DPhysicsCanSleep',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObject3DPhysicsFriction',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'float',
    name: 'GetObject3DPhysicsFriction',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObject3DPhysicsRollingFriction',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'float',
    name: 'GetObject3DPhysicsRollingFriction',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObject3DPhysicsAnisotropicFriction',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObject3DPhysicsMaxLinearVelocity',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetObject3DPhysicsLinearVelocity',
    params: [
      'integer',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetObject3DPhysicsLinearVelocity',
    params: [
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'float',
    name: 'GetObject3DPhysicsLinearVelocityX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObject3DPhysicsLinearVelocityY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObject3DPhysicsLinearVelocityZ',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObject3DPhysicsAngularVelocity',
    params: [
      'integer',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetObject3DPhysicsAngularVelocity',
    params: [
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'float',
    name: 'GetObject3DPhysicsAngularVelocityX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObject3DPhysicsAngularVelocityY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObject3DPhysicsAngularVelocityZ',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObject3DPhysicsDamping',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'float',
    name: 'GetObject3DPhysicsLinearDamp',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObject3DPhysicsAngularDamp',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObject3DPhysicsSleepingThreshold',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'float',
    name: 'GetObject3DPhysicsAngularSleepingThreshold',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObject3DPhysicsLinearSleepingThreshold',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObject3DPhysicsDeactivationTime',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetObject3DPhysicsRestitution',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'float',
    name: 'GetObject3DPhysicsRestitution',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetObject3DPhysicsFirstContact',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetObject3DPhysicsContactX',
    params: []
  },
  {
    type: 'float',
    name: 'GetObject3DPhysicsContactY',
    params: []
  },
  {
    type: 'float',
    name: 'GetObject3DPhysicsContactZ',
    params: []
  },
  {
    type: 'integer',
    name: 'GetObject3DPhysicsContactVector',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetObject3DPhysicsContactObjectB',
    params: []
  },
  {
    type: 'integer',
    name: 'GetObject3DPhysicsNextContact',
    params: []
  },
  {
    type: 'integer',
    name: 'GetObjects3DPhysicsContactPositionVector',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'Create3DPhysicsPickJoint',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Update3DPhysicsPickJoint',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Delete3DPhysicsPickJoint',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'Create3DPhysicsHingeJoint',
    params: [
      'integer',
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'Create3DPhysicsConeTwistJoint',
    params: [
      'integer',
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'Create3DPhysicsSliderJoint',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'Create3DPhysicsFixedJoint',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'Create3DPhysics6DOFJoint',
    params: [
      'integer',
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Set3DPhysicsJointSliderAngularLimits',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Set3DPhysicsJointSliderLinearLimits',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Set3DPhysicsJointConeTwistLimits',
    params: [
      'integer',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Set3DPhysicsJointHingeLimits',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Set3DPhysicsJointBreakingThreshold',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Set3DPhysicsJointEnabled',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'Get3DPhysicsJointEnabled',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'Get3DPhysicsJointPositionVector',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'Get3DPhysicsJointRotationVector',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Delete3DPhysicsJoint',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Set3DPhysicsHingeJointMotorIsEnabled',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Set3DPhysicsHingeJointMaxMotorImpulse',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Set3DPhysicsHingeJointMotorVelocity',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Set3DPhysicsTwistJointMotorIsEnabled',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Set3DPhysicsTwistJointMaxMotorImpulse',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Set3DPhysicsTwistJointMotorRotationTarget',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Set3DPhysicsSliderJointPoweredLinearMotorIsEnabled',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Set3DPhysicsSliderJointMaxLinearMotorForce',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Set3DPhysicsSliderJointTargetLinearMotorVelocity',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'AddObjectShapeBox',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'AddObjectShapeSphere',
    params: [
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'AddObjectShapeCapsule',
    params: [
      'integer',
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'AddObjectShapeCone',
    params: [
      'integer',
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'AddObjectShapeCylinder',
    params: [
      'integer',
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'SaveObjectShape',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'LoadObjectShape',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'CreateVector3',
    params: []
  },
  {
    type: 'integer',
    name: 'CreateVector3',
    params: [
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetVector3',
    params: [
      'integer',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'DeleteVector3',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetVector3X',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetVector3Y',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetVector3Z',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetVector3Distance',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetVector3Length',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetVector3Dot',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'GetVector3Cross',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'GetVector3Multiply',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'GetVector3Add',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'Create3DPhysicsRay',
    params: []
  },
  {
    type: 'void',
    name: 'Delete3DPhysicsRay',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'Ray3DPhysicsExist',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'RayCast3DPhysics',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'RayCast3DPhysicsObject',
    params: [
      'integer',
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'Get3DPhysicsRayCastObjectHit',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'Get3DPhysicsRayCastClosestObjectHit',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'Get3DPhysicsRayCastFraction',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'Get3DPhysicsRayCastContactPosition',
    params: [
      'integer',
      'float',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'Get3DPhysicsRayCastClosestContactPosition',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Get3DPhysicsRayCastNormalVector',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'Get3DPhysicsRayCastNumHits',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SphereCast3DPhysics',
    params: [
      'integer',
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'SphereCast3DPhysicsObject',
    params: [
      'integer',
      'integer',
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Create3DPhysicsRagDoll',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'Add3DPhysicsRagDollBone',
    params: [
      'integer',
      'integer',
      'float',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'AssignTo3DPhysicsRagDollBoneObjectBone',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Add3DPhysicsRagDollHingeJoint',
    params: [
      'integer',
      'integer',
      'integer',
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Add3DPhysicsRagDollTwistJoint',
    params: [
      'integer',
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Finalize3DPhysicsRagDoll',
    params: []
  },
  {
    type: 'void',
    name: 'Delete3DPhysicsRagdoll',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'Get3DPhysicsRagdollExist',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'Get3DPhysicsRagdollFromBoneObject',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'Is3dPhysicsRagdollStatic',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Set3DphysicsRagdollStatic',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Set3DPhysicsRagdollBonesVisible',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Set3DPhysicsRagdollDamping',
    params: [
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Set3DPhysicsRagdollSleepingThresholds',
    params: [
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Set3DPhysicsRagdollDeactivationTime',
    params: [
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Set3DPhysicsRagdollDeactivation',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Create3DPhysicsCharacterController',
    params: [
      'integer',
      'integer',
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Delete3DPhysicsCharacterController',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'Get3DPhysicsCharacterControllerExists',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Set3DPhysicsCharacterControllerGravity',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Set3DPhysicsCharacterControllerFallSpeed',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Set3DPhysicsCharacterControllerJumpSpeed',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Set3DPhysicsCharacterControllerMaxSlope',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Set3DPhysicsCharacterControllerStepHeight',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'float',
    name: 'Get3DPhysicsCharacterControllerMaxSlope',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'Get3DPhysicsCharacterControllerGravity',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Move3DPhysicsCharacterController',
    params: [
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Rotate3DPhysicsCharacterController',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Jump3DPhysicsCharacterController',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Crouch3DPhysicsCharacterController',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Stand3DPhysicsCharacterController',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Debug3DPhysicsCharacterController',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Set3DPhysicsCharacterControllerPosition',
    params: [
      'integer',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetWindowPosition',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetWindowSize',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetWindowSize',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetWindowAllowResize',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'MaximizeWindow',
    params: []
  },
  {
    type: 'void',
    name: 'MinimizeApp',
    params: []
  },
  {
    type: 'void',
    name: 'RestoreApp',
    params: []
  },
  {
    type: 'void',
    name: 'SetImmersiveMode',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetScreenResolution',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'GetDeviceName',
    params: []
  },
  {
    type: 'string',
    name: 'GetDeviceBaseName',
    params: []
  },
  {
    type: 'string',
    name: 'GetDeviceType',
    params: []
  },
  {
    type: 'string',
    name: 'GetAppName',
    params: []
  },
  {
    type: 'string',
    name: 'GetDeviceLanguage',
    params: []
  },
  {
    type: 'void',
    name: 'SetSleepMode',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetExpansionFileKey',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'SetExpansionFileVersion',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetExpansionFileState',
    params: []
  },
  {
    type: 'void',
    name: 'DownloadExpansionFile',
    params: []
  },
  {
    type: 'float',
    name: 'GetExpansionFileProgress',
    params: []
  },
  {
    type: 'void',
    name: 'SetWindowTitle',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'Sleep',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetVSync',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetMaxDeviceWidth',
    params: []
  },
  {
    type: 'integer',
    name: 'GetMaxDeviceHeight',
    params: []
  },
  {
    type: 'integer',
    name: 'GetDeviceDPI',
    params: []
  },
  {
    type: 'string',
    name: 'GetAppPackageName',
    params: []
  },
  {
    type: 'integer',
    name: 'GetDevicePlatform',
    params: []
  },
  {
    type: 'float',
    name: 'Sin',
    params: [
      'float'
    ]
  },
  {
    type: 'float',
    name: 'Cos',
    params: [
      'float'
    ]
  },
  {
    type: 'float',
    name: 'Tan',
    params: [
      'float'
    ]
  },
  {
    type: 'float',
    name: 'SinRad',
    params: [
      'float'
    ]
  },
  {
    type: 'float',
    name: 'CosRad',
    params: [
      'float'
    ]
  },
  {
    type: 'float',
    name: 'TanRad',
    params: [
      'float'
    ]
  },
  {
    type: 'float',
    name: 'ASin',
    params: [
      'float'
    ]
  },
  {
    type: 'float',
    name: 'ACos',
    params: [
      'float'
    ]
  },
  {
    type: 'float',
    name: 'ATan',
    params: [
      'float'
    ]
  },
  {
    type: 'float',
    name: 'ATan2',
    params: [
      'float',
      'float'
    ]
  },
  {
    type: 'float',
    name: 'ASinRad',
    params: [
      'float'
    ]
  },
  {
    type: 'float',
    name: 'ACosRad',
    params: [
      'float'
    ]
  },
  {
    type: 'float',
    name: 'ATanRad',
    params: [
      'float'
    ]
  },
  {
    type: 'float',
    name: 'ATan2Rad',
    params: [
      'float',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'Trunc',
    params: [
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'Floor',
    params: [
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'Ceil',
    params: [
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'Round',
    params: [
      'float'
    ]
  },
  {
    type: 'float',
    name: 'Sqrt',
    params: [
      'float'
    ]
  },
  {
    type: 'float',
    name: 'Abs',
    params: [
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'Mod',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'FMod',
    params: [
      'float',
      'float'
    ]
  },
  {
    type: 'float',
    name: 'Pow',
    params: [
      'float',
      'float'
    ]
  },
  {
    type: 'float',
    name: 'Log',
    params: [
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'GetNumDeviceCameras',
    params: []
  },
  {
    type: 'integer',
    name: 'SetDeviceCameraToImage',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetDeviceCameraType',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'VibrateDevice',
    params: [
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'LoadVideo',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'DeleteVideo',
    params: []
  },
  {
    type: 'void',
    name: 'SetVideoDimensions',
    params: [
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'PlayVideoToImage',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'PlayVideo',
    params: []
  },
  {
    type: 'void',
    name: 'PauseVideo',
    params: []
  },
  {
    type: 'void',
    name: 'StopVideo',
    params: []
  },
  {
    type: 'integer',
    name: 'GetVideoPlaying',
    params: []
  },
  {
    type: 'float',
    name: 'GetVideoPosition',
    params: []
  },
  {
    type: 'float',
    name: 'GetVideoDuration',
    params: []
  },
  {
    type: 'void',
    name: 'SetVideoVolume',
    params: [
      'float'
    ]
  },
  {
    type: 'float',
    name: 'GetVideoWidth',
    params: []
  },
  {
    type: 'float',
    name: 'GetVideoHeight',
    params: []
  },
  {
    type: 'void',
    name: 'SetVideoPosition',
    params: [
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetRawWritePath',
    params: [
      'string'
    ]
  },
  {
    type: 'string',
    name: 'GetWritePath',
    params: []
  },
  {
    type: 'string',
    name: 'GetReadPath',
    params: []
  },
  {
    type: 'string',
    name: 'GetDocumentsPath',
    params: []
  },
  {
    type: 'integer',
    name: 'SetCurrentDir',
    params: [
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'MakeFolder',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'DeleteFolder',
    params: [
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'GetMultiTouchExists',
    params: []
  },
  {
    type: 'integer',
    name: 'GetMouseExists',
    params: []
  },
  {
    type: 'integer',
    name: 'GetKeyboardExists',
    params: []
  },
  {
    type: 'integer',
    name: 'GetCameraExists',
    params: []
  },
  {
    type: 'integer',
    name: 'GetGPSSensorExists',
    params: []
  },
  {
    type: 'void',
    name: 'SetRawMouseVisible',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetRawMousePosition',
    params: [
      'float',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'GetUnixTime',
    params: []
  },
  {
    type: 'integer',
    name: 'GetDayOfWeek',
    params: []
  },
  {
    type: 'string',
    name: 'GetCurrentDate',
    params: []
  },
  {
    type: 'string',
    name: 'GetCurrentTime',
    params: []
  },
  {
    type: 'void',
    name: 'OpenBrowser',
    params: [
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'RunApp',
    params: [
      'string',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'GetAppRunning',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'TerminateApp',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'ViewFile',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'ShareText',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'ShareImage',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'ShareImageAndText',
    params: [
      'string',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'FacebookActivateAppTracking',
    params: []
  },
  {
    type: 'integer',
    name: 'GetInternetState',
    params: []
  },
  {
    type: 'void',
    name: 'SetPushNotificationKeys',
    params: [
      'string',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'PushNotificationSetup',
    params: []
  },
  {
    type: 'string',
    name: 'GetPushNotificationToken',
    params: []
  },
  {
    type: 'integer',
    name: 'GetNotificationType',
    params: []
  },
  {
    type: 'void',
    name: 'SetNotificationImage',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetNotificationText',
    params: [
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'GetNFCExists',
    params: []
  },
  {
    type: 'void',
    name: 'StartGPSTracking',
    params: []
  },
  {
    type: 'void',
    name: 'StopGPSTracking',
    params: []
  },
  {
    type: 'float',
    name: 'GetRawGPSLatitude',
    params: []
  },
  {
    type: 'float',
    name: 'GetRawGPSLongitude',
    params: []
  },
  {
    type: 'float',
    name: 'GetRawGPSAltitude',
    params: []
  },
  {
    type: 'integer',
    name: 'GetGameCenterExists',
    params: []
  },
  {
    type: 'void',
    name: 'GameCenterSetup',
    params: []
  },
  {
    type: 'void',
    name: 'GameCenterLogin',
    params: []
  },
  {
    type: 'integer',
    name: 'GetGameCenterLoggedIn',
    params: []
  },
  {
    type: 'string',
    name: 'GetGameCenterPlayerID',
    params: []
  },
  {
    type: 'string',
    name: 'GetGameCenterPlayerDisplayName',
    params: []
  },
  {
    type: 'void',
    name: 'GameCenterSubmitScore',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'GameCenterShowLeaderBoard',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'GameCenterSubmitAchievement',
    params: [
      'string',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'GameCenterAchievementsShow',
    params: []
  },
  {
    type: 'void',
    name: 'GameCenterAchievementsReset',
    params: []
  },
  {
    type: 'void',
    name: 'SetSharedVariableAppGroup',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'SaveSharedVariable',
    params: [
      'string',
      'string'
    ]
  },
  {
    type: 'string',
    name: 'LoadSharedVariable',
    params: [
      'string',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'DeleteSharedVariable',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'FirebaseSetup',
    params: []
  },
  {
    type: 'void',
    name: 'FirebaseLogEvent',
    params: [
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'IsSupportedDepthTexture',
    params: []
  },
  {
    type: 'void',
    name: 'SetAntialiasMode',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'RenderShadowMap',
    params: []
  },
  {
    type: 'void',
    name: 'SetNetworkAllowClients',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'KickNetworkClient',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectCastShadow',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectReceiveShadow',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetObjectCastShadowMode',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetObjectReceiveShadowMode',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetShadowMappingSupported',
    params: []
  },
  {
    type: 'void',
    name: 'SetShadowMappingMode',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetShadowMappingMode',
    params: []
  },
  {
    type: 'void',
    name: 'SetShadowMapSize',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetShadowRange',
    params: [
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetShadowBias',
    params: [
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetShadowLightStepSize',
    params: [
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetShadowSmoothing',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetShadowPolygonsDrawn',
    params: []
  },
  {
    type: 'integer',
    name: 'LoadShaderFromString',
    params: [
      'string',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'LoadShaderFromString',
    params: [
      'integer',
      'string',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'Create3DParticles',
    params: [
      'integer',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'Create3DParticles',
    params: [
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'Get3DParticlesExists',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Delete3DParticles',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Set3DParticlesPosition',
    params: [
      'integer',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Set3DParticlesFrequency',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Set3DParticlesStartZone',
    params: [
      'integer',
      'float',
      'float',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Set3DParticlesDirection',
    params: [
      'integer',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Set3DParticlesVelocityRange',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Set3DParticlesDirectionRange',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Set3DParticlesSize',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Set3DParticlesLife',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Set3DParticlesMax',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Reset3DParticleCount',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Set3DParticlesImage',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Set3DParticlesVisible',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Set3DParticlesActive',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Set3DParticlesTransparency',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Set3DParticlesColorInterpolation',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'Get3DParticlesX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'Get3DParticlesY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'Get3DParticlesZ',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'Get3DParticlesVisible',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'Get3DParticlesActive',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'Get3DParticlesFrequency',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'Get3DParticlesDirectionX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'Get3DParticlesDirectionY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'Get3DParticlesDirectionZ',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'Get3DParticlesDirectionRange1',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'Get3DParticlesDirectionRange2',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'Get3DParticlesSize',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'Get3DParticlesLife',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'Get3DParticlesMaxReached',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Add3DParticlesForce',
    params: [
      'integer',
      'float',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Clear3DParticlesForces',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Add3DParticlesColorKeyFrame',
    params: [
      'integer',
      'float',
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Clear3DParticlesColors',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Add3DParticlesScaleKeyFrame',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Clear3DParticlesScales',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Update3DParticles',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Offset3DParticles',
    params: [
      'integer',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetMeshMemblockVertexColor',
    params: [
      'integer',
      'integer',
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetMeshMemblockVertexRed',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetMeshMemblockVertexGreen',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetMeshMemblockVertexBlue',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetMeshMemblockVertexAlpha',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectMeshNormalMap',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectNormalMap',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectNormalMapScale',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectMeshNormalMapScale',
    params: [
      'integer',
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'unsigned string',
    name: 'GetMemblockPtr',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'StartScreenRecording',
    params: [
      'string',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'StopScreenRecording',
    params: []
  },
  {
    type: 'integer',
    name: 'IsScreenRecording',
    params: []
  },
  {
    type: 'void',
    name: 'DeleteShader',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'ActivateSmartWatch',
    params: [
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'GetSmartWatchState',
    params: []
  },
  {
    type: 'void',
    name: 'SendSmartWatchData',
    params: [
      'string'
    ]
  },
  {
    type: 'string',
    name: 'ReceiveSmartWatchData',
    params: []
  },
  {
    type: 'void',
    name: 'TextToSpeechSetup',
    params: []
  },
  {
    type: 'integer',
    name: 'GetTextToSpeechReady',
    params: []
  },
  {
    type: 'void',
    name: 'Speak',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'SetSpeechRate',
    params: [
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetSpeechLanguage',
    params: [
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'IsSpeaking',
    params: []
  },
  {
    type: 'void',
    name: 'StopSpeaking',
    params: []
  },
  {
    type: 'integer',
    name: 'GetSpriteTransparency',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteShape',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteShapeBox',
    params: [
      'integer',
      'float',
      'float',
      'float',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteShapeCircle',
    params: [
      'integer',
      'float',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteShapePolygon',
    params: [
      'integer',
      'integer',
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteShapeChain',
    params: [
      'integer',
      'integer',
      'integer',
      'integer',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'AddSpriteShapeChain',
    params: [
      'integer',
      'integer',
      'integer',
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'integer',
    name: 'GetSpriteNumShapes',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetSpriteShapeNumVertices',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSpriteShapeVertexX',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSpriteShapeVertexY',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSpritePhysicsCOMX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetSpritePhysicsCOMY',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpritePhysicsFriction',
    params: [
      'integer',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpritePhysicsRestitution',
    params: [
      'integer',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpritePhysicsDensity',
    params: [
      'integer',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpritePhysicsIsSensor',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteGroup',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteCategoryBits',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteCategoryBit',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteCollideBits',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpriteCollideBit',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreateRopeJoint',
    params: [
      'integer',
      'integer',
      'integer',
      'float',
      'float',
      'float',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CreateRopeJoint',
    params: [
      'integer',
      'integer',
      'float',
      'float',
      'float',
      'float',
      'float',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetJointMouseMaxForce',
    params: [
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetJointDamping',
    params: [
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'PauseTweenCustom',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'ResumeTweenCustom',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'PauseTweenSprite',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'ResumeTweenSprite',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'PauseTweenText',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'ResumeTweenText',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'PauseTweenChar',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'ResumeTweenChar',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'PauseTweenObject',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'ResumeTweenObject',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'PauseTweenCamera',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'ResumeTweenCamera',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetNetworkExists',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectBlendModes',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetShaderExists',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetTextAlignment',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetupCloudData',
    params: [
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'GetCloudDataAllowed',
    params: []
  },
  {
    type: 'integer',
    name: 'GetCloudDataChanged',
    params: []
  },
  {
    type: 'string',
    name: 'GetCloudDataVariable',
    params: [
      'string',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'SetCloudDataVariable',
    params: [
      'string',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'DeleteCloudDataVariable',
    params: [
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'GetDeviceNetworkType',
    params: []
  },
  {
    type: 'integer',
    name: 'GetStorageRemaining',
    params: [
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'GetStorageTotal',
    params: [
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'CheckPermission',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'RequestPermission',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'DrawText',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetShadowCascadeValues',
    params: [
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'ARSetup',
    params: []
  },
  {
    type: 'integer',
    name: 'ARGetStatus',
    params: []
  },
  {
    type: 'void',
    name: 'ARDestroy',
    params: []
  },
  {
    type: 'void',
    name: 'ARControlCamera',
    params: []
  },
  {
    type: 'void',
    name: 'ARDrawBackground',
    params: []
  },
  {
    type: 'void',
    name: 'ARSetPlaneDetectionMode',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'ARSetLightEstimationMode',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'ARGetLightEstimate',
    params: []
  },
  {
    type: 'integer',
    name: 'ARHitTest',
    params: [
      'float',
      'float'
    ]
  },
  {
    type: 'float',
    name: 'ARGetHitTestX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'ARGetHitTestY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'ARGetHitTestZ',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'ARGetHitTestNormalX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'ARGetHitTestNormalY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'ARGetHitTestNormalZ',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'ARGetHitTestType',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'ARHitTestFinish',
    params: []
  },
  {
    type: 'integer',
    name: 'ARGetPlanes',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'ARGetPlaneX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'ARGetPlaneY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'ARGetPlaneZ',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'ARGetPlaneAngleX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'ARGetPlaneAngleY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'ARGetPlaneAngleZ',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'ARGetPlaneSizeX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'ARGetPlaneSizeZ',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'ARGetPlanesFinish',
    params: []
  },
  {
    type: 'integer',
    name: 'ARCreateAnchorFromHitTest',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'ARCreateAnchorFromPlane',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'ARFixObjectToAnchor',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'ARGetAnchorStatus',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'ARDeleteAnchor',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'DeleteObjectTree',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'FixSpriteToSkeleton2D',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetRawTouchMoveSensitivity',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Move3DPhysicsCharacterController',
    params: [
      'integer',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'Speak',
    params: [
      'string',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'OverrideConsentAdMob',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'LoadConsentStatusAdMob',
    params: [
      'string',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'GetConsentStatusAdMob',
    params: []
  },
  {
    type: 'void',
    name: 'RequestConsentAdMob',
    params: []
  },
  {
    type: 'integer',
    name: 'GetSupportedShaderVaryings',
    params: []
  },
  {
    type: 'integer',
    name: 'GetSpeechNumVoices',
    params: []
  },
  {
    type: 'string',
    name: 'GetSpeechVoiceLanguage',
    params: [
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'GetSpeechVoiceName',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'OverrideConsentChartboost',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'AddHTTPHeader',
    params: [
      'integer',
      'string',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'RemoveHTTPHeader',
    params: [
      'integer',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'GetHTTPStatusCode',
    params: [
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'GetSpeechVoiceID',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetSpeechLanguageByID',
    params: [
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'GetSpriteFlippedH',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetSpriteInScreen',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetSpriteFlippedV',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'DrawParticles',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'Draw3DParticles',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetClipboardText',
    params: [
      'string'
    ]
  },
  {
    type: 'string',
    name: 'GetClipboardText',
    params: []
  },
  {
    type: 'void',
    name: 'SetEditBoxInputType',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetExpansionFileError',
    params: []
  },
  {
    type: 'integer',
    name: 'GetSkeleton2DDepth',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetEditBoxDepth',
    params: [
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'GetCharBuffer',
    params: []
  },
  {
    type: 'integer',
    name: 'GetCharBufferLength',
    params: []
  },
  {
    type: 'integer',
    name: 'GetRawJoystickSlider',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetRawJoystickPOV',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CopyNetworkMessage',
    params: [
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'GetURLSchemeText',
    params: []
  },
  {
    type: 'void',
    name: 'SetObjectAlpha',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetObjectColorRed',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetObjectColorGreen',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetObjectColorBlue',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetObjectAlpha',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'ClearURLSchemeText',
    params: []
  },
  {
    type: 'void',
    name: 'ExtractZip',
    params: [
      'string',
      'string',
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'CreateObjectFromRawHeightMap',
    params: [
      'string',
      'float',
      'float',
      'float',
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'CreateObjectFromRawHeightMap',
    params: [
      'integer',
      'string',
      'float',
      'float',
      'float',
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectMeshCollisionMode',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectMeshVisible',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'GetObjectTextureName',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetObjectNumTextures',
    params: [
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'GetRawJoystickName',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'PlayYoutubeVideo',
    params: [
      'string',
      'string',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'ShareFile',
    params: [
      'string'
    ]
  },
  {
    type: 'integer',
    name: 'GetNetworkMessageFromPort',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CreateUDPListener',
    params: [
      'string',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'CreateUDPListener',
    params: [
      'integer',
      'string',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SendUDPNetworkMessage',
    params: [
      'integer',
      'integer',
      'string',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetUDPNetworkMessage',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'DeleteUDPListener',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'ExtractZipASync',
    params: [
      'string',
      'string',
      'string'
    ]
  },
  {
    type: 'float',
    name: 'GetZipExtractProgress',
    params: []
  },
  {
    type: 'integer',
    name: 'GetZipExtractComplete',
    params: []
  },
  {
    type: 'integer',
    name: 'GetWindowWidth',
    params: []
  },
  {
    type: 'integer',
    name: 'GetWindowHeight',
    params: []
  },
  {
    type: 'void',
    name: 'CancelZipExtract',
    params: []
  },
  {
    type: 'void',
    name: 'GameCenterLogout',
    params: []
  },
  {
    type: 'integer',
    name: 'GetImageSizeFromFile',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectMeshCastShadow',
    params: [
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectShaderConstantArrayFloatByName',
    params: [
      'integer',
      'string',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectShaderConstantArrayVec2ByName',
    params: [
      'integer',
      'string',
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectShaderConstantArrayVec3ByName',
    params: [
      'integer',
      'string',
      'integer',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetObjectShaderConstantArrayVec4ByName',
    params: [
      'integer',
      'string',
      'integer',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetShaderErrorMode',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetShaderConstantArrayFloatByName',
    params: [
      'integer',
      'string',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetShaderConstantArrayVec2ByName',
    params: [
      'integer',
      'string',
      'integer',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetShaderConstantArrayVec3ByName',
    params: [
      'integer',
      'string',
      'integer',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'SetShaderConstantArrayVec4ByName',
    params: [
      'integer',
      'string',
      'integer',
      'float',
      'float',
      'float',
      'float'
    ]
  },
  {
    type: 'float',
    name: 'GetObject3DPhysicsMaxLinearVelocity',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'IsInvertedDepth',
    params: []
  },
  {
    type: 'integer',
    name: 'GetClipSpaceMode',
    params: []
  },
  {
    type: 'integer',
    name: 'IsTopLeftOrigin',
    params: []
  },
  {
    type: 'float',
    name: 'GetDrawing3DSetupTime',
    params: []
  },
  {
    type: 'integer',
    name: 'MakeColor',
    params: [
      'integer',
      'integer',
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetColorAlpha',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetPresentMode',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'ForcePresent',
    params: []
  },
  {
    type: 'integer',
    name: 'GetAppInstalled',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'SetSnapChatStickerSettings',
    params: [
      'float',
      'float',
      'integer',
      'integer',
      'float'
    ]
  },
  {
    type: 'void',
    name: 'ShareSnapChatImage',
    params: [
      'string',
      'string',
      'string',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'SetLocalNotification',
    params: [
      'integer',
      'integer',
      'string',
      'string'
    ]
  },
  {
    type: 'void',
    name: 'AddVulkanDeviceExtensions',
    params: [
      'string'
    ]
  },
  {
    type: 'void',
    name: 'AddVulkanInstanceExtensions',
    params: [
      'string'
    ]
  },
  {
    type: 'string',
    name: 'GetRendererName',
    params: []
  },
  {
    type: 'integer',
    name: 'GetOpenGLImageID',
    params: [
      'integer'
    ]
  },
  {
    type: 'void*',
    name: 'GetVulkanVRImageData',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'SetVRImage',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'GetNetworkClientIP',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'string',
    name: 'GetNetworkServerIP',
    params: [
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetRawMouseFourthPressed',
    params: []
  },
  {
    type: 'integer',
    name: 'GetRawMouseFourthState',
    params: []
  },
  {
    type: 'integer',
    name: 'GetRawMouseFourthReleased',
    params: []
  },
  {
    type: 'integer',
    name: 'GetRawMouseFifthPressed',
    params: []
  },
  {
    type: 'integer',
    name: 'GetRawMouseFifthState',
    params: []
  },
  {
    type: 'integer',
    name: 'GetRawMouseFifthReleased',
    params: []
  },
  {
    type: 'void',
    name: 'SetSoundDeviceMode',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'AddNetworkMessageByte',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'integer',
    name: 'GetNetworkMessageByte',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetCameraWorldX',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetCameraWorldY',
    params: [
      'integer'
    ]
  },
  {
    type: 'float',
    name: 'GetCameraWorldZ',
    params: [
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'FixCameraToObject',
    params: [
      'integer',
      'integer'
    ]
  },
  {
    type: 'void',
    name: 'ResetVRImages',
    params: []
  }
]

const exported = {}
for (let i = 0, len = BUILT_IN.length; i < len; i++) {
  const func = BUILT_IN[i]
  const name = func.name.toLowerCase()
  exported[name] = exported[name] || []
  exported[name].push({
    type: builder({ type: func.type }),
    params: func.params.map((type) => builder({ type }))
  })
}

module.exports = exported
