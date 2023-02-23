import Pixelbin, { transformations } from "../pixelbin.js";
import { Transformation } from "../pixelbin.js";
import { merge } from "../transformations/Basic.js";
import EraseBG from "../transformations/EraseBG";
import ImageCentering from "../transformations/ImageCentering.js";
import IntelligentCrop from "../transformations/IntelligentCrop.js";
import NumberPlateDetection from "../transformations/NumberPlateDetection.js";
import SuperResolution from "../transformations/SuperResolution";
import OCR from "../transformations/TextDetectionandRecognition.js";
const { extend, resize, flip } = transformations.Basic;

describe("SDK tests", () => {
    it("should run", async () => {
        const pixelbin = new Pixelbin({
            cloudName: "cloudname",
            zone: "default",
        });

        expect(pixelbin.cloudName).toBe("cloudname");
        expect(pixelbin.zone).toBe("");
    });
    it("should accept an image uri and fetch url for original image", async () => {
        const pixelbin = new Pixelbin({
            cloudName: "cloudname",
            zone: "default",
        });
        const image = pixelbin.image("test-image.jpeg");
        expect(image.getUrl()).toBe(
            "https://cdn.pixelbin.io/v2/cloudname/original/test-image.jpeg",
        );
    });
    it("should accept an image uri and fetch url for original image with zone slug", async () => {
        const pixelbin = new Pixelbin({
            cloudName: "cloudname",
            zone: "testsl",
        });
        const image = pixelbin.image("test-image.jpeg");
        expect(image.getUrl()).toBe(
            "https://cdn.pixelbin.io/v2/cloudname/testsl/original/test-image.jpeg",
        );
    });
    it("should accept an image uri and fetch url for sharp resize", async () => {
        const pixelbin = new Pixelbin({
            cloudName: "cloudname",
            zone: "default",
        });
        const image = pixelbin.image("test-image.jpeg");
        let t = new Transformation();
        t = t.pipe(resize({ height: 200, width: 148 }));
        image.setTransformation(t);
        expect(image.getUrl()).toBe(
            "https://cdn.pixelbin.io/v2/cloudname/t.resize(h:200,w:148)/test-image.jpeg",
        );
    });
    it("should accept an image uri and fetch url for sharp flip", async () => {
        const pixelbin = new Pixelbin({
            cloudName: "cloudname",
            zone: "default",
        });
        const image = pixelbin.image("test-image.jpeg");
        let t = new Transformation();
        t = t.pipe(flip());
        image.setTransformation(t);
        expect(image.getUrl()).toBe(
            "https://cdn.pixelbin.io/v2/cloudname/t.flip()/test-image.jpeg",
        );
    });
    it("should accept an image uri and fetch url for sharp resize => erase.bg for ecommerce", async () => {
        const pixelbin = new Pixelbin({
            cloudName: "cloudname",
            zone: "default",
        });
        const image = pixelbin.image("test-image.jpeg");
        let t = new Transformation();
        t = t.pipe(resize({ height: 200, width: 148 }));
        t = t.pipe(EraseBG.bg({ industryType: "ecommerce" }));
        image.setTransformation(t);
        expect(image.getUrl()).toBe(
            "https://cdn.pixelbin.io/v2/cloudname/t.resize(h:200,w:148)~erase.bg(i:ecommerce)/test-image.jpeg",
        );
    });
    it("should accept an image uri and fetch url for sharp resize => erase.bg", async () => {
        const pixelbin = new Pixelbin({
            cloudName: "cloudname",
            zone: "default",
        });
        const image = pixelbin.image("test-image.jpeg");
        let t = new Transformation();
        t = t.pipe(resize({ height: 200, width: 148 }));
        t = t.pipe(EraseBG.bg());
        image.setTransformation(t);
        expect(image.getUrl()).toBe(
            "https://cdn.pixelbin.io/v2/cloudname/t.resize(h:200,w:148)~erase.bg(i:general,shadow:false)/test-image.jpeg",
        );
    });
    it("should accept an image uri and fetch url for sharp resize => sharp extend => upscale", async () => {
        const pixelbin = new Pixelbin({
            cloudName: "cloudname",
            zone: "default",
        });
        const image = pixelbin.image("test-image.jpeg");
        let t = new Transformation();
        t = t.pipe(resize({ height: 200, width: 148 }));
        t = t.pipe(extend());
        t = t.pipe(SuperResolution.upscale());
        image.setTransformation(t);
        expect(image.getUrl()).toBe(
            "https://cdn.pixelbin.io/v2/cloudname/t.resize(h:200,w:148)~t.extend(t:10,l:10,b:10,r:10,bc:000000,bt:constant,dpr:1)~sr.upscale(t:2x,enhance_face:false)/test-image.jpeg",
        );
    });
    it("should accept an image uri and fetch url for sharp resize => sharp extend => upscale 4x", async () => {
        const pixelbin = new Pixelbin({
            cloudName: "cloudname",
            zone: "default",
        });
        const image = pixelbin.image("test-image.jpeg");
        let t = new Transformation();
        t = t.pipe(resize({ height: 200, width: 148 }));
        t = t.pipe(extend());
        t = t.pipe(SuperResolution.upscale({ type: "4x" }));
        image.setTransformation(t);
        expect(image.getUrl()).toBe(
            "https://cdn.pixelbin.io/v2/cloudname/t.resize(h:200,w:148)~t.extend(t:10,l:10,b:10,r:10,bc:000000,bt:constant,dpr:1)~sr.upscale(t:4x)/test-image.jpeg",
        );
    });
    it("should accept an image uri and fetch url for sharp merge", async () => {
        const pixelbin = new Pixelbin({
            cloudName: "cloudname",
            zone: "default",
        });
        const image = pixelbin.image("test-image.jpeg");
        let t = new Transformation();
        t = t.pipe(merge());
        image.setTransformation(t);
        expect(image.getUrl()).toBe(
            "https://cdn.pixelbin.io/v2/cloudname/t.merge(m:overlay,bg:00000000,h:0,w:0,t:0,l:0,g:center,b:over,r:false)/test-image.jpeg",
        );
    });
    it("should accept an image uri and fetch url for sharp resize => sharp merge wrap mode bboxes => upscale 4x", async () => {
        const pixelbin = new Pixelbin({
            cloudName: "cloudname",
            zone: "default",
        });
        const image = pixelbin.image("test-image.jpeg");
        let t = new Transformation();
        t = t.pipe(resize({ height: 200, width: 148 }));
        t = t.pipe(merge({ mode: "wrap", listOfBboxes: "[[10_10_100_100]_[200_20_100_100]]" }));
        t = t.pipe(SuperResolution.upscale({ type: "4x" }));
        image.setTransformation(t);
        expect(image.getUrl()).toBe(
            "https://cdn.pixelbin.io/v2/cloudname/t.resize(h:200,w:148)~t.merge(m:wrap,bboxes:[[10_10_100_100]_[200_20_100_100]])~sr.upscale(t:4x)/test-image.jpeg",
        );
    });

    it("should accept an image uri and fetch url for sharp resize => sharp merge wrap mode polys => upscale 4x", async () => {
        const pixelbin = new Pixelbin({
            cloudName: "cloudname",
            zone: "default",
        });
        const image = pixelbin.image("test-image.jpeg");
        let t = new Transformation();
        t = t.pipe(resize({ height: 200, width: 148 }));
        t = t.pipe(
            merge({
                mode: "wrap",
                listOfPolygons:
                    "[[[10_20]_[110_20]_[120_140]_[10_140]]_[[210_220]_[120_220]_[60_340]_[280_340]]]",
            }),
        );
        t = t.pipe(SuperResolution.upscale({ type: "4x" }));
        image.setTransformation(t);
        expect(image.getUrl()).toBe(
            "https://cdn.pixelbin.io/v2/cloudname/t.resize(h:200,w:148)~t.merge(m:wrap,polys:[[[10_20]_[110_20]_[120_140]_[10_140]]_[[210_220]_[120_220]_[60_340]_[280_340]]])~sr.upscale(t:4x)/test-image.jpeg",
        );
    });

    it("should accept an image uri and fetch url for IntelligentCrop", async () => {
        const pixelbin = new Pixelbin({
            cloudName: "cloudname",
            zone: "default",
        });
        const image = pixelbin.image("test-image.jpeg");
        let t = new Transformation();
        t = t.pipe(IntelligentCrop.crop());
        image.setTransformation(t);
        expect(image.getUrl()).toBe(
            "https://cdn.pixelbin.io/v2/cloudname/ic.crop(w:0,h:0,p:0,ma:false,g:none,d:center,obj:person)/test-image.jpeg",
        );
    });
    it("should accept an image uri and fetch url for sharp resize => IntelligentCrop ObjectType banana => upscale 4x", async () => {
        const pixelbin = new Pixelbin({
            cloudName: "cloudname",
            zone: "default",
        });
        const image = pixelbin.image("test-image.jpeg");
        let t = new Transformation();
        t = t.pipe(resize({ height: 200, width: 148 }));
        t = t.pipe(IntelligentCrop.crop({ objectType: "banana" }));
        t = t.pipe(SuperResolution.upscale({ type: "4x" }));
        image.setTransformation(t);
        expect(image.getUrl()).toBe(
            "https://cdn.pixelbin.io/v2/cloudname/t.resize(h:200,w:148)~ic.crop(obj:banana)~sr.upscale(t:4x)/test-image.jpeg",
        );
    });
    it("should accept an image uri and fetch url for TextDetectionAndRecognition", async () => {
        const pixelbin = new Pixelbin({
            cloudName: "cloudname",
            zone: "default",
        });
        const image = pixelbin.image("test-image.jpeg");
        let t = new Transformation();
        t = t.pipe(OCR.extract());
        image.setTransformation(t);
        expect(image.getUrl()).toBe(
            "https://cdn.pixelbin.io/v2/cloudname/ocr.extract(detect_only:false)/test-image.jpeg",
        );
    });
    it("should accept an image uri and fetch url for sharp resize => TextDetectionAndRecognition detectOnly true => upscale 4x ", async () => {
        const pixelbin = new Pixelbin({
            cloudName: "cloudname",
            zone: "default",
        });
        const image = pixelbin.image("test-image.jpeg");
        let t = new Transformation();
        t = t.pipe(resize({ height: 200, width: 148 }));
        t = t.pipe(OCR.extract({ detectOnly: true }));
        t = t.pipe(SuperResolution.upscale({ type: "4x" }));
        image.setTransformation(t);
        expect(image.getUrl()).toBe(
            "https://cdn.pixelbin.io/v2/cloudname/t.resize(h:200,w:148)~ocr.extract(detect_only:true)~sr.upscale(t:4x)/test-image.jpeg",
        );
    });
    it("should accept an image uri and fetch url for NumberPlateDetection", async () => {
        const pixelbin = new Pixelbin({
            cloudName: "cloudname",
            zone: "default",
        });
        const image = pixelbin.image("test-image.jpeg");
        let t = new Transformation();
        t = t.pipe(NumberPlateDetection.detect());
        image.setTransformation(t);
        expect(image.getUrl()).toBe(
            "https://cdn.pixelbin.io/v2/cloudname/numPlate.detect()/test-image.jpeg",
        );
    });
    it("should accept an image uri and fetch url for sharp resize => NumberPlateDetection => upscale 4x ", async () => {
        const pixelbin = new Pixelbin({
            cloudName: "cloudname",
            zone: "default",
        });
        const image = pixelbin.image("test-image.jpeg");
        let t = new Transformation();
        t = t.pipe(resize({ height: 200, width: 148 }));
        t = t.pipe(NumberPlateDetection.detect());
        t = t.pipe(SuperResolution.upscale({ type: "4x" }));
        image.setTransformation(t);
        expect(image.getUrl()).toBe(
            "https://cdn.pixelbin.io/v2/cloudname/t.resize(h:200,w:148)~numPlate.detect()~sr.upscale(t:4x)/test-image.jpeg",
        );
    });
    it("should accept an image uri and fetch url for ImageCentering", async () => {
        const pixelbin = new Pixelbin({
            cloudName: "cloudname",
            zone: "default",
        });
        const image = pixelbin.image("test-image.jpeg");
        let t = new Transformation();
        t = t.pipe(ImageCentering.detect());
        image.setTransformation(t);
        expect(image.getUrl()).toBe(
            "https://cdn.pixelbin.io/v2/cloudname/imc.detect(dist_perc:10)/test-image.jpeg",
        );
    });
    it("should accept an image uri and fetch url for sharp resize => ImageCentering distancePercentage 20 => upscale 4x ", async () => {
        const pixelbin = new Pixelbin({
            cloudName: "cloudname",
            zone: "default",
        });
        const image = pixelbin.image("test-image.jpeg");
        let t = new Transformation();
        t = t.pipe(resize({ height: 200, width: 148 }));
        t = t.pipe(ImageCentering.detect({ distancePercentage: 20 }));
        t = t.pipe(SuperResolution.upscale({ type: "4x" }));
        image.setTransformation(t);
        expect(image.getUrl()).toBe(
            "https://cdn.pixelbin.io/v2/cloudname/t.resize(h:200,w:148)~imc.detect(dist_perc:20)~sr.upscale(t:4x)/test-image.jpeg",
        );
    });
});
