(function (f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f();
    } else if (typeof define === "function" && define.amd) {
        define([], f);
    } else {
        var g;
        if (typeof window !== "undefined") {
            g = window;
        } else if (typeof global !== "undefined") {
            g = global;
        } else if (typeof self !== "undefined") {
            g = self;
        } else {
            g = this;
        }
        g.muxjs = f();
    }
})(function () {
    var define, module, exports;
    return (function () {
        function r(e, n, t) {
            function o(i, f) {
                if (!n[i]) {
                    if (!e[i]) {
                        var c = "function" == typeof require && require;
                        if (!f && c) return c(i, !0);
                        if (u) return u(i, !0);
                        var a = new Error("Cannot find module '" + i + "'");
                        throw ((a.code = "MODULE_NOT_FOUND"), a);
                    }
                    var p = (n[i] = { exports: {} });
                    e[i][0].call(
                        p.exports,
                        function (r) {
                            var n = e[i][1][r];
                            return o(n || r);
                        },
                        p,
                        p.exports,
                        r,
                        e,
                        n,
                        t,
                    );
                }
                return n[i].exports;
            }
            for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
            return o;
        }
        return r;
    })()(
        {
            1: [
                function (require, module, exports) {
                    "use strict";
                    var Stream = require(31);
                    var aacUtils = require(2);
                    var AacStream;
                    AacStream = function () {
                        var everything = new Uint8Array(),
                            timeStamp = 0;
                        AacStream.prototype.init.call(this);
                        this.setTimestamp = function (timestamp) {
                            timeStamp = timestamp;
                        };
                        this.push = function (bytes) {
                            var frameSize = 0,
                                byteIndex = 0,
                                bytesLeft,
                                chunk,
                                packet,
                                tempLength;
                            if (everything.length) {
                                tempLength = everything.length;
                                everything = new Uint8Array(bytes.byteLength + tempLength);
                                everything.set(everything.subarray(0, tempLength));
                                everything.set(bytes, tempLength);
                            } else {
                                everything = bytes;
                            }
                            while (everything.length - byteIndex >= 3) {
                                if (everything[byteIndex] === "I".charCodeAt(0) && everything[byteIndex + 1] === "D".charCodeAt(0) && everything[byteIndex + 2] === "3".charCodeAt(0)) {
                                    if (everything.length - byteIndex < 10) {
                                        break;
                                    }
                                    frameSize = aacUtils.parseId3TagSize(everything, byteIndex);
                                    if (byteIndex + frameSize > everything.length) {
                                        break;
                                    }
                                    chunk = { type: "timed-metadata", data: everything.subarray(byteIndex, byteIndex + frameSize) };
                                    this.trigger("data", chunk);
                                    byteIndex += frameSize;
                                    continue;
                                } else if ((everything[byteIndex] & 0xff) === 0xff && (everything[byteIndex + 1] & 0xf0) === 0xf0) {
                                    if (everything.length - byteIndex < 7) {
                                        break;
                                    }
                                    frameSize = aacUtils.parseAdtsSize(everything, byteIndex);
                                    if (byteIndex + frameSize > everything.length) {
                                        break;
                                    }
                                    packet = { type: "audio", data: everything.subarray(byteIndex, byteIndex + frameSize), pts: timeStamp, dts: timeStamp };
                                    this.trigger("data", packet);
                                    byteIndex += frameSize;
                                    continue;
                                }
                                byteIndex++;
                            }
                            bytesLeft = everything.length - byteIndex;
                            if (bytesLeft > 0) {
                                everything = everything.subarray(byteIndex);
                            } else {
                                everything = new Uint8Array();
                            }
                        };
                        this.reset = function () {
                            everything = new Uint8Array();
                            this.trigger("reset");
                        };
                        this.endTimeline = function () {
                            everything = new Uint8Array();
                            this.trigger("endedtimeline");
                        };
                    };
                    AacStream.prototype = new Stream();
                    module.exports = AacStream;
                },
                { "2": 2, "31": 31 },
            ],
            2: [
                function (require, module, exports) {
                    "use strict";
                    var ADTS_SAMPLING_FREQUENCIES = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];
                    var parseId3TagSize = function (header, byteIndex) {
                        var returnSize = (header[byteIndex + 6] << 21) | (header[byteIndex + 7] << 14) | (header[byteIndex + 8] << 7) | header[byteIndex + 9],
                            flags = header[byteIndex + 5],
                            footerPresent = (flags & 16) >> 4;
                        returnSize = returnSize >= 0 ? returnSize : 0;
                        if (footerPresent) {
                            return returnSize + 20;
                        }
                        return returnSize + 10;
                    };
                    var getId3Offset = function (data, offset) {
                        if (data.length - offset < 10 || data[offset] !== "I".charCodeAt(0) || data[offset + 1] !== "D".charCodeAt(0) || data[offset + 2] !== "3".charCodeAt(0)) {
                            return offset;
                        }
                        offset += parseId3TagSize(data, offset);
                        return getId3Offset(data, offset);
                    };
                    var isLikelyAacData = function (data) {
                        var offset = getId3Offset(data, 0);
                        return data.length >= offset + 2 && (data[offset] & 0xff) === 0xff && (data[offset + 1] & 0xf0) === 0xf0 && (data[offset + 1] & 0x16) === 0x10;
                    };
                    var parseSyncSafeInteger = function (data) {
                        return (data[0] << 21) | (data[1] << 14) | (data[2] << 7) | data[3];
                    };
                    var percentEncode = function (bytes, start, end) {
                        var i,
                            result = "";
                        for (i = start; i < end; i++) {
                            result += "%" + ("00" + bytes[i].toString(16)).slice(-2);
                        }
                        return result;
                    };
                    var parseIso88591 = function (bytes, start, end) {
                        return unescape(percentEncode(bytes, start, end));
                    };
                    var parseAdtsSize = function (header, byteIndex) {
                        var lowThree = (header[byteIndex + 5] & 0xe0) >> 5,
                            middle = header[byteIndex + 4] << 3,
                            highTwo = header[byteIndex + 3] & (0x3 << 11);
                        return highTwo | middle | lowThree;
                    };
                    var parseType = function (header, byteIndex) {
                        if (header[byteIndex] === "I".charCodeAt(0) && header[byteIndex + 1] === "D".charCodeAt(0) && header[byteIndex + 2] === "3".charCodeAt(0)) {
                            return "timed-metadata";
                        } else if (header[byteIndex] & (0xff === 0xff) && (header[byteIndex + 1] & 0xf0) === 0xf0) {
                            return "audio";
                        }
                        return null;
                    };
                    var parseSampleRate = function (packet) {
                        var i = 0;
                        while (i + 5 < packet.length) {
                            if (packet[i] !== 0xff || (packet[i + 1] & 0xf6) !== 0xf0) {
                                i++;
                                continue;
                            }
                            return ADTS_SAMPLING_FREQUENCIES[(packet[i + 2] & 0x3c) >>> 2];
                        }
                        return null;
                    };
                    var parseAacTimestamp = function (packet) {
                        var frameStart, frameSize, frame, frameHeader;
                        frameStart = 10;
                        if (packet[5] & 0x40) {
                            frameStart += 4;
                            frameStart += parseSyncSafeInteger(packet.subarray(10, 14));
                        }
                        do {
                            frameSize = parseSyncSafeInteger(packet.subarray(frameStart + 4, frameStart + 8));
                            if (frameSize < 1) {
                                return null;
                            }
                            frameHeader = String.fromCharCode(packet[frameStart], packet[frameStart + 1], packet[frameStart + 2], packet[frameStart + 3]);
                            if (frameHeader === "PRIV") {
                                frame = packet.subarray(frameStart + 10, frameStart + frameSize + 10);
                                for (var i = 0; i < frame.byteLength; i++) {
                                    if (frame[i] === 0) {
                                        var owner = parseIso88591(frame, 0, i);
                                        if (owner === "com.apple.streaming.transportStreamTimestamp") {
                                            var d = frame.subarray(i + 1);
                                            var size = ((d[3] & 0x01) << 30) | (d[4] << 22) | (d[5] << 14) | (d[6] << 6) | (d[7] >>> 2);
                                            size *= 4;
                                            size += d[7] & 0x03;
                                            return size;
                                        }
                                        break;
                                    }
                                }
                            }
                            frameStart += 10;
                            frameStart += frameSize;
                        } while (frameStart < packet.byteLength);
                        return null;
                    };
                    module.exports = { isLikelyAacData: isLikelyAacData, parseId3TagSize: parseId3TagSize, parseAdtsSize: parseAdtsSize, parseType: parseType, parseSampleRate: parseSampleRate, parseAacTimestamp: parseAacTimestamp };
                },
                {},
            ],
            3: [
                function (require, module, exports) {
                    "use strict";
                    var Stream = require(31);
                    var ONE_SECOND_IN_TS = require(29).ONE_SECOND_IN_TS;
                    var AdtsStream;
                    var ADTS_SAMPLING_FREQUENCIES = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];
                    AdtsStream = function (handlePartialSegments) {
                        var buffer,
                            frameNum = 0;
                        AdtsStream.prototype.init.call(this);
                        this.push = function (packet) {
                            var i = 0,
                                frameLength,
                                protectionSkipBytes,
                                frameEnd,
                                oldBuffer,
                                sampleCount,
                                adtsFrameDuration;
                            if (!handlePartialSegments) {
                                frameNum = 0;
                            }
                            if (packet.type !== "audio") {
                                return;
                            }
                            if (buffer) {
                                oldBuffer = buffer;
                                buffer = new Uint8Array(oldBuffer.byteLength + packet.data.byteLength);
                                buffer.set(oldBuffer);
                                buffer.set(packet.data, oldBuffer.byteLength);
                            } else {
                                buffer = packet.data;
                            }
                            while (i + 5 < buffer.length) {
                                if (buffer[i] !== 0xff || (buffer[i + 1] & 0xf6) !== 0xf0) {
                                    i++;
                                    continue;
                                }
                                protectionSkipBytes = (~buffer[i + 1] & 0x01) * 2;
                                frameLength = ((buffer[i + 3] & 0x03) << 11) | (buffer[i + 4] << 3) | ((buffer[i + 5] & 0xe0) >> 5);
                                sampleCount = ((buffer[i + 6] & 0x03) + 1) * 1024;
                                adtsFrameDuration = (sampleCount * ONE_SECOND_IN_TS) / ADTS_SAMPLING_FREQUENCIES[(buffer[i + 2] & 0x3c) >>> 2];
                                frameEnd = i + frameLength;
                                if (buffer.byteLength < frameEnd) {
                                    return;
                                }
                                this.trigger("data", {
                                    pts: packet.pts + frameNum * adtsFrameDuration,
                                    dts: packet.dts + frameNum * adtsFrameDuration,
                                    sampleCount: sampleCount,
                                    audioobjecttype: ((buffer[i + 2] >>> 6) & 0x03) + 1,
                                    channelcount: ((buffer[i + 2] & 1) << 2) | ((buffer[i + 3] & 0xc0) >>> 6),
                                    samplerate: ADTS_SAMPLING_FREQUENCIES[(buffer[i + 2] & 0x3c) >>> 2],
                                    samplingfrequencyindex: (buffer[i + 2] & 0x3c) >>> 2,
                                    samplesize: 16,
                                    data: buffer.subarray(i + 7 + protectionSkipBytes, frameEnd),
                                });
                                frameNum++;
                                if (buffer.byteLength === frameEnd) {
                                    buffer = undefined;
                                    return;
                                }
                                buffer = buffer.subarray(frameEnd);
                            }
                        };
                        this.flush = function () {
                            frameNum = 0;
                            this.trigger("done");
                        };
                        this.reset = function () {
                            buffer = void 0;
                            this.trigger("reset");
                        };
                        this.endTimeline = function () {
                            buffer = void 0;
                            this.trigger("endedtimeline");
                        };
                    };
                    AdtsStream.prototype = new Stream();
                    module.exports = AdtsStream;
                },
                { "29": 29, "31": 31 },
            ],
            4: [
                function (require, module, exports) {
                    "use strict";
                    var Stream = require(31);
                    var ExpGolomb = require(30);
                    var H264Stream, NalByteStream;
                    var PROFILES_WITH_OPTIONAL_SPS_DATA;
                    NalByteStream = function () {
                        var syncPoint = 0,
                            i,
                            buffer;
                        NalByteStream.prototype.init.call(this);
                        this.push = function (data) {
                            var swapBuffer;
                            if (!buffer) {
                                buffer = data.data;
                            } else {
                                swapBuffer = new Uint8Array(buffer.byteLength + data.data.byteLength);
                                swapBuffer.set(buffer);
                                swapBuffer.set(data.data, buffer.byteLength);
                                buffer = swapBuffer;
                            }
                            var len = buffer.byteLength;
                            for (; syncPoint < len - 3; syncPoint++) {
                                if (buffer[syncPoint + 2] === 1) {
                                    i = syncPoint + 5;
                                    break;
                                }
                            }
                            while (i < len) {
                                switch (buffer[i]) {
                                    case 0:
                                        if (buffer[i - 1] !== 0) {
                                            i += 2;
                                            break;
                                        } else if (buffer[i - 2] !== 0) {
                                            i++;
                                            break;
                                        }
                                        if (syncPoint + 3 !== i - 2) {
                                            this.trigger("data", buffer.subarray(syncPoint + 3, i - 2));
                                        }
                                        do {
                                            i++;
                                        } while (buffer[i] !== 1 && i < len);
                                        syncPoint = i - 2;
                                        i += 3;
                                        break;
                                    case 1:
                                        if (buffer[i - 1] !== 0 || buffer[i - 2] !== 0) {
                                            i += 3;
                                            break;
                                        }
                                        this.trigger("data", buffer.subarray(syncPoint + 3, i - 2));
                                        syncPoint = i - 2;
                                        i += 3;
                                        break;
                                    default:
                                        i += 3;
                                        break;
                                }
                            }
                            buffer = buffer.subarray(syncPoint);
                            i -= syncPoint;
                            syncPoint = 0;
                        };
                        this.reset = function () {
                            buffer = null;
                            syncPoint = 0;
                            this.trigger("reset");
                        };
                        this.flush = function () {
                            if (buffer && buffer.byteLength > 3) {
                                this.trigger("data", buffer.subarray(syncPoint + 3));
                            }
                            buffer = null;
                            syncPoint = 0;
                            this.trigger("done");
                        };
                        this.endTimeline = function () {
                            this.flush();
                            this.trigger("endedtimeline");
                        };
                    };
                    NalByteStream.prototype = new Stream();
                    PROFILES_WITH_OPTIONAL_SPS_DATA = { 100: true, 110: true, 122: true, 244: true, 44: true, 83: true, 86: true, 118: true, 128: true, 138: true, 139: true, 134: true };
                    H264Stream = function () {
                        var nalByteStream = new NalByteStream(),
                            self,
                            trackId,
                            currentPts,
                            currentDts,
                            discardEmulationPreventionBytes,
                            readSequenceParameterSet,
                            skipScalingList;
                        H264Stream.prototype.init.call(this);
                        self = this;
                        this.push = function (packet) {
                            if (packet.type !== "video") {
                                return;
                            }
                            trackId = packet.trackId;
                            currentPts = packet.pts;
                            currentDts = packet.dts;
                            nalByteStream.push(packet);
                        };
                        nalByteStream.on("data", function (data) {
                            var event = { trackId: trackId, pts: currentPts, dts: currentDts, data: data };
                            switch (data[0] & 0x1f) {
                                case 0x05:
                                    event.nalUnitType = "slice_layer_without_partitioning_rbsp_idr";
                                    break;
                                case 0x06:
                                    event.nalUnitType = "sei_rbsp";
                                    event.escapedRBSP = discardEmulationPreventionBytes(data.subarray(1));
                                    break;
                                case 0x07:
                                    event.nalUnitType = "seq_parameter_set_rbsp";
                                    event.escapedRBSP = discardEmulationPreventionBytes(data.subarray(1));
                                    event.config = readSequenceParameterSet(event.escapedRBSP);
                                    break;
                                case 0x08:
                                    event.nalUnitType = "pic_parameter_set_rbsp";
                                    break;
                                case 0x09:
                                    event.nalUnitType = "access_unit_delimiter_rbsp";
                                    break;
                                default:
                                    break;
                            }
                            self.trigger("data", event);
                        });
                        nalByteStream.on("done", function () {
                            self.trigger("done");
                        });
                        nalByteStream.on("partialdone", function () {
                            self.trigger("partialdone");
                        });
                        nalByteStream.on("reset", function () {
                            self.trigger("reset");
                        });
                        nalByteStream.on("endedtimeline", function () {
                            self.trigger("endedtimeline");
                        });
                        this.flush = function () {
                            nalByteStream.flush();
                        };
                        this.partialFlush = function () {
                            nalByteStream.partialFlush();
                        };
                        this.reset = function () {
                            nalByteStream.reset();
                        };
                        this.endTimeline = function () {
                            nalByteStream.endTimeline();
                        };
                        skipScalingList = function (count, expGolombDecoder) {
                            var lastScale = 8,
                                nextScale = 8,
                                j,
                                deltaScale;
                            for (j = 0; j < count; j++) {
                                if (nextScale !== 0) {
                                    deltaScale = expGolombDecoder.readExpGolomb();
                                    nextScale = (lastScale + deltaScale + 256) % 256;
                                }
                                lastScale = nextScale === 0 ? lastScale : nextScale;
                            }
                        };
                        discardEmulationPreventionBytes = function (data) {
                            var length = data.byteLength,
                                emulationPreventionBytesPositions = [],
                                i = 1,
                                newLength,
                                newData;
                            while (i < length - 2) {
                                if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0x03) {
                                    emulationPreventionBytesPositions.push(i + 2);
                                    i += 2;
                                } else {
                                    i++;
                                }
                            }
                            if (emulationPreventionBytesPositions.length === 0) {
                                return data;
                            }
                            newLength = length - emulationPreventionBytesPositions.length;
                            newData = new Uint8Array(newLength);
                            var sourceIndex = 0;
                            for (i = 0; i < newLength; sourceIndex++, i++) {
                                if (sourceIndex === emulationPreventionBytesPositions[0]) {
                                    sourceIndex++;
                                    emulationPreventionBytesPositions.shift();
                                }
                                newData[i] = data[sourceIndex];
                            }
                            return newData;
                        };
                        readSequenceParameterSet = function (data) {
                            var frameCropLeftOffset = 0,
                                frameCropRightOffset = 0,
                                frameCropTopOffset = 0,
                                frameCropBottomOffset = 0,
                                sarScale = 1,
                                expGolombDecoder,
                                profileIdc,
                                levelIdc,
                                profileCompatibility,
                                chromaFormatIdc,
                                picOrderCntType,
                                numRefFramesInPicOrderCntCycle,
                                picWidthInMbsMinus1,
                                picHeightInMapUnitsMinus1,
                                frameMbsOnlyFlag,
                                scalingListCount,
                                sarRatio,
                                aspectRatioIdc,
                                i;
                            expGolombDecoder = new ExpGolomb(data);
                            profileIdc = expGolombDecoder.readUnsignedByte();
                            profileCompatibility = expGolombDecoder.readUnsignedByte();
                            levelIdc = expGolombDecoder.readUnsignedByte();
                            expGolombDecoder.skipUnsignedExpGolomb();
                            if (PROFILES_WITH_OPTIONAL_SPS_DATA[profileIdc]) {
                                chromaFormatIdc = expGolombDecoder.readUnsignedExpGolomb();
                                if (chromaFormatIdc === 3) {
                                    expGolombDecoder.skipBits(1);
                                }
                                expGolombDecoder.skipUnsignedExpGolomb();
                                expGolombDecoder.skipUnsignedExpGolomb();
                                expGolombDecoder.skipBits(1);
                                if (expGolombDecoder.readBoolean()) {
                                    scalingListCount = chromaFormatIdc !== 3 ? 8 : 12;
                                    for (i = 0; i < scalingListCount; i++) {
                                        if (expGolombDecoder.readBoolean()) {
                                            if (i < 6) {
                                                skipScalingList(16, expGolombDecoder);
                                            } else {
                                                skipScalingList(64, expGolombDecoder);
                                            }
                                        }
                                    }
                                }
                            }
                            expGolombDecoder.skipUnsignedExpGolomb();
                            picOrderCntType = expGolombDecoder.readUnsignedExpGolomb();
                            if (picOrderCntType === 0) {
                                expGolombDecoder.readUnsignedExpGolomb();
                            } else if (picOrderCntType === 1) {
                                expGolombDecoder.skipBits(1);
                                expGolombDecoder.skipExpGolomb();
                                expGolombDecoder.skipExpGolomb();
                                numRefFramesInPicOrderCntCycle = expGolombDecoder.readUnsignedExpGolomb();
                                for (i = 0; i < numRefFramesInPicOrderCntCycle; i++) {
                                    expGolombDecoder.skipExpGolomb();
                                }
                            }
                            expGolombDecoder.skipUnsignedExpGolomb();
                            expGolombDecoder.skipBits(1);
                            picWidthInMbsMinus1 = expGolombDecoder.readUnsignedExpGolomb();
                            picHeightInMapUnitsMinus1 = expGolombDecoder.readUnsignedExpGolomb();
                            frameMbsOnlyFlag = expGolombDecoder.readBits(1);
                            if (frameMbsOnlyFlag === 0) {
                                expGolombDecoder.skipBits(1);
                            }
                            expGolombDecoder.skipBits(1);
                            if (expGolombDecoder.readBoolean()) {
                                frameCropLeftOffset = expGolombDecoder.readUnsignedExpGolomb();
                                frameCropRightOffset = expGolombDecoder.readUnsignedExpGolomb();
                                frameCropTopOffset = expGolombDecoder.readUnsignedExpGolomb();
                                frameCropBottomOffset = expGolombDecoder.readUnsignedExpGolomb();
                            }
                            if (expGolombDecoder.readBoolean()) {
                                if (expGolombDecoder.readBoolean()) {
                                    aspectRatioIdc = expGolombDecoder.readUnsignedByte();
                                    switch (aspectRatioIdc) {
                                        case 1:
                                            sarRatio = [1, 1];
                                            break;
                                        case 2:
                                            sarRatio = [12, 11];
                                            break;
                                        case 3:
                                            sarRatio = [10, 11];
                                            break;
                                        case 4:
                                            sarRatio = [16, 11];
                                            break;
                                        case 5:
                                            sarRatio = [40, 33];
                                            break;
                                        case 6:
                                            sarRatio = [24, 11];
                                            break;
                                        case 7:
                                            sarRatio = [20, 11];
                                            break;
                                        case 8:
                                            sarRatio = [32, 11];
                                            break;
                                        case 9:
                                            sarRatio = [80, 33];
                                            break;
                                        case 10:
                                            sarRatio = [18, 11];
                                            break;
                                        case 11:
                                            sarRatio = [15, 11];
                                            break;
                                        case 12:
                                            sarRatio = [64, 33];
                                            break;
                                        case 13:
                                            sarRatio = [160, 99];
                                            break;
                                        case 14:
                                            sarRatio = [4, 3];
                                            break;
                                        case 15:
                                            sarRatio = [3, 2];
                                            break;
                                        case 16:
                                            sarRatio = [2, 1];
                                            break;
                                        case 255: {
                                            sarRatio = [(expGolombDecoder.readUnsignedByte() << 8) | expGolombDecoder.readUnsignedByte(), (expGolombDecoder.readUnsignedByte() << 8) | expGolombDecoder.readUnsignedByte()];
                                            break;
                                        }
                                    }
                                    if (sarRatio) {
                                        sarScale = sarRatio[0] / sarRatio[1];
                                    }
                                }
                            }
                            return {
                                profileIdc: profileIdc,
                                levelIdc: levelIdc,
                                profileCompatibility: profileCompatibility,
                                width: Math.ceil(((picWidthInMbsMinus1 + 1) * 16 - frameCropLeftOffset * 2 - frameCropRightOffset * 2) * sarScale),
                                height: (2 - frameMbsOnlyFlag) * (picHeightInMapUnitsMinus1 + 1) * 16 - frameCropTopOffset * 2 - frameCropBottomOffset * 2,
                                sarRatio: sarRatio,
                            };
                        };
                    };
                    H264Stream.prototype = new Stream();
                    module.exports = { H264Stream: H264Stream, NalByteStream: NalByteStream };
                },
                { "30": 30, "31": 31 },
            ],
            5: [
                function (require, module, exports) {
                    var AUDIO_PROPERTIES = ["audioobjecttype", "channelcount", "samplerate", "samplingfrequencyindex", "samplesize"];
                    module.exports = AUDIO_PROPERTIES;
                },
                {},
            ],
            6: [
                function (require, module, exports) {
                    var VIDEO_PROPERTIES = ["width", "height", "profileIdc", "levelIdc", "profileCompatibility", "sarRatio"];
                    module.exports = VIDEO_PROPERTIES;
                },
                {},
            ],
            7: [
                function (require, module, exports) {
                    var highPrefix = [33, 16, 5, 32, 164, 27];
                    var lowPrefix = [33, 65, 108, 84, 1, 2, 4, 8, 168, 2, 4, 8, 17, 191, 252];
                    var zeroFill = function (count) {
                        var a = [];
                        while (count--) {
                            a.push(0);
                        }
                        return a;
                    };
                    var makeTable = function (metaTable) {
                        return Object.keys(metaTable).reduce(function (obj, key) {
                            obj[key] = new Uint8Array(
                                metaTable[key].reduce(function (arr, part) {
                                    return arr.concat(part);
                                }, []),
                            );
                            return obj;
                        }, {});
                    };
                    var silence;
                    module.exports = function () {
                        if (!silence) {
                            var coneOfSilence = {
                                96000: [highPrefix, [227, 64], zeroFill(154), [56]],
                                88200: [highPrefix, [231], zeroFill(170), [56]],
                                64000: [highPrefix, [248, 192], zeroFill(240), [56]],
                                48000: [highPrefix, [255, 192], zeroFill(268), [55, 148, 128], zeroFill(54), [112]],
                                44100: [highPrefix, [255, 192], zeroFill(268), [55, 163, 128], zeroFill(84), [112]],
                                32000: [highPrefix, [255, 192], zeroFill(268), [55, 234], zeroFill(226), [112]],
                                24000: [highPrefix, [255, 192], zeroFill(268), [55, 255, 128], zeroFill(268), [111, 112], zeroFill(126), [224]],
                                16000: [highPrefix, [255, 192], zeroFill(268), [55, 255, 128], zeroFill(268), [111, 255], zeroFill(269), [223, 108], zeroFill(195), [1, 192]],
                                12000: [lowPrefix, zeroFill(268), [3, 127, 248], zeroFill(268), [6, 255, 240], zeroFill(268), [13, 255, 224], zeroFill(268), [27, 253, 128], zeroFill(259), [56]],
                                11025: [lowPrefix, zeroFill(268), [3, 127, 248], zeroFill(268), [6, 255, 240], zeroFill(268), [13, 255, 224], zeroFill(268), [27, 255, 192], zeroFill(268), [55, 175, 128], zeroFill(108), [112]],
                                8000: [lowPrefix, zeroFill(268), [3, 121, 16], zeroFill(47), [7]],
                            };
                            silence = makeTable(coneOfSilence);
                        }
                        return silence;
                    };
                },
                {},
            ],
            8: [
                function (require, module, exports) {
                    "use strict";
                    var Stream = require(31);
                    var cea708Parser = require(23);
                    var CaptionStream = function () {
                        CaptionStream.prototype.init.call(this);
                        this.captionPackets_ = [];
                        this.ccStreams_ = [new Cea608Stream(0, 0), new Cea608Stream(0, 1), new Cea608Stream(1, 0), new Cea608Stream(1, 1)];
                        this.reset();
                        this.ccStreams_.forEach(function (cc) {
                            cc.on("data", this.trigger.bind(this, "data"));
                            cc.on("partialdone", this.trigger.bind(this, "partialdone"));
                            cc.on("done", this.trigger.bind(this, "done"));
                        }, this);
                    };
                    CaptionStream.prototype = new Stream();
                    CaptionStream.prototype.push = function (event) {
                        var sei, userData, newCaptionPackets;
                        if (event.nalUnitType !== "sei_rbsp") {
                            return;
                        }
                        sei = cea708Parser.parseSei(event.escapedRBSP);
                        if (sei.payloadType !== cea708Parser.USER_DATA_REGISTERED_ITU_T_T35) {
                            return;
                        }
                        userData = cea708Parser.parseUserData(sei);
                        if (!userData) {
                            return;
                        }
                        if (event.dts < this.latestDts_) {
                            this.ignoreNextEqualDts_ = true;
                            return;
                        } else if (event.dts === this.latestDts_ && this.ignoreNextEqualDts_) {
                            this.numSameDts_--;
                            if (!this.numSameDts_) {
                                this.ignoreNextEqualDts_ = false;
                            }
                            return;
                        }
                        newCaptionPackets = cea708Parser.parseCaptionPackets(event.pts, userData);
                        this.captionPackets_ = this.captionPackets_.concat(newCaptionPackets);
                        if (this.latestDts_ !== event.dts) {
                            this.numSameDts_ = 0;
                        }
                        this.numSameDts_++;
                        this.latestDts_ = event.dts;
                    };
                    CaptionStream.prototype.flushCCStreams = function (flushType) {
                        this.ccStreams_.forEach(function (cc) {
                            return flushType === "flush" ? cc.flush() : cc.partialFlush();
                        }, this);
                    };
                    CaptionStream.prototype.flushStream = function (flushType) {
                        if (!this.captionPackets_.length) {
                            this.flushCCStreams(flushType);
                            return;
                        }
                        this.captionPackets_.forEach(function (elem, idx) {
                            elem.presortIndex = idx;
                        });
                        this.captionPackets_.sort(function (a, b) {
                            if (a.pts === b.pts) {
                                return a.presortIndex - b.presortIndex;
                            }
                            return a.pts - b.pts;
                        });
                        this.captionPackets_.forEach(function (packet) {
                            if (packet.type < 2) {
                                this.dispatchCea608Packet(packet);
                            }
                        }, this);
                        this.captionPackets_.length = 0;
                        this.flushCCStreams(flushType);
                    };
                    CaptionStream.prototype.flush = function () {
                        return this.flushStream("flush");
                    };
                    CaptionStream.prototype.partialFlush = function () {
                        return this.flushStream("partialFlush");
                    };
                    CaptionStream.prototype.reset = function () {
                        this.latestDts_ = null;
                        this.ignoreNextEqualDts_ = false;
                        this.numSameDts_ = 0;
                        this.activeCea608Channel_ = [null, null];
                        this.ccStreams_.forEach(function (ccStream) {
                            ccStream.reset();
                        });
                    };
                    CaptionStream.prototype.dispatchCea608Packet = function (packet) {
                        if (this.setsTextOrXDSActive(packet)) {
                            this.activeCea608Channel_[packet.type] = null;
                        } else if (this.setsChannel1Active(packet)) {
                            this.activeCea608Channel_[packet.type] = 0;
                        } else if (this.setsChannel2Active(packet)) {
                            this.activeCea608Channel_[packet.type] = 1;
                        }
                        if (this.activeCea608Channel_[packet.type] === null) {
                            return;
                        }
                        this.ccStreams_[(packet.type << 1) + this.activeCea608Channel_[packet.type]].push(packet);
                    };
                    CaptionStream.prototype.setsChannel1Active = function (packet) {
                        return (packet.ccData & 0x7800) === 0x1000;
                    };
                    CaptionStream.prototype.setsChannel2Active = function (packet) {
                        return (packet.ccData & 0x7800) === 0x1800;
                    };
                    CaptionStream.prototype.setsTextOrXDSActive = function (packet) {
                        return (packet.ccData & 0x7100) === 0x0100 || (packet.ccData & 0x78fe) === 0x102a || (packet.ccData & 0x78fe) === 0x182a;
                    };
                    var CHARACTER_TRANSLATION = {
                        0x2a: 0xe1,
                        0x5c: 0xe9,
                        0x5e: 0xed,
                        0x5f: 0xf3,
                        0x60: 0xfa,
                        0x7b: 0xe7,
                        0x7c: 0xf7,
                        0x7d: 0xd1,
                        0x7e: 0xf1,
                        0x7f: 0x2588,
                        0x0130: 0xae,
                        0x0131: 0xb0,
                        0x0132: 0xbd,
                        0x0133: 0xbf,
                        0x0134: 0x2122,
                        0x0135: 0xa2,
                        0x0136: 0xa3,
                        0x0137: 0x266a,
                        0x0138: 0xe0,
                        0x0139: 0xa0,
                        0x013a: 0xe8,
                        0x013b: 0xe2,
                        0x013c: 0xea,
                        0x013d: 0xee,
                        0x013e: 0xf4,
                        0x013f: 0xfb,
                        0x0220: 0xc1,
                        0x0221: 0xc9,
                        0x0222: 0xd3,
                        0x0223: 0xda,
                        0x0224: 0xdc,
                        0x0225: 0xfc,
                        0x0226: 0x2018,
                        0x0227: 0xa1,
                        0x0228: 0x2a,
                        0x0229: 0x27,
                        0x022a: 0x2014,
                        0x022b: 0xa9,
                        0x022c: 0x2120,
                        0x022d: 0x2022,
                        0x022e: 0x201c,
                        0x022f: 0x201d,
                        0x0230: 0xc0,
                        0x0231: 0xc2,
                        0x0232: 0xc7,
                        0x0233: 0xc8,
                        0x0234: 0xca,
                        0x0235: 0xcb,
                        0x0236: 0xeb,
                        0x0237: 0xce,
                        0x0238: 0xcf,
                        0x0239: 0xef,
                        0x023a: 0xd4,
                        0x023b: 0xd9,
                        0x023c: 0xf9,
                        0x023d: 0xdb,
                        0x023e: 0xab,
                        0x023f: 0xbb,
                        0x0320: 0xc3,
                        0x0321: 0xe3,
                        0x0322: 0xcd,
                        0x0323: 0xcc,
                        0x0324: 0xec,
                        0x0325: 0xd2,
                        0x0326: 0xf2,
                        0x0327: 0xd5,
                        0x0328: 0xf5,
                        0x0329: 0x7b,
                        0x032a: 0x7d,
                        0x032b: 0x5c,
                        0x032c: 0x5e,
                        0x032d: 0x5f,
                        0x032e: 0x7c,
                        0x032f: 0x7e,
                        0x0330: 0xc4,
                        0x0331: 0xe4,
                        0x0332: 0xd6,
                        0x0333: 0xf6,
                        0x0334: 0xdf,
                        0x0335: 0xa5,
                        0x0336: 0xa4,
                        0x0337: 0x2502,
                        0x0338: 0xc5,
                        0x0339: 0xe5,
                        0x033a: 0xd8,
                        0x033b: 0xf8,
                        0x033c: 0x250c,
                        0x033d: 0x2510,
                        0x033e: 0x2514,
                        0x033f: 0x2518,
                    };
                    var getCharFromCode = function (code) {
                        if (code === null) {
                            return "";
                        }
                        code = CHARACTER_TRANSLATION[code] || code;
                        return String.fromCharCode(code);
                    };
                    var BOTTOM_ROW = 14;
                    var ROWS = [0x1100, 0x1120, 0x1200, 0x1220, 0x1500, 0x1520, 0x1600, 0x1620, 0x1700, 0x1720, 0x1000, 0x1300, 0x1320, 0x1400, 0x1420];
                    var createDisplayBuffer = function () {
                        var result = [],
                            i = BOTTOM_ROW + 1;
                        while (i--) {
                            result.push("");
                        }
                        return result;
                    };
                    var Cea608Stream = function (field, dataChannel) {
                        Cea608Stream.prototype.init.call(this);
                        this.field_ = field || 0;
                        this.dataChannel_ = dataChannel || 0;
                        this.name_ = "CC" + (((this.field_ << 1) | this.dataChannel_) + 1);
                        this.setConstants();
                        this.reset();
                        this.push = function (packet) {
                            var data, swap, char0, char1, text;
                            data = packet.ccData & 0x7f7f;
                            if (data === this.lastControlCode_) {
                                this.lastControlCode_ = null;
                                return;
                            }
                            if ((data & 0xf000) === 0x1000) {
                                this.lastControlCode_ = data;
                            } else if (data !== this.PADDING_) {
                                this.lastControlCode_ = null;
                            }
                            char0 = data >>> 8;
                            char1 = data & 0xff;
                            if (data === this.PADDING_) {
                                return;
                            } else if (data === this.RESUME_CAPTION_LOADING_) {
                                this.mode_ = "popOn";
                            } else if (data === this.END_OF_CAPTION_) {
                                this.mode_ = "popOn";
                                this.clearFormatting(packet.pts);
                                this.flushDisplayed(packet.pts);
                                swap = this.displayed_;
                                this.displayed_ = this.nonDisplayed_;
                                this.nonDisplayed_ = swap;
                                this.startPts_ = packet.pts;
                            } else if (data === this.ROLL_UP_2_ROWS_) {
                                this.rollUpRows_ = 2;
                                this.setRollUp(packet.pts);
                            } else if (data === this.ROLL_UP_3_ROWS_) {
                                this.rollUpRows_ = 3;
                                this.setRollUp(packet.pts);
                            } else if (data === this.ROLL_UP_4_ROWS_) {
                                this.rollUpRows_ = 4;
                                this.setRollUp(packet.pts);
                            } else if (data === this.CARRIAGE_RETURN_) {
                                this.clearFormatting(packet.pts);
                                this.flushDisplayed(packet.pts);
                                this.shiftRowsUp_();
                                this.startPts_ = packet.pts;
                            } else if (data === this.BACKSPACE_) {
                                if (this.mode_ === "popOn") {
                                    this.nonDisplayed_[this.row_] = this.nonDisplayed_[this.row_].slice(0, -1);
                                } else {
                                    this.displayed_[this.row_] = this.displayed_[this.row_].slice(0, -1);
                                }
                            } else if (data === this.ERASE_DISPLAYED_MEMORY_) {
                                this.flushDisplayed(packet.pts);
                                this.displayed_ = createDisplayBuffer();
                            } else if (data === this.ERASE_NON_DISPLAYED_MEMORY_) {
                                this.nonDisplayed_ = createDisplayBuffer();
                            } else if (data === this.RESUME_DIRECT_CAPTIONING_) {
                                if (this.mode_ !== "paintOn") {
                                    this.flushDisplayed(packet.pts);
                                    this.displayed_ = createDisplayBuffer();
                                }
                                this.mode_ = "paintOn";
                                this.startPts_ = packet.pts;
                            } else if (this.isSpecialCharacter(char0, char1)) {
                                char0 = (char0 & 0x03) << 8;
                                text = getCharFromCode(char0 | char1);
                                this[this.mode_](packet.pts, text);
                                this.column_++;
                            } else if (this.isExtCharacter(char0, char1)) {
                                if (this.mode_ === "popOn") {
                                    this.nonDisplayed_[this.row_] = this.nonDisplayed_[this.row_].slice(0, -1);
                                } else {
                                    this.displayed_[this.row_] = this.displayed_[this.row_].slice(0, -1);
                                }
                                char0 = (char0 & 0x03) << 8;
                                text = getCharFromCode(char0 | char1);
                                this[this.mode_](packet.pts, text);
                                this.column_++;
                            } else if (this.isMidRowCode(char0, char1)) {
                                this.clearFormatting(packet.pts);
                                this[this.mode_](packet.pts, " ");
                                this.column_++;
                                if ((char1 & 0xe) === 0xe) {
                                    this.addFormatting(packet.pts, ["i"]);
                                }
                                if ((char1 & 0x1) === 0x1) {
                                    this.addFormatting(packet.pts, ["u"]);
                                }
                            } else if (this.isOffsetControlCode(char0, char1)) {
                                this.column_ += char1 & 0x03;
                            } else if (this.isPAC(char0, char1)) {
                                var row = ROWS.indexOf(data & 0x1f20);
                                if (this.mode_ === "rollUp") {
                                    if (row - this.rollUpRows_ + 1 < 0) {
                                        row = this.rollUpRows_ - 1;
                                    }
                                    this.setRollUp(packet.pts, row);
                                }
                                if (row !== this.row_) {
                                    this.clearFormatting(packet.pts);
                                    this.row_ = row;
                                }
                                if (char1 & 0x1 && this.formatting_.indexOf("u") === -1) {
                                    this.addFormatting(packet.pts, ["u"]);
                                }
                                if ((data & 0x10) === 0x10) {
                                    this.column_ = ((data & 0xe) >> 1) * 4;
                                }
                                if (this.isColorPAC(char1)) {
                                    if ((char1 & 0xe) === 0xe) {
                                        this.addFormatting(packet.pts, ["i"]);
                                    }
                                }
                            } else if (this.isNormalChar(char0)) {
                                if (char1 === 0x00) {
                                    char1 = null;
                                }
                                text = getCharFromCode(char0);
                                text += getCharFromCode(char1);
                                this[this.mode_](packet.pts, text);
                                this.column_ += text.length;
                            }
                        };
                    };
                    Cea608Stream.prototype = new Stream();
                    Cea608Stream.prototype.flushDisplayed = function (pts) {
                        var content = this.displayed_
                            .map(function (row) {
                                try {
                                    return row.trim();
                                } catch (e) {
                                    console.error("Skipping malformed caption.");
                                    return "";
                                }
                            })
                            .join("\n")
                            .replace(/^\n+|\n+$/g, "");
                        if (content.length) {
                            this.trigger("data", { startPts: this.startPts_, endPts: pts, text: content, stream: this.name_ });
                        }
                    };
                    Cea608Stream.prototype.reset = function () {
                        this.mode_ = "popOn";
                        this.topRow_ = 0;
                        this.startPts_ = 0;
                        this.displayed_ = createDisplayBuffer();
                        this.nonDisplayed_ = createDisplayBuffer();
                        this.lastControlCode_ = null;
                        this.column_ = 0;
                        this.row_ = BOTTOM_ROW;
                        this.rollUpRows_ = 2;
                        this.formatting_ = [];
                    };
                    Cea608Stream.prototype.setConstants = function () {
                        if (this.dataChannel_ === 0) {
                            this.BASE_ = 0x10;
                            this.EXT_ = 0x11;
                            this.CONTROL_ = (0x14 | this.field_) << 8;
                            this.OFFSET_ = 0x17;
                        } else if (this.dataChannel_ === 1) {
                            this.BASE_ = 0x18;
                            this.EXT_ = 0x19;
                            this.CONTROL_ = (0x1c | this.field_) << 8;
                            this.OFFSET_ = 0x1f;
                        }
                        this.PADDING_ = 0x0000;
                        this.RESUME_CAPTION_LOADING_ = this.CONTROL_ | 0x20;
                        this.END_OF_CAPTION_ = this.CONTROL_ | 0x2f;
                        this.ROLL_UP_2_ROWS_ = this.CONTROL_ | 0x25;
                        this.ROLL_UP_3_ROWS_ = this.CONTROL_ | 0x26;
                        this.ROLL_UP_4_ROWS_ = this.CONTROL_ | 0x27;
                        this.CARRIAGE_RETURN_ = this.CONTROL_ | 0x2d;
                        this.RESUME_DIRECT_CAPTIONING_ = this.CONTROL_ | 0x29;
                        this.BACKSPACE_ = this.CONTROL_ | 0x21;
                        this.ERASE_DISPLAYED_MEMORY_ = this.CONTROL_ | 0x2c;
                        this.ERASE_NON_DISPLAYED_MEMORY_ = this.CONTROL_ | 0x2e;
                    };
                    Cea608Stream.prototype.isSpecialCharacter = function (char0, char1) {
                        return char0 === this.EXT_ && char1 >= 0x30 && char1 <= 0x3f;
                    };
                    Cea608Stream.prototype.isExtCharacter = function (char0, char1) {
                        return (char0 === this.EXT_ + 1 || char0 === this.EXT_ + 2) && char1 >= 0x20 && char1 <= 0x3f;
                    };
                    Cea608Stream.prototype.isMidRowCode = function (char0, char1) {
                        return char0 === this.EXT_ && char1 >= 0x20 && char1 <= 0x2f;
                    };
                    Cea608Stream.prototype.isOffsetControlCode = function (char0, char1) {
                        return char0 === this.OFFSET_ && char1 >= 0x21 && char1 <= 0x23;
                    };
                    Cea608Stream.prototype.isPAC = function (char0, char1) {
                        return char0 >= this.BASE_ && char0 < this.BASE_ + 8 && char1 >= 0x40 && char1 <= 0x7f;
                    };
                    Cea608Stream.prototype.isColorPAC = function (char1) {
                        return (char1 >= 0x40 && char1 <= 0x4f) || (char1 >= 0x60 && char1 <= 0x7f);
                    };
                    Cea608Stream.prototype.isNormalChar = function (char) {
                        return char >= 0x20 && char <= 0x7f;
                    };
                    Cea608Stream.prototype.setRollUp = function (pts, newBaseRow) {
                        if (this.mode_ !== "rollUp") {
                            this.row_ = BOTTOM_ROW;
                            this.mode_ = "rollUp";
                            this.flushDisplayed(pts);
                            this.nonDisplayed_ = createDisplayBuffer();
                            this.displayed_ = createDisplayBuffer();
                        }
                        if (newBaseRow !== undefined && newBaseRow !== this.row_) {
                            for (var i = 0; i < this.rollUpRows_; i++) {
                                this.displayed_[newBaseRow - i] = this.displayed_[this.row_ - i];
                                this.displayed_[this.row_ - i] = "";
                            }
                        }
                        if (newBaseRow === undefined) {
                            newBaseRow = this.row_;
                        }
                        this.topRow_ = newBaseRow - this.rollUpRows_ + 1;
                    };
                    Cea608Stream.prototype.addFormatting = function (pts, format) {
                        this.formatting_ = this.formatting_.concat(format);
                        var text = format.reduce(function (text, format) {
                            return text + "<" + format + ">";
                        }, "");
                        this[this.mode_](pts, text);
                    };
                    Cea608Stream.prototype.clearFormatting = function (pts) {
                        if (!this.formatting_.length) {
                            return;
                        }
                        var text = this.formatting_.reverse().reduce(function (text, format) {
                            return text + "</" + format + ">";
                        }, "");
                        this.formatting_ = [];
                        this[this.mode_](pts, text);
                    };
                    Cea608Stream.prototype.popOn = function (pts, text) {
                        var baseRow = this.nonDisplayed_[this.row_];
                        baseRow += text;
                        this.nonDisplayed_[this.row_] = baseRow;
                    };
                    Cea608Stream.prototype.rollUp = function (pts, text) {
                        var baseRow = this.displayed_[this.row_];
                        baseRow += text;
                        this.displayed_[this.row_] = baseRow;
                    };
                    Cea608Stream.prototype.shiftRowsUp_ = function () {
                        var i;
                        for (i = 0; i < this.topRow_; i++) {
                            this.displayed_[i] = "";
                        }
                        for (i = this.row_ + 1; i < BOTTOM_ROW + 1; i++) {
                            this.displayed_[i] = "";
                        }
                        for (i = this.topRow_; i < this.row_; i++) {
                            this.displayed_[i] = this.displayed_[i + 1];
                        }
                        this.displayed_[this.row_] = "";
                    };
                    Cea608Stream.prototype.paintOn = function (pts, text) {
                        var baseRow = this.displayed_[this.row_];
                        baseRow += text;
                        this.displayed_[this.row_] = baseRow;
                    };
                    module.exports = { CaptionStream: CaptionStream, Cea608Stream: Cea608Stream };
                },
                { "23": 23, "31": 31 },
            ],
            9: [
                function (require, module, exports) {
                    "use strict";
                    var Stream = require(31),
                        CaptionStream = require(8),
                        StreamTypes = require(11),
                        TimestampRolloverStream = require(12).TimestampRolloverStream;
                    var TransportPacketStream, TransportParseStream, ElementaryStream;
                    var MP2T_PACKET_LENGTH = 188,
                        SYNC_BYTE = 0x47;
                    TransportPacketStream = function () {
                        var buffer = new Uint8Array(MP2T_PACKET_LENGTH),
                            bytesInBuffer = 0;
                        TransportPacketStream.prototype.init.call(this);
                        this.push = function (bytes) {
                            var startIndex = 0,
                                endIndex = MP2T_PACKET_LENGTH,
                                everything;
                            if (bytesInBuffer) {
                                everything = new Uint8Array(bytes.byteLength + bytesInBuffer);
                                everything.set(buffer.subarray(0, bytesInBuffer));
                                everything.set(bytes, bytesInBuffer);
                                bytesInBuffer = 0;
                            } else {
                                everything = bytes;
                            }
                            while (endIndex < everything.byteLength) {
                                if (everything[startIndex] === SYNC_BYTE && everything[endIndex] === SYNC_BYTE) {
                                    this.trigger("data", everything.subarray(startIndex, endIndex));
                                    startIndex += MP2T_PACKET_LENGTH;
                                    endIndex += MP2T_PACKET_LENGTH;
                                    continue;
                                }
                                startIndex++;
                                endIndex++;
                            }
                            if (startIndex < everything.byteLength) {
                                buffer.set(everything.subarray(startIndex), 0);
                                bytesInBuffer = everything.byteLength - startIndex;
                            }
                        };
                        this.flush = function () {
                            if (bytesInBuffer === MP2T_PACKET_LENGTH && buffer[0] === SYNC_BYTE) {
                                this.trigger("data", buffer);
                                bytesInBuffer = 0;
                            }
                            this.trigger("done");
                        };
                        this.endTimeline = function () {
                            this.flush();
                            this.trigger("endedtimeline");
                        };
                        this.reset = function () {
                            bytesInBuffer = 0;
                            this.trigger("reset");
                        };
                    };
                    TransportPacketStream.prototype = new Stream();
                    TransportParseStream = function () {
                        var parsePsi, parsePat, parsePmt, self;
                        TransportParseStream.prototype.init.call(this);
                        self = this;
                        this.packetsWaitingForPmt = [];
                        this.programMapTable = undefined;
                        parsePsi = function (payload, psi) {
                            var offset = 0;
                            if (psi.payloadUnitStartIndicator) {
                                offset += payload[offset] + 1;
                            }
                            if (psi.type === "pat") {
                                parsePat(payload.subarray(offset), psi);
                            } else {
                                parsePmt(payload.subarray(offset), psi);
                            }
                        };
                        parsePat = function (payload, pat) {
                            pat.section_number = payload[7];
                            pat.last_section_number = payload[8];
                            self.pmtPid = ((payload[10] & 0x1f) << 8) | payload[11];
                            pat.pmtPid = self.pmtPid;
                        };
                        parsePmt = function (payload, pmt) {
                            var sectionLength, tableEnd, programInfoLength, offset;
                            if (!(payload[5] & 0x01)) {
                                return;
                            }
                            self.programMapTable = { video: null, audio: null, "timed-metadata": {} };
                            sectionLength = ((payload[1] & 0x0f) << 8) | payload[2];
                            tableEnd = 3 + sectionLength - 4;
                            programInfoLength = ((payload[10] & 0x0f) << 8) | payload[11];
                            offset = 12 + programInfoLength;
                            while (offset < tableEnd) {
                                var streamType = payload[offset];
                                var pid = ((payload[offset + 1] & 0x1f) << 8) | payload[offset + 2];
                                if (streamType === StreamTypes.H264_STREAM_TYPE && self.programMapTable.video === null) {
                                    self.programMapTable.video = pid;
                                } else if (streamType === StreamTypes.ADTS_STREAM_TYPE && self.programMapTable.audio === null) {
                                    self.programMapTable.audio = pid;
                                } else if (streamType === StreamTypes.METADATA_STREAM_TYPE) {
                                    self.programMapTable["timed-metadata"][pid] = streamType;
                                }
                                offset += (((payload[offset + 3] & 0x0f) << 8) | payload[offset + 4]) + 5;
                            }
                            pmt.programMapTable = self.programMapTable;
                        };
                        this.push = function (packet) {
                            var result = {},
                                offset = 4;
                            result.payloadUnitStartIndicator = !!(packet[1] & 0x40);
                            result.pid = packet[1] & 0x1f;
                            result.pid <<= 8;
                            result.pid |= packet[2];
                            if ((packet[3] & 0x30) >>> 4 > 0x01) {
                                offset += packet[offset] + 1;
                            }
                            if (result.pid === 0) {
                                result.type = "pat";
                                parsePsi(packet.subarray(offset), result);
                                this.trigger("data", result);
                            } else if (result.pid === this.pmtPid) {
                                result.type = "pmt";
                                parsePsi(packet.subarray(offset), result);
                                this.trigger("data", result);
                                while (this.packetsWaitingForPmt.length) {
                                    this.processPes_.apply(this, this.packetsWaitingForPmt.shift());
                                }
                            } else if (this.programMapTable === undefined) {
                                this.packetsWaitingForPmt.push([packet, offset, result]);
                            } else {
                                this.processPes_(packet, offset, result);
                            }
                        };
                        this.processPes_ = function (packet, offset, result) {
                            if (result.pid === this.programMapTable.video) {
                                result.streamType = StreamTypes.H264_STREAM_TYPE;
                            } else if (result.pid === this.programMapTable.audio) {
                                result.streamType = StreamTypes.ADTS_STREAM_TYPE;
                            } else {
                                result.streamType = this.programMapTable["timed-metadata"][result.pid];
                            }
                            result.type = "pes";
                            result.data = packet.subarray(offset);
                            this.trigger("data", result);
                        };
                    };
                    TransportParseStream.prototype = new Stream();
                    TransportParseStream.STREAM_TYPES = { h264: 0x1b, adts: 0x0f };
                    ElementaryStream = function () {
                        var self = this,
                            video = { data: [], size: 0 },
                            audio = { data: [], size: 0 },
                            timedMetadata = { data: [], size: 0 },
                            programMapTable,
                            parsePes = function (payload, pes) {
                                var ptsDtsFlags;
                                pes.packetLength = 6 + ((payload[4] << 8) | payload[5]);
                                pes.dataAlignmentIndicator = (payload[6] & 0x04) !== 0;
                                ptsDtsFlags = payload[7];
                                if (ptsDtsFlags & 0xc0) {
                                    pes.pts = ((payload[9] & 0x0e) << 27) | ((payload[10] & 0xff) << 20) | ((payload[11] & 0xfe) << 12) | ((payload[12] & 0xff) << 5) | ((payload[13] & 0xfe) >>> 3);
                                    pes.pts *= 4;
                                    pes.pts += (payload[13] & 0x06) >>> 1;
                                    pes.dts = pes.pts;
                                    if (ptsDtsFlags & 0x40) {
                                        pes.dts = ((payload[14] & 0x0e) << 27) | ((payload[15] & 0xff) << 20) | ((payload[16] & 0xfe) << 12) | ((payload[17] & 0xff) << 5) | ((payload[18] & 0xfe) >>> 3);
                                        pes.dts *= 4;
                                        pes.dts += (payload[18] & 0x06) >>> 1;
                                    }
                                }
                                pes.data = payload.subarray(9 + payload[8]);
                            },
                            flushStream = function (stream, type, forceFlush) {
                                var packetData = new Uint8Array(stream.size),
                                    event = { type: type },
                                    i = 0,
                                    offset = 0,
                                    packetFlushable = false,
                                    fragment;
                                if (!stream.data.length || stream.size < 9) {
                                    return;
                                }
                                event.trackId = stream.data[0].pid;
                                for (i = 0; i < stream.data.length; i++) {
                                    fragment = stream.data[i];
                                    packetData.set(fragment.data, offset);
                                    offset += fragment.data.byteLength;
                                }
                                parsePes(packetData, event);
                                packetFlushable = type === "video" || event.packetLength <= stream.size;
                                if (forceFlush || packetFlushable) {
                                    stream.size = 0;
                                    stream.data.length = 0;
                                }
                                if (packetFlushable) {
                                    self.trigger("data", event);
                                }
                            };
                        ElementaryStream.prototype.init.call(this);
                        this.push = function (data) {
                            ({
                                pat: function () {},
                                pes: function () {
                                    var stream, streamType;
                                    switch (data.streamType) {
                                        case StreamTypes.H264_STREAM_TYPE:
                                            stream = video;
                                            streamType = "video";
                                            break;
                                        case StreamTypes.ADTS_STREAM_TYPE:
                                            stream = audio;
                                            streamType = "audio";
                                            break;
                                        case StreamTypes.METADATA_STREAM_TYPE:
                                            stream = timedMetadata;
                                            streamType = "timed-metadata";
                                            break;
                                        default:
                                            return;
                                    }
                                    if (data.payloadUnitStartIndicator) {
                                        flushStream(stream, streamType, true);
                                    }
                                    stream.data.push(data);
                                    stream.size += data.data.byteLength;
                                },
                                pmt: function () {
                                    var event = { type: "metadata", tracks: [] };
                                    programMapTable = data.programMapTable;
                                    if (programMapTable.video !== null) {
                                        event.tracks.push({ timelineStartInfo: { baseMediaDecodeTime: 0 }, id: +programMapTable.video, codec: "avc", type: "video" });
                                    }
                                    if (programMapTable.audio !== null) {
                                        event.tracks.push({ timelineStartInfo: { baseMediaDecodeTime: 0 }, id: +programMapTable.audio, codec: "adts", type: "audio" });
                                    }
                                    self.trigger("data", event);
                                },
                            })[data.type]();
                        };
                        this.reset = function () {
                            video.size = 0;
                            video.data.length = 0;
                            audio.size = 0;
                            audio.data.length = 0;
                            this.trigger("reset");
                        };
                        this.flushStreams_ = function () {
                            flushStream(video, "video");
                            flushStream(audio, "audio");
                            flushStream(timedMetadata, "timed-metadata");
                        };
                        this.flush = function () {
                            this.flushStreams_();
                            this.trigger("done");
                        };
                    };
                    ElementaryStream.prototype = new Stream();
                    var m2ts = {
                        PAT_PID: 0x0000,
                        MP2T_PACKET_LENGTH: MP2T_PACKET_LENGTH,
                        TransportPacketStream: TransportPacketStream,
                        TransportParseStream: TransportParseStream,
                        ElementaryStream: ElementaryStream,
                        TimestampRolloverStream: TimestampRolloverStream,
                        CaptionStream: CaptionStream.CaptionStream,
                        Cea608Stream: CaptionStream.Cea608Stream,
                        MetadataStream: require(10),
                    };
                    for (var type in StreamTypes) {
                        if (StreamTypes.hasOwnProperty(type)) {
                            m2ts[type] = StreamTypes[type];
                        }
                    }
                    module.exports = m2ts;
                },
                { "10": 10, "11": 11, "12": 12, "31": 31, "8": 8 },
            ],
            10: [
                function (require, module, exports) {
                    "use strict";
                    var Stream = require(31),
                        StreamTypes = require(11),
                        percentEncode = function (bytes, start, end) {
                            var i,
                                result = "";
                            for (i = start; i < end; i++) {
                                result += "%" + ("00" + bytes[i].toString(16)).slice(-2);
                            }
                            return result;
                        },
                        parseUtf8 = function (bytes, start, end) {
                            return decodeURIComponent(percentEncode(bytes, start, end));
                        },
                        parseIso88591 = function (bytes, start, end) {
                            return unescape(percentEncode(bytes, start, end));
                        },
                        parseSyncSafeInteger = function (data) {
                            return (data[0] << 21) | (data[1] << 14) | (data[2] << 7) | data[3];
                        },
                        tagParsers = {
                            TXXX: function (tag) {
                                var i;
                                if (tag.data[0] !== 3) {
                                    return;
                                }
                                for (i = 1; i < tag.data.length; i++) {
                                    if (tag.data[i] === 0) {
                                        tag.description = parseUtf8(tag.data, 1, i);
                                        tag.value = parseUtf8(tag.data, i + 1, tag.data.length).replace(/\0*$/, "");
                                        break;
                                    }
                                }
                                tag.data = tag.value;
                            },
                            WXXX: function (tag) {
                                var i;
                                if (tag.data[0] !== 3) {
                                    return;
                                }
                                for (i = 1; i < tag.data.length; i++) {
                                    if (tag.data[i] === 0) {
                                        tag.description = parseUtf8(tag.data, 1, i);
                                        tag.url = parseUtf8(tag.data, i + 1, tag.data.length);
                                        break;
                                    }
                                }
                            },
                            PRIV: function (tag) {
                                var i;
                                for (i = 0; i < tag.data.length; i++) {
                                    if (tag.data[i] === 0) {
                                        tag.owner = parseIso88591(tag.data, 0, i);
                                        break;
                                    }
                                }
                                tag.privateData = tag.data.subarray(i + 1);
                                tag.data = tag.privateData;
                            },
                        },
                        MetadataStream;
                    MetadataStream = function (options) {
                        var settings = { debug: !!(options && options.debug), descriptor: options && options.descriptor },
                            tagSize = 0,
                            buffer = [],
                            bufferSize = 0,
                            i;
                        MetadataStream.prototype.init.call(this);
                        this.dispatchType = StreamTypes.METADATA_STREAM_TYPE.toString(16);
                        if (settings.descriptor) {
                            for (i = 0; i < settings.descriptor.length; i++) {
                                this.dispatchType += ("00" + settings.descriptor[i].toString(16)).slice(-2);
                            }
                        }
                        this.push = function (chunk) {
                            var tag, frameStart, frameSize, frame, i, frameHeader;
                            if (chunk.type !== "timed-metadata") {
                                return;
                            }
                            if (chunk.dataAlignmentIndicator) {
                                bufferSize = 0;
                                buffer.length = 0;
                            }
                            if (buffer.length === 0 && (chunk.data.length < 10 || chunk.data[0] !== "I".charCodeAt(0) || chunk.data[1] !== "D".charCodeAt(0) || chunk.data[2] !== "3".charCodeAt(0))) {
                                if (settings.debug) {
                                    console.log("Skipping unrecognized metadata packet");
                                }
                                return;
                            }
                            buffer.push(chunk);
                            bufferSize += chunk.data.byteLength;
                            if (buffer.length === 1) {
                                tagSize = parseSyncSafeInteger(chunk.data.subarray(6, 10));
                                tagSize += 10;
                            }
                            if (bufferSize < tagSize) {
                                return;
                            }
                            tag = { data: new Uint8Array(tagSize), frames: [], pts: buffer[0].pts, dts: buffer[0].dts };
                            for (i = 0; i < tagSize; ) {
                                tag.data.set(buffer[0].data.subarray(0, tagSize - i), i);
                                i += buffer[0].data.byteLength;
                                bufferSize -= buffer[0].data.byteLength;
                                buffer.shift();
                            }
                            frameStart = 10;
                            if (tag.data[5] & 0x40) {
                                frameStart += 4;
                                frameStart += parseSyncSafeInteger(tag.data.subarray(10, 14));
                                tagSize -= parseSyncSafeInteger(tag.data.subarray(16, 20));
                            }
                            do {
                                frameSize = parseSyncSafeInteger(tag.data.subarray(frameStart + 4, frameStart + 8));
                                if (frameSize < 1) {
                                    return console.log("Malformed ID3 frame encountered. Skipping metadata parsing.");
                                }
                                frameHeader = String.fromCharCode(tag.data[frameStart], tag.data[frameStart + 1], tag.data[frameStart + 2], tag.data[frameStart + 3]);
                                frame = { id: frameHeader, data: tag.data.subarray(frameStart + 10, frameStart + frameSize + 10) };
                                frame.key = frame.id;
                                if (tagParsers[frame.id]) {
                                    tagParsers[frame.id](frame);
                                    if (frame.owner === "com.apple.streaming.transportStreamTimestamp") {
                                        var d = frame.data,
                                            size = ((d[3] & 0x01) << 30) | (d[4] << 22) | (d[5] << 14) | (d[6] << 6) | (d[7] >>> 2);
                                        size *= 4;
                                        size += d[7] & 0x03;
                                        frame.timeStamp = size;
                                        if (tag.pts === undefined && tag.dts === undefined) {
                                            tag.pts = frame.timeStamp;
                                            tag.dts = frame.timeStamp;
                                        }
                                        this.trigger("timestamp", frame);
                                    }
                                }
                                tag.frames.push(frame);
                                frameStart += 10;
                                frameStart += frameSize;
                            } while (frameStart < tagSize);
                            this.trigger("data", tag);
                        };
                    };
                    MetadataStream.prototype = new Stream();
                    module.exports = MetadataStream;
                },
                { "11": 11, "31": 31 },
            ],
            11: [
                function (require, module, exports) {
                    "use strict";
                    module.exports = { H264_STREAM_TYPE: 0x1b, ADTS_STREAM_TYPE: 0x0f, METADATA_STREAM_TYPE: 0x15 };
                },
                {},
            ],
            12: [
                function (require, module, exports) {
                    "use strict";
                    var Stream = require(31);
                    var MAX_TS = 8589934592;
                    var RO_THRESH = 4294967296;
                    var TYPE_SHARED = "shared";
                    var handleRollover = function (value, reference) {
                        var direction = 1;
                        if (value > reference) {
                            direction = -1;
                        }
                        while (Math.abs(reference - value) > RO_THRESH) {
                            value += direction * MAX_TS;
                        }
                        return value;
                    };
                    var TimestampRolloverStream = function (type) {
                        var lastDTS, referenceDTS;
                        TimestampRolloverStream.prototype.init.call(this);
                        this.type_ = type || TYPE_SHARED;
                        this.push = function (data) {
                            if (this.type_ !== TYPE_SHARED && data.type !== this.type_) {
                                return;
                            }
                            if (referenceDTS === undefined) {
                                referenceDTS = data.dts;
                            }
                            data.dts = handleRollover(data.dts, referenceDTS);
                            data.pts = handleRollover(data.pts, referenceDTS);
                            lastDTS = data.dts;
                            this.trigger("data", data);
                        };
                        this.flush = function () {
                            referenceDTS = lastDTS;
                            this.trigger("done");
                        };
                        this.endTimeline = function () {
                            this.flush();
                            this.trigger("endedtimeline");
                        };
                        this.discontinuity = function () {
                            referenceDTS = void 0;
                            lastDTS = void 0;
                        };
                        this.reset = function () {
                            this.discontinuity();
                            this.trigger("reset");
                        };
                    };
                    TimestampRolloverStream.prototype = new Stream();
                    module.exports = { TimestampRolloverStream: TimestampRolloverStream, handleRollover: handleRollover };
                },
                { "31": 31 },
            ],
            13: [
                function (require, module, exports) {
                    var coneOfSilence = require(7);
                    var clock = require(29);
                    var sumFrameByteLengths = function (array) {
                        var i,
                            currentObj,
                            sum = 0;
                        for (i = 0; i < array.length; i++) {
                            currentObj = array[i];
                            sum += currentObj.data.byteLength;
                        }
                        return sum;
                    };
                    var prefixWithSilence = function (track, frames, audioAppendStartTs, videoBaseMediaDecodeTime) {
                        var baseMediaDecodeTimeTs,
                            frameDuration = 0,
                            audioGapDuration = 0,
                            audioFillFrameCount = 0,
                            audioFillDuration = 0,
                            silentFrame,
                            i,
                            firstFrame;
                        if (!frames.length) {
                            return;
                        }
                        baseMediaDecodeTimeTs = clock.audioTsToVideoTs(track.baseMediaDecodeTime, track.samplerate);
                        frameDuration = Math.ceil(clock.ONE_SECOND_IN_TS / (track.samplerate / 1024));
                        if (audioAppendStartTs && videoBaseMediaDecodeTime) {
                            audioGapDuration = baseMediaDecodeTimeTs - Math.max(audioAppendStartTs, videoBaseMediaDecodeTime);
                            audioFillFrameCount = Math.floor(audioGapDuration / frameDuration);
                            audioFillDuration = audioFillFrameCount * frameDuration;
                        }
                        if (audioFillFrameCount < 1 || audioFillDuration > clock.ONE_SECOND_IN_TS / 2) {
                            return;
                        }
                        silentFrame = coneOfSilence()[track.samplerate];
                        if (!silentFrame) {
                            silentFrame = frames[0].data;
                        }
                        for (i = 0; i < audioFillFrameCount; i++) {
                            firstFrame = frames[0];
                            frames.splice(0, 0, { data: silentFrame, dts: firstFrame.dts - frameDuration, pts: firstFrame.pts - frameDuration });
                        }
                        track.baseMediaDecodeTime -= Math.floor(clock.videoTsToAudioTs(audioFillDuration, track.samplerate));
                    };
                    var trimAdtsFramesByEarliestDts = function (adtsFrames, track, earliestAllowedDts) {
                        if (track.minSegmentDts >= earliestAllowedDts) {
                            return adtsFrames;
                        }
                        track.minSegmentDts = Infinity;
                        return adtsFrames.filter(function (currentFrame) {
                            if (currentFrame.dts >= earliestAllowedDts) {
                                track.minSegmentDts = Math.min(track.minSegmentDts, currentFrame.dts);
                                track.minSegmentPts = track.minSegmentDts;
                                return true;
                            }
                            return false;
                        });
                    };
                    var generateSampleTable = function (frames) {
                        var i,
                            currentFrame,
                            samples = [];
                        for (i = 0; i < frames.length; i++) {
                            currentFrame = frames[i];
                            samples.push({ size: currentFrame.data.byteLength, duration: 1024 });
                        }
                        return samples;
                    };
                    var concatenateFrameData = function (frames) {
                        var i,
                            currentFrame,
                            dataOffset = 0,
                            data = new Uint8Array(sumFrameByteLengths(frames));
                        for (i = 0; i < frames.length; i++) {
                            currentFrame = frames[i];
                            data.set(currentFrame.data, dataOffset);
                            dataOffset += currentFrame.data.byteLength;
                        }
                        return data;
                    };
                    module.exports = { prefixWithSilence: prefixWithSilence, trimAdtsFramesByEarliestDts: trimAdtsFramesByEarliestDts, generateSampleTable: generateSampleTable, concatenateFrameData: concatenateFrameData };
                },
                { "29": 29, "7": 7 },
            ],
            14: [
                function (require, module, exports) {
                    "use strict";
                    var discardEmulationPreventionBytes = require(23).discardEmulationPreventionBytes;
                    var CaptionStream = require(8).CaptionStream;
                    var findBox = require(15);
                    var parseTfdt = require(25);
                    var parseTrun = require(27);
                    var parseTfhd = require(26);
                    var mapToSample = function (offset, samples) {
                        var approximateOffset = offset;
                        for (var i = 0; i < samples.length; i++) {
                            var sample = samples[i];
                            if (approximateOffset < sample.size) {
                                return sample;
                            }
                            approximateOffset -= sample.size;
                        }
                        return null;
                    };
                    var findSeiNals = function (avcStream, samples, trackId) {
                        var avcView = new DataView(avcStream.buffer, avcStream.byteOffset, avcStream.byteLength),
                            result = [],
                            seiNal,
                            i,
                            length,
                            lastMatchedSample;
                        for (i = 0; i + 4 < avcStream.length; i += length) {
                            length = avcView.getUint32(i);
                            i += 4;
                            if (length <= 0) {
                                continue;
                            }
                            switch (avcStream[i] & 0x1f) {
                                case 0x06:
                                    var data = avcStream.subarray(i + 1, i + 1 + length);
                                    var matchingSample = mapToSample(i, samples);
                                    seiNal = { nalUnitType: "sei_rbsp", size: length, data: data, escapedRBSP: discardEmulationPreventionBytes(data), trackId: trackId };
                                    if (matchingSample) {
                                        seiNal.pts = matchingSample.pts;
                                        seiNal.dts = matchingSample.dts;
                                        lastMatchedSample = matchingSample;
                                    } else if (lastMatchedSample) {
                                        seiNal.pts = lastMatchedSample.pts;
                                        seiNal.dts = lastMatchedSample.dts;
                                    } else {
                                        console.log("We've encountered a nal unit without data. See mux.js#233.");
                                        break;
                                    }
                                    result.push(seiNal);
                                    break;
                                default:
                                    break;
                            }
                        }
                        return result;
                    };
                    var parseSamples = function (truns, baseMediaDecodeTime, tfhd) {
                        var currentDts = baseMediaDecodeTime;
                        var defaultSampleDuration = tfhd.defaultSampleDuration || 0;
                        var defaultSampleSize = tfhd.defaultSampleSize || 0;
                        var trackId = tfhd.trackId;
                        var allSamples = [];
                        truns.forEach(function (trun) {
                            var trackRun = parseTrun(trun);
                            var samples = trackRun.samples;
                            samples.forEach(function (sample) {
                                if (sample.duration === undefined) {
                                    sample.duration = defaultSampleDuration;
                                }
                                if (sample.size === undefined) {
                                    sample.size = defaultSampleSize;
                                }
                                sample.trackId = trackId;
                                sample.dts = currentDts;
                                if (sample.compositionTimeOffset === undefined) {
                                    sample.compositionTimeOffset = 0;
                                }
                                sample.pts = currentDts + sample.compositionTimeOffset;
                                currentDts += sample.duration;
                            });
                            allSamples = allSamples.concat(samples);
                        });
                        return allSamples;
                    };
                    var parseCaptionNals = function (segment, videoTrackId) {
                        var trafs = findBox(segment, ["moof", "traf"]);
                        var mdats = findBox(segment, ["mdat"]);
                        var captionNals = {};
                        var mdatTrafPairs = [];
                        mdats.forEach(function (mdat, index) {
                            var matchingTraf = trafs[index];
                            mdatTrafPairs.push({ mdat: mdat, traf: matchingTraf });
                        });
                        mdatTrafPairs.forEach(function (pair) {
                            var mdat = pair.mdat;
                            var traf = pair.traf;
                            var tfhd = findBox(traf, ["tfhd"]);
                            var headerInfo = parseTfhd(tfhd[0]);
                            var trackId = headerInfo.trackId;
                            var tfdt = findBox(traf, ["tfdt"]);
                            var baseMediaDecodeTime = tfdt.length > 0 ? parseTfdt(tfdt[0]).baseMediaDecodeTime : 0;
                            var truns = findBox(traf, ["trun"]);
                            var samples;
                            var seiNals;
                            if (videoTrackId === trackId && truns.length > 0) {
                                samples = parseSamples(truns, baseMediaDecodeTime, headerInfo);
                                seiNals = findSeiNals(mdat, samples, trackId);
                                if (!captionNals[trackId]) {
                                    captionNals[trackId] = [];
                                }
                                captionNals[trackId] = captionNals[trackId].concat(seiNals);
                            }
                        });
                        return captionNals;
                    };
                    var parseEmbeddedCaptions = function (segment, trackId, timescale) {
                        var seiNals;
                        if (trackId === null) {
                            return null;
                        }
                        seiNals = parseCaptionNals(segment, trackId);
                        return { seiNals: seiNals[trackId], timescale: timescale };
                    };
                    var CaptionParser = function () {
                        var isInitialized = false;
                        var captionStream;
                        var segmentCache;
                        var trackId;
                        var timescale;
                        var parsedCaptions;
                        var parsingPartial;
                        this.isInitialized = function () {
                            return isInitialized;
                        };
                        this.init = function (options) {
                            captionStream = new CaptionStream();
                            isInitialized = true;
                            parsingPartial = options ? options.isPartial : false;
                            captionStream.on("data", function (event) {
                                event.startTime = event.startPts / timescale;
                                event.endTime = event.endPts / timescale;
                                parsedCaptions.captions.push(event);
                                parsedCaptions.captionStreams[event.stream] = true;
                            });
                        };
                        this.isNewInit = function (videoTrackIds, timescales) {
                            if ((videoTrackIds && videoTrackIds.length === 0) || (timescales && typeof timescales === "object" && Object.keys(timescales).length === 0)) {
                                return false;
                            }
                            return trackId !== videoTrackIds[0] || timescale !== timescales[trackId];
                        };
                        this.parse = function (segment, videoTrackIds, timescales) {
                            var parsedData;
                            if (!this.isInitialized()) {
                                return null;
                            } else if (!videoTrackIds || !timescales) {
                                return null;
                            } else if (this.isNewInit(videoTrackIds, timescales)) {
                                trackId = videoTrackIds[0];
                                timescale = timescales[trackId];
                            } else if (trackId === null || !timescale) {
                                segmentCache.push(segment);
                                return null;
                            }
                            while (segmentCache.length > 0) {
                                var cachedSegment = segmentCache.shift();
                                this.parse(cachedSegment, videoTrackIds, timescales);
                            }
                            parsedData = parseEmbeddedCaptions(segment, trackId, timescale);
                            if (parsedData === null || !parsedData.seiNals) {
                                return null;
                            }
                            this.pushNals(parsedData.seiNals);
                            this.flushStream();
                            return parsedCaptions;
                        };
                        this.pushNals = function (nals) {
                            if (!this.isInitialized() || !nals || nals.length === 0) {
                                return null;
                            }
                            nals.forEach(function (nal) {
                                captionStream.push(nal);
                            });
                        };
                        this.flushStream = function () {
                            if (!this.isInitialized()) {
                                return null;
                            }
                            if (!parsingPartial) {
                                captionStream.flush();
                            } else {
                                captionStream.partialFlush();
                            }
                        };
                        this.clearParsedCaptions = function () {
                            parsedCaptions.captions = [];
                            parsedCaptions.captionStreams = {};
                        };
                        this.resetCaptionStream = function () {
                            if (!this.isInitialized()) {
                                return null;
                            }
                            captionStream.reset();
                        };
                        this.clearAllCaptions = function () {
                            this.clearParsedCaptions();
                            this.resetCaptionStream();
                        };
                        this.reset = function () {
                            segmentCache = [];
                            trackId = null;
                            timescale = null;
                            if (!parsedCaptions) {
                                parsedCaptions = { captions: [], captionStreams: {} };
                            } else {
                                this.clearParsedCaptions();
                            }
                            this.resetCaptionStream();
                        };
                        this.reset();
                    };
                    module.exports = CaptionParser;
                },
                { "15": 15, "23": 23, "25": 25, "26": 26, "27": 27, "8": 8 },
            ],
            15: [
                function (require, module, exports) {
                    var toUnsigned = require(28).toUnsigned;
                    var parseType = require(19);
                    var findBox = function (data, path) {
                        var results = [],
                            i,
                            size,
                            type,
                            end,
                            subresults;
                        if (!path.length) {
                            return null;
                        }
                        for (i = 0; i < data.byteLength; ) {
                            size = toUnsigned((data[i] << 24) | (data[i + 1] << 16) | (data[i + 2] << 8) | data[i + 3]);
                            type = parseType(data.subarray(i + 4, i + 8));
                            end = size > 1 ? i + size : data.byteLength;
                            if (type === path[0]) {
                                if (path.length === 1) {
                                    results.push(data.subarray(i + 8, end));
                                } else {
                                    subresults = findBox(data.subarray(i + 8, end), path.slice(1));
                                    if (subresults.length) {
                                        results = results.concat(subresults);
                                    }
                                }
                            }
                            i = end;
                        }
                        return results;
                    };
                    module.exports = findBox;
                },
                { "19": 19, "28": 28 },
            ],
            16: [
                function (require, module, exports) {
                    var groupNalsIntoFrames = function (nalUnits) {
                        var i,
                            currentNal,
                            currentFrame = [],
                            frames = [];
                        frames.byteLength = 0;
                        frames.nalCount = 0;
                        frames.duration = 0;
                        currentFrame.byteLength = 0;
                        for (i = 0; i < nalUnits.length; i++) {
                            currentNal = nalUnits[i];
                            if (currentNal.nalUnitType === "access_unit_delimiter_rbsp") {
                                if (currentFrame.length) {
                                    currentFrame.duration = currentNal.dts - currentFrame.dts;
                                    frames.byteLength += currentFrame.byteLength;
                                    frames.nalCount += currentFrame.length;
                                    frames.duration += currentFrame.duration;
                                    frames.push(currentFrame);
                                }
                                currentFrame = [currentNal];
                                currentFrame.byteLength = currentNal.data.byteLength;
                                currentFrame.pts = currentNal.pts;
                                currentFrame.dts = currentNal.dts;
                            } else {
                                if (currentNal.nalUnitType === "slice_layer_without_partitioning_rbsp_idr") {
                                    currentFrame.keyFrame = true;
                                }
                                currentFrame.duration = currentNal.dts - currentFrame.dts;
                                currentFrame.byteLength += currentNal.data.byteLength;
                                currentFrame.push(currentNal);
                            }
                        }
                        if (frames.length && (!currentFrame.duration || currentFrame.duration <= 0)) {
                            currentFrame.duration = frames[frames.length - 1].duration;
                        }
                        frames.byteLength += currentFrame.byteLength;
                        frames.nalCount += currentFrame.length;
                        frames.duration += currentFrame.duration;
                        frames.push(currentFrame);
                        return frames;
                    };
                    var groupFramesIntoGops = function (frames) {
                        var i,
                            currentFrame,
                            currentGop = [],
                            gops = [];
                        currentGop.byteLength = 0;
                        currentGop.nalCount = 0;
                        currentGop.duration = 0;
                        currentGop.pts = frames[0].pts;
                        currentGop.dts = frames[0].dts;
                        gops.byteLength = 0;
                        gops.nalCount = 0;
                        gops.duration = 0;
                        gops.pts = frames[0].pts;
                        gops.dts = frames[0].dts;
                        for (i = 0; i < frames.length; i++) {
                            currentFrame = frames[i];
                            if (currentFrame.keyFrame) {
                                if (currentGop.length) {
                                    gops.push(currentGop);
                                    gops.byteLength += currentGop.byteLength;
                                    gops.nalCount += currentGop.nalCount;
                                    gops.duration += currentGop.duration;
                                }
                                currentGop = [currentFrame];
                                currentGop.nalCount = currentFrame.length;
                                currentGop.byteLength = currentFrame.byteLength;
                                currentGop.pts = currentFrame.pts;
                                currentGop.dts = currentFrame.dts;
                                currentGop.duration = currentFrame.duration;
                            } else {
                                currentGop.duration += currentFrame.duration;
                                currentGop.nalCount += currentFrame.length;
                                currentGop.byteLength += currentFrame.byteLength;
                                currentGop.push(currentFrame);
                            }
                        }
                        if (gops.length && currentGop.duration <= 0) {
                            currentGop.duration = gops[gops.length - 1].duration;
                        }
                        gops.byteLength += currentGop.byteLength;
                        gops.nalCount += currentGop.nalCount;
                        gops.duration += currentGop.duration;
                        gops.push(currentGop);
                        return gops;
                    };
                    var extendFirstKeyFrame = function (gops) {
                        var currentGop;
                        if (!gops[0][0].keyFrame && gops.length > 1) {
                            currentGop = gops.shift();
                            gops.byteLength -= currentGop.byteLength;
                            gops.nalCount -= currentGop.nalCount;
                            gops[0][0].dts = currentGop.dts;
                            gops[0][0].pts = currentGop.pts;
                            gops[0][0].duration += currentGop.duration;
                        }
                        return gops;
                    };
                    var createDefaultSample = function () {
                        return { size: 0, flags: { isLeading: 0, dependsOn: 1, isDependedOn: 0, hasRedundancy: 0, degradationPriority: 0, isNonSyncSample: 1 } };
                    };
                    var sampleForFrame = function (frame, dataOffset) {
                        var sample = createDefaultSample();
                        sample.dataOffset = dataOffset;
                        sample.compositionTimeOffset = frame.pts - frame.dts;
                        sample.duration = frame.duration;
                        sample.size = 4 * frame.length;
                        sample.size += frame.byteLength;
                        if (frame.keyFrame) {
                            sample.flags.dependsOn = 2;
                            sample.flags.isNonSyncSample = 0;
                        }
                        return sample;
                    };
                    var generateSampleTable = function (gops, baseDataOffset) {
                        var h,
                            i,
                            sample,
                            currentGop,
                            currentFrame,
                            dataOffset = baseDataOffset || 0,
                            samples = [];
                        for (h = 0; h < gops.length; h++) {
                            currentGop = gops[h];
                            for (i = 0; i < currentGop.length; i++) {
                                currentFrame = currentGop[i];
                                sample = sampleForFrame(currentFrame, dataOffset);
                                dataOffset += sample.size;
                                samples.push(sample);
                            }
                        }
                        return samples;
                    };
                    var concatenateNalData = function (gops) {
                        var h,
                            i,
                            j,
                            currentGop,
                            currentFrame,
                            currentNal,
                            dataOffset = 0,
                            nalsByteLength = gops.byteLength,
                            numberOfNals = gops.nalCount,
                            totalByteLength = nalsByteLength + 4 * numberOfNals,
                            data = new Uint8Array(totalByteLength),
                            view = new DataView(data.buffer);
                        for (h = 0; h < gops.length; h++) {
                            currentGop = gops[h];
                            for (i = 0; i < currentGop.length; i++) {
                                currentFrame = currentGop[i];
                                for (j = 0; j < currentFrame.length; j++) {
                                    currentNal = currentFrame[j];
                                    view.setUint32(dataOffset, currentNal.data.byteLength);
                                    dataOffset += 4;
                                    data.set(currentNal.data, dataOffset);
                                    dataOffset += currentNal.data.byteLength;
                                }
                            }
                        }
                        return data;
                    };
                    var generateSampleTableForFrame = function (frame, baseDataOffset) {
                        var sample,
                            dataOffset = baseDataOffset || 0,
                            samples = [];
                        sample = sampleForFrame(frame, dataOffset);
                        samples.push(sample);
                        return samples;
                    };
                    var concatenateNalDataForFrame = function (frame) {
                        var i,
                            currentNal,
                            dataOffset = 0,
                            nalsByteLength = frame.byteLength,
                            numberOfNals = frame.length,
                            totalByteLength = nalsByteLength + 4 * numberOfNals,
                            data = new Uint8Array(totalByteLength),
                            view = new DataView(data.buffer);
                        for (i = 0; i < frame.length; i++) {
                            currentNal = frame[i];
                            view.setUint32(dataOffset, currentNal.data.byteLength);
                            dataOffset += 4;
                            data.set(currentNal.data, dataOffset);
                            dataOffset += currentNal.data.byteLength;
                        }
                        return data;
                    };
                    module.exports = {
                        groupNalsIntoFrames: groupNalsIntoFrames,
                        groupFramesIntoGops: groupFramesIntoGops,
                        extendFirstKeyFrame: extendFirstKeyFrame,
                        generateSampleTable: generateSampleTable,
                        concatenateNalData: concatenateNalData,
                        generateSampleTableForFrame: generateSampleTableForFrame,
                        concatenateNalDataForFrame: concatenateNalDataForFrame,
                    };
                },
                {},
            ],
            17: [
                function (require, module, exports) {
                    module.exports = { generator: require(18), probe: require(20), Transmuxer: require(22).Transmuxer, AudioSegmentStream: require(22).AudioSegmentStream, VideoSegmentStream: require(22).VideoSegmentStream, CaptionParser: require(14) };
                },
                { "14": 14, "18": 18, "20": 20, "22": 22 },
            ],
            18: [
                function (require, module, exports) {
                    "use strict";
                    var UINT32_MAX = Math.pow(2, 32) - 1;
                    var box, dinf, esds, ftyp, mdat, mfhd, minf, moof, moov, mvex, mvhd, trak, tkhd, mdia, mdhd, hdlr, sdtp, stbl, stsd, traf, trex, trun, types, MAJOR_BRAND, MINOR_VERSION, AVC1_BRAND, VIDEO_HDLR, AUDIO_HDLR, HDLR_TYPES, VMHD, SMHD, DREF, STCO, STSC, STSZ, STTS;
                    var customDuration = 0xffffffff;
                    (function () {
                        var i;
                        types = {
                            avc1: [],
                            avcC: [],
                            btrt: [],
                            dinf: [],
                            dref: [],
                            esds: [],
                            ftyp: [],
                            hdlr: [],
                            mdat: [],
                            mdhd: [],
                            mdia: [],
                            mfhd: [],
                            minf: [],
                            moof: [],
                            moov: [],
                            mp4a: [],
                            mvex: [],
                            mvhd: [],
                            pasp: [],
                            sdtp: [],
                            smhd: [],
                            stbl: [],
                            stco: [],
                            stsc: [],
                            stsd: [],
                            stsz: [],
                            stts: [],
                            styp: [],
                            tfdt: [],
                            tfhd: [],
                            traf: [],
                            trak: [],
                            trun: [],
                            trex: [],
                            tkhd: [],
                            vmhd: [],
                        };
                        if (typeof Uint8Array === "undefined") {
                            return;
                        }
                        for (i in types) {
                            if (types.hasOwnProperty(i)) {
                                types[i] = [i.charCodeAt(0), i.charCodeAt(1), i.charCodeAt(2), i.charCodeAt(3)];
                            }
                        }
                        MAJOR_BRAND = new Uint8Array(["i".charCodeAt(0), "s".charCodeAt(0), "o".charCodeAt(0), "m".charCodeAt(0)]);
                        AVC1_BRAND = new Uint8Array(["a".charCodeAt(0), "v".charCodeAt(0), "c".charCodeAt(0), "1".charCodeAt(0)]);
                        MINOR_VERSION = new Uint8Array([0, 0, 0, 1]);
                        VIDEO_HDLR = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x76, 0x69, 0x64, 0x65, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x56, 0x69, 0x64, 0x65, 0x6f, 0x48, 0x61, 0x6e, 0x64, 0x6c, 0x65, 0x72, 0x00]);
                        AUDIO_HDLR = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x73, 0x6f, 0x75, 0x6e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x53, 0x6f, 0x75, 0x6e, 0x64, 0x48, 0x61, 0x6e, 0x64, 0x6c, 0x65, 0x72, 0x00]);
                        HDLR_TYPES = { video: VIDEO_HDLR, audio: AUDIO_HDLR };
                        DREF = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x0c, 0x75, 0x72, 0x6c, 0x20, 0x00, 0x00, 0x00, 0x01]);
                        SMHD = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
                        STCO = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
                        STSC = STCO;
                        STSZ = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
                        STTS = STCO;
                        VMHD = new Uint8Array([0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
                    })();
                    box = function (type) {
                        var payload = [],
                            size = 0,
                            i,
                            result,
                            view;
                        for (i = 1; i < arguments.length; i++) {
                            payload.push(arguments[i]);
                        }
                        i = payload.length;
                        while (i--) {
                            size += payload[i].byteLength;
                        }
                        result = new Uint8Array(size + 8);
                        view = new DataView(result.buffer, result.byteOffset, result.byteLength);
                        view.setUint32(0, result.byteLength);
                        result.set(type, 4);
                        for (i = 0, size = 8; i < payload.length; i++) {
                            result.set(payload[i], size);
                            size += payload[i].byteLength;
                        }
                        return result;
                    };
                    dinf = function () {
                        return box(types.dinf, box(types.dref, DREF));
                    };
                    esds = function (track) {
                        return box(
                            types.esds,
                            new Uint8Array([
                                0x00,
                                0x00,
                                0x00,
                                0x00,
                                0x03,
                                0x19,
                                0x00,
                                0x00,
                                0x00,
                                0x04,
                                0x11,
                                0x40,
                                0x15,
                                0x00,
                                0x06,
                                0x00,
                                0x00,
                                0x00,
                                0xda,
                                0xc0,
                                0x00,
                                0x00,
                                0xda,
                                0xc0,
                                0x05,
                                0x02,
                                (track.audioobjecttype << 3) | (track.samplingfrequencyindex >>> 1),
                                (track.samplingfrequencyindex << 7) | (track.channelcount << 3),
                                0x06,
                                0x01,
                                0x02,
                            ]),
                        );
                    };
                    ftyp = function () {
                        return box(types.ftyp, MAJOR_BRAND, MINOR_VERSION, MAJOR_BRAND, AVC1_BRAND);
                    };
                    hdlr = function (type) {
                        return box(types.hdlr, HDLR_TYPES[type]);
                    };
                    mdat = function (data) {
                        return box(types.mdat, data);
                    };
                    mdhd = function (track) {
                        var result = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00, 0x03, 0x00, 0x01, 0x5f, 0x90, (track.duration >>> 24) & 0xff, (track.duration >>> 16) & 0xff, (track.duration >>> 8) & 0xff, track.duration & 0xff, 0x55, 0xc4, 0x00, 0x00]);
                        if (track.samplerate) {
                            result[12] = (track.samplerate >>> 24) & 0xff;
                            result[13] = (track.samplerate >>> 16) & 0xff;
                            result[14] = (track.samplerate >>> 8) & 0xff;
                            result[15] = track.samplerate & 0xff;
                            track.duration = (track.duration / 90000) * track.samplerate;
                            result[16] = (track.duration >>> 24) & 0xff;
                            result[17] = (track.duration >>> 16) & 0xff;
                            result[18] = (track.duration >>> 8) & 0xff;
                            result[19] = track.duration & 0xff;
                        }
                        return box(types.mdhd, result);
                    };
                    mdia = function (track) {
                        return box(types.mdia, mdhd(track), hdlr(track.type), minf(track));
                    };
                    mfhd = function (sequenceNumber) {
                        return box(types.mfhd, new Uint8Array([0x00, 0x00, 0x00, 0x00, (sequenceNumber & 0xff000000) >> 24, (sequenceNumber & 0xff0000) >> 16, (sequenceNumber & 0xff00) >> 8, sequenceNumber & 0xff]));
                    };
                    minf = function (track) {
                        return box(types.minf, track.type === "video" ? box(types.vmhd, VMHD) : box(types.smhd, SMHD), dinf(), stbl(track));
                    };
                    moof = function (sequenceNumber, tracks) {
                        var trackFragments = [],
                            i = tracks.length;
                        while (i--) {
                            trackFragments[i] = traf(tracks[i]);
                        }
                        return box.apply(null, [types.moof, mfhd(sequenceNumber)].concat(trackFragments));
                    };
                    moov = function (tracks) {
                        var i = tracks.length,
                            boxes = [];
                        while (i--) {
                            boxes[i] = trak(tracks[i]);
                        }
                        return box.apply(null, [types.moov, mvhd(customDuration)].concat(boxes).concat(mvex(tracks)));
                    };
                    mvex = function (tracks) {
                        var i = tracks.length,
                            boxes = [];
                        while (i--) {
                            boxes[i] = trex(tracks[i]);
                        }
                        return box.apply(null, [types.mvex].concat(boxes));
                    };
                    mvhd = function (duration) {
                        var bytes = new Uint8Array([
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x01,
                            0x00,
                            0x00,
                            0x00,
                            0x02,
                            0x00,
                            0x01,
                            0x5f,
                            0x90,
                            (duration & 0xff000000) >> 24,
                            (duration & 0xff0000) >> 16,
                            (duration & 0xff00) >> 8,
                            duration & 0xff,
                            0x00,
                            0x01,
                            0x00,
                            0x00,
                            0x01,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x01,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x01,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x40,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0xff,
                            0xff,
                            0xff,
                            0xff,
                        ]);
                        return box(types.mvhd, bytes);
                    };
                    sdtp = function (track) {
                        var samples = track.samples || [],
                            bytes = new Uint8Array(4 + samples.length),
                            flags,
                            i;
                        for (i = 0; i < samples.length; i++) {
                            flags = samples[i].flags;
                            bytes[i + 4] = (flags.dependsOn << 4) | (flags.isDependedOn << 2) | flags.hasRedundancy;
                        }
                        return box(types.sdtp, bytes);
                    };
                    stbl = function (track) {
                        return box(types.stbl, stsd(track), box(types.stts, STTS), box(types.stsc, STSC), box(types.stsz, STSZ), box(types.stco, STCO));
                    };
                    (function () {
                        var videoSample, audioSample;
                        stsd = function (track) {
                            return box(types.stsd, new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01]), track.type === "video" ? videoSample(track) : audioSample(track));
                        };
                        videoSample = function (track) {
                            var sps = track.sps || [],
                                pps = track.pps || [],
                                sequenceParameterSets = [],
                                pictureParameterSets = [],
                                i,
                                avc1Box;
                            for (i = 0; i < sps.length; i++) {
                                sequenceParameterSets.push((sps[i].byteLength & 0xff00) >>> 8);
                                sequenceParameterSets.push(sps[i].byteLength & 0xff);
                                sequenceParameterSets = sequenceParameterSets.concat(Array.prototype.slice.call(sps[i]));
                            }
                            for (i = 0; i < pps.length; i++) {
                                pictureParameterSets.push((pps[i].byteLength & 0xff00) >>> 8);
                                pictureParameterSets.push(pps[i].byteLength & 0xff);
                                pictureParameterSets = pictureParameterSets.concat(Array.prototype.slice.call(pps[i]));
                            }
                            avc1Box = [
                                types.avc1,
                                new Uint8Array([
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x01,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    (track.width & 0xff00) >> 8,
                                    track.width & 0xff,
                                    (track.height & 0xff00) >> 8,
                                    track.height & 0xff,
                                    0x00,
                                    0x48,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x48,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x01,
                                    0x13,
                                    0x76,
                                    0x69,
                                    0x64,
                                    0x65,
                                    0x6f,
                                    0x6a,
                                    0x73,
                                    0x2d,
                                    0x63,
                                    0x6f,
                                    0x6e,
                                    0x74,
                                    0x72,
                                    0x69,
                                    0x62,
                                    0x2d,
                                    0x68,
                                    0x6c,
                                    0x73,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x18,
                                    0x11,
                                    0x11,
                                ]),
                                box(types.avcC, new Uint8Array([0x01, track.profileIdc, track.profileCompatibility, track.levelIdc, 0xff].concat([sps.length], sequenceParameterSets, [pps.length], pictureParameterSets))),
                                box(types.btrt, new Uint8Array([0x00, 0x1c, 0x9c, 0x80, 0x00, 0x2d, 0xc6, 0xc0, 0x00, 0x2d, 0xc6, 0xc0])),
                            ];
                            if (track.sarRatio) {
                                var hSpacing = track.sarRatio[0],
                                    vSpacing = track.sarRatio[1];
                                avc1Box.push(box(types.pasp, new Uint8Array([(hSpacing & 0xff000000) >> 24, (hSpacing & 0xff0000) >> 16, (hSpacing & 0xff00) >> 8, hSpacing & 0xff, (vSpacing & 0xff000000) >> 24, (vSpacing & 0xff0000) >> 16, (vSpacing & 0xff00) >> 8, vSpacing & 0xff])));
                            }
                            return box.apply(null, avc1Box);
                        };
                        audioSample = function (track) {
                            return box(
                                types.mp4a,
                                new Uint8Array([
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x01,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    (track.channelcount & 0xff00) >> 8,
                                    track.channelcount & 0xff,
                                    (track.samplesize & 0xff00) >> 8,
                                    track.samplesize & 0xff,
                                    0x00,
                                    0x00,
                                    0x00,
                                    0x00,
                                    (track.samplerate & 0xff00) >> 8,
                                    track.samplerate & 0xff,
                                    0x00,
                                    0x00,
                                ]),
                                esds(track),
                            );
                        };
                    })();
                    tkhd = function (track) {
                        var result = new Uint8Array([
                            0x00,
                            0x00,
                            0x00,
                            0x07,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            (track.id & 0xff000000) >> 24,
                            (track.id & 0xff0000) >> 16,
                            (track.id & 0xff00) >> 8,
                            track.id & 0xff,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            (track.duration & 0xff000000) >> 24,
                            (track.duration & 0xff0000) >> 16,
                            (track.duration & 0xff00) >> 8,
                            track.duration & 0xff,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x01,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x01,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x01,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x00,
                            0x40,
                            0x00,
                            0x00,
                            0x00,
                            (track.width & 0xff00) >> 8,
                            track.width & 0xff,
                            0x00,
                            0x00,
                            (track.height & 0xff00) >> 8,
                            track.height & 0xff,
                            0x00,
                            0x00,
                        ]);
                        return box(types.tkhd, result);
                    };
                    traf = function (track) {
                        var trackFragmentHeader, trackFragmentDecodeTime, trackFragmentRun, sampleDependencyTable, dataOffset, upperWordBaseMediaDecodeTime, lowerWordBaseMediaDecodeTime;
                        trackFragmentHeader = box(types.tfhd, new Uint8Array([0x00, 0x00, 0x00, 0x3a, (track.id & 0xff000000) >> 24, (track.id & 0xff0000) >> 16, (track.id & 0xff00) >> 8, track.id & 0xff, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]));
                        upperWordBaseMediaDecodeTime = Math.floor(track.baseMediaDecodeTime / (UINT32_MAX + 1));
                        lowerWordBaseMediaDecodeTime = Math.floor(track.baseMediaDecodeTime % (UINT32_MAX + 1));
                        trackFragmentDecodeTime = box(
                            types.tfdt,
                            new Uint8Array([
                                0x01,
                                0x00,
                                0x00,
                                0x00,
                                (upperWordBaseMediaDecodeTime >>> 24) & 0xff,
                                (upperWordBaseMediaDecodeTime >>> 16) & 0xff,
                                (upperWordBaseMediaDecodeTime >>> 8) & 0xff,
                                upperWordBaseMediaDecodeTime & 0xff,
                                (lowerWordBaseMediaDecodeTime >>> 24) & 0xff,
                                (lowerWordBaseMediaDecodeTime >>> 16) & 0xff,
                                (lowerWordBaseMediaDecodeTime >>> 8) & 0xff,
                                lowerWordBaseMediaDecodeTime & 0xff,
                            ]),
                        );
                        dataOffset = 32 + 20 + 8 + 16 + 8 + 8;
                        if (track.type === "audio") {
                            trackFragmentRun = trun(track, dataOffset);
                            return box(types.traf, trackFragmentHeader, trackFragmentDecodeTime, trackFragmentRun);
                        }
                        sampleDependencyTable = sdtp(track);
                        trackFragmentRun = trun(track, sampleDependencyTable.length + dataOffset);
                        return box(types.traf, trackFragmentHeader, trackFragmentDecodeTime, trackFragmentRun, sampleDependencyTable);
                    };
                    trak = function (track) {
                        track.duration = track.duration || customDuration;
                        return box(types.trak, tkhd(track), mdia(track));
                    };
                    trex = function (track) {
                        var result = new Uint8Array([0x00, 0x00, 0x00, 0x00, (track.id & 0xff000000) >> 24, (track.id & 0xff0000) >> 16, (track.id & 0xff00) >> 8, track.id & 0xff, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01]);
                        if (track.type !== "video") {
                            result[result.length - 1] = 0x00;
                        }
                        return box(types.trex, result);
                    };
                    (function () {
                        var audioTrun, videoTrun, trunHeader;
                        trunHeader = function (samples, offset) {
                            var durationPresent = 0,
                                sizePresent = 0,
                                flagsPresent = 0,
                                compositionTimeOffset = 0;
                            if (samples.length) {
                                if (samples[0].duration !== undefined) {
                                    durationPresent = 0x1;
                                }
                                if (samples[0].size !== undefined) {
                                    sizePresent = 0x2;
                                }
                                if (samples[0].flags !== undefined) {
                                    flagsPresent = 0x4;
                                }
                                if (samples[0].compositionTimeOffset !== undefined) {
                                    compositionTimeOffset = 0x8;
                                }
                            }
                            return [
                                0x00,
                                0x00,
                                durationPresent | sizePresent | flagsPresent | compositionTimeOffset,
                                0x01,
                                (samples.length & 0xff000000) >>> 24,
                                (samples.length & 0xff0000) >>> 16,
                                (samples.length & 0xff00) >>> 8,
                                samples.length & 0xff,
                                (offset & 0xff000000) >>> 24,
                                (offset & 0xff0000) >>> 16,
                                (offset & 0xff00) >>> 8,
                                offset & 0xff,
                            ];
                        };
                        videoTrun = function (track, offset) {
                            var bytesOffest, bytes, header, samples, sample, i;
                            samples = track.samples || [];
                            offset += 8 + 12 + 16 * samples.length;
                            header = trunHeader(samples, offset);
                            bytes = new Uint8Array(header.length + samples.length * 16);
                            bytes.set(header);
                            bytesOffest = header.length;
                            for (i = 0; i < samples.length; i++) {
                                sample = samples[i];
                                bytes[bytesOffest++] = (sample.duration & 0xff000000) >>> 24;
                                bytes[bytesOffest++] = (sample.duration & 0xff0000) >>> 16;
                                bytes[bytesOffest++] = (sample.duration & 0xff00) >>> 8;
                                bytes[bytesOffest++] = sample.duration & 0xff;
                                bytes[bytesOffest++] = (sample.size & 0xff000000) >>> 24;
                                bytes[bytesOffest++] = (sample.size & 0xff0000) >>> 16;
                                bytes[bytesOffest++] = (sample.size & 0xff00) >>> 8;
                                bytes[bytesOffest++] = sample.size & 0xff;
                                bytes[bytesOffest++] = (sample.flags.isLeading << 2) | sample.flags.dependsOn;
                                bytes[bytesOffest++] = (sample.flags.isDependedOn << 6) | (sample.flags.hasRedundancy << 4) | (sample.flags.paddingValue << 1) | sample.flags.isNonSyncSample;
                                bytes[bytesOffest++] = sample.flags.degradationPriority & (0xf0 << 8);
                                bytes[bytesOffest++] = sample.flags.degradationPriority & 0x0f;
                                bytes[bytesOffest++] = (sample.compositionTimeOffset & 0xff000000) >>> 24;
                                bytes[bytesOffest++] = (sample.compositionTimeOffset & 0xff0000) >>> 16;
                                bytes[bytesOffest++] = (sample.compositionTimeOffset & 0xff00) >>> 8;
                                bytes[bytesOffest++] = sample.compositionTimeOffset & 0xff;
                            }
                            return box(types.trun, bytes);
                        };
                        audioTrun = function (track, offset) {
                            var bytes, bytesOffest, header, samples, sample, i;
                            samples = track.samples || [];
                            offset += 8 + 12 + 8 * samples.length;
                            header = trunHeader(samples, offset);
                            bytes = new Uint8Array(header.length + samples.length * 8);
                            bytes.set(header);
                            bytesOffest = header.length;
                            for (i = 0; i < samples.length; i++) {
                                sample = samples[i];
                                bytes[bytesOffest++] = (sample.duration & 0xff000000) >>> 24;
                                bytes[bytesOffest++] = (sample.duration & 0xff0000) >>> 16;
                                bytes[bytesOffest++] = (sample.duration & 0xff00) >>> 8;
                                bytes[bytesOffest++] = sample.duration & 0xff;
                                bytes[bytesOffest++] = (sample.size & 0xff000000) >>> 24;
                                bytes[bytesOffest++] = (sample.size & 0xff0000) >>> 16;
                                bytes[bytesOffest++] = (sample.size & 0xff00) >>> 8;
                                bytes[bytesOffest++] = sample.size & 0xff;
                            }
                            return box(types.trun, bytes);
                        };
                        trun = function (track, offset) {
                            if (track.type === "audio") {
                                return audioTrun(track, offset);
                            }
                            return videoTrun(track, offset);
                        };
                    })();
                    module.exports = {
                        ftyp: ftyp,
                        mdat: mdat,
                        moof: moof,
                        moov: moov,
                        setDuration: function (duration) {
                            if (duration) {
                                customDuration = duration * 90000;
                            }
                        },
                        initSegment: function (tracks) {
                            var fileType = ftyp(),
                                movie = moov(tracks),
                                result;
                            result = new Uint8Array(fileType.byteLength + movie.byteLength);
                            result.set(fileType);
                            result.set(movie, fileType.byteLength);
                            return result;
                        },
                    };
                },
                {},
            ],
            19: [
                function (require, module, exports) {
                    var parseType = function (buffer) {
                        var result = "";
                        result += String.fromCharCode(buffer[0]);
                        result += String.fromCharCode(buffer[1]);
                        result += String.fromCharCode(buffer[2]);
                        result += String.fromCharCode(buffer[3]);
                        return result;
                    };
                    module.exports = parseType;
                },
                {},
            ],
            20: [
                function (require, module, exports) {
                    "use strict";
                    var toUnsigned = require(28).toUnsigned;
                    var toHexString = require(28).toHexString;
                    var findBox = require(15);
                    var parseType = require(19);
                    var parseTfhd = require(26);
                    var parseTrun = require(27);
                    var parseTfdt = require(25);
                    var timescale, startTime, compositionStartTime, getVideoTrackIds, getTracks, getTimescaleFromMediaHeader;
                    timescale = function (init) {
                        var result = {},
                            traks = findBox(init, ["moov", "trak"]);
                        return traks.reduce(function (result, trak) {
                            var tkhd, version, index, id, mdhd;
                            tkhd = findBox(trak, ["tkhd"])[0];
                            if (!tkhd) {
                                return null;
                            }
                            version = tkhd[0];
                            index = version === 0 ? 12 : 20;
                            id = toUnsigned((tkhd[index] << 24) | (tkhd[index + 1] << 16) | (tkhd[index + 2] << 8) | tkhd[index + 3]);
                            mdhd = findBox(trak, ["mdia", "mdhd"])[0];
                            if (!mdhd) {
                                return null;
                            }
                            version = mdhd[0];
                            index = version === 0 ? 12 : 20;
                            result[id] = toUnsigned((mdhd[index] << 24) | (mdhd[index + 1] << 16) | (mdhd[index + 2] << 8) | mdhd[index + 3]);
                            return result;
                        }, result);
                    };
                    startTime = function (timescale, fragment) {
                        var trafs, baseTimes, result;
                        trafs = findBox(fragment, ["moof", "traf"]);
                        baseTimes = [].concat.apply(
                            [],
                            trafs.map(function (traf) {
                                return findBox(traf, ["tfhd"]).map(function (tfhd) {
                                    var id, scale, baseTime;
                                    id = toUnsigned((tfhd[4] << 24) | (tfhd[5] << 16) | (tfhd[6] << 8) | tfhd[7]);
                                    scale = timescale[id] || 90e3;
                                    baseTime = findBox(traf, ["tfdt"]).map(function (tfdt) {
                                        var version, result;
                                        version = tfdt[0];
                                        result = toUnsigned((tfdt[4] << 24) | (tfdt[5] << 16) | (tfdt[6] << 8) | tfdt[7]);
                                        if (version === 1) {
                                            result *= Math.pow(2, 32);
                                            result += toUnsigned((tfdt[8] << 24) | (tfdt[9] << 16) | (tfdt[10] << 8) | tfdt[11]);
                                        }
                                        return result;
                                    })[0];
                                    baseTime = baseTime || Infinity;
                                    return baseTime / scale;
                                });
                            }),
                        );
                        result = Math.min.apply(null, baseTimes);
                        return isFinite(result) ? result : 0;
                    };
                    compositionStartTime = function (timescales, fragment) {
                        var trafBoxes = findBox(fragment, ["moof", "traf"]);
                        var baseMediaDecodeTime = 0;
                        var compositionTimeOffset = 0;
                        var trackId;
                        if (trafBoxes && trafBoxes.length) {
                            var tfhd = findBox(trafBoxes[0], ["tfhd"])[0];
                            var trun = findBox(trafBoxes[0], ["trun"])[0];
                            var tfdt = findBox(trafBoxes[0], ["tfdt"])[0];
                            if (tfhd) {
                                var parsedTfhd = parseTfhd(tfhd);
                                trackId = parsedTfhd.trackId;
                            }
                            if (tfdt) {
                                var parsedTfdt = parseTfdt(tfdt);
                                baseMediaDecodeTime = parsedTfdt.baseMediaDecodeTime;
                            }
                            if (trun) {
                                var parsedTrun = parseTrun(trun);
                                if (parsedTrun.samples && parsedTrun.samples.length) {
                                    compositionTimeOffset = parsedTrun.samples[0].compositionTimeOffset || 0;
                                }
                            }
                        }
                        var timescale = timescales[trackId] || 90e3;
                        return (baseMediaDecodeTime + compositionTimeOffset) / timescale;
                    };
                    getVideoTrackIds = function (init) {
                        var traks = findBox(init, ["moov", "trak"]);
                        var videoTrackIds = [];
                        traks.forEach(function (trak) {
                            var hdlrs = findBox(trak, ["mdia", "hdlr"]);
                            var tkhds = findBox(trak, ["tkhd"]);
                            hdlrs.forEach(function (hdlr, index) {
                                var handlerType = parseType(hdlr.subarray(8, 12));
                                var tkhd = tkhds[index];
                                var view;
                                var version;
                                var trackId;
                                if (handlerType === "vide") {
                                    view = new DataView(tkhd.buffer, tkhd.byteOffset, tkhd.byteLength);
                                    version = view.getUint8(0);
                                    trackId = version === 0 ? view.getUint32(12) : view.getUint32(20);
                                    videoTrackIds.push(trackId);
                                }
                            });
                        });
                        return videoTrackIds;
                    };
                    getTimescaleFromMediaHeader = function (mdhd) {
                        var version = mdhd[0];
                        var index = version === 0 ? 12 : 20;
                        return toUnsigned((mdhd[index] << 24) | (mdhd[index + 1] << 16) | (mdhd[index + 2] << 8) | mdhd[index + 3]);
                    };
                    getTracks = function (init) {
                        var traks = findBox(init, ["moov", "trak"]);
                        var tracks = [];
                        traks.forEach(function (trak) {
                            var track = {};
                            var tkhd = findBox(trak, ["tkhd"])[0];
                            var view, tkhdVersion;
                            if (tkhd) {
                                view = new DataView(tkhd.buffer, tkhd.byteOffset, tkhd.byteLength);
                                tkhdVersion = view.getUint8(0);
                                track.id = tkhdVersion === 0 ? view.getUint32(12) : view.getUint32(20);
                            }
                            var hdlr = findBox(trak, ["mdia", "hdlr"])[0];
                            if (hdlr) {
                                var type = parseType(hdlr.subarray(8, 12));
                                if (type === "vide") {
                                    track.type = "video";
                                } else if (type === "soun") {
                                    track.type = "audio";
                                } else {
                                    track.type = type;
                                }
                            }
                            var stsd = findBox(trak, ["mdia", "minf", "stbl", "stsd"])[0];
                            if (stsd) {
                                var sampleDescriptions = stsd.subarray(8);
                                track.codec = parseType(sampleDescriptions.subarray(4, 8));
                                var codecBox = findBox(sampleDescriptions, [track.codec])[0];
                                var codecConfig, codecConfigType;
                                if (codecBox) {
                                    if (/^[a-z]vc[1-9]$/i.test(track.codec)) {
                                        codecConfig = codecBox.subarray(78);
                                        codecConfigType = parseType(codecConfig.subarray(4, 8));
                                        if (codecConfigType === "avcC" && codecConfig.length > 11) {
                                            track.codec += ".";
                                            track.codec += toHexString(codecConfig[9]);
                                            track.codec += toHexString(codecConfig[10]);
                                            track.codec += toHexString(codecConfig[11]);
                                        } else {
                                            track.codec = "avc1.4d400d";
                                        }
                                    } else if (/^mp4[a,v]$/i.test(track.codec)) {
                                        codecConfig = codecBox.subarray(28);
                                        codecConfigType = parseType(codecConfig.subarray(4, 8));
                                        if (codecConfigType === "esds" && codecConfig.length > 20 && codecConfig[19] !== 0) {
                                            track.codec += "." + toHexString(codecConfig[19]);
                                            track.codec += "." + toHexString((codecConfig[20] >>> 2) & 0x3f).replace(/^0/, "");
                                        } else {
                                            track.codec = "mp4a.40.2";
                                        }
                                    } else {
                                    }
                                }
                            }
                            var mdhd = findBox(trak, ["mdia", "mdhd"])[0];
                            if (mdhd) {
                                track.timescale = getTimescaleFromMediaHeader(mdhd);
                            }
                            tracks.push(track);
                        });
                        return tracks;
                    };
                    module.exports = { findBox: findBox, parseType: parseType, timescale: timescale, startTime: startTime, compositionStartTime: compositionStartTime, videoTrackIds: getVideoTrackIds, tracks: getTracks, getTimescaleFromMediaHeader: getTimescaleFromMediaHeader };
                },
                { "15": 15, "19": 19, "25": 25, "26": 26, "27": 27, "28": 28 },
            ],
            21: [
                function (require, module, exports) {
                    var ONE_SECOND_IN_TS = require(29).ONE_SECOND_IN_TS;
                    var collectDtsInfo = function (track, data) {
                        if (typeof data.pts === "number") {
                            if (track.timelineStartInfo.pts === undefined) {
                                track.timelineStartInfo.pts = data.pts;
                            }
                            if (track.minSegmentPts === undefined) {
                                track.minSegmentPts = data.pts;
                            } else {
                                track.minSegmentPts = Math.min(track.minSegmentPts, data.pts);
                            }
                            if (track.maxSegmentPts === undefined) {
                                track.maxSegmentPts = data.pts;
                            } else {
                                track.maxSegmentPts = Math.max(track.maxSegmentPts, data.pts);
                            }
                        }
                        if (typeof data.dts === "number") {
                            if (track.timelineStartInfo.dts === undefined) {
                                track.timelineStartInfo.dts = data.dts;
                            }
                            if (track.minSegmentDts === undefined) {
                                track.minSegmentDts = data.dts;
                            } else {
                                track.minSegmentDts = Math.min(track.minSegmentDts, data.dts);
                            }
                            if (track.maxSegmentDts === undefined) {
                                track.maxSegmentDts = data.dts;
                            } else {
                                track.maxSegmentDts = Math.max(track.maxSegmentDts, data.dts);
                            }
                        }
                    };
                    var clearDtsInfo = function (track) {
                        delete track.minSegmentDts;
                        delete track.maxSegmentDts;
                        delete track.minSegmentPts;
                        delete track.maxSegmentPts;
                    };
                    var calculateTrackBaseMediaDecodeTime = function (track, keepOriginalTimestamps) {
                        var baseMediaDecodeTime,
                            scale,
                            minSegmentDts = track.minSegmentDts;
                        if (!keepOriginalTimestamps) {
                            minSegmentDts -= track.timelineStartInfo.dts;
                        }
                        baseMediaDecodeTime = track.timelineStartInfo.baseMediaDecodeTime;
                        baseMediaDecodeTime += minSegmentDts;
                        baseMediaDecodeTime = Math.max(0, baseMediaDecodeTime);
                        if (track.type === "audio") {
                            scale = track.samplerate / ONE_SECOND_IN_TS;
                            baseMediaDecodeTime *= scale;
                            baseMediaDecodeTime = Math.floor(baseMediaDecodeTime);
                        }
                        return baseMediaDecodeTime;
                    };
                    module.exports = { clearDtsInfo: clearDtsInfo, calculateTrackBaseMediaDecodeTime: calculateTrackBaseMediaDecodeTime, collectDtsInfo: collectDtsInfo };
                },
                { "29": 29 },
            ],
            22: [
                function (require, module, exports) {
                    "use strict";
                    var Stream = require(31);
                    var mp4 = require(18);
                    var frameUtils = require(16);
                    var audioFrameUtils = require(13);
                    var trackDecodeInfo = require(21);
                    var m2ts = require(9);
                    var clock = require(29);
                    var AdtsStream = require(3);
                    var H264Stream = require(4).H264Stream;
                    var AacStream = require(1);
                    var isLikelyAacData = require(2).isLikelyAacData;
                    var ONE_SECOND_IN_TS = require(29).ONE_SECOND_IN_TS;
                    var AUDIO_PROPERTIES = require(5);
                    var VIDEO_PROPERTIES = require(6);
                    var VideoSegmentStream, AudioSegmentStream, Transmuxer, CoalesceStream;
                    var arrayEquals = function (a, b) {
                        var i;
                        if (a.length !== b.length) {
                            return false;
                        }
                        for (i = 0; i < a.length; i++) {
                            if (a[i] !== b[i]) {
                                return false;
                            }
                        }
                        return true;
                    };
                    var generateVideoSegmentTimingInfo = function (baseMediaDecodeTime, startDts, startPts, endDts, endPts, prependedContentDuration) {
                        var ptsOffsetFromDts = startPts - startDts,
                            decodeDuration = endDts - startDts,
                            presentationDuration = endPts - startPts;
                        return { start: { dts: baseMediaDecodeTime, pts: baseMediaDecodeTime + ptsOffsetFromDts }, end: { dts: baseMediaDecodeTime + decodeDuration, pts: baseMediaDecodeTime + presentationDuration }, prependedContentDuration: prependedContentDuration, baseMediaDecodeTime: baseMediaDecodeTime };
                    };
                    AudioSegmentStream = function (track, options) {
                        var adtsFrames = [],
                            sequenceNumber = 0,
                            earliestAllowedDts = 0,
                            audioAppendStartTs = 0,
                            videoBaseMediaDecodeTime = Infinity;
                        options = options || {};
                        AudioSegmentStream.prototype.init.call(this);
                        this.push = function (data) {
                            trackDecodeInfo.collectDtsInfo(track, data);
                            if (track) {
                                AUDIO_PROPERTIES.forEach(function (prop) {
                                    track[prop] = data[prop];
                                });
                            }
                            adtsFrames.push(data);
                        };
                        this.setEarliestDts = function (earliestDts) {
                            earliestAllowedDts = earliestDts;
                        };
                        this.setVideoBaseMediaDecodeTime = function (baseMediaDecodeTime) {
                            videoBaseMediaDecodeTime = baseMediaDecodeTime;
                        };
                        this.setAudioAppendStart = function (timestamp) {
                            audioAppendStartTs = timestamp;
                        };
                        this.flush = function () {
                            var frames, moof, mdat, boxes, frameDuration;
                            if (adtsFrames.length === 0) {
                                this.trigger("done", "AudioSegmentStream");
                                return;
                            }
                            frames = audioFrameUtils.trimAdtsFramesByEarliestDts(adtsFrames, track, earliestAllowedDts);
                            track.baseMediaDecodeTime = trackDecodeInfo.calculateTrackBaseMediaDecodeTime(track, options.keepOriginalTimestamps);
                            audioFrameUtils.prefixWithSilence(track, frames, audioAppendStartTs, videoBaseMediaDecodeTime);
                            track.samples = audioFrameUtils.generateSampleTable(frames);
                            mdat = mp4.mdat(audioFrameUtils.concatenateFrameData(frames));
                            adtsFrames = [];
                            moof = mp4.moof(sequenceNumber, [track]);
                            boxes = new Uint8Array(moof.byteLength + mdat.byteLength);
                            sequenceNumber++;
                            boxes.set(moof);
                            boxes.set(mdat, moof.byteLength);
                            trackDecodeInfo.clearDtsInfo(track);
                            frameDuration = Math.ceil((ONE_SECOND_IN_TS * 1024) / track.samplerate);
                            if (frames.length) {
                                this.trigger("timingInfo", { start: frames[0].pts, end: frames[0].pts + frames.length * frameDuration });
                            }
                            this.trigger("data", { track: track, boxes: boxes });
                            this.trigger("done", "AudioSegmentStream");
                        };
                        this.reset = function () {
                            trackDecodeInfo.clearDtsInfo(track);
                            adtsFrames = [];
                            this.trigger("reset");
                        };
                    };
                    AudioSegmentStream.prototype = new Stream();
                    VideoSegmentStream = function (track, options) {
                        var sequenceNumber = 0,
                            nalUnits = [],
                            gopsToAlignWith = [],
                            config,
                            pps;
                        options = options || {};
                        VideoSegmentStream.prototype.init.call(this);
                        delete track.minPTS;
                        this.gopCache_ = [];
                        this.push = function (nalUnit) {
                            trackDecodeInfo.collectDtsInfo(track, nalUnit);
                            if (nalUnit.nalUnitType === "seq_parameter_set_rbsp" && !config) {
                                config = nalUnit.config;
                                track.sps = [nalUnit.data];
                                VIDEO_PROPERTIES.forEach(function (prop) {
                                    track[prop] = config[prop];
                                }, this);
                            }
                            if (nalUnit.nalUnitType === "pic_parameter_set_rbsp" && !pps) {
                                pps = nalUnit.data;
                                track.pps = [nalUnit.data];
                            }
                            nalUnits.push(nalUnit);
                        };
                        this.flush = function () {
                            var frames,
                                gopForFusion,
                                gops,
                                moof,
                                mdat,
                                boxes,
                                prependedContentDuration = 0,
                                firstGop,
                                lastGop;
                            while (nalUnits.length) {
                                if (nalUnits[0].nalUnitType === "access_unit_delimiter_rbsp") {
                                    break;
                                }
                                nalUnits.shift();
                            }
                            if (nalUnits.length === 0) {
                                this.resetStream_();
                                this.trigger("done", "VideoSegmentStream");
                                return;
                            }
                            frames = frameUtils.groupNalsIntoFrames(nalUnits);
                            gops = frameUtils.groupFramesIntoGops(frames);
                            if (!gops[0][0].keyFrame) {
                                gopForFusion = this.getGopForFusion_(nalUnits[0], track);
                                if (gopForFusion) {
                                    prependedContentDuration = gopForFusion.duration;
                                    gops.unshift(gopForFusion);
                                    gops.byteLength += gopForFusion.byteLength;
                                    gops.nalCount += gopForFusion.nalCount;
                                    gops.pts = gopForFusion.pts;
                                    gops.dts = gopForFusion.dts;
                                    gops.duration += gopForFusion.duration;
                                } else {
                                    gops = frameUtils.extendFirstKeyFrame(gops);
                                }
                            }
                            if (gopsToAlignWith.length) {
                                var alignedGops;
                                if (options.alignGopsAtEnd) {
                                    alignedGops = this.alignGopsAtEnd_(gops);
                                } else {
                                    alignedGops = this.alignGopsAtStart_(gops);
                                }
                                if (!alignedGops) {
                                    this.gopCache_.unshift({ gop: gops.pop(), pps: track.pps, sps: track.sps });
                                    this.gopCache_.length = Math.min(6, this.gopCache_.length);
                                    nalUnits = [];
                                    this.resetStream_();
                                    this.trigger("done", "VideoSegmentStream");
                                    return;
                                }
                                trackDecodeInfo.clearDtsInfo(track);
                                gops = alignedGops;
                            }
                            trackDecodeInfo.collectDtsInfo(track, gops);
                            track.samples = frameUtils.generateSampleTable(gops);
                            mdat = mp4.mdat(frameUtils.concatenateNalData(gops));
                            track.baseMediaDecodeTime = trackDecodeInfo.calculateTrackBaseMediaDecodeTime(track, options.keepOriginalTimestamps);
                            this.trigger(
                                "processedGopsInfo",
                                gops.map(function (gop) {
                                    return { pts: gop.pts, dts: gop.dts, byteLength: gop.byteLength };
                                }),
                            );
                            firstGop = gops[0];
                            lastGop = gops[gops.length - 1];
                            this.trigger("segmentTimingInfo", generateVideoSegmentTimingInfo(track.baseMediaDecodeTime, firstGop.dts, firstGop.pts, lastGop.dts + lastGop.duration, lastGop.pts + lastGop.duration, prependedContentDuration));
                            this.trigger("timingInfo", { start: gops[0].pts, end: gops[gops.length - 1].pts + gops[gops.length - 1].duration });
                            this.gopCache_.unshift({ gop: gops.pop(), pps: track.pps, sps: track.sps });
                            this.gopCache_.length = Math.min(6, this.gopCache_.length);
                            nalUnits = [];
                            this.trigger("baseMediaDecodeTime", track.baseMediaDecodeTime);
                            this.trigger("timelineStartInfo", track.timelineStartInfo);
                            moof = mp4.moof(sequenceNumber, [track]);
                            boxes = new Uint8Array(moof.byteLength + mdat.byteLength);
                            sequenceNumber++;
                            boxes.set(moof);
                            boxes.set(mdat, moof.byteLength);
                            this.trigger("data", { track: track, boxes: boxes });
                            this.resetStream_();
                            this.trigger("done", "VideoSegmentStream");
                        };
                        this.reset = function () {
                            this.resetStream_();
                            nalUnits = [];
                            this.gopCache_.length = 0;
                            gopsToAlignWith.length = 0;
                            this.trigger("reset");
                        };
                        this.resetStream_ = function () {
                            trackDecodeInfo.clearDtsInfo(track);
                            config = undefined;
                            pps = undefined;
                        };
                        this.getGopForFusion_ = function (nalUnit) {
                            var halfSecond = 45000,
                                allowableOverlap = 10000,
                                nearestDistance = Infinity,
                                dtsDistance,
                                nearestGopObj,
                                currentGop,
                                currentGopObj,
                                i;
                            for (i = 0; i < this.gopCache_.length; i++) {
                                currentGopObj = this.gopCache_[i];
                                currentGop = currentGopObj.gop;
                                if (!(track.pps && arrayEquals(track.pps[0], currentGopObj.pps[0])) || !(track.sps && arrayEquals(track.sps[0], currentGopObj.sps[0]))) {
                                    continue;
                                }
                                if (currentGop.dts < track.timelineStartInfo.dts) {
                                    continue;
                                }
                                dtsDistance = nalUnit.dts - currentGop.dts - currentGop.duration;
                                if (dtsDistance >= -allowableOverlap && dtsDistance <= halfSecond) {
                                    if (!nearestGopObj || nearestDistance > dtsDistance) {
                                        nearestGopObj = currentGopObj;
                                        nearestDistance = dtsDistance;
                                    }
                                }
                            }
                            if (nearestGopObj) {
                                return nearestGopObj.gop;
                            }
                            return null;
                        };
                        this.alignGopsAtStart_ = function (gops) {
                            var alignIndex, gopIndex, align, gop, byteLength, nalCount, duration, alignedGops;
                            byteLength = gops.byteLength;
                            nalCount = gops.nalCount;
                            duration = gops.duration;
                            alignIndex = gopIndex = 0;
                            while (alignIndex < gopsToAlignWith.length && gopIndex < gops.length) {
                                align = gopsToAlignWith[alignIndex];
                                gop = gops[gopIndex];
                                if (align.pts === gop.pts) {
                                    break;
                                }
                                if (gop.pts > align.pts) {
                                    alignIndex++;
                                    continue;
                                }
                                gopIndex++;
                                byteLength -= gop.byteLength;
                                nalCount -= gop.nalCount;
                                duration -= gop.duration;
                            }
                            if (gopIndex === 0) {
                                return gops;
                            }
                            if (gopIndex === gops.length) {
                                return null;
                            }
                            alignedGops = gops.slice(gopIndex);
                            alignedGops.byteLength = byteLength;
                            alignedGops.duration = duration;
                            alignedGops.nalCount = nalCount;
                            alignedGops.pts = alignedGops[0].pts;
                            alignedGops.dts = alignedGops[0].dts;
                            return alignedGops;
                        };
                        this.alignGopsAtEnd_ = function (gops) {
                            var alignIndex, gopIndex, align, gop, alignEndIndex, matchFound;
                            alignIndex = gopsToAlignWith.length - 1;
                            gopIndex = gops.length - 1;
                            alignEndIndex = null;
                            matchFound = false;
                            while (alignIndex >= 0 && gopIndex >= 0) {
                                align = gopsToAlignWith[alignIndex];
                                gop = gops[gopIndex];
                                if (align.pts === gop.pts) {
                                    matchFound = true;
                                    break;
                                }
                                if (align.pts > gop.pts) {
                                    alignIndex--;
                                    continue;
                                }
                                if (alignIndex === gopsToAlignWith.length - 1) {
                                    alignEndIndex = gopIndex;
                                }
                                gopIndex--;
                            }
                            if (!matchFound && alignEndIndex === null) {
                                return null;
                            }
                            var trimIndex;
                            if (matchFound) {
                                trimIndex = gopIndex;
                            } else {
                                trimIndex = alignEndIndex;
                            }
                            if (trimIndex === 0) {
                                return gops;
                            }
                            var alignedGops = gops.slice(trimIndex);
                            var metadata = alignedGops.reduce(
                                function (total, gop) {
                                    total.byteLength += gop.byteLength;
                                    total.duration += gop.duration;
                                    total.nalCount += gop.nalCount;
                                    return total;
                                },
                                { byteLength: 0, duration: 0, nalCount: 0 },
                            );
                            alignedGops.byteLength = metadata.byteLength;
                            alignedGops.duration = metadata.duration;
                            alignedGops.nalCount = metadata.nalCount;
                            alignedGops.pts = alignedGops[0].pts;
                            alignedGops.dts = alignedGops[0].dts;
                            return alignedGops;
                        };
                        this.alignGopsWith = function (newGopsToAlignWith) {
                            gopsToAlignWith = newGopsToAlignWith;
                        };
                    };
                    VideoSegmentStream.prototype = new Stream();
                    CoalesceStream = function (options, metadataStream) {
                        this.numberOfTracks = 0;
                        this.metadataStream = metadataStream;
                        options = options || {};
                        if (typeof options.remux !== "undefined") {
                            this.remuxTracks = !!options.remux;
                        } else {
                            this.remuxTracks = true;
                        }
                        if (typeof options.keepOriginalTimestamps === "boolean") {
                            this.keepOriginalTimestamps = options.keepOriginalTimestamps;
                        } else {
                            this.keepOriginalTimestamps = false;
                        }
                        this.pendingTracks = [];
                        this.videoTrack = null;
                        this.pendingBoxes = [];
                        this.pendingCaptions = [];
                        this.pendingMetadata = [];
                        this.pendingBytes = 0;
                        this.emittedTracks = 0;
                        CoalesceStream.prototype.init.call(this);
                        this.push = function (output) {
                            if (output.text) {
                                return this.pendingCaptions.push(output);
                            }
                            if (output.frames) {
                                return this.pendingMetadata.push(output);
                            }
                            this.pendingTracks.push(output.track);
                            this.pendingBytes += output.boxes.byteLength;
                            if (output.track.type === "video") {
                                this.videoTrack = output.track;
                                this.pendingBoxes.push(output.boxes);
                            }
                            if (output.track.type === "audio") {
                                this.audioTrack = output.track;
                                this.pendingBoxes.unshift(output.boxes);
                            }
                        };
                    };
                    CoalesceStream.prototype = new Stream();
                    CoalesceStream.prototype.flush = function (flushSource) {
                        var offset = 0,
                            event = { captions: [], captionStreams: {}, metadata: [], info: {} },
                            caption,
                            id3,
                            initSegment,
                            timelineStartPts = 0,
                            i;
                        if (this.pendingTracks.length < this.numberOfTracks) {
                            if (flushSource !== "VideoSegmentStream" && flushSource !== "AudioSegmentStream") {
                                return;
                            } else if (this.remuxTracks) {
                                return;
                            } else if (this.pendingTracks.length === 0) {
                                this.emittedTracks++;
                                if (this.emittedTracks >= this.numberOfTracks) {
                                    this.trigger("done");
                                    this.emittedTracks = 0;
                                }
                                return;
                            }
                        }
                        if (this.videoTrack) {
                            timelineStartPts = this.videoTrack.timelineStartInfo.pts;
                            VIDEO_PROPERTIES.forEach(function (prop) {
                                event.info[prop] = this.videoTrack[prop];
                            }, this);
                        } else if (this.audioTrack) {
                            timelineStartPts = this.audioTrack.timelineStartInfo.pts;
                            AUDIO_PROPERTIES.forEach(function (prop) {
                                event.info[prop] = this.audioTrack[prop];
                            }, this);
                        }
                        if (this.videoTrack || this.audioTrack) {
                            if (this.pendingTracks.length === 1) {
                                event.type = this.pendingTracks[0].type;
                            } else {
                                event.type = "combined";
                            }
                            this.emittedTracks += this.pendingTracks.length;
                            initSegment = mp4.initSegment(this.pendingTracks);
                            event.initSegment = new Uint8Array(initSegment.byteLength);
                            event.initSegment.set(initSegment);
                            event.data = new Uint8Array(this.pendingBytes);
                            for (i = 0; i < this.pendingBoxes.length; i++) {
                                event.data.set(this.pendingBoxes[i], offset);
                                offset += this.pendingBoxes[i].byteLength;
                            }
                            for (i = 0; i < this.pendingCaptions.length; i++) {
                                caption = this.pendingCaptions[i];
                                caption.startTime = clock.metadataTsToSeconds(caption.startPts, timelineStartPts, this.keepOriginalTimestamps);
                                caption.endTime = clock.metadataTsToSeconds(caption.endPts, timelineStartPts, this.keepOriginalTimestamps);
                                event.captionStreams[caption.stream] = true;
                                event.captions.push(caption);
                            }
                            for (i = 0; i < this.pendingMetadata.length; i++) {
                                id3 = this.pendingMetadata[i];
                                id3.cueTime = clock.metadataTsToSeconds(id3.pts, timelineStartPts, this.keepOriginalTimestamps);
                                event.metadata.push(id3);
                            }
                            event.metadata.dispatchType = this.metadataStream.dispatchType;
                            this.pendingTracks.length = 0;
                            this.videoTrack = null;
                            this.pendingBoxes.length = 0;
                            this.pendingCaptions.length = 0;
                            this.pendingBytes = 0;
                            this.pendingMetadata.length = 0;
                            this.trigger("data", event);
                            for (i = 0; i < event.captions.length; i++) {
                                caption = event.captions[i];
                                this.trigger("caption", caption);
                            }
                            for (i = 0; i < event.metadata.length; i++) {
                                id3 = event.metadata[i];
                                this.trigger("id3Frame", id3);
                            }
                        }
                        if (this.emittedTracks >= this.numberOfTracks) {
                            this.trigger("done");
                            this.emittedTracks = 0;
                        }
                    };
                    CoalesceStream.prototype.setRemux = function (val) {
                        this.remuxTracks = val;
                    };
                    Transmuxer = function (options) {
                        var self = this,
                            hasFlushed = true,
                            videoTrack,
                            audioTrack;
                        Transmuxer.prototype.init.call(this);
                        options = options || {};
                        this.baseMediaDecodeTime = options.baseMediaDecodeTime || 0;
                        this.transmuxPipeline_ = {};
                        mp4.setDuration(options.duration);
                        this.setupAacPipeline = function () {
                            var pipeline = {};
                            this.transmuxPipeline_ = pipeline;
                            pipeline.type = "aac";
                            pipeline.metadataStream = new m2ts.MetadataStream();
                            pipeline.aacStream = new AacStream();
                            pipeline.audioTimestampRolloverStream = new m2ts.TimestampRolloverStream("audio");
                            pipeline.timedMetadataTimestampRolloverStream = new m2ts.TimestampRolloverStream("timed-metadata");
                            pipeline.adtsStream = new AdtsStream();
                            pipeline.coalesceStream = new CoalesceStream(options, pipeline.metadataStream);
                            pipeline.headOfPipeline = pipeline.aacStream;
                            pipeline.aacStream.pipe(pipeline.audioTimestampRolloverStream).pipe(pipeline.adtsStream);
                            pipeline.aacStream.pipe(pipeline.timedMetadataTimestampRolloverStream).pipe(pipeline.metadataStream).pipe(pipeline.coalesceStream);
                            pipeline.metadataStream.on("timestamp", function (frame) {
                                pipeline.aacStream.setTimestamp(frame.timeStamp);
                            });
                            pipeline.aacStream.on("data", function (data) {
                                if ((data.type !== "timed-metadata" && data.type !== "audio") || pipeline.audioSegmentStream) {
                                    return;
                                }
                                audioTrack = audioTrack || { timelineStartInfo: { baseMediaDecodeTime: self.baseMediaDecodeTime }, codec: "adts", type: "audio" };
                                pipeline.coalesceStream.numberOfTracks++;
                                pipeline.audioSegmentStream = new AudioSegmentStream(audioTrack, options);
                                pipeline.audioSegmentStream.on("timingInfo", self.trigger.bind(self, "audioTimingInfo"));
                                pipeline.adtsStream.pipe(pipeline.audioSegmentStream).pipe(pipeline.coalesceStream);
                                self.trigger("trackinfo", { hasAudio: !!audioTrack, hasVideo: !!videoTrack });
                            });
                            pipeline.coalesceStream.on("data", this.trigger.bind(this, "data"));
                            pipeline.coalesceStream.on("done", this.trigger.bind(this, "done"));
                        };
                        this.setupTsPipeline = function () {
                            var pipeline = {};
                            this.transmuxPipeline_ = pipeline;
                            pipeline.type = "ts";
                            pipeline.metadataStream = new m2ts.MetadataStream();
                            pipeline.packetStream = new m2ts.TransportPacketStream();
                            pipeline.parseStream = new m2ts.TransportParseStream();
                            pipeline.elementaryStream = new m2ts.ElementaryStream();
                            pipeline.timestampRolloverStream = new m2ts.TimestampRolloverStream();
                            pipeline.adtsStream = new AdtsStream();
                            pipeline.h264Stream = new H264Stream();
                            pipeline.captionStream = new m2ts.CaptionStream();
                            pipeline.coalesceStream = new CoalesceStream(options, pipeline.metadataStream);
                            pipeline.headOfPipeline = pipeline.packetStream;
                            pipeline.packetStream.pipe(pipeline.parseStream).pipe(pipeline.elementaryStream).pipe(pipeline.timestampRolloverStream);
                            pipeline.timestampRolloverStream.pipe(pipeline.h264Stream);
                            pipeline.timestampRolloverStream.pipe(pipeline.adtsStream);
                            pipeline.timestampRolloverStream.pipe(pipeline.metadataStream).pipe(pipeline.coalesceStream);
                            pipeline.h264Stream.pipe(pipeline.captionStream).pipe(pipeline.coalesceStream);
                            pipeline.elementaryStream.on("data", function (data) {
                                var i;
                                if (data.type === "metadata") {
                                    i = data.tracks.length;
                                    while (i--) {
                                        if (!videoTrack && data.tracks[i].type === "video") {
                                            videoTrack = data.tracks[i];
                                            videoTrack.timelineStartInfo.baseMediaDecodeTime = self.baseMediaDecodeTime;
                                        } else if (!audioTrack && data.tracks[i].type === "audio") {
                                            audioTrack = data.tracks[i];
                                            audioTrack.timelineStartInfo.baseMediaDecodeTime = self.baseMediaDecodeTime;
                                        }
                                    }
                                    if (videoTrack && !pipeline.videoSegmentStream) {
                                        pipeline.coalesceStream.numberOfTracks++;
                                        pipeline.videoSegmentStream = new VideoSegmentStream(videoTrack, options);
                                        pipeline.videoSegmentStream.on("timelineStartInfo", function (timelineStartInfo) {
                                            if (audioTrack && !options.keepOriginalTimestamps) {
                                                audioTrack.timelineStartInfo = timelineStartInfo;
                                                pipeline.audioSegmentStream.setEarliestDts(timelineStartInfo.dts - self.baseMediaDecodeTime);
                                            }
                                        });
                                        pipeline.videoSegmentStream.on("processedGopsInfo", self.trigger.bind(self, "gopInfo"));
                                        pipeline.videoSegmentStream.on("segmentTimingInfo", self.trigger.bind(self, "videoSegmentTimingInfo"));
                                        pipeline.videoSegmentStream.on("baseMediaDecodeTime", function (baseMediaDecodeTime) {
                                            if (audioTrack) {
                                                pipeline.audioSegmentStream.setVideoBaseMediaDecodeTime(baseMediaDecodeTime);
                                            }
                                        });
                                        pipeline.videoSegmentStream.on("timingInfo", self.trigger.bind(self, "videoTimingInfo"));
                                        pipeline.h264Stream.pipe(pipeline.videoSegmentStream).pipe(pipeline.coalesceStream);
                                    }
                                    if (audioTrack && !pipeline.audioSegmentStream) {
                                        pipeline.coalesceStream.numberOfTracks++;
                                        pipeline.audioSegmentStream = new AudioSegmentStream(audioTrack, options);
                                        pipeline.audioSegmentStream.on("timingInfo", self.trigger.bind(self, "audioTimingInfo"));
                                        pipeline.adtsStream.pipe(pipeline.audioSegmentStream).pipe(pipeline.coalesceStream);
                                    }
                                    self.trigger("trackinfo", { hasAudio: !!audioTrack, hasVideo: !!videoTrack });
                                }
                            });
                            pipeline.coalesceStream.on("data", this.trigger.bind(this, "data"));
                            pipeline.coalesceStream.on("id3Frame", function (id3Frame) {
                                id3Frame.dispatchType = pipeline.metadataStream.dispatchType;
                                self.trigger("id3Frame", id3Frame);
                            });
                            pipeline.coalesceStream.on("caption", this.trigger.bind(this, "caption"));
                            pipeline.coalesceStream.on("done", this.trigger.bind(this, "done"));
                        };
                        this.setBaseMediaDecodeTime = function (baseMediaDecodeTime) {
                            var pipeline = this.transmuxPipeline_;
                            if (!options.keepOriginalTimestamps) {
                                this.baseMediaDecodeTime = baseMediaDecodeTime;
                            }
                            if (audioTrack) {
                                audioTrack.timelineStartInfo.dts = undefined;
                                audioTrack.timelineStartInfo.pts = undefined;
                                trackDecodeInfo.clearDtsInfo(audioTrack);
                                if (pipeline.audioTimestampRolloverStream) {
                                    pipeline.audioTimestampRolloverStream.discontinuity();
                                }
                            }
                            if (videoTrack) {
                                if (pipeline.videoSegmentStream) {
                                    pipeline.videoSegmentStream.gopCache_ = [];
                                }
                                videoTrack.timelineStartInfo.dts = undefined;
                                videoTrack.timelineStartInfo.pts = undefined;
                                trackDecodeInfo.clearDtsInfo(videoTrack);
                                pipeline.captionStream.reset();
                            }
                            if (pipeline.timestampRolloverStream) {
                                pipeline.timestampRolloverStream.discontinuity();
                            }
                        };
                        this.setAudioAppendStart = function (timestamp) {
                            if (audioTrack) {
                                this.transmuxPipeline_.audioSegmentStream.setAudioAppendStart(timestamp);
                            }
                        };
                        this.setRemux = function (val) {
                            var pipeline = this.transmuxPipeline_;
                            options.remux = val;
                            if (pipeline && pipeline.coalesceStream) {
                                pipeline.coalesceStream.setRemux(val);
                            }
                        };
                        this.alignGopsWith = function (gopsToAlignWith) {
                            if (videoTrack && this.transmuxPipeline_.videoSegmentStream) {
                                this.transmuxPipeline_.videoSegmentStream.alignGopsWith(gopsToAlignWith);
                            }
                        };
                        this.push = function (data) {
                            if (hasFlushed) {
                                var isAac = isLikelyAacData(data);
                                if (isAac && this.transmuxPipeline_.type !== "aac") {
                                    this.setupAacPipeline();
                                } else if (!isAac && this.transmuxPipeline_.type !== "ts") {
                                    this.setupTsPipeline();
                                }
                                hasFlushed = false;
                            }
                            this.transmuxPipeline_.headOfPipeline.push(data);
                        };
                        this.flush = function () {
                            hasFlushed = true;
                            this.transmuxPipeline_.headOfPipeline.flush();
                        };
                        this.endTimeline = function () {
                            this.transmuxPipeline_.headOfPipeline.endTimeline();
                        };
                        this.reset = function () {
                            if (this.transmuxPipeline_.headOfPipeline) {
                                this.transmuxPipeline_.headOfPipeline.reset();
                            }
                        };
                        this.resetCaptions = function () {
                            if (this.transmuxPipeline_.captionStream) {
                                this.transmuxPipeline_.captionStream.reset();
                            }
                        };
                    };
                    Transmuxer.prototype = new Stream();
                    module.exports = { Transmuxer: Transmuxer, VideoSegmentStream: VideoSegmentStream, AudioSegmentStream: AudioSegmentStream, AUDIO_PROPERTIES: AUDIO_PROPERTIES, VIDEO_PROPERTIES: VIDEO_PROPERTIES, generateVideoSegmentTimingInfo: generateVideoSegmentTimingInfo };
                },
                { "1": 1, "13": 13, "16": 16, "18": 18, "2": 2, "21": 21, "29": 29, "3": 3, "31": 31, "4": 4, "5": 5, "6": 6, "9": 9 },
            ],
            23: [
                function (require, module, exports) {
                    "use strict";
                    var USER_DATA_REGISTERED_ITU_T_T35 = 4,
                        RBSP_TRAILING_BITS = 128;
                    var parseSei = function (bytes) {
                        var i = 0,
                            result = { payloadType: -1, payloadSize: 0 },
                            payloadType = 0,
                            payloadSize = 0;
                        while (i < bytes.byteLength) {
                            if (bytes[i] === RBSP_TRAILING_BITS) {
                                break;
                            }
                            while (bytes[i] === 0xff) {
                                payloadType += 255;
                                i++;
                            }
                            payloadType += bytes[i++];
                            while (bytes[i] === 0xff) {
                                payloadSize += 255;
                                i++;
                            }
                            payloadSize += bytes[i++];
                            if (!result.payload && payloadType === USER_DATA_REGISTERED_ITU_T_T35) {
                                var userIdentifier = String.fromCharCode(bytes[i + 3], bytes[i + 4], bytes[i + 5], bytes[i + 6]);
                                if (userIdentifier === "GA94") {
                                    result.payloadType = payloadType;
                                    result.payloadSize = payloadSize;
                                    result.payload = bytes.subarray(i, i + payloadSize);
                                    break;
                                } else {
                                    result.payload = void 0;
                                }
                            }
                            i += payloadSize;
                            payloadType = 0;
                            payloadSize = 0;
                        }
                        return result;
                    };
                    var parseUserData = function (sei) {
                        if (sei.payload[0] !== 181) {
                            return null;
                        }
                        if (((sei.payload[1] << 8) | sei.payload[2]) !== 49) {
                            return null;
                        }
                        if (String.fromCharCode(sei.payload[3], sei.payload[4], sei.payload[5], sei.payload[6]) !== "GA94") {
                            return null;
                        }
                        if (sei.payload[7] !== 0x03) {
                            return null;
                        }
                        return sei.payload.subarray(8, sei.payload.length - 1);
                    };
                    var parseCaptionPackets = function (pts, userData) {
                        var results = [],
                            i,
                            count,
                            offset,
                            data;
                        if (!(userData[0] & 0x40)) {
                            return results;
                        }
                        count = userData[0] & 0x1f;
                        for (i = 0; i < count; i++) {
                            offset = i * 3;
                            data = { type: userData[offset + 2] & 0x03, pts: pts };
                            if (userData[offset + 2] & 0x04) {
                                data.ccData = (userData[offset + 3] << 8) | userData[offset + 4];
                                results.push(data);
                            }
                        }
                        return results;
                    };
                    var discardEmulationPreventionBytes = function (data) {
                        var length = data.byteLength,
                            emulationPreventionBytesPositions = [],
                            i = 1,
                            newLength,
                            newData;
                        while (i < length - 2) {
                            if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0x03) {
                                emulationPreventionBytesPositions.push(i + 2);
                                i += 2;
                            } else {
                                i++;
                            }
                        }
                        if (emulationPreventionBytesPositions.length === 0) {
                            return data;
                        }
                        newLength = length - emulationPreventionBytesPositions.length;
                        newData = new Uint8Array(newLength);
                        var sourceIndex = 0;
                        for (i = 0; i < newLength; sourceIndex++, i++) {
                            if (sourceIndex === emulationPreventionBytesPositions[0]) {
                                sourceIndex++;
                                emulationPreventionBytesPositions.shift();
                            }
                            newData[i] = data[sourceIndex];
                        }
                        return newData;
                    };
                    module.exports = { parseSei: parseSei, parseUserData: parseUserData, parseCaptionPackets: parseCaptionPackets, discardEmulationPreventionBytes: discardEmulationPreventionBytes, USER_DATA_REGISTERED_ITU_T_T35: USER_DATA_REGISTERED_ITU_T_T35 };
                },
                {},
            ],
            24: [
                function (require, module, exports) {
                    var parseSampleFlags = function (flags) {
                        return { isLeading: (flags[0] & 0x0c) >>> 2, dependsOn: flags[0] & 0x03, isDependedOn: (flags[1] & 0xc0) >>> 6, hasRedundancy: (flags[1] & 0x30) >>> 4, paddingValue: (flags[1] & 0x0e) >>> 1, isNonSyncSample: flags[1] & 0x01, degradationPriority: (flags[2] << 8) | flags[3] };
                    };
                    module.exports = parseSampleFlags;
                },
                {},
            ],
            25: [
                function (require, module, exports) {
                    var toUnsigned = require(28).toUnsigned;
                    var tfdt = function (data) {
                        var result = { version: data[0], flags: new Uint8Array(data.subarray(1, 4)), baseMediaDecodeTime: toUnsigned((data[4] << 24) | (data[5] << 16) | (data[6] << 8) | data[7]) };
                        if (result.version === 1) {
                            result.baseMediaDecodeTime *= Math.pow(2, 32);
                            result.baseMediaDecodeTime += toUnsigned((data[8] << 24) | (data[9] << 16) | (data[10] << 8) | data[11]);
                        }
                        return result;
                    };
                    module.exports = tfdt;
                },
                { "28": 28 },
            ],
            26: [
                function (require, module, exports) {
                    var tfhd = function (data) {
                        var view = new DataView(data.buffer, data.byteOffset, data.byteLength),
                            result = { version: data[0], flags: new Uint8Array(data.subarray(1, 4)), trackId: view.getUint32(4) },
                            baseDataOffsetPresent = result.flags[2] & 0x01,
                            sampleDescriptionIndexPresent = result.flags[2] & 0x02,
                            defaultSampleDurationPresent = result.flags[2] & 0x08,
                            defaultSampleSizePresent = result.flags[2] & 0x10,
                            defaultSampleFlagsPresent = result.flags[2] & 0x20,
                            durationIsEmpty = result.flags[0] & 0x010000,
                            defaultBaseIsMoof = result.flags[0] & 0x020000,
                            i;
                        i = 8;
                        if (baseDataOffsetPresent) {
                            i += 4;
                            result.baseDataOffset = view.getUint32(12);
                            i += 4;
                        }
                        if (sampleDescriptionIndexPresent) {
                            result.sampleDescriptionIndex = view.getUint32(i);
                            i += 4;
                        }
                        if (defaultSampleDurationPresent) {
                            result.defaultSampleDuration = view.getUint32(i);
                            i += 4;
                        }
                        if (defaultSampleSizePresent) {
                            result.defaultSampleSize = view.getUint32(i);
                            i += 4;
                        }
                        if (defaultSampleFlagsPresent) {
                            result.defaultSampleFlags = view.getUint32(i);
                        }
                        if (durationIsEmpty) {
                            result.durationIsEmpty = true;
                        }
                        if (!baseDataOffsetPresent && defaultBaseIsMoof) {
                            result.baseDataOffsetIsMoof = true;
                        }
                        return result;
                    };
                    module.exports = tfhd;
                },
                {},
            ],
            27: [
                function (require, module, exports) {
                    var parseSampleFlags = require(24);
                    var trun = function (data) {
                        var result = { version: data[0], flags: new Uint8Array(data.subarray(1, 4)), samples: [] },
                            view = new DataView(data.buffer, data.byteOffset, data.byteLength),
                            dataOffsetPresent = result.flags[2] & 0x01,
                            firstSampleFlagsPresent = result.flags[2] & 0x04,
                            sampleDurationPresent = result.flags[1] & 0x01,
                            sampleSizePresent = result.flags[1] & 0x02,
                            sampleFlagsPresent = result.flags[1] & 0x04,
                            sampleCompositionTimeOffsetPresent = result.flags[1] & 0x08,
                            sampleCount = view.getUint32(4),
                            offset = 8,
                            sample;
                        if (dataOffsetPresent) {
                            result.dataOffset = view.getInt32(offset);
                            offset += 4;
                        }
                        if (firstSampleFlagsPresent && sampleCount) {
                            sample = { flags: parseSampleFlags(data.subarray(offset, offset + 4)) };
                            offset += 4;
                            if (sampleDurationPresent) {
                                sample.duration = view.getUint32(offset);
                                offset += 4;
                            }
                            if (sampleSizePresent) {
                                sample.size = view.getUint32(offset);
                                offset += 4;
                            }
                            if (sampleCompositionTimeOffsetPresent) {
                                if (result.version === 1) {
                                    sample.compositionTimeOffset = view.getInt32(offset);
                                } else {
                                    sample.compositionTimeOffset = view.getUint32(offset);
                                }
                                offset += 4;
                            }
                            result.samples.push(sample);
                            sampleCount--;
                        }
                        while (sampleCount--) {
                            sample = {};
                            if (sampleDurationPresent) {
                                sample.duration = view.getUint32(offset);
                                offset += 4;
                            }
                            if (sampleSizePresent) {
                                sample.size = view.getUint32(offset);
                                offset += 4;
                            }
                            if (sampleFlagsPresent) {
                                sample.flags = parseSampleFlags(data.subarray(offset, offset + 4));
                                offset += 4;
                            }
                            if (sampleCompositionTimeOffsetPresent) {
                                if (result.version === 1) {
                                    sample.compositionTimeOffset = view.getInt32(offset);
                                } else {
                                    sample.compositionTimeOffset = view.getUint32(offset);
                                }
                                offset += 4;
                            }
                            result.samples.push(sample);
                        }
                        return result;
                    };
                    module.exports = trun;
                },
                { "24": 24 },
            ],
            28: [
                function (require, module, exports) {
                    var toUnsigned = function (value) {
                        return value >>> 0;
                    };
                    var toHexString = function (value) {
                        return ("00" + value.toString(16)).slice(-2);
                    };
                    module.exports = { toUnsigned: toUnsigned, toHexString: toHexString };
                },
                {},
            ],
            29: [
                function (require, module, exports) {
                    var ONE_SECOND_IN_TS = 90000,
                        secondsToVideoTs,
                        secondsToAudioTs,
                        videoTsToSeconds,
                        audioTsToSeconds,
                        audioTsToVideoTs,
                        videoTsToAudioTs,
                        metadataTsToSeconds;
                    secondsToVideoTs = function (seconds) {
                        return seconds * ONE_SECOND_IN_TS;
                    };
                    secondsToAudioTs = function (seconds, sampleRate) {
                        return seconds * sampleRate;
                    };
                    videoTsToSeconds = function (timestamp) {
                        return timestamp / ONE_SECOND_IN_TS;
                    };
                    audioTsToSeconds = function (timestamp, sampleRate) {
                        return timestamp / sampleRate;
                    };
                    audioTsToVideoTs = function (timestamp, sampleRate) {
                        return secondsToVideoTs(audioTsToSeconds(timestamp, sampleRate));
                    };
                    videoTsToAudioTs = function (timestamp, sampleRate) {
                        return secondsToAudioTs(videoTsToSeconds(timestamp), sampleRate);
                    };
                    metadataTsToSeconds = function (timestamp, timelineStartPts, keepOriginalTimestamps) {
                        return videoTsToSeconds(keepOriginalTimestamps ? timestamp : timestamp - timelineStartPts);
                    };
                    module.exports = { ONE_SECOND_IN_TS: ONE_SECOND_IN_TS, secondsToVideoTs: secondsToVideoTs, secondsToAudioTs: secondsToAudioTs, videoTsToSeconds: videoTsToSeconds, audioTsToSeconds: audioTsToSeconds, audioTsToVideoTs: audioTsToVideoTs, videoTsToAudioTs: videoTsToAudioTs, metadataTsToSeconds: metadataTsToSeconds };
                },
                {},
            ],
            30: [
                function (require, module, exports) {
                    "use strict";
                    var ExpGolomb;
                    ExpGolomb = function (workingData) {
                        var workingBytesAvailable = workingData.byteLength,
                            workingWord = 0,
                            workingBitsAvailable = 0;
                        this.length = function () {
                            return 8 * workingBytesAvailable;
                        };
                        this.bitsAvailable = function () {
                            return 8 * workingBytesAvailable + workingBitsAvailable;
                        };
                        this.loadWord = function () {
                            var position = workingData.byteLength - workingBytesAvailable,
                                workingBytes = new Uint8Array(4),
                                availableBytes = Math.min(4, workingBytesAvailable);
                            if (availableBytes === 0) {
                                throw new Error("no bytes available");
                            }
                            workingBytes.set(workingData.subarray(position, position + availableBytes));
                            workingWord = new DataView(workingBytes.buffer).getUint32(0);
                            workingBitsAvailable = availableBytes * 8;
                            workingBytesAvailable -= availableBytes;
                        };
                        this.skipBits = function (count) {
                            var skipBytes;
                            if (workingBitsAvailable > count) {
                                workingWord <<= count;
                                workingBitsAvailable -= count;
                            } else {
                                count -= workingBitsAvailable;
                                skipBytes = Math.floor(count / 8);
                                count -= skipBytes * 8;
                                workingBytesAvailable -= skipBytes;
                                this.loadWord();
                                workingWord <<= count;
                                workingBitsAvailable -= count;
                            }
                        };
                        this.readBits = function (size) {
                            var bits = Math.min(workingBitsAvailable, size),
                                valu = workingWord >>> (32 - bits);
                            workingBitsAvailable -= bits;
                            if (workingBitsAvailable > 0) {
                                workingWord <<= bits;
                            } else if (workingBytesAvailable > 0) {
                                this.loadWord();
                            }
                            bits = size - bits;
                            if (bits > 0) {
                                return (valu << bits) | this.readBits(bits);
                            }
                            return valu;
                        };
                        this.skipLeadingZeros = function () {
                            var leadingZeroCount;
                            for (leadingZeroCount = 0; leadingZeroCount < workingBitsAvailable; ++leadingZeroCount) {
                                if ((workingWord & (0x80000000 >>> leadingZeroCount)) !== 0) {
                                    workingWord <<= leadingZeroCount;
                                    workingBitsAvailable -= leadingZeroCount;
                                    return leadingZeroCount;
                                }
                            }
                            this.loadWord();
                            return leadingZeroCount + this.skipLeadingZeros();
                        };
                        this.skipUnsignedExpGolomb = function () {
                            this.skipBits(1 + this.skipLeadingZeros());
                        };
                        this.skipExpGolomb = function () {
                            this.skipBits(1 + this.skipLeadingZeros());
                        };
                        this.readUnsignedExpGolomb = function () {
                            var clz = this.skipLeadingZeros();
                            return this.readBits(clz + 1) - 1;
                        };
                        this.readExpGolomb = function () {
                            var valu = this.readUnsignedExpGolomb();
                            if (0x01 & valu) {
                                return (1 + valu) >>> 1;
                            }
                            return -1 * (valu >>> 1);
                        };
                        this.readBoolean = function () {
                            return this.readBits(1) === 1;
                        };
                        this.readUnsignedByte = function () {
                            return this.readBits(8);
                        };
                        this.loadWord();
                    };
                    module.exports = ExpGolomb;
                },
                {},
            ],
            31: [
                function (require, module, exports) {
                    "use strict";
                    var Stream = function () {
                        this.init = function () {
                            var listeners = {};
                            this.on = function (type, listener) {
                                if (!listeners[type]) {
                                    listeners[type] = [];
                                }
                                listeners[type] = listeners[type].concat(listener);
                            };
                            this.off = function (type, listener) {
                                var index;
                                if (!listeners[type]) {
                                    return false;
                                }
                                index = listeners[type].indexOf(listener);
                                listeners[type] = listeners[type].slice();
                                listeners[type].splice(index, 1);
                                return index > -1;
                            };
                            this.trigger = function (type) {
                                var callbacks, i, length, args;
                                callbacks = listeners[type];
                                if (!callbacks) {
                                    return;
                                }
                                if (arguments.length === 2) {
                                    length = callbacks.length;
                                    for (i = 0; i < length; ++i) {
                                        callbacks[i].call(this, arguments[1]);
                                    }
                                } else {
                                    args = [];
                                    i = arguments.length;
                                    for (i = 1; i < arguments.length; ++i) {
                                        args.push(arguments[i]);
                                    }
                                    length = callbacks.length;
                                    for (i = 0; i < length; ++i) {
                                        callbacks[i].apply(this, args);
                                    }
                                }
                            };
                            this.dispose = function () {
                                listeners = {};
                            };
                        };
                    };
                    Stream.prototype.pipe = function (destination) {
                        this.on("data", function (data) {
                            destination.push(data);
                        });
                        this.on("done", function (flushSource) {
                            destination.flush(flushSource);
                        });
                        this.on("partialdone", function (flushSource) {
                            destination.partialFlush(flushSource);
                        });
                        this.on("endedtimeline", function (flushSource) {
                            destination.endTimeline(flushSource);
                        });
                        this.on("reset", function (flushSource) {
                            destination.reset(flushSource);
                        });
                        return destination;
                    };
                    Stream.prototype.push = function (data) {
                        this.trigger("data", data);
                    };
                    Stream.prototype.flush = function (flushSource) {
                        this.trigger("done", flushSource);
                    };
                    Stream.prototype.partialFlush = function (flushSource) {
                        this.trigger("partialdone", flushSource);
                    };
                    Stream.prototype.endTimeline = function (flushSource) {
                        this.trigger("endedtimeline", flushSource);
                    };
                    Stream.prototype.reset = function (flushSource) {
                        this.trigger("reset", flushSource);
                    };
                    module.exports = Stream;
                },
                {},
            ],
        },
        {},
        [17],
    )(17);
});
