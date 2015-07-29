//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////


module egret {
    export var $TextureScaleFactor:number = 1;
    /**
     * @language en_US
     * The Texture class encapsulates different image resources on different platforms.
     * In HTML5, resource is an HTMLElement object
     * In OpenGL / WebGL, resource is a texture ID obtained after the GPU is submitted
     * The Texture class encapsulates the details implemented on the underlayer. Developers just need to focus on interfaces
     * @see http://docs.egret-labs.org/post/manual/bitmap/textures.html The use of texture packs
     * @see http://docs.egret-labs.org/post/manual/loader/getres.html Several ways of access to resources
     * @version Egret 2.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 纹理类是对不同平台不同的图片资源的封装
     * 在HTML5中，资源是一个HTMLElement对象
     * 在OpenGL / WebGL中，资源是一个提交GPU后获取的纹理id
     * Texture类封装了这些底层实现的细节，开发者只需要关心接口即可
     * @see http://docs.egret-labs.org/post/manual/bitmap/textures.html 纹理集的使用
     * @see http://docs.egret-labs.org/post/manual/loader/getres.html 获取资源的几种方式
     * @version Egret 2.0
     * @platform Web,Native
     */
    export class Texture extends HashObject {

        /**
         * @language en_US
         * Create an egret.Texture object
         * @version Egret 2.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个 egret.Texture 对象
         * @version Egret 2.0
         * @platform Web,Native
         */
        public constructor() {
            super();
        }

        /**
         * @private
         * 表示这个纹理在 bitmapData 上的 x 起始位置
         */
        public _bitmapX:number = 0;
        /**
         * @private
         * 表示这个纹理在 bitmapData 上的 y 起始位置
         */
        public _bitmapY:number = 0;
        /**
         * @private
         * 表示这个纹理在 bitmapData 上的宽度
         */
        public _bitmapWidth:number = 0;
        /**
         * @private
         * 表示这个纹理在 bitmapData 上的高度
         */
        public _bitmapHeight:number = 0;

        /**
         * @private
         * 表示这个纹理显示了之后在 x 方向的渲染偏移量
         */
        public _offsetX = 0;
        /**
         * @private
         * 表示这个纹理显示了之后在 y 方向的渲染偏移量
         */
        public _offsetY = 0;

        /**
         * @private
         * 纹理宽度
         */
        private _textureWidth:number = 0;

        /**
         * @language en_US
         * Texture width
         * @version Egret 2.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 纹理宽度
         * @version Egret 2.0
         * @platform Web,Native
         */
        public get textureWidth():number {
            return this.$getTextureWidth();
        }

        $getTextureWidth():number {
            return this._textureWidth;
        }

        /**
         * @private
         * 纹理高度
         */
        private _textureHeight:number = 0;

        /**
         * @language en_US
         * Texture height
         * @version Egret 2.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 纹理高度
         * @version Egret 2.0
         * @platform Web,Native
         */
        public get textureHeight():number {
            return this.$getTextureHeight();
        }

        $getTextureHeight():number {
            return this._textureHeight;
        }

        $getScaleBitmapWidth():number {
            return this._bitmapWidth * $TextureScaleFactor;
        }

        $getScaleBitmapHeight():number {
            return this._bitmapHeight * $TextureScaleFactor;
        }

        /**
         * @private
         * 表示bitmapData.width
         */
        public _sourceWidth:number = 0;
        /**
         * @private
         * 表示bitmapData.height
         */
        public _sourceHeight:number = 0;

        /**
         * @private
         */
        public _bitmapData:any = null;

        /**
         * @private
         *
         * @param value
         */
        public _setBitmapData(value:any) {
            this._bitmapData = value;

            var w = value.width * $TextureScaleFactor;
            var h = value.height * $TextureScaleFactor;
            this.$setData(0, 0, w, h, 0, 0, w, h, w, h);
        }

        /**
         * @private
         * 设置Texture数据
         * @param bitmapX
         * @param bitmapY
         * @param bitmapWidth
         * @param bitmapHeight
         * @param offsetX
         * @param offsetY
         * @param textureWidth
         * @param textureHeight
         * @param sourceWidth
         * @param sourceHeight
         */
        public $setData(bitmapX:number, bitmapY:number, bitmapWidth:number, bitmapHeight:number, offsetX:number, offsetY:number,
                        textureWidth:number, textureHeight:number, sourceWidth:number, sourceHeight:number):void {
            var scale = $TextureScaleFactor;
            this._bitmapX = bitmapX / scale;
            this._bitmapY = bitmapY / scale;
            this._bitmapWidth = bitmapWidth / scale;
            this._bitmapHeight = bitmapHeight / scale;

            this._offsetX = offsetX;
            this._offsetY = offsetY;
            this._textureWidth = textureWidth;
            this._textureHeight = textureHeight;

            this._sourceWidth = sourceWidth;
            this._sourceHeight = sourceHeight;
        }

        /**
         * @language en_US
         * Obtain the color value of a pixel point
         * @param x {number} The x coordinate of a pixel point
         * @param y {number} The y coordinate of a pixel point
         * @returns {number} Color value of a specified pixel point
         * @version Egret 2.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 获取某一点像素的颜色值
         * @param x {number} 像素点的X轴坐标
         * @param y {number} 像素点的Y轴坐标
         * @returns {number} 指定像素点的颜色值
         * @version Egret 2.0
         * @platform Web,Native
         */
        public getPixel32(x:number, y:number):number[] {
            var result:any = this._bitmapData.getContext("2d").getImageData(x, y, 1, 1);
            return result.data;
        }

        /**
         * @language en_US
         * Convert base64 string, if the picture (or pictures included) cross-border or null
         * @param type Type conversions, such as "image / png"
         * @param rect The need to convert the area
         * @param smoothing Whether to convert data to the smoothing process
         * @returns {any} base64 string
         * @platform Web
         * @version Egret 2.0.3
         */
        /**
         * @language zh_CN
         * 转换成base64字符串，如果图片（或者包含的图片）跨域，则返回null
         * @param type 转换的类型，如  "image/png"
         * @param rect 需要转换的区域
         * @returns {any} base64字符串
         * @platform Web
         * @version Egret 2.0.3
         */
        public toDataURL(type:string, rect?:egret.Rectangle):string {
            throw new Error();
        }

        /**
         * @private
         * @language en_US
         * Download base64 string
         * @param base64 base64 string
         */
        /**
         * @private
         * @language zh_CN
         * 下载base64字符串
         * @param base64 base64字符串
         * @platform Web
         * @version Egret 2.0.3
         */
        download(base64:string) {
            throw new Error();
        }

        /**
         * @language en_US
         * dispose texture
         * @version Egret 2.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 释放纹理
         * @version Egret 2.0
         * @platform Web,Native
         */
        public dispose():void {
            egret.ImageLoader.disposeBitmapData(this._bitmapData);
        }
    }
}

