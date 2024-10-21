# Pixelbin Core SDK

Pixelbin Core SDK helps you integrate Pixelbin with your Frontend JS Application.

## Installation

```
npm install @pixelbin/core --save
```

## Usage

### Setup

```javascript
// Import the Pixelbin class
import Pixelbin from "@pixelbin/core";

// Create your instance
const pixelbin = new Pixelbin({
    cloudName: "demo",
    zone: "default", // optional
});
```

---

### Transform and Optimize Images

```javascript
// Import transformations
import Pixelbin, { transformations } from "@pixelbin/core";

const EraseBg = transformations.EraseBg;
const Basic = transformations.Basic;

// Create a new instance. If you have't (see above for the details)
const pixelbin = new Pixelbin({
    /*...*/
});

// Create EraseBg.bg transformation
let t1 = EraseBg.bg();

// Create resize transformation
const t2 = Basic.resize({ height: 100, width: 100 });

// create a new image
const demoImage = pixelbin.image("path/to/image"); // File Path on Pixelbin

// Add the transformations to the image
demoImage.setTransformation(t1.pipe(t2));

// Get the image url
console.log(demoImage.getUrl());
// output
// https://cdn.pixelbin.io/v2/your-cloud-name/z-slug/erase.bg()~t.resize(h:100,w:100)/path/to/image
```

---

### Add Pixelbin to HTML

Add the [this](./dist) distributable in a script tag

```html
<script src="pixelbin.v7.0.0.js"></script>
```

```javascript
// Pixelbin is available in the browser as `Pixelbin` on the window object
const pixelbin = new Pixelbin({ cloudName: "demo", zone: "default" });

// create an image with the pixelbin object
const image = pixelbin.image("demoImage.jpeg");

// create a transformation
let t = Pixelbin.transformations.Basic.resize({ height: 100, width: 100 });

// add Transformations to the image
image.setTransformation(t);

// get the url
image.getUrl();
// output
// https://cdn.pixelbin.io/v2/demo/default/t.resize(h:100,w:100)/demoImage.jpeg
```

---

## Upload images to pixelbin

The SDK provides a `upload` utility to upload images directly from the browser with a presigned url.

### upload(file, signedDetails):

| parameter                                                            | type                                                                                                                                                      |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| file ([File](https://developer.mozilla.org/en-US/docs/Web/API/File)) | File to upload to Pixelbin                                                                                                                                |
| signedDetails (Object)                                               | `signedDetails` can be generated with the Pixelbin Backend SDK [@pixelbin/admin](https://github.com/pixelbin-dev/pixelbin-js-admin).                      |
| options (Object)                                                     | Additional options for fine-tuning the upload process. Default: `{ chunkSize: 1 * 1024 * 1024, maxRetries: 2, concurrency: 3 }`                           |
| chunkSize (Number)                                                   | Size of each chunk to upload. Default is 1 megabyte. Recommended chunk size for 3g network - upto 5kb, 4g network - 500kb to 1MB, 5g network - 1MB to 2MB |
| maxRetries (Number)                                                  | Maximum number of retries if an upload fails. Default is 2 retries.                                                                                       |
| concurrency (Number)                                                 | Number of concurrent chunk upload tasks. Default is 3 concurrent chunk uploads.                                                                           |

**returns**: Promise

**On Success, Promise will either have no response on success if you use v1 signed URL or with file metadata when using v2 signed URL (Recommended)**

| property             | description                                                     | example                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| -------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| orgId (Number)       | Organization id                                                 | `5320086`                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| type (String)        |                                                                 | `file`                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| name (String)        | name of the file                                                | `testfile.jpeg`                                                                                                                                                                                                                                                                                                                                                                                                                            |
| path (String)        | Path of containing folder.                                      | `/path/to/image.jpeg`                                                                                                                                                                                                                                                                                                                                                                                                                      |
| fileId (String)      | id of file                                                      | `testfile.jpeg`                                                                                                                                                                                                                                                                                                                                                                                                                            |
| access (String)      | Access level of asset, can be either `public-read` or `private` | `public-read`                                                                                                                                                                                                                                                                                                                                                                                                                              |
| tags (Array<String>) | Tags associated with the file.                                  | `["tag1", "tag2"]`                                                                                                                                                                                                                                                                                                                                                                                                                         |
| metadata (Object)    | Metadata associated with the file.                              | `{"source:"", "publicUploadId":""}`                                                                                                                                                                                                                                                                                                                                                                                                        |
| format (String)      | file format                                                     | `jpeg`                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| assetType (String)   | type of asset                                                   | `image`                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| size (Number)        | file size                                                       | `37394`                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| width (Number)       | file width                                                      | `720`                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| height (Number)      | file height                                                     | `450`                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| context (Object)     | contains the file metadata and other contexts of file           | `{"steps":[],"req":{"headers":{},"query":{}},"meta":{"format":"png","size":195337,"width":812,"height":500,"space":"srgb","channels":4,"depth":"uchar","density":144,"isProgressive":false,"resolutionUnit":"inch","hasProfile":true,"hasAlpha":true,"extension":"jpeg","contentType":"image/png","assetType":"image","isImageAsset":true,"isAudioAsset":false,"isVideoAsset":false,"isRawAsset":false,"isTransformationSupported":true}}` |
| isOriginal (Boolean) | flag about files type                                           | `true`                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| \_id (String)        | record id                                                       | `a0b0b19a-d526-4xc07-ae51-0xxxxxx`                                                                                                                                                                                                                                                                                                                                                                                                         |
| url (String)         | uploaded image url                                              | `https://cdn.pixelbin.io/v2/user-e26cf3/original/testfile.jpeg`                                                                                                                                                                                                                                                                                                                                                                            |

Example :

1. Define an html file input element

```html
<input type="file" id="fileInput" />
```

2. Generate the presignedUrl with the backend sdk. [click here](https://github.com/pixelbin-dev/pixelbin-js-admin/blob/main/documentation/platform/ASSETS.md#createsignedurl).

3. Use the response object as is with the upload api as shown below.

```javascript
const fileInput = document.getElementById("fileInput");
// the signed url and fields can be generated and served with @pixelbin/admin

const handleFileInputEvent = function (e) {
    const file = e.target.files[0];
    Pixelbin.upload(file, signedDetails, {
        chunkSize: 2 * 1024 * 1024,
        maxRetries: 1,
        concurrency: 2,
    })
        .then((res) => console.log("Uploaded Successfully. Response: ", res))
        .catch((err) => console.log("Error while uploading"));
};
fileInput.addEventListener("change", handleFileInputEvent);
```

---

## Utilities

Pixelbin provides url utilities to construct and deconstruct Pixelbin urls.

### urlToObj

Deconstruct a pixelbin url

| Parameter             | Description                                                        | Example                                                                                               |
| --------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `url` (string)        | A valid Pixelbin URL                                               | `https://cdn.pixelbin.io/v2/your-cloud-name/z-slug/t.resize(h:100,w:200)~t.flip()/path/to/image.jpeg` |
| `opts` (Object)       | Options for the conversion                                         | Default: `{ isCustomDomain: false }`                                                                  |
| `opts.isCustomDomain` | Indicates if the URL belongs to a custom domain (default: `false`) |

**Returns**:

| Property                  | Description                                          | Example                               |
| ------------------------- | ---------------------------------------------------- | ------------------------------------- |
| `baseURL` (string)        | Base path of the URL                                 | `https://cdn.pixelbin.io`             |
| `filePath` (string)       | Path to the file on Pixelbin storage                 | `/path/to/image.jpeg`                 |
| `version` (string)        | Version of the URL                                   | `v2`                                  |
| `cloudName` (string)      | Cloud name from the URL                              | `your-cloud-name`                     |
| `transformations` (array) | A list of transformation objects                     | `[{ "plugin": "t", "name": "flip" }]` |
| `zone` (string)           | Zone slug from the URL                               | `z-slug`                              |
| `pattern` (string)        | Transformation pattern extracted from the URL        | `t.resize(h:100,w:200)~t.flip()`      |
| `worker` (boolean)        | Indicates if the URL is a URL Translation Worker URL | `false`                               |
| `workerPath` (string)     | Input path to a URL Translation Worker               | `resize:w200,h400/folder/image.jpeg`  |
| `options` (Object)        | Query parameters added, such as "dpr" and "f_auto"   | `{ dpr: 2.5, f_auto: true}`           |

Example:

```javascript
const pixelbinUrl =
    "https://cdn.pixelbin.io/v2/your-cloud-name/z-slug/t.resize(h:100,w:200)~t.flip()/path/to/image.jpeg";

const obj = Pixelbin.utils.urlToObj(pixelbinUrl);
// obj
// {
//     "cloudName": "your-cloud-name",
//     "zone": "z-slug",
//     "version": "v2",
//     "transformations": [
//         {
//             "plugin": "t",
//             "name": "resize",
//             "values": [
//                 {
//                     "key": "h",
//                     "value": "100"
//                 },
//                 {
//                     "key": "w",
//                     "value": "200"
//                 }
//             ]
//         },
//         {
//             "plugin": "t",
//             "name": "flip",
//         }
//     ],
//     "filePath": "path/to/image.jpeg",
//     "baseUrl": "https://cdn.pixelbin.io",
//     "wrkr": false,
//     "workerPath": "",
//     "options": {}
// }
```

```javascript
const customDomainUrl =
    "https://xyz.designify.media/v2/z-slug/t.resize(h:100,w:200)~t.flip()/path/to/image.jpeg";

const obj = Pixelbin.utils.urlToObj(customDomainUrl, { isCustomDomain: true });
// obj
// {
//     "zone": "z-slug",
//     "version": "v2",
//     "transformations": [
//         {
//             "plugin": "t",
//             "name": "resize",
//             "values": [
//                 {
//                     "key": "h",
//                     "value": "100"
//                 },
//                 {
//                     "key": "w",
//                     "value": "200"
//                 }
//             ]
//         },
//         {
//             "plugin": "t",
//             "name": "flip",
//         }
//     ],
//     "filePath": "path/to/image.jpeg",
//     "baseUrl": "https://xyz.designify.media",
//     "wrkr": false,
//     "workerPath": "",
//     "options": {}
// }
```

```javascript
const workerUrl =
    "https://cdn.pixelbin.io/v2/your-cloud-name/z-slug/wrkr/resize:h100,w:200/folder/image.jpeg";

const obj = Pixelbin.utils.urlToObj(pixelbinUrl);
// obj
// {
//     "cloudName": "your-cloud-name",
//     "zone": "z-slug",
//     "version": "v2",
//     "transformations": [],
//     "filePath": "",
//     "worker": true,
//     "workerPath": "resize:h100,w:200/folder/image.jpeg",
//     "baseUrl": "https://cdn.pixelbin.io"
//     "options": {}
// }
```

### objToUrl

Converts the extracted url obj to a Pixelbin url.

| Property                   | Description                                          | Example                               |
| -------------------------- | ---------------------------------------------------- | ------------------------------------- |
| `cloudName` (string)       | The cloudname extracted from the URL                 | `your-cloud-name`                     |
| `zone` (string)            | 6 character zone slug                                | `z-slug`                              |
| `version` (string)         | CDN API version                                      | `v2`                                  |
| `transformations` (array)  | Extracted transformations from the URL               | `[{ "plugin": "t", "name": "flip" }]` |
| `filePath` (string)        | Path to the file on Pixelbin storage                 | `/path/to/image.jpeg`                 |
| `baseUrl` (string)         | Base URL                                             | `https://cdn.pixelbin.io/`            |
| `isCustomDomain` (boolean) | Indicates if the URL is for a custom domain          | `false`                               |
| `worker` (boolean)         | Indicates if the URL is a URL Translation Worker URL | `false`                               |
| `workerPath` (string)      | Input path to a URL Translation Worker               | `resize:w200,h400/folder/image.jpeg`  |
| `options` (Object)         | Query parameters added, such as "dpr" and "f_auto"   | `{ "dpr": "2", "f_auto": "true" }`    |

```javascript
const obj = {
    cloudName: "your-cloud-name",
    zone: "z-slug",
    version: "v2",
    transformations: [
        {
            plugin: "t",
            name: "resize",
            values: [
                {
                    key: "h",
                    value: "100",
                },
                {
                    key: "w",
                    value: "200",
                },
            ],
        },
        {
            plugin: "t",
            name: "flip",
        },
    ],
    filePath: "path/to/image.jpeg",
    baseUrl: "https://cdn.pixelbin.io",
};
const url = Pixelbin.utils.objToUrl(obj); // obj is as shown above
// url
// https://cdn.pixelbin.io/v2/your-cloud-name/z-slug/t.resize(h:100,w:200)~t.flip()/path/to/image.jpeg
```

Usage with custom domain

```javascript
const obj = {
    zone: "z-slug",
    version: "v2",
    transformations: [
        {
            plugin: "t",
            name: "resize",
            values: [
                {
                    key: "h",
                    value: "100",
                },
                {
                    key: "w",
                    value: "200",
                },
            ],
        },
        {
            plugin: "t",
            name: "flip",
        },
    ],
    filePath: "path/to/image.jpeg",
    baseUrl: "https://xyz.designify.media",
    isCustomDomain: true,
};
const url = Pixelbin.utils.objToUrl(obj); // obj is as shown above
// url
// https://xyz.designify.media/v2/z-slug/t.resize(h:100,w:200)~t.flip()/path/to/image.jpeg
```

Usage with URL Translation Worker

```javascript
const obj = {
    cloudName: "your-cloud-name",
    zone: "z-slug",
    version: "v2",
    transformations: [],
    filePath: "",
    worker: true,
    workerPath: "resize:h100,w:200/folder/image.jpeg",
    baseUrl: "https://cdn.pixelbin.io",
};
const url = Pixelbin.utils.objToUrl(obj); // obj is as shown above
// url
// https://cdn.pixelbin.io/v2/your-cloud-name/z-slug/wrkr/resize:h100,w:200/folder/image.jpeg
```

## Transformation

A transformation is an operation or a list of operations that can be performed on an image. Please refer [list of supported transformations](#list-of-supported-transformations) for details.

```javascript
// import a resize transformation
import Pixelbin, { transformations } from "@pixelbin/core";

const { resize } = transformations.Basic;

// create the resize transformation
const t = resize({ height: 100, width: 100 });
```

Multiple transformations can be chained by using `and` on the created transformation object

```javascript
// import a resize transformation
import Pixelbin, { transformations } from "@pixelbin/core";

const { resize, flip } = transformations.Basic;

// create the basic transformations
const t1 = resize({ height: 100, width: 100 });
const t2 = flip();
const t3 = t1.pipe(t2);
```

## Image

Image class represents an image on Pixelbin.

```javascript
//To use the url translation worker feature, call image method on the pixelbin object whilst passing `worker` as true;
const image = pixelbin.image("path/to/image", { worker: true });
```

```javascript
//To create an Image, call image method on the pixelbin object;
const image = pixelbin.image("path/to/image");
```

Transformations can be set on an image by using `setTransformation` on the image object.

```javascript
image.setTransformation(t);
```

Note: Transformations won't be applied to the worker URLs generated from the SDK.

To get the url of the image with the applied transformations, use the `getUrl` on the image object.

```javascript
image.getUrl();
```

For a working example, refer [here](#transform-and-optimize-images)

## List of supported transformations

### 1. DetectBackgroundType

<details>
<summary> 1. detect </summary>

#### Usage Example

```javascript
const t = detect({});
```

</details>

### 2. Basic

<details>
<summary> 1. resize </summary>

#### Supported Configuration

| parameter  | type                                                                                                              | defaults   |
| ---------- | ----------------------------------------------------------------------------------------------------------------- | ---------- |
| height     | integer                                                                                                           | 0          |
| width      | integer                                                                                                           | 0          |
| fit        | enum : `cover` , `contain` , `fill` , `inside` , `outside`                                                        | `cover`    |
| background | color                                                                                                             | `000000`   |
| position   | enum : `top` , `bottom` , `left` , `right` , `right_top` , `right_bottom` , `left_top` , `left_bottom` , `center` | `center`   |
| algorithm  | enum : `nearest` , `cubic` , `mitchell` , `lanczos2` , `lanczos3`                                                 | `lanczos3` |
| dpr        | float                                                                                                             | 1          |

#### Usage Example

```javascript
const t = resize({
    height: 0,
    width: 0,
    fit: "cover",
    background: "000000",
    position: "center",
    algorithm: "lanczos3",
    dpr: 1,
});
```

</details>

<details>
<summary> 2. compress </summary>

#### Supported Configuration

| parameter | type    | defaults |
| --------- | ------- | -------- |
| quality   | integer | 80       |

#### Usage Example

```javascript
const t = compress({
    quality: 80,
});
```

</details>

<details>
<summary> 3. extend </summary>

#### Supported Configuration

| parameter  | type                                                 | defaults   |
| ---------- | ---------------------------------------------------- | ---------- |
| top        | integer                                              | 10         |
| left       | integer                                              | 10         |
| bottom     | integer                                              | 10         |
| right      | integer                                              | 10         |
| background | color                                                | `000000`   |
| borderType | enum : `constant` , `replicate` , `reflect` , `wrap` | `constant` |
| dpr        | float                                                | 1          |

#### Usage Example

```javascript
const t = extend({
    top: 10,
    left: 10,
    bottom: 10,
    right: 10,
    background: "000000",
    borderType: "constant",
    dpr: 1,
});
```

</details>

<details>
<summary> 4. extract </summary>

#### Supported Configuration

| parameter   | type    | defaults |
| ----------- | ------- | -------- |
| top         | integer | 10       |
| left        | integer | 10       |
| height      | integer | 50       |
| width       | integer | 20       |
| boundingBox | bbox    |          |

#### Usage Example

```javascript
const t = extract({
    top: 10,
    left: 10,
    height: 50,
    width: 20,
    boundingBox: null,
});
```

</details>

<details>
<summary> 5. trim </summary>

#### Supported Configuration

| parameter | type    | defaults |
| --------- | ------- | -------- |
| threshold | integer | 10       |

#### Usage Example

```javascript
const t = trim({
    threshold: 10,
});
```

</details>

<details>
<summary> 6. rotate </summary>

#### Supported Configuration

| parameter  | type    | defaults |
| ---------- | ------- | -------- |
| angle      | integer | 0        |
| background | color   | `000000` |

#### Usage Example

```javascript
const t = rotate({
    angle: 0,
    background: "000000",
});
```

</details>

<details>
<summary> 7. flip </summary>

#### Usage Example

```javascript
const t = flip({});
```

</details>

<details>
<summary> 8. flop </summary>

#### Usage Example

```javascript
const t = flop({});
```

</details>

<details>
<summary> 9. sharpen </summary>

#### Supported Configuration

| parameter | type  | defaults |
| --------- | ----- | -------- |
| sigma     | float | 1.5      |

#### Usage Example

```javascript
const t = sharpen({
    sigma: 1.5,
});
```

</details>

<details>
<summary> 10. median </summary>

#### Supported Configuration

| parameter | type    | defaults |
| --------- | ------- | -------- |
| size      | integer | 3        |

#### Usage Example

```javascript
const t = median({
    size: 3,
});
```

</details>

<details>
<summary> 11. blur </summary>

#### Supported Configuration

| parameter | type  | defaults |
| --------- | ----- | -------- |
| sigma     | float | 0.3      |
| dpr       | float | 1        |

#### Usage Example

```javascript
const t = blur({
    sigma: 0.3,
    dpr: 1,
});
```

</details>

<details>
<summary> 12. flatten </summary>

#### Supported Configuration

| parameter  | type  | defaults |
| ---------- | ----- | -------- |
| background | color | `000000` |

#### Usage Example

```javascript
const t = flatten({
    background: "000000",
});
```

</details>

<details>
<summary> 13. negate </summary>

#### Usage Example

```javascript
const t = negate({});
```

</details>

<details>
<summary> 14. normalise </summary>

#### Usage Example

```javascript
const t = normalise({});
```

</details>

<details>
<summary> 15. linear </summary>

#### Supported Configuration

| parameter | type    | defaults |
| --------- | ------- | -------- |
| a         | integer | 1        |
| b         | integer | 0        |

#### Usage Example

```javascript
const t = linear({
    a: 1,
    b: 0,
});
```

</details>

<details>
<summary> 16. modulate </summary>

#### Supported Configuration

| parameter  | type    | defaults |
| ---------- | ------- | -------- |
| brightness | float   | 1        |
| saturation | float   | 1        |
| hue        | integer | 90       |

#### Usage Example

```javascript
const t = modulate({
    brightness: 1,
    saturation: 1,
    hue: 90,
});
```

</details>

<details>
<summary> 17. grey </summary>

#### Usage Example

```javascript
const t = grey({});
```

</details>

<details>
<summary> 18. tint </summary>

#### Supported Configuration

| parameter | type  | defaults |
| --------- | ----- | -------- |
| color     | color | `000000` |

#### Usage Example

```javascript
const t = tint({
    color: "000000",
});
```

</details>

<details>
<summary> 19. toFormat </summary>

#### Supported Configuration

| parameter | type                                                                                                                               | defaults |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------- |
| format    | enum : `jpeg` , `png` , `webp` , `tiff` , `avif` , `bmp` , `heif`                                                                  | `jpeg`   |
| quality   | enum : `100` , `95` , `90` , `85` , `80` , `75` , `70` , `60` , `50` , `40` , `30` , `20` , `10` , `best` , `good` , `eco` , `low` | `75`     |

#### Usage Example

```javascript
const t = toFormat({
    format: "jpeg",
    quality: "75",
});
```

</details>

<details>
<summary> 20. density </summary>

#### Supported Configuration

| parameter | type    | defaults |
| --------- | ------- | -------- |
| density   | integer | 300      |

#### Usage Example

```javascript
const t = density({
    density: 300,
});
```

</details>

<details>
<summary> 21. merge </summary>

#### Supported Configuration

| parameter      | type                                                                                                                                                                                                                                                                                                                   | defaults   |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| mode           | enum : `overlay` , `underlay` , `wrap`                                                                                                                                                                                                                                                                                 | `overlay`  |
| image          | file                                                                                                                                                                                                                                                                                                                   | ``         |
| transformation | custom                                                                                                                                                                                                                                                                                                                 | ``         |
| background     | color                                                                                                                                                                                                                                                                                                                  | `00000000` |
| height         | integer                                                                                                                                                                                                                                                                                                                | 0          |
| width          | integer                                                                                                                                                                                                                                                                                                                | 0          |
| top            | integer                                                                                                                                                                                                                                                                                                                | 0          |
| left           | integer                                                                                                                                                                                                                                                                                                                | 0          |
| gravity        | enum : `northwest` , `north` , `northeast` , `east` , `center` , `west` , `southwest` , `south` , `southeast` , `custom`                                                                                                                                                                                               | `center`   |
| blend          | enum : `over` , `in` , `out` , `atop` , `dest` , `dest-over` , `dest-in` , `dest-out` , `dest-atop` , `xor` , `add` , `saturate` , `multiply` , `screen` , `overlay` , `darken` , `lighten` , `colour-dodge` , `color-dodge` , `colour-burn` , `color-burn` , `hard-light` , `soft-light` , `difference` , `exclusion` | `over`     |
| tile           | boolean                                                                                                                                                                                                                                                                                                                | false      |
| listOfBboxes   | bboxList                                                                                                                                                                                                                                                                                                               |            |
| listOfPolygons | polygonList                                                                                                                                                                                                                                                                                                            |            |

#### Usage Example

```javascript
const t = merge({
    mode: "overlay",
    image: "",
    transformation: "",
    background: "00000000",
    height: 0,
    width: 0,
    top: 0,
    left: 0,
    gravity: "center",
    blend: "over",
    tile: false,
    listOfBboxes: null,
    listOfPolygons: null,
});
```

</details>

### 3. Artifact

<details>
<summary> 1. remove </summary>

#### Usage Example

```javascript
const t = remove({});
```

</details>

### 4. AWSRekognitionPlugin

<details>
<summary> 1. detectLabels </summary>

#### Supported Configuration

| parameter         | type    | defaults |
| ----------------- | ------- | -------- |
| maximumLabels     | integer | 5        |
| minimumConfidence | integer | 55       |

#### Usage Example

```javascript
const t = detectLabels({
    maximumLabels: 5,
    minimumConfidence: 55,
});
```

</details>

<details>
<summary> 2. moderation </summary>

#### Supported Configuration

| parameter         | type    | defaults |
| ----------------- | ------- | -------- |
| minimumConfidence | integer | 55       |

#### Usage Example

```javascript
const t = moderation({
    minimumConfidence: 55,
});
```

</details>

### 5. BackgroundGenerator

<details>
<summary> 1. bg </summary>

#### Supported Configuration

| parameter        | type                            | defaults                                                                                                                   |
| ---------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| backgroundPrompt | custom                          | `YSBmb3Jlc3QgZnVsbCBvZiBvYWsgdHJlZXMsd2l0aCBicmlnaHQgbGlnaHRzLCBzdW4gYW5kIGEgbG90IG9mIG1hZ2ljLCB1bHRyYSByZWFsaXN0aWMsIDhr` |
| focus            | enum : `Product` , `Background` | `Product`                                                                                                                  |
| negativePrompt   | custom                          | ``                                                                                                                         |
| seed             | integer                         | 123                                                                                                                        |

#### Usage Example

```javascript
const t = bg({
    backgroundPrompt:
        "YSBmb3Jlc3QgZnVsbCBvZiBvYWsgdHJlZXMsd2l0aCBicmlnaHQgbGlnaHRzLCBzdW4gYW5kIGEgbG90IG9mIG1hZ2ljLCB1bHRyYSByZWFsaXN0aWMsIDhr",
    focus: "Product",
    negativePrompt: "",
    seed: 123,
});
```

</details>

### 6. ImageExtender

<details>
<summary> 1. extend </summary>

#### Supported Configuration

| parameter              | type    | defaults |
| ---------------------- | ------- | -------- |
| boundingBox            | bbox    |          |
| prompt                 | custom  | ``       |
| negativePrompt         | custom  | ``       |
| strength               | float   | 0.999    |
| guidanceScale          | integer | 8        |
| numberOfInferenceSteps | integer | 10       |
| colorAdjust            | boolean | false    |
| seed                   | integer | 123      |

#### Usage Example

```javascript
const t = extend({
    boundingBox: null,
    prompt: "",
    negativePrompt: "",
    strength: 0.999,
    guidanceScale: 8,
    numberOfInferenceSteps: 10,
    colorAdjust: false,
    seed: 123,
});
```

</details>

### 7. VariationGenerator

<details>
<summary> 1. generate </summary>

#### Supported Configuration

| parameter               | type    | defaults |
| ----------------------- | ------- | -------- |
| generateVariationPrompt | custom  | ``       |
| noOfVariations          | integer | 1        |
| seed                    | integer | 0        |
| autoscale               | boolean | true     |

#### Usage Example

```javascript
const t = generate({
    generateVariationPrompt: "",
    noOfVariations: 1,
    seed: 0,
    autoscale: true,
});
```

</details>

### 8. EraseBG

<details>
<summary> 1. bg </summary>

#### Supported Configuration

| parameter    | type                                                        | defaults  |
| ------------ | ----------------------------------------------------------- | --------- |
| industryType | enum : `general` , `ecommerce` , `car` , `human` , `object` | `general` |
| addShadow    | boolean                                                     | false     |
| refine       | boolean                                                     | true      |

#### Usage Example

```javascript
const t = bg({
    industryType: "general",
    addShadow: false,
    refine: true,
});
```

</details>

### 9. GoogleVisionPlugin

<details>
<summary> 1. detectLabels </summary>

#### Supported Configuration

| parameter     | type    | defaults |
| ------------- | ------- | -------- |
| maximumLabels | integer | 5        |

#### Usage Example

```javascript
const t = detectLabels({
    maximumLabels: 5,
});
```

</details>

### 10. ImageCentering

<details>
<summary> 1. detect </summary>

#### Supported Configuration

| parameter          | type    | defaults |
| ------------------ | ------- | -------- |
| distancePercentage | integer | 10       |

#### Usage Example

```javascript
const t = detect({
    distancePercentage: 10,
});
```

</details>

### 11. IntelligentCrop

<details>
<summary> 1. crop </summary>

#### Supported Configuration

| parameter              | type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | defaults |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| requiredWidth          | integer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 0        |
| requiredHeight         | integer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 0        |
| paddingPercentage      | integer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 0        |
| maintainOriginalAspect | boolean                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | false    |
| aspectRatio            | string                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ``       |
| gravityTowards         | enum : `object` , `foreground` , `face` , `none`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `none`   |
| preferredDirection     | enum : `north_west` , `north` , `north_east` , `west` , `center` , `east` , `south_west` , `south` , `south_east`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `center` |
| objectType             | enum : `airplane` , `apple` , `backpack` , `banana` , `baseball_bat` , `baseball_glove` , `bear` , `bed` , `bench` , `bicycle` , `bird` , `boat` , `book` , `bottle` , `bowl` , `broccoli` , `bus` , `cake` , `car` , `carrot` , `cat` , `cell_phone` , `chair` , `clock` , `couch` , `cow` , `cup` , `dining_table` , `dog` , `donut` , `elephant` , `fire_hydrant` , `fork` , `frisbee` , `giraffe` , `hair_drier` , `handbag` , `horse` , `hot_dog` , `keyboard` , `kite` , `knife` , `laptop` , `microwave` , `motorcycle` , `mouse` , `orange` , `oven` , `parking_meter` , `person` , `pizza` , `potted_plant` , `refrigerator` , `remote` , `sandwich` , `scissors` , `sheep` , `sink` , `skateboard` , `skis` , `snowboard` , `spoon` , `sports_ball` , `stop_sign` , `suitcase` , `surfboard` , `teddy_bear` , `tennis_racket` , `tie` , `toaster` , `toilet` , `toothbrush` , `traffic_light` , `train` , `truck` , `tv` , `umbrella` , `vase` , `wine_glass` , `zebra` | `person` |

#### Usage Example

```javascript
const t = crop({
    requiredWidth: 0,
    requiredHeight: 0,
    paddingPercentage: 0,
    maintainOriginalAspect: false,
    aspectRatio: "",
    gravityTowards: "none",
    preferredDirection: "center",
    objectType: "person",
});
```

</details>

### 12. IntelligentMasking

<details>
<summary> 1. mask </summary>

#### Supported Configuration

| parameter        | type                                      | defaults       |
| ---------------- | ----------------------------------------- | -------------- |
| replacementImage | file                                      | ``             |
| detector         | enum : `face` , `text` , `number_plate`   | `number_plate` |
| maskType         | enum : `fill_black` , `pixelate` , `blur` | `fill_black`   |

#### Usage Example

```javascript
const t = mask({
    replacementImage: "",
    detector: "number_plate",
    maskType: "fill_black",
});
```

</details>

### 13. ObjectCounter

<details>
<summary> 1. detect </summary>

#### Usage Example

```javascript
const t = detect({});
```

</details>

### 14. NSFWDetection

<details>
<summary> 1. detect </summary>

#### Supported Configuration

| parameter         | type  | defaults |
| ----------------- | ----- | -------- |
| minimumConfidence | float | 0.5      |

#### Usage Example

```javascript
const t = detect({
    minimumConfidence: 0.5,
});
```

</details>

### 15. NumberPlateDetection

<details>
<summary> 1. detect </summary>

#### Usage Example

```javascript
const t = detect({});
```

</details>

### 16. ObjectDetection

<details>
<summary> 1. detect </summary>

#### Usage Example

```javascript
const t = detect({});
```

</details>

### 17. CheckObjectSize

<details>
<summary> 1. detect </summary>

#### Supported Configuration

| parameter              | type    | defaults |
| ---------------------- | ------- | -------- |
| objectThresholdPercent | integer | 50       |

#### Usage Example

```javascript
const t = detect({
    objectThresholdPercent: 50,
});
```

</details>

### 18. TextDetectionandRecognition

<details>
<summary> 1. extract </summary>

#### Supported Configuration

| parameter  | type    | defaults |
| ---------- | ------- | -------- |
| detectOnly | boolean | false    |

#### Usage Example

```javascript
const t = extract({
    detectOnly: false,
});
```

</details>

### 19. PdfWatermarkRemoval

<details>
<summary> 1. remove </summary>

#### Usage Example

```javascript
const t = remove({});
```

</details>

### 20. ProductTagging

<details>
<summary> 1. tag </summary>

#### Usage Example

```javascript
const t = tag({});
```

</details>

### 21. CheckProductVisibility

<details>
<summary> 1. detect </summary>

#### Usage Example

```javascript
const t = detect({});
```

</details>

### 22. QRCode

<details>
<summary> 1. generate </summary>

#### Supported Configuration

| parameter              | type                                                                                 | defaults |
| ---------------------- | ------------------------------------------------------------------------------------ | -------- |
| width                  | integer                                                                              | 300      |
| height                 | integer                                                                              | 300      |
| image                  | custom                                                                               | ``       |
| margin                 | integer                                                                              | 0        |
| qRTypeNumber           | integer                                                                              | 0        |
| qrErrorCorrectionLevel | enum : `L` , `M` , `Q` , `H`                                                         | `Q`      |
| imageSize              | float                                                                                | 0.4      |
| imageMargin            | integer                                                                              | 0        |
| dotsColor              | color                                                                                | `000000` |
| dotsType               | enum : `rounded` , `dots` , `classy` , `classy-rounded` , `square` , `extra-rounded` | `square` |
| dotsBgColor            | color                                                                                | `ffffff` |
| cornerSquareColor      | color                                                                                | `000000` |
| cornerSquareType       | enum : `dot` , `square` , `extra-rounded`                                            | `square` |
| cornerDotsColor        | color                                                                                | `000000` |
| cornerDotsType         | enum : `dot` , `square`                                                              | `dot`    |

#### Usage Example

```javascript
const t = generate({
    width: 300,
    height: 300,
    image: "",
    margin: 0,
    qRTypeNumber: 0,
    qrErrorCorrectionLevel: "Q",
    imageSize: 0.4,
    imageMargin: 0,
    dotsColor: "000000",
    dotsType: "square",
    dotsBgColor: "ffffff",
    cornerSquareColor: "000000",
    cornerSquareType: "square",
    cornerDotsColor: "000000",
    cornerDotsType: "dot",
});
```

</details>

<details>
<summary> 2. scan </summary>

#### Usage Example

```javascript
const t = scan({});
```

</details>

### 23. SoftShadowGenerator

<details>
<summary> 1. gen </summary>

#### Supported Configuration

| parameter       | type  | defaults |
| --------------- | ----- | -------- |
| backgroundImage | file  |          |
| backgroundColor | color | `ffffff` |
| shadowAngle     | float | 120      |
| shadowIntensity | float | 0.5      |

#### Usage Example

```javascript
const t = gen({
    backgroundImage: null,
    backgroundColor: "ffffff",
    shadowAngle: 120,
    shadowIntensity: 0.5,
});
```

</details>

### 24. SuperResolution

<details>
<summary> 1. upscale </summary>

#### Supported Configuration

| parameter      | type                       | defaults  |
| -------------- | -------------------------- | --------- |
| type           | enum : `2x` , `4x` , `8x`  | `2x`      |
| enhanceFace    | boolean                    | false     |
| model          | enum : `Picasso` , `Flash` | `Picasso` |
| enhanceQuality | boolean                    | false     |

#### Usage Example

```javascript
const t = upscale({
    type: "2x",
    enhanceFace: false,
    model: "Picasso",
    enhanceQuality: false,
});
```

</details>

### 25. VertexAI

<details>
<summary> 1. generateBG </summary>

#### Supported Configuration

| parameter        | type    | defaults                                                                                                                   |
| ---------------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| backgroundPrompt | custom  | `YSBmb3Jlc3QgZnVsbCBvZiBvYWsgdHJlZXMsd2l0aCBicmlnaHQgbGlnaHRzLCBzdW4gYW5kIGEgbG90IG9mIG1hZ2ljLCB1bHRyYSByZWFsaXN0aWMsIDhr` |
| negativePrompt   | custom  | ``                                                                                                                         |
| seed             | integer | 22                                                                                                                         |
| guidanceScale    | integer | 60                                                                                                                         |

#### Usage Example

```javascript
const t = generateBG({
    backgroundPrompt:
        "YSBmb3Jlc3QgZnVsbCBvZiBvYWsgdHJlZXMsd2l0aCBicmlnaHQgbGlnaHRzLCBzdW4gYW5kIGEgbG90IG9mIG1hZ2ljLCB1bHRyYSByZWFsaXN0aWMsIDhr",
    negativePrompt: "",
    seed: 22,
    guidanceScale: 60,
});
```

</details>

<details>
<summary> 2. removeBG </summary>

#### Usage Example

```javascript
const t = removeBG({});
```

</details>

<details>
<summary> 3. upscale </summary>

#### Supported Configuration

| parameter | type               | defaults |
| --------- | ------------------ | -------- |
| type      | enum : `x2` , `x4` | `x2`     |

#### Usage Example

```javascript
const t = upscale({
    type: "x2",
});
```

</details>

### 26. VideoWatermarkRemoval

<details>
<summary> 1. remove </summary>

#### Usage Example

```javascript
const t = remove({});
```

</details>

### 27. VideoUpscalerPlugin

<details>
<summary> 1. upscale </summary>

#### Usage Example

```javascript
const t = upscale({});
```

</details>

### 28. ViewDetection

<details>
<summary> 1. detect </summary>

#### Usage Example

```javascript
const t = detect({});
```

</details>

### 29. WatermarkRemoval

<details>
<summary> 1. remove </summary>

#### Supported Configuration

| parameter  | type    | defaults      |
| ---------- | ------- | ------------- |
| removeText | boolean | false         |
| removeLogo | boolean | false         |
| box1       | string  | `0_0_100_100` |
| box2       | string  | `0_0_0_0`     |
| box3       | string  | `0_0_0_0`     |
| box4       | string  | `0_0_0_0`     |
| box5       | string  | `0_0_0_0`     |

#### Usage Example

```javascript
const t = remove({
    removeText: false,
    removeLogo: false,
    box1: "0_0_100_100",
    box2: "0_0_0_0",
    box3: "0_0_0_0",
    box4: "0_0_0_0",
    box5: "0_0_0_0",
});
```

</details>

### 30. WatermarkDetection

<details>
<summary> 1. detect </summary>

#### Supported Configuration

| parameter  | type    | defaults |
| ---------- | ------- | -------- |
| detectText | boolean | false    |

#### Usage Example

```javascript
const t = detect({
    detectText: false,
});
```

</details>
