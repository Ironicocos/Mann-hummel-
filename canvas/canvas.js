/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

'use strict';

// Put variables in global scope to make them available to the browser console.
const video = document.getElementById('screenDisplay');
const canvas = document.getElementById('canvas');
let screenSave;
canvas.width = 180;
canvas.height = 60;

let image = new Image()
const ctx = canvas.getContext('2d')



function takeSnapshot() {
  canvas.width = video.videoWidth*0.35;
  canvas.height = video.videoHeight*0.35;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  screenSave = canvas.toDataURL();
  image.src = screenSave;
};
const snapshotButton = document.getElementById('snapshotButton');
snapshotButton.addEventListener('click', takeSnapshot);


const color = document.getElementById('whiteButton')
