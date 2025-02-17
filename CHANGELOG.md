# 7.0.0

-   Added new plugins
    -   `ImageExtender` - AI Image Extender
    -   `VideoUpscaler` - Upscale Videos using AI
    -   `IntelligentMasking` - Intelligent Mask sensitive contents from images using AI
    -   `VertexAI` - Remove Background and Upscale Images using Google Vertex AI
    -   `QRCode` - QR Code Generator and Scanner
-   Added new values for `quality` parameter in `toFormat` transformation and changed parameter type to `enum`.

# 6.1.0

-   Added new plugins
    -   `VideoWatermarkRemoval` - Video Watermark Removal
    -   `VariationGenerator` - AI Variation Generator
-   `Upload` function now returns uploaded file metadata if you use v2 signed URLs.

# 6.0.0

-   Added new plugins
    -   `SoftShadowGenerator` - AI Soft Shadow Generator
-   Transformations are updated to their latest API
-   Removed RemoveBG transformation

# 5.4.0

-   Added support for V2 PixelBin Multipart signed URL uploads
-   Update EraseBG plugin

# 5.3.0

-   Update SuperResolution Plugin
-   Fixed regex for Custom Domain URLs

# 5.2.2

-   Fixed types for `Image` & `Transformation`

# 5.2.1

-   Fixed types for `customTransformation`

# 5.2.0

-   Added support for GCS signed URL uploads

# 5.1.0

-   Fixed custom domain support in `objToUrl`
-   Added new plugins
    -   `NSFW Detection` - Detect NSFW content in images.

# 5.0.0

-   Removed axios as a dependency
-   Improved Node.js support
-   Reduced bundle size to 9kB (minified and gzipped)
-   Added support for parsing Custom Domains in `objToUrl` and `urlToObj`
-   Improved support for worker urls in `objToUrl` and `urlToObj`
-   Added support for worker urls in `PixelBin` and `Image`
-   Added new plugins
    -   `Background Generator` - AI Background Generator.
    -   `CheckObjectSize` - Calculates the percentage of the main object area relative to image dimensions.
    -   `CheckProductVisibility` - Classifies whether the product in the image is completely visible or not.
    -   `CheckObjectSize` - Classifies the background of a product as plain, clean or busy.
    -   `ObjectCounter` - Classifies whether objects in the image are single or multiple.
    -   `ObjectDetection` - Detect bounding boxes of objects in the image.
    -   `PDFWatermarkRemoval` - PDF Watermark Removal Plugin.
    -   `ProductTagging` - AI Product Tagging.
    -   `ViewDetection` - Classifies wear type and view type of products in the image

# 4.0.0

-   Transformations are updated to their latest API
-   Added new plugins `Watermark Detection`, `TextDetectionandRecognition`, `NumberPlateDetection`, `IntelligentCrop`, `ImageCentering`
-   `getUrl` now returns CDN version `v2` urls

# 3.0.0

-   Reduce bundled size from 61kB (minified and gzipped) to 14kB (minified and gzipped)
-   Remove direct import of `core-js` and `regenerator-runtime`
