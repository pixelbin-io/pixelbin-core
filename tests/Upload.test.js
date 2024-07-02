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

    it("should upload using multipart upload if pixelbin signedUrl", async () => {
        const spy = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => {
                return {
                    data: "data",
                };
            },
        });
        jest.spyOn(httpUtils, "makeRequest").mockImplementation(spy);

        // it will be a file in browser/react usage
        const res = await Pixelbin.upload(Buffer.from("hello"), {
            url: "https://api.pixelbin.io/service/public/assets/v1.0/signed-multipart",
            fields: { key: "value" },
        });

        expect(res).toEqual({
            data: "data",
        });
        expect(spy).toHaveBeenCalledWith(
            "https://api.pixelbin.io/service/public/assets/v1.0/signed-multipart?partNumber=1",
            {
                method: "PUT",
                body: expect.any(FormData),
            },
        );
        expect(spy).toHaveBeenCalledWith(
            "https://api.pixelbin.io/service/public/assets/v1.0/signed-multipart",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    parts: [1],
                    key: "value",
                }),
            },
        );
    });
});
