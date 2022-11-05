import { PDKIllegalArgumentError, PDKInvalidUrlError, PDKIllegalQueryParameterError } from "../errors/PixelbinErrors";
import { objToUrl, urlToObj } from "../utils";

describe("UrlUtils tests", () => {
    it("should get obj from url", async () => {
        const obj = urlToObj(
            "https://cdn.pixelbin.io/v2/red-scene-95b6ea/t.resize()/__playground/playground-default.jpeg",
        );
        const expectedObj = {
            transformations: [
                {
                    "plugin": "t",
                    "name": "resize",
                }
            ],
            cloudName: "red-scene-95b6ea",
            zone: undefined,
            baseUrl: "https://cdn.pixelbin.io",
            version: "v2",
            filePath: "__playground/playground-default.jpeg"
        };
        expect(obj).toMatchObject(expectedObj);
    });
    it("should get obj from url no version", async () => {
        const obj = urlToObj(
            "https://cdn.pixelbin.io/red-scene-95b6ea/t.resize()/__playground/playground-default.jpeg",
        );
        const expectedObj = {
            transformations: [
                {
                    "plugin": "t",
                    "name": "resize",
                }
            ],
            cloudName: "red-scene-95b6ea",
            zone: undefined,
            baseUrl: "https://cdn.pixelbin.io",
            version: "v1",
            filePath: "__playground/playground-default.jpeg"
        };
        expect(obj).toMatchObject(expectedObj);
    });
    it("should get obj from url - 1", async () => {
        const obj = urlToObj(
            "https://cdn.pixelbin.io/v2/red-scene-95b6ea/t.resize(h:200,w:100)/__playground/playground-default.jpeg",
        );
        const expectedObj = {
            transformations: [
                {
                    "plugin": "t",
                    "name": "resize",
                    "values": [
                        {
                            "key": "h",
                            "value": "200"
                        },
                        {
                            "key": "w",
                            "value": "100"
                        }
                    ]
                }
            ],
            cloudName: "red-scene-95b6ea",
            zone: undefined,
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "__playground/playground-default.jpeg"
        };
        expect(obj).toMatchObject(expectedObj);

    });
    it("should get obj from url - Invalid URL", async () => {
        expect(() =>
            urlToObj(
                "https://cdn.pixelbin.io/v2/asd/dccdc01/original/__playground/playground-default.jpeg",
            ),
        ).toThrow(PDKInvalidUrlError);
    });
    it("should get obj from url - 2", async () => {
        const obj = urlToObj(
            "https://cdn.pixelbin.io/v2/red-scene-95b6ea/t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()/__playground/playground-default.jpeg",
        );
        const expectedObj = {
            transformations: [
                {
                    "plugin": "t",
                    "name": "resize",
                    "values": [
                        {
                            "key": "h",
                            "value": "200"
                        },
                        {
                            "key": "w",
                            "value": "100"
                        },
                        {
                            key: "fill",
                            value: "999"
                        }
                    ]
                },
                {
                    "plugin": "erase",
                    "name": "bg",
                },
                {
                    "plugin": "t",
                    "name": "extend",
                }
            ],
            cloudName: "red-scene-95b6ea",
            zone: undefined,
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "__playground/playground-default.jpeg"
        };
        expect(obj).toMatchObject(expectedObj);
    });
    it("should get obj from url with preset", async () => {
        const presetUrl =
            "https://cdn.pixelbin.io/v2/red-scene-95b6ea/t.compress()~t.resize()~t.extend()~p.apply(n:presetNameXyx)/alien_fig_tree_planet_x_wallingford_seattle_washington_usa_517559.jpeg";
        const obj = urlToObj(presetUrl);
        const expectedObj = {
            transformations: [{"name": "compress", "plugin": "t"}, {"name": "resize", "plugin": "t"}, {"name": "extend", "plugin": "t"}, {plugin: "p", "name": "presetNameXyx"}],
            cloudName: "red-scene-95b6ea",
            zone: undefined,
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "alien_fig_tree_planet_x_wallingford_seattle_washington_usa_517559.jpeg"
        };
        expect(obj).toMatchObject(expectedObj);
    });
    it("should get obj from url with zone", async () => {
        const presetUrl =
            "https://cdn.pixelbin.io/v2/red-scene-95b6ea/z-slug/t.compress()~t.resize()~t.extend()~p.apply(n:presetNameXyx)/alien_fig_tree_planet_x_wallingford_seattle_washington_usa_517559.jpeg";
        const obj = urlToObj(presetUrl);
        const expectedObj = {
            transformations: [{"name": "compress", "plugin": "t"}, {"name": "resize", "plugin": "t"}, {"name": "extend", "plugin": "t"}, {plugin: "p", "name": "presetNameXyx"}],
            cloudName: "red-scene-95b6ea",
            zone: "z-slug",
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "alien_fig_tree_planet_x_wallingford_seattle_washington_usa_517559.jpeg"
        };
        expect(obj).toMatchObject(expectedObj);
    });
    it("should generate url from obj", async () => {
        const transformations = [
            {
                plugin: "t",
                name: "resize",
                values: [
                    {
                        key: "h",
                        value: "200",
                    },
                    {
                        key: "w",
                        value: "100",
                    },
                    {
                        key: "fill",
                        value: "999",
                    },
                ],
            },
            {
                plugin: "erase",
                name: "bg",
            },
            {
                plugin: "t",
                name: "extend",
            },
            {
                plugin: "p",
                name: "preset1",
            },
        ];
        const obj = {
            cloudName: "red-scene-95b6ea",
            zone: "z-slug",
            version: "v2",
            transformations: transformations,
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "__playground/playground-default.jpeg",
        };
        let url = objToUrl(obj);
        expect(url).toBe(
            "https://cdn.pixelbin.io/v2/red-scene-95b6ea/z-slug/t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()~p:preset1/__playground/playground-default.jpeg",
        );
        obj.version = "v1";
        url = objToUrl(obj);
        expect(url).toBe(
            "https://cdn.pixelbin.io/v1/red-scene-95b6ea/z-slug/t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()~p:preset1/__playground/playground-default.jpeg",
        );
    });
    it("should generate url from obj when empty", async () => {
        const transformations = [];
        const obj = {
            cloudName: "red-scene-95b6ea",
            zone: "z-slug",
            version: "v2",
            transformations: transformations,
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "__playground/playground-default.jpeg",
        };
        let url = objToUrl(obj);
        // expect(urlUtils.generatePixelbinPattern(transformation)).toBe("t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()~p:preset1");
        expect(url).toBe(
            "https://cdn.pixelbin.io/v2/red-scene-95b6ea/z-slug/original/__playground/playground-default.jpeg",
        );
        obj.version = "v1";
        url = objToUrl(obj);
        expect(url).toBe(
            "https://cdn.pixelbin.io/v1/red-scene-95b6ea/z-slug/original/__playground/playground-default.jpeg",
        );
    });
    it("should generate url from obj undefined", async () => {
        const obj = {
            cloudName: "red-scene-95b6ea",
            zone: "z-slug",
            version: "v2",
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "__playground/playground-default.jpeg",
        };
        let url = objToUrl(obj);
        // expect(urlUtils.generatePixelbinPattern(transformation)).toBe("t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()~p:preset1");
        expect(url).toBe(
            "https://cdn.pixelbin.io/v2/red-scene-95b6ea/z-slug/original/__playground/playground-default.jpeg",
        );
        obj.version = "v1";
        url = objToUrl(obj);
        expect(url).toBe(
            "https://cdn.pixelbin.io/v1/red-scene-95b6ea/z-slug/original/__playground/playground-default.jpeg",
        );
    });
    it("should generate url from obj  empty object", async () => {
        const obj = {
            cloudName: "red-scene-95b6ea",
            zone: "z-slug",
            version: "v2",
            transformations: [{}],
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "__playground/playground-default.jpeg",
        };
        let url = objToUrl(obj);
        // expect(urlUtils.generatePixelbinPattern(transformation)).toBe("t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()~p:preset1");
        expect(url).toBe(
            "https://cdn.pixelbin.io/v2/red-scene-95b6ea/z-slug/original/__playground/playground-default.jpeg",
        );
        obj.version = "v1";
        url = objToUrl(obj);
        expect(url).toBe(
            "https://cdn.pixelbin.io/v1/red-scene-95b6ea/z-slug/original/__playground/playground-default.jpeg",
        );
    });
    it("should throw error to generate url from obj if filePath not defined", async () => {
        const obj = {
            cloudName: "red-scene-95b6ea",
            zone: "z-slug",
            version: "v2",
            transformations: [{}],
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "",
        };
        try {
            objToUrl(obj);
            throw new Error("should not be called");
        } catch (err) {
            expect(err).toBeInstanceOf(PDKIllegalArgumentError);
        }
    });
    it("should get obj from url with options if available", async () => {
        const obj = urlToObj(
            "https://cdn.pixelbin.io/v2/feel/erase.bg(shadow:true)~t.merge(m:underlay,i:eU44YkFJOHlVMmZrWVRDOUNTRm1D,b:screen,r:true)/MZZKB3e1hT48o0NYJ2Kxh.jpeg?dpr=2.5&f_auto=true"
        );
        const expectedObj = {
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "MZZKB3e1hT48o0NYJ2Kxh.jpeg",
            version: "v2",
            zone: undefined,
            cloudName: "feel",
            options: {
                dpr: 2.5,
                f_auto: true,
            },
            transformations: [
                {
                    values: [
                        {
                            key: "shadow",
                            value: "true",
                        },
                    ],
                    plugin: "erase",
                    name: "bg",
                },
                {
                    values: [
                        {
                            key: "m",
                            value: "underlay",
                        },
                        {
                            key: "i",
                            value: "eU44YkFJOHlVMmZrWVRDOUNTRm1D",
                        },
                        {
                            key: "b",
                            value: "screen",
                        },
                        {
                            key: "r",
                            value: "true",
                        },
                    ],
                    plugin: "t",
                    name: "merge",
                },
            ],
        };
        expect(obj).toStrictEqual(expectedObj);
    });
    it("should generate url from obj with options if available", async () => {
        const obj = {
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "__playground/playground-default.jpeg",
            version: "v2",
            zone: "z-slug",
            cloudName: "red-scene-95b6ea",
            options: { dpr: 2.5, f_auto: true },
            transformations: [{}],
        };
        let generatedUrl = objToUrl(obj);
        expect(generatedUrl).toBe(
            "https://cdn.pixelbin.io/v2/red-scene-95b6ea/z-slug/original/__playground/playground-default.jpeg?dpr=2.5&f_auto=true"
        );
    });
    it("should get failure while retrieving obj from url with invalid options", async () => {
        const url =
            "https://cdn.pixelbin.io/v2/feel/erase.bg(shadow:true)~t.merge(m:underlay,i:eU44YkFJOHlVMmZrWVRDOUNTRm1D,b:screen,r:true)/MZZKB3e1hT48o0NYJ2Kxh.jpeg?dpr=5.5&f_auto=true";
        expect(() => urlToObj(url)).toThrow(PDKIllegalQueryParameterError);
    });
    it("should get failure while retrieving url from obj with invalid options", async () => {
        const obj = {
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "__playground/playground-default.jpeg",
            version: "v2",
            zone: "z-slug",
            cloudName: "red-scene-95b6ea",
            options: { dpr: 2.5, f_auto: "abc" },
            transformations: [{}],
        };
        expect(() => objToUrl(obj)).toThrow(PDKIllegalQueryParameterError);
    });
});
