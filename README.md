# react-native-nodemediaclient

[![npm](https://img.shields.io/npm/v/react-native-nodemediaclient.svg)](https://www.npmjs.com/package/react-native-nodemediaclient)
[![npm](https://img.shields.io/npm/dm/react-native-nodemediaclient.svg)](https://www.npmjs.com/package/react-native-nodemediaclient)  
This project is the react-native packaging of NodeMediaClient-Android and NodeMediaClient-iOS SDK.
Complete live publish and play functions, providing the exact same API call. You can publish two platforms just by developing one set of programs.  
[中文介绍](https://github.com/NodeMedia/react-native-nodemediaclient/blob/master/README_CN.md)

## 1.install

yarn add react-native-nodemediaclient

## 2.link

react-native link

## 3.Manually Installation

### Android

`android/build.gradle`

```
allprojects {
    repositories {
        mavenLocal()
        jcenter()
        maven {
            // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
            url "$rootDir/../node_modules/react-native/android"
        }

        // Add this section
        maven { url 'https://jitpack.io' }
    }
}
```

### iOS

ios/Podfile

```
# Uncomment the next line to define a global platform for your project
# platform :ios, '9.0'
# ‘QLive’ is an example project name, please change it to yours.
target 'QLive' do
  # Uncomment the next line if you're using Swift or would like to use dynamic frameworks
  # use_frameworks!

  # Pods for QLive
  pod 'NodeMediaClient'
end
```

## 4.install NodeMediaClient-SDK

### Android

Open and compile the project, Android studio will automatically download and link the library without additional operations.

### iOS

```
cd ios
pod install
```

Open the QLive.xcworkspace and compile the project

## 5.permission

### Android

```
    <uses-feature android:name="android.hardware.camera"/>
    <uses-feature android:name="android.hardware.camera.autofocus"/>

    <uses-permission android:name="android.permission.CAMERA"/>
    <uses-permission android:name="android.permission.RECORD_AUDIO"/>
    <uses-permission android:name="android.permission.FLASHLIGHT"/>
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```

### iOS

Project -> Info

```
Privacy - Camera Usage Description
Privacy - Microphone Usage Description
```

## 6.Example

### NodePlayerView

```
import {  NodePlayerView } from 'react-native-nodemediaclient';

......

<NodePlayerView
  style={{ height: 200 }}
  ref={(vp) => { this.vp = vp }}
  inputUrl={"rtmp://192.168.0.10/live/stream"}
  scaleMode={"ScaleAspectFit"}
  bufferTime={300}
  maxBufferTime={1000}
  autoplay={true}
/>
```

### NodeCameraView

```
import {  NodeCameraView } from 'react-native-nodemediaclient';

......

<NodeCameraView
  style={{ height: 400 }}
  ref={(vb) => { this.vb = vb }}
  outputUrl = {"rtmp://192.168.0.10/live/stream"}
  camera={{ cameraId: 1, cameraFrontMirror: true }}
  audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
  video={{ preset: 12, bitrate: 400000, profile: 1, fps: 15, videoFrontMirror: false }}
  autopreview={true}
/>

<Button
  onPress={() => {
    if (this.state.isPublish) {
      this.setState({ publishBtnTitle: 'Start Publish', isPublish: false });
      this.vb.stop();
    } else {
      this.setState({ publishBtnTitle: 'Stop Publish', isPublish: true });
      this.vb.start();
    }
  }}
  title={this.state.publishBtnTitle}
  color="#841584"
/>
```

## Demo project

![img](https://raw.githubusercontent.com/NodeMedia/iShow-RN/master/1519740855033.gif)
https://github.com/NodeMedia/iShow-RN
