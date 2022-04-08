import { Transformation } from "../pixelbin.js";
import { PDKIllegalArgumentError } from "../errors/PixelbinErrors";

describe("Transformation tests", () => {
    it("should throw invalid argument error if values not array", async () => {
        const t = () =>
            Transformation.customTransformation({
                plugin: "t",
                name: "resize",
                values: {
                    key: "h",
                    value: "100",
                },
            });
        expect(t).toThrow("Expected values to be an Array. Got object instead");
        expect(t).toThrow(PDKIllegalArgumentError);
    });
    it("should create transformation correctly", async () => {
        const t = Transformation.customTransformation({
            plugin: "t",
            name: "resize",
            values: [
                {
                    key: "h",
                    value: "100",
                },
            ],
        });
        expect(t.getTransformation()).toBe("t.resize(h:100)");
    });
    it("should create transformations where values is empty", async () => {
        const t = Transformation.customTransformation({
            plugin: "erase",
            name: "bg",
        });
        expect(t.getTransformation()).toBe("erase.bg()");
    });
    it("should create preset correctly", async () => {
        const t = Transformation.customTransformation({
            plugin: "p",
            name: "preset1",
        });
        expect(t.getTransformation()).toBe("p:preset1");
    });
});
