import Pixelbin from "../pixelbin.js";
import { default as FormData } from "form-data";
import httpUtils from "../utils/http.utils.js";

describe("SDK tests", () => {
    it("should upload file using signedUrl details", async () => {
        const spy = jest.fn().mockResolvedValueOnce({ ok: true });
        jest.spyOn(httpUtils, "makeRequest").mockImplementation(spy);

        const res = await Pixelbin.upload(
            new File(["hello"], "hello.txt", { type: "text/plain" }),
            {
                url: "https://storage.googleapis.com/abc",
                fields: { key: "value" },
            },
        );

        expect(spy).toHaveBeenCalledWith("https://storage.googleapis.com/abc", {
            method: "PUT",
            body: new File(["hello"], "hello.txt", { type: "text/plain" }),
            headers: {
                key: "value",
            },
        });
    });

    it("should upload file using POST method if S3 signedUrl", async () => {
        const spy = jest.fn().mockResolvedValueOnce({ ok: true });
        jest.spyOn(httpUtils, "makeRequest").mockImplementation(spy);

        const res = await Pixelbin.upload(Buffer.from("hello"), {
            url: "https://dummy-bucket.s3.ap-south-1.amazonaws.com/",
            fields: { key: "value" },
        });

        expect(spy).toHaveBeenCalledWith("https://dummy-bucket.s3.ap-south-1.amazonaws.com/", {
            method: "POST",
            body: expect.any(FormData),
        });
    });
});
