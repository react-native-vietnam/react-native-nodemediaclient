//@flow
//  NodePlayerModule.js
//
//  Created by Mingliang Chen on 2017/11/29.
//  Upgraded by Anh Tuan Nguyen on 2018/08/06.
//  Copyright © 2017年 NodeMedia. All rights reserved.
//

import React, { PureComponent } from "react"
import {
  requireNativeComponent,
  ViewPropTypes,
  UIManager,
  findNodeHandle
} from "react-native"

type Props = {
  inputUrl: string,
  bufferTime: number,
  maxBufferTime: number,
  autoplay: boolean,
  scaleMode: "ScaleToFill" | "ScaleAspectFit" | "ScaleAspectFill",
  renderType: "SURFACEVIEW" | "TEXTUREVIEW",
  onStatus: Function,
  ...ViewPropTypes
}

class NodePlayerView extends PureComponent<Props> {
  name: string = "NodePlayerView"
  videoRef: any = React.createRef()

  _onChange(event) {
    if (!this.props.onStatus) {
      return
    }
    this.props.onStatus(event.nativeEvent.code, event.nativeEvent.message)
  }

  pause() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.videoRef.current),
      UIManager.RCTNodePlayer.Commands.pause,
      null
    )
  }

  start() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.videoRef.current),
      UIManager.RCTNodePlayer.Commands.start,
      null
    )
  }

  stop() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.videoRef.current),
      UIManager.RCTNodePlayer.Commands.stop,
      null
    )
  }

  render() {
    return (
      <RCTNodePlayer
        {...this.props}
        ref={this.videoRef}
        onChange={this._onChange.bind(this)}
      />
    )
  }
}

const RCTNodePlayer = requireNativeComponent("RCTNodePlayer", NodePlayerView, {
  nativeOnly: { onChange: true }
})

export default NodePlayerView
