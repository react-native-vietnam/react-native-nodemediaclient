//@flow
//  NodeCameraModule.js
//
//  Created by Mingliang Chen on 2017/11/29.
//  Upgraded by Anh Tuan Nguyen on 2018/08/06.
//  Copyright © 2017年 NodeMedia. All rights reserved.
//

import React, { PureComponent } from "react"
import {
  requireNativeComponent,
  UIManager,
  findNodeHandle,
  ViewPropTypes
} from "react-native"

type Camera = {
  cameraId: 0 | 1,
  cameraFrontMirror: boolean
}
type Audio = {
  bitrate: number,
  profile: 0 | 1 | 2,
  samplerate: 8000 | 16000 | 32000 | 44100 | 48000
}
type Video = {
  preset: number,
  bitrate: number,
  profile: 0 | 1 | 2,
  fps: 15 | 20 | 24 | 30,
  videoFrontMirror: boolean
}
type Props = {
  outputUrl: string,
  camera: Camera,
  audio: Audio,
  video: Video,
  autopreview: boolean,
  denoise: boolean,
  smoothSkinLevel: 0 | 1 | 2 | 3 | 4 | 5,
  onStatus: Function,
  ...ViewPropTypes
}
class NodeCameraView extends PureComponent<Props> {
  name: string = "NodeCameraView"
  videoRef: any = React.createRef()

  _onChange(event: Object) {
    if (!this.props.onStatus) {
      return
    }
    this.props.onStatus(event.nativeEvent.code, event.nativeEvent.message)
  }

  switchCamera() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.videoRef.current),
      UIManager.RCTNodeCamera.Commands.switchCamera,
      null
    )
  }

  flashEnable(enable) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.videoRef.current),
      UIManager.RCTNodeCamera.Commands.flashEnable,
      [enable]
    )
  }

  startPreview() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.videoRef.current),
      UIManager.RCTNodeCamera.Commands.startprev,
      null
    )
  }

  stopPreview() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.videoRef.current),
      UIManager.RCTNodeCamera.Commands.stopprev,
      null
    )
  }

  start() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.videoRef.current),
      UIManager.RCTNodeCamera.Commands.start,
      null
    )
  }

  stop() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.videoRef.current),
      UIManager.RCTNodeCamera.Commands.stop,
      null
    )
  }

  render() {
    return (
      <RCTNodeCamera
        {...this.props}
        ref={this.videoRef}
        onChange={this._onChange.bind(this)}
      />
    )
  }
}

const RCTNodeCamera = requireNativeComponent("RCTNodeCamera", NodeCameraView, {
  nativeOnly: { onChange: true }
})

export default NodeCameraView
