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
