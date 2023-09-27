import { PDKIllegalQueryParameterError, PDKIllegalArgumentError } from "../errors/PixelbinErrors";
import { objToUrl, urlToObj } from "../utils";

describe("UrlUtils tests", () => {
    it("should get obj from url", async () => {
        const obj = urlToObj(
            "https://cdn.pixelbin.io/v2/red-scene-95b6ea/t.resize()/__playground/playground-default.jpeg",
        );
        const expectedObj = {
            transformations: [
                {
                    plugin: "t",
                    name: "resize",
                },
            ],
            cloudName: "red-scene-95b6ea",
            zone: undefined,
            baseUrl: "https://cdn.pixelbin.io",
            pattern: "t.resize()",
            version: "v2",
            filePath: "__playground/playground-default.jpeg",
            worker: false,
            workerPath: "",
            options: {},
        };
        expect(obj).toEqual(expectedObj);
    });
    it("should get obj from url - 1", async () => {
        const obj = urlToObj(
            "https://cdn.pixelbin.io/v2/dill-doe-36b4fc/t.rotate(a:102)/__playground/playground-default.jpeg",
        );
        const expectedObj = {
            transformations: [
                {
                    plugin: "t",
                    name: "rotate",
                    values: [
                        {
                            key: "a",
                            value: "102",
                        },
                    ],
                },
            ],
            cloudName: "dill-doe-36b4fc",
            zone: undefined,
            baseUrl: "https://cdn.pixelbin.io",
            pattern: "t.rotate(a:102)",
            version: "v2",
            filePath: "__playground/playground-default.jpeg",
            worker: false,
            workerPath: "",
            options: {},
        };
        expect(obj).toEqual(expectedObj);
    });
    it("should get obj from url no version", async () => {
        const obj = urlToObj(
            "https://cdn.pixelbin.io/red-scene-95b6ea/t.resize()/__playground/playground-default.jpeg",
        );
        const expectedObj = {
            transformations: [
                {
                    plugin: "t",
                    name: "resize",
                },
            ],
            cloudName: "red-scene-95b6ea",
            zone: undefined,
            baseUrl: "https://cdn.pixelbin.io",
            pattern: "t.resize()",
            version: "v1",
            filePath: "__playground/playground-default.jpeg",
            worker: false,
            workerPath: "",
            options: {},
        };
        expect(obj).toEqual(expectedObj);
    });
    it("should get obj from url with zoneslug ", async () => {
        const obj = urlToObj(
            "https://cdn.pixelbin.io/red-scene-95b6ea/zonesl/t.resize()/__playground/playground-default.jpeg",
        );
        const expectedObj = {
            transformations: [
                {
                    plugin: "t",
                    name: "resize",
                },
            ],
            cloudName: "red-scene-95b6ea",
            zone: "zonesl",
            baseUrl: "https://cdn.pixelbin.io",
            pattern: "t.resize()",
            version: "v1",
            filePath: "__playground/playground-default.jpeg",
            worker: false,
            workerPath: "",
            options: {},
        };
        expect(obj).toEqual(expectedObj);
    });
    it("should get obj from url - error", async () => {
        const obj = urlToObj(
            "https://cdn.pixelbin.io/v2/sparkling-moon-a7b75b/t.resize(w:200,h:200)/upload/p1/w/random.jpeg",
        );
        const expectedObj = {
            transformations: [
                {
                    plugin: "t",
                    name: "resize",
                    values: [
                        {
                            key: "w",
                            value: "200",
                        },
                        {
                            key: "h",
                            value: "200",
                        },
                    ],
                },
            ],
            cloudName: "sparkling-moon-a7b75b",
            zone: undefined,
            baseUrl: "https://cdn.pixelbin.io",
            pattern: "t.resize(w:200,h:200)",
            version: "v2",
            filePath: "upload/p1/w/random.jpeg",
            worker: false,
            workerPath: "",
            options: {},
        };
        expect(obj).toEqual(expectedObj);
    });
    it("should get obj from url - error 1", async () => {
        expect(() => urlToObj("https://cdn.pixelbin.io/v2")).toThrowError(
            "Invalid pixelbin url. Please make sure the url is correct.",
        );
    });
    it("should get obj from url - error 2", async () => {
        const obj = urlToObj(
            "https://cdn.pixelbin.io/doc/original/searchlight/platform-panel/settings/policy/faq/add-faq-group.png",
        );
        const expectedObj = {
            transformations: [],
            cloudName: "doc",
            zone: undefined,
            baseUrl: "https://cdn.pixelbin.io",
            pattern: "original",
            version: "v1",
            filePath: "searchlight/platform-panel/settings/policy/faq/add-faq-group.png",
            worker: false,
            workerPath: "",
            options: {},
        };
        expect(obj).toEqual(expectedObj);
    });
    it("should get obj from url - error 3", async () => {
        const obj = urlToObj(
            "https://cdn.pixelbin.io/v2/dac/ek69d0/original/__playground/playground-default.jpeg",
        );
        const expectedObj = {
            transformations: [],
            cloudName: "dac",
            zone: "ek69d0",
            baseUrl: "https://cdn.pixelbin.io",
            pattern: "original",
            version: "v2",
            filePath: "__playground/playground-default.jpeg",
            worker: false,
            workerPath: "",
            options: {},
        };
        expect(obj).toEqual(expectedObj);
    });
    it("should get obj from url - 1", async () => {
        const obj = urlToObj(
            "https://cdn.pixelbin.io/v2/red-scene-95b6ea/t.resize(h:200,w:100)/__playground/playground-default.jpeg",
        );
        const expectedObj = {
            transformations: [
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
                    ],
                },
            ],
            cloudName: "red-scene-95b6ea",
            zone: undefined,
            baseUrl: "https://cdn.pixelbin.io",
            pattern: "t.resize(h:200,w:100)",
            version: "v2",
            filePath: "__playground/playground-default.jpeg",
            worker: false,
            workerPath: "",
            options: {},
        };
        expect(obj).toEqual(expectedObj);
    });
    it("should get obj from url - 2", async () => {
        const obj = urlToObj(
            "https://cdn.pixelbin.io/v2/red-scene-95b6ea/t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()/__playground/playground-default.jpeg",
        );
        const expectedObj = {
            transformations: [
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
            ],
            cloudName: "red-scene-95b6ea",
            zone: undefined,
            baseUrl: "https://cdn.pixelbin.io",
            pattern: "t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()",
            version: "v2",
            filePath: "__playground/playground-default.jpeg",
            worker: false,
            workerPath: "",
            options: {},
        };
        expect(obj).toEqual(expectedObj);
    });
    it("should get obj from url with preset", async () => {
        const presetUrl =
            "https://cdn.pixelbin.io/v2/red-scene-95b6ea/z-slug/t.compress()~t.resize()~t.extend()~p.apply(n:presetNameXyx)/alien_fig_tree_planet_x_wallingford_seattle_washington_usa_517559.jpeg";
        const obj = urlToObj(presetUrl);
        const expectedObj = {
            transformations: [
                { name: "compress", plugin: "t" },
                { name: "resize", plugin: "t" },
                { name: "extend", plugin: "t" },
                { plugin: "p", name: "apply", values: [{ key: "n", value: "presetNameXyx" }] },
            ],
            cloudName: "red-scene-95b6ea",
            zone: "z-slug",
            baseUrl: "https://cdn.pixelbin.io",
            pattern: "t.compress()~t.resize()~t.extend()~p.apply(n:presetNameXyx)",
            version: "v2",
            filePath: "alien_fig_tree_planet_x_wallingford_seattle_washington_usa_517559.jpeg",
            worker: false,
            workerPath: "",
            options: {},
        };
        expect(obj).toEqual(expectedObj);
    });
    it("should get obj from url with preset", async () => {
        const presetUrl =
            "https://cdn.pixelbin.io/v3/red-scene-95b6ea/t.compress()~t.resize()~t.extend()~p.apply(n:presetNameXyx)/alien_fig_tree_planet_x_wallingford_seattle_washington_usa_517559.jpeg";
        expect(() => urlToObj(presetUrl)).toThrowError(
            "Invalid pixelbin url. Please make sure the url is correct.",
        );
    });
    it("should handle incorrect urls", async () => {
        expect(() =>
            urlToObj(
                "https://cdn.pixelbin.io//v2/dill-doe-36b4fc/original~original/__playground/playground-default.jpeg",
            ),
        ).toThrowError("Invalid pixelbin url. Please make sure the url is correct.");
    });
    it("should handle incorrect urls - incorrect zone", async () => {
        const presetUrl =
            "https://cdn.pixelbin.io/v2/red-scene-95b6ea/test/t.compress()~t.resize()~t.extend()~p.apply(n:presetNameXyx)/alien_fig_tree_planet_x_wallingford_seattle_washington_usa_517559.jpeg";
        expect(() => urlToObj(presetUrl)).toThrowError(
            "Error Processing url. Please check the url is correct",
        );
    });

    it("should handle incorrect urls - incorrect pattern", async () => {
        const presetUrl =
            "https://cdn.pixelbin.io/v2/red-scene-95b6ea/t.compress~t.resize()~t.extend()~p.apply(n:presetNameXyx)/alien_fig_tree_planet_x_wallingford_seattle_washington_usa_517559.jpeg";
        expect(() => urlToObj(presetUrl)).toThrowError(
            "Error Processing url. Please check the url is correct",
        );
    });
    it("should handle incorrect urls - incorrect pattern - 2", async () => {
        const presetUrl =
            "https://cdn.pixelbin.io/v2/red-scene-95b6ea/zonesls/t.resize()/__playground/playground-default.jpeg";
        expect(() => urlToObj(presetUrl)).toThrowError(
            "Error Processing url. Please check the url is correct",
        );
    });
    it("should get obj from url - worker path - fullpath with depth 1", async () => {
        const obj = urlToObj("https://cdn.pixelbin.io/v2/red-scene-95b6ea/wrkr/image.jpeg");
        const expectedObj = {
            transformations: [],
            cloudName: "red-scene-95b6ea",
            zone: undefined,
            baseUrl: "https://cdn.pixelbin.io",
            pattern: "",
            filePath: "",
            version: "v2",
            worker: true,
            workerPath: "image.jpeg",
            options: {},
        };
        expect(obj).toEqual(expectedObj);
    });
    it("should get obj from url - worker path - fullpath with depth > 1", async () => {
        const obj = urlToObj(
            "https://cdn.pixelbin.io/v2/falling-surf-7c8bb8/wrkr/misc/general/free/original/images/favicon.ico",
        );
        const expectedObj = {
            transformations: [],
            cloudName: "falling-surf-7c8bb8",
            zone: undefined,
            baseUrl: "https://cdn.pixelbin.io",
            pattern: "",
            filePath: "",
            version: "v2",
            worker: true,
            workerPath: "misc/general/free/original/images/favicon.ico",
            options: {},
        };
        expect(obj).toEqual(expectedObj);
    });
    it("should get obj from url - worker path with zone - fullpath with depth 1", async () => {
        const obj = urlToObj(
            "https://cdn.pixelbin.io/v2/falling-surf-7c8bb8/fyndnp/wrkr/robots.txt",
        );
        const expectedObj = {
            transformations: [],
            cloudName: "falling-surf-7c8bb8",
            zone: "fyndnp",
            baseUrl: "https://cdn.pixelbin.io",
            pattern: "",
            filePath: "",
            version: "v2",
            worker: true,
            workerPath: "robots.txt",
            options: {},
        };
        expect(obj).toEqual(expectedObj);
    });
    it("should get obj from url - worker path with zone - fullpath with depth > 1", async () => {
        const obj = urlToObj(
            "https://cdn.pixelbin.io/v2/falling-surf-7c8bb8/fyprod/wrkr/misc/general/free/original/images/favicon.ico",
        );
        const expectedObj = {
            transformations: [],
            cloudName: "falling-surf-7c8bb8",
            zone: "fyprod",
            baseUrl: "https://cdn.pixelbin.io",
            pattern: "",
            filePath: "",
            version: "v2",
            worker: true,
            workerPath: "misc/general/free/original/images/favicon.ico",
            options: {},
        };
        expect(obj).toEqual(expectedObj);
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
        let generatedUrl = objToUrl(obj);
        expect(generatedUrl).toBe(
            "https://cdn.pixelbin.io/v2/red-scene-95b6ea/z-slug/t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()~p:preset1/__playground/playground-default.jpeg",
        );
        obj.version = "v1";
        generatedUrl = objToUrl(obj);
        expect(generatedUrl).toBe(
            "https://cdn.pixelbin.io/v1/red-scene-95b6ea/z-slug/t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()~p:preset1/__playground/playground-default.jpeg",
        );
    });
    it("should generate url from obj - 1", async () => {
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
                values: [
                    {
                        key: "i",
                        value: "general",
                    },
                ],
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
            isCustomDomain: false,
            cloudName: "red-scene-95b6ea",
            zone: "z-slug",
            version: "v2",
            transformations: transformations,
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "__playground/playground-default.jpeg",
        };
        let generatedUrl = objToUrl(obj);
        expect(generatedUrl).toBe(
            "https://cdn.pixelbin.io/v2/red-scene-95b6ea/z-slug/t.resize(h:200,w:100,fill:999)~erase.bg(i:general)~t.extend()~p:preset1/__playground/playground-default.jpeg",
        );
        obj.version = "v1";
        generatedUrl = objToUrl(obj);
        expect(generatedUrl).toBe(
            "https://cdn.pixelbin.io/v1/red-scene-95b6ea/z-slug/t.resize(h:200,w:100,fill:999)~erase.bg(i:general)~t.extend()~p:preset1/__playground/playground-default.jpeg",
        );
    });
    it("should throw error if transformation object is incorrect", async () => {
        const transformations = [
            {
                plugin: "t",
                name: "resize",
                values: [
                    {
                        key: "",
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
                values: [
                    {
                        key: "i",
                        value: "general",
                    },
                ],
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
            isCustomDomain: false,
            cloudName: "red-scene-95b6ea",
            zone: "z-slug",
            version: "v2",
            transformations: transformations,
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "__playground/playground-default.jpeg",
        };
        expect(() => objToUrl(obj)).toThrowError("key not specified in 'resize'");
        obj.version = "v1";
        expect(() => objToUrl(obj)).toThrowError("key not specified in 'resize'");
    });
    it("should throw error if transformation object is incorrect", async () => {
        const transformations = [
            {
                plugin: "t",
                name: "resize",
                values: [
                    {
                        key: "h",
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
                values: [
                    {
                        key: "i",
                        value: "general",
                    },
                ],
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
            isCustomDomain: false,
            cloudName: "red-scene-95b6ea",
            zone: "z-slug",
            version: "v2",
            transformations: transformations,
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "__playground/playground-default.jpeg",
        };
        expect(() => objToUrl(obj)).toThrowError("value not specified for key 'h' in 'resize'");
        obj.version = "v1";
        expect(() => objToUrl(obj)).toThrowError("value not specified for key 'h' in 'resize'");
    });
    it("should throw error if worker is true but workerPath is not defined", async () => {
        const transformations = [];
        const obj = {
            isCustomDomain: false,
            cloudName: "red-scene-95b6ea",
            zone: "z-slug",
            version: "v2",
            transformations: transformations,
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "__playground/playground-default.jpeg",
            worker: true,
        };
        expect(() => objToUrl(obj)).toThrowError("key workerPath should be a defined");
    });
    it("should generate url from obj when empty", async () => {
        const transformations = [];
        const obj = {
            isCustomDomain: false,
            cloudName: "red-scene-95b6ea",
            zone: "z-slu1",
            version: "v2",
            transformations: transformations,
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "__playground/playground-default.jpeg",
        };
        let generatedUrl = objToUrl(obj);
        expect(generatedUrl).toBe(
            "https://cdn.pixelbin.io/v2/red-scene-95b6ea/z-slu1/original/__playground/playground-default.jpeg",
        );
        obj.version = "v1";
        generatedUrl = objToUrl(obj);
        expect(generatedUrl).toBe(
            "https://cdn.pixelbin.io/v1/red-scene-95b6ea/z-slu1/original/__playground/playground-default.jpeg",
        );
    });
    it("should generate url from obj undefined", async () => {
        const obj = {
            isCustomDomain: false,
            cloudName: "red-scene-95b6ea",
            zone: "z-slug",
            version: "v2",
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "__playground/playground-default.jpeg",
        };
        let generatedUrl = objToUrl(obj);
        expect(generatedUrl).toBe(
            "https://cdn.pixelbin.io/v2/red-scene-95b6ea/z-slug/original/__playground/playground-default.jpeg",
        );
        obj.version = "v1";
        generatedUrl = objToUrl(obj);
        expect(generatedUrl).toBe(
            "https://cdn.pixelbin.io/v1/red-scene-95b6ea/z-slug/original/__playground/playground-default.jpeg",
        );
    });
    it("should generate url from obj  empty object", async () => {
        const obj = {
            isCustomDomain: false,
            cloudName: "red-scene-95b6ea",
            zone: "z-slug",
            version: "v2",
            transformations: [{}],
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "__playground/playground-default.jpeg",
        };
        let generatedUrl = objToUrl(obj);
        expect(generatedUrl).toBe(
            "https://cdn.pixelbin.io/v2/red-scene-95b6ea/z-slug/original/__playground/playground-default.jpeg",
        );
        obj.version = "v1";
        generatedUrl = objToUrl(obj);
        expect(generatedUrl).toBe(
            "https://cdn.pixelbin.io/v1/red-scene-95b6ea/z-slug/original/__playground/playground-default.jpeg",
        );
    });
    it("should generate url from obj  empty object", async () => {
        const obj = {
            isCustomDomain: false,
            cloudName: "red-scene-95b6ea",
            zone: "z-slug",
            version: "v2",
            transformations: [{}],
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "__playground/playground-default.jpeg",
        };
        let generatedUrl = objToUrl(obj);
        expect(generatedUrl).toBe(
            "https://cdn.pixelbin.io/v2/red-scene-95b6ea/z-slug/original/__playground/playground-default.jpeg",
        );
        obj.version = "v1";
        generatedUrl = objToUrl(obj);
        expect(generatedUrl).toBe(
            "https://cdn.pixelbin.io/v1/red-scene-95b6ea/z-slug/original/__playground/playground-default.jpeg",
        );
    });
    it("should throw error to generate url from obj if filePath not defined", async () => {
        const obj = {
            isCustomDomain: false,
            cloudName: "red-scene-95b6ea",
            zone: "z-slug",
            version: "v2",
            transformations: [{}],
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "",
        };
        expect(() => objToUrl(obj)).toThrowError(PDKIllegalArgumentError);
    });
    it("should get obj from url with dpr = auto", async () => {
        const obj = urlToObj(
            "https://cdn.pixelbin.io/v2/feel/erase.bg(shadow:true)~t.merge(m:underlay,i:eU44YkFJOHlVMmZrWVRDOUNTRm1D,b:screen,r:true)/MZZKB3e1hT48o0NYJ2Kxh.jpeg?dpr=auto&f_auto=true",
        );
        const expectedObj = {
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "MZZKB3e1hT48o0NYJ2Kxh.jpeg",
            pattern:
                "erase.bg(shadow:true)~t.merge(m:underlay,i:eU44YkFJOHlVMmZrWVRDOUNTRm1D,b:screen,r:true)",
            version: "v2",
            zone: undefined,
            cloudName: "feel",
            options: {
                dpr: "auto",
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
            worker: false,
            workerPath: "",
        };
        expect(obj).toEqual(expectedObj);
    });
    it("should get obj from url with options if available", async () => {
        const obj = urlToObj(
            "https://cdn.pixelbin.io/v2/feel/erase.bg(shadow:true)~t.merge(m:underlay,i:eU44YkFJOHlVMmZrWVRDOUNTRm1D,b:screen,r:true)/MZZKB3e1hT48o0NYJ2Kxh.jpeg?dpr=2.5&f_auto=true",
        );
        const expectedObj = {
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "MZZKB3e1hT48o0NYJ2Kxh.jpeg",
            pattern:
                "erase.bg(shadow:true)~t.merge(m:underlay,i:eU44YkFJOHlVMmZrWVRDOUNTRm1D,b:screen,r:true)",
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
            worker: false,
            workerPath: "",
        };
        expect(obj).toEqual(expectedObj);
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
            "https://cdn.pixelbin.io/v2/red-scene-95b6ea/z-slug/original/__playground/playground-default.jpeg?dpr=2.5&f_auto=true",
        );
    });
    it("should get failure while retrieving obj from url with invalid options", async () => {
        const optionsUrl =
            "https://cdn.pixelbin.io/v2/feel/erase.bg(shadow:true)~t.merge(m:underlay,i:eU44YkFJOHlVMmZrWVRDOUNTRm1D,b:screen,r:true)/MZZKB3e1hT48o0NYJ2Kxh.jpeg?dpr=5.5&f_auto=true";
        expect(() => urlToObj(optionsUrl)).toThrowError(PDKIllegalQueryParameterError);
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
        expect(() => objToUrl(obj)).toThrowError(PDKIllegalQueryParameterError);
    });
    // presets variable support
    it("should get obj from url - 1", async () => {
        const obj = urlToObj(
            "https://cdn.pixelbin.io/v2/dill-doe-36b4fc/t.rotate(a:102)~p:preset1(a:100,b:2.1,c:test)/__playground/playground-default.jpeg",
        );

        expect(obj.transformations).toEqual([
            {
                plugin: "t",
                name: "rotate",
                values: [
                    {
                        key: "a",
                        value: "102",
                    },
                ],
            },
            {
                plugin: "p",
                name: "preset1",
                values: [
                    {
                        key: "a",
                        value: "100",
                    },
                    {
                        key: "b",
                        value: "2.1",
                    },
                    {
                        key: "c",
                        value: "test",
                    },
                ],
            },
        ]);
        expect(obj.cloudName).toBe("dill-doe-36b4fc");
        expect(obj.zone).toBeUndefined();
        expect(obj.baseUrl).toBe("https://cdn.pixelbin.io");
        expect(obj.pattern).toBe("t.rotate(a:102)~p:preset1(a:100,b:2.1,c:test)");
        expect(obj.version).toBe("v2");
        expect(obj.filePath).toBe("__playground/playground-default.jpeg");
    });

    it("should get obj from url - 1", async () => {
        const obj = urlToObj(
            "https://cdn.pixelbin.io/v2/dill-doe-36b4fc/t.rotate(a:102)~p:preset1/__playground/playground-default.jpeg",
        );

        expect(obj.transformations).toEqual([
            {
                plugin: "t",
                name: "rotate",
                values: [
                    {
                        key: "a",
                        value: "102",
                    },
                ],
            },
            {
                plugin: "p",
                name: "preset1",
            },
        ]);
        expect(obj.cloudName).toBe("dill-doe-36b4fc");
        expect(obj.zone).toBeUndefined();
        expect(obj.baseUrl).toBe("https://cdn.pixelbin.io");
        expect(obj.pattern).toBe("t.rotate(a:102)~p:preset1");
        expect(obj.version).toBe("v2");
        expect(obj.filePath).toBe("__playground/playground-default.jpeg");
    });

    it("should get obj from url - 2", async () => {
        const obj = urlToObj(
            "https://cdn.pixelbin.io/v2/dill-doe-36b4fc/t.rotate(a:102)~p:preset1()/__playground/playground-default.jpeg",
        );

        expect(obj.transformations).toEqual([
            {
                plugin: "t",
                name: "rotate",
                values: [
                    {
                        key: "a",
                        value: "102",
                    },
                ],
            },
            {
                plugin: "p",
                name: "preset1",
            },
        ]);
        expect(obj.cloudName).toBe("dill-doe-36b4fc");
        expect(obj.zone).toBeUndefined();
        expect(obj.baseUrl).toBe("https://cdn.pixelbin.io");
        expect(obj.pattern).toBe("t.rotate(a:102)~p:preset1()");
        expect(obj.version).toBe("v2");
        expect(obj.filePath).toBe("__playground/playground-default.jpeg");
    });

    it("should get obj from url - 3", async () => {
        const obj = urlToObj(
            "https://cdn.pixelbin.io/v2/dill-doe-36b4fc/t.rotate(a:102)~p:preset1(a:12/__playground/playground-default.jpeg",
        );

        expect(obj.transformations).toEqual([
            {
                plugin: "t",
                name: "rotate",
                values: [
                    {
                        key: "a",
                        value: "102",
                    },
                ],
            },
            {
                plugin: "p",
                name: "preset1",
                values: [
                    {
                        key: "a",
                        value: "12",
                    },
                ],
            },
        ]);
        expect(obj.cloudName).toBe("dill-doe-36b4fc");
        expect(obj.zone).toBeUndefined();
        expect(obj.baseUrl).toBe("https://cdn.pixelbin.io");
        expect(obj.pattern).toBe("t.rotate(a:102)~p:preset1(a:12");
        expect(obj.version).toBe("v2");
        expect(obj.filePath).toBe("__playground/playground-default.jpeg");
    });

    it("should generate url from obj - 1", async () => {
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
                values: [
                    {
                        key: "a",
                        value: "200",
                    },
                    {
                        key: "b",
                        value: "1.2",
                    },
                    {
                        key: "c",
                        value: "test",
                    },
                ],
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
        let generatedUrl = objToUrl(obj);
        expect(generatedUrl).toBe(
            "https://cdn.pixelbin.io/v2/red-scene-95b6ea/z-slug/t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()~p:preset1(a:200,b:1.2,c:test)/__playground/playground-default.jpeg",
        );
        obj.version = "v1";
        generatedUrl = objToUrl(obj);
        expect(generatedUrl).toBe(
            "https://cdn.pixelbin.io/v1/red-scene-95b6ea/z-slug/t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()~p:preset1(a:200,b:1.2,c:test)/__playground/playground-default.jpeg",
        );
    });

    it("should generate url from obj - 1", async () => {
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
                values: [],
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
        let generatedUrl = objToUrl(obj);
        expect(generatedUrl).toBe(
            "https://cdn.pixelbin.io/v2/red-scene-95b6ea/z-slug/t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()~p:preset1/__playground/playground-default.jpeg",
        );
        obj.version = "v1";
        generatedUrl = objToUrl(obj);
        expect(generatedUrl).toBe(
            "https://cdn.pixelbin.io/v1/red-scene-95b6ea/z-slug/t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()~p:preset1/__playground/playground-default.jpeg",
        );
    });

    it("obj to url then same url to obj - wrkr - 1", () => {
        const url = "https://cdn.pixelbin.io/v2/red-scene-95b6ea/wrkr/image.jpeg";
        const obj = urlToObj(url);
        const expectedObj = {
            transformations: [],
            cloudName: "red-scene-95b6ea",
            zone: undefined,
            baseUrl: "https://cdn.pixelbin.io",
            pattern: "",
            filePath: "",
            version: "v2",
            worker: true,
            workerPath: "image.jpeg",
            options: {},
        };
        expect(obj).toEqual(expectedObj);
        const generatedUrl = objToUrl(obj);
        expect(generatedUrl).toBe(url);
    });

    it("obj to url then same url to obj - wrkr - 2", () => {
        const url =
            "https://cdn.pixelbin.io/v2/falling-surf-7c8bb8/abcdef/wrkr/misc/general/free/original/images/favicon.ico";
        const obj = urlToObj(url);
        const expectedObj = {
            transformations: [],
            cloudName: "falling-surf-7c8bb8",
            zone: "abcdef",
            baseUrl: "https://cdn.pixelbin.io",
            pattern: "",
            filePath: "",
            version: "v2",
            worker: true,
            workerPath: "misc/general/free/original/images/favicon.ico",
            options: {},
        };
        expect(obj).toEqual(expectedObj);
        const generatedUrl = objToUrl(obj);
        expect(generatedUrl).toBe(url);
    });

    describe("custom domain", () => {
        it("should get obj from url - default zone with transformations - filedepth - 1", async () => {
            const url = "https://cdn.twist.vision/v2/t.resize()/playground-default.jpeg";

            const obj = urlToObj(url, {
                isCustomDomain: true,
            });
            const expectedObj = {
                transformations: [
                    {
                        plugin: "t",
                        name: "resize",
                    },
                ],
                cloudName: undefined,
                zone: undefined,
                baseUrl: "https://cdn.twist.vision",
                pattern: "t.resize()",
                version: "v2",
                filePath: "playground-default.jpeg",
                worker: false,
                workerPath: "",
                options: {},
            };
            expect(obj).toEqual(expectedObj);
        });
        it("should get obj from url - default zone with transformations - filedepth > 1", async () => {
            const url =
                "https://cdn.twist.vision/v2/t.resize()/test/__playground/playground-default.jpeg";
            const obj = urlToObj(url, {
                isCustomDomain: true,
            });
            const expectedObj = {
                transformations: [
                    {
                        plugin: "t",
                        name: "resize",
                    },
                ],
                cloudName: undefined,
                zone: undefined,
                baseUrl: "https://cdn.twist.vision",
                pattern: "t.resize()",
                version: "v2",
                filePath: "test/__playground/playground-default.jpeg",
                worker: false,
                workerPath: "",
                options: {},
            };
            expect(obj).toEqual(expectedObj);
        });
        it("should get obj from url - default zone with transformations with param", async () => {
            const url =
                "https://cdn.twist.vision/v2/t.rotate(a:102)/__playground/playground-default.jpeg";
            const obj = urlToObj(url, {
                isCustomDomain: true,
            });
            const expectedObj = {
                transformations: [
                    {
                        plugin: "t",
                        name: "rotate",
                        values: [
                            {
                                key: "a",
                                value: "102",
                            },
                        ],
                    },
                ],
                cloudName: undefined,
                zone: undefined,
                baseUrl: "https://cdn.twist.vision",
                pattern: "t.rotate(a:102)",
                version: "v2",
                filePath: "__playground/playground-default.jpeg",
                worker: false,
                workerPath: "",
                options: {},
            };
            expect(obj).toEqual(expectedObj);
        });
        it("should get obj from url - default zone with transformations with params", async () => {
            const url =
                "https://cdn.twist.vision/v2/t.rotate(a:102,b:200)/__playground/playground-default.jpeg";
            const obj = urlToObj(url, {
                isCustomDomain: true,
            });
            const expectedObj = {
                transformations: [
                    {
                        plugin: "t",
                        name: "rotate",
                        values: [
                            {
                                key: "a",
                                value: "102",
                            },
                            {
                                key: "b",
                                value: "200",
                            },
                        ],
                    },
                ],
                cloudName: undefined,
                zone: undefined,
                baseUrl: "https://cdn.twist.vision",
                pattern: "t.rotate(a:102,b:200)",
                version: "v2",
                filePath: "__playground/playground-default.jpeg",
                worker: false,
                workerPath: "",
                options: {},
            };
            expect(obj).toEqual(expectedObj);
        });
        it("should get obj from url with zoneslug - filedepth 1", async () => {
            const url = "https://cdn.twist.vision/v2/zonesl/t.resize()/playground-default.jpeg";
            const obj = urlToObj(url, {
                isCustomDomain: true,
            });
            const expectedObj = {
                transformations: [
                    {
                        plugin: "t",
                        name: "resize",
                    },
                ],
                cloudName: undefined,
                zone: "zonesl",
                baseUrl: "https://cdn.twist.vision",
                pattern: "t.resize()",
                version: "v2",
                filePath: "playground-default.jpeg",
                worker: false,
                workerPath: "",
                options: {},
            };
            expect(obj).toEqual(expectedObj);
        });
        it("should get obj from url with zoneslug - filedepth > 1", async () => {
            const url =
                "https://cdn.twist.vision/v2/zonesl/t.resize()/test/__playground/playground-default.jpeg";
            const obj = urlToObj(url, {
                isCustomDomain: true,
            });
            const expectedObj = {
                transformations: [
                    {
                        plugin: "t",
                        name: "resize",
                    },
                ],
                cloudName: undefined,
                zone: "zonesl",
                baseUrl: "https://cdn.twist.vision",
                pattern: "t.resize()",
                version: "v2",
                filePath: "test/__playground/playground-default.jpeg",
                worker: false,
                workerPath: "",
                options: {},
            };
            expect(obj).toEqual(expectedObj);
        });
        it("should get obj from url - error", async () => {
            const url = "https://cdn.twist.vision/v2";
            expect(() =>
                urlToObj(url, {
                    isCustomDomain: true,
                }),
            ).toThrowError("Invalid pixelbin url. Please make sure the url is correct.");
        });
        it("should get obj from url - multiple transformations", async () => {
            const url =
                "https://cdn.twist.vision/v2/t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()/__playground/playground-default.jpeg";
            const obj = urlToObj(url, {
                isCustomDomain: true,
            });
            const expectedObj = {
                transformations: [
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
                ],
                cloudName: undefined,
                zone: undefined,
                baseUrl: "https://cdn.twist.vision",
                pattern: "t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()",
                version: "v2",
                filePath: "__playground/playground-default.jpeg",
                worker: false,
                workerPath: "",
                options: {},
            };
            expect(obj).toEqual(expectedObj);
        });
        it("should get obj from url with preset", async () => {
            const url =
                "https://cdn.twist.vision/v2/z-slug/t.compress()~t.resize()~t.extend()~p.apply(n:presetNameXyx)/alien_fig_tree_planet_x_wallingford_seattle_washington_usa_517559.jpeg";
            const obj = urlToObj(url, {
                isCustomDomain: true,
            });
            const expectedObj = {
                transformations: [
                    { name: "compress", plugin: "t" },
                    { name: "resize", plugin: "t" },
                    { name: "extend", plugin: "t" },
                    { plugin: "p", name: "apply", values: [{ key: "n", value: "presetNameXyx" }] },
                ],
                cloudName: undefined,
                zone: "z-slug",
                baseUrl: "https://cdn.twist.vision",
                pattern: "t.compress()~t.resize()~t.extend()~p.apply(n:presetNameXyx)",
                filePath: "alien_fig_tree_planet_x_wallingford_seattle_washington_usa_517559.jpeg",
                version: "v2",
                worker: false,
                workerPath: "",
                options: {},
            };
            expect(obj).toEqual(expectedObj);
        });
        it("should get obj from url with preset", async () => {
            const url =
                "https://cdn.twist.vision/v3/t.compress()~t.resize()~t.extend()~p.apply(n:presetNameXyx)/alien_fig_tree_planet_x_wallingford_seattle_washington_usa_517559.jpeg";
            expect(() =>
                urlToObj(url, {
                    isCustomDomain: true,
                }),
            ).toThrowError("Invalid pixelbin url. Please make sure the url is correct.");
        });
        it("should handle incorrect urls", async () => {
            const url =
                "https://cdn.twist.vision//v2/original~original/__playground/playground-default.jpeg";
            expect(() =>
                urlToObj(url, {
                    isCustomDomain: true,
                }),
            ).toThrowError("Invalid pixelbin url. Please make sure the url is correct.");
        });
        it("should handle incorrect urls - incorrect zone", async () => {
            const url =
                "https://cdn.twist.vision/v2/test/t.compress()~t.resize()~t.extend()~p.apply(n:presetNameXyx)/alien_fig_tree_planet_x_wallingford_seattle_washington_usa_517559.jpeg";
            expect(() =>
                urlToObj(url, {
                    isCustomDomain: true,
                }),
            ).toThrowError("Error Processing url. Please check the url is correct");
        });

        it("should handle incorrect urls - incorrect pattern", async () => {
            const url =
                "https://cdn.pixelbin.io/v2/red-scene-95b6ea/t.compress~t.resize()~t.extend()~p.apply(n:presetNameXyx)/alien_fig_tree_planet_x_wallingford_seattle_washington_usa_517559.jpeg";
            expect(() =>
                urlToObj(url, {
                    isCustomDomain: true,
                }),
            ).toThrowError("Error Processing url. Please check the url is correct");
        });
        it("should handle incorrect urls - incorrect pattern - 2", async () => {
            const url =
                "https://cdn.twist.vision/v2/zonesls/t.resize()/__playground/playground-default.jpeg";
            expect(() =>
                urlToObj(url, {
                    isCustomDomain: true,
                }),
            ).toThrowError("Error Processing url. Please check the url is correct");
        });
        it("should get obj from url - worker path - fullpath with depth 1", async () => {
            const url = "https://cdn.twist.vision/v2/wrkr/image.jpeg";
            const obj = urlToObj(url, {
                isCustomDomain: true,
            });
            const expectedObj = {
                transformations: [],
                cloudName: undefined,
                zone: undefined,
                baseUrl: "https://cdn.twist.vision",
                pattern: "",
                filePath: "",
                version: "v2",
                worker: true,
                workerPath: "image.jpeg",
                options: {},
            };
            expect(obj).toEqual(expectedObj);
        });
        it("should get obj from url - worker path - fullpath with depth > 1", async () => {
            const url =
                "https://cdn.twist.vision/v2/wrkr/misc/general/free/original/images/favicon.ico";
            const obj = urlToObj(url, {
                isCustomDomain: true,
            });
            const expectedObj = {
                transformations: [],
                cloudName: undefined,
                zone: undefined,
                baseUrl: "https://cdn.twist.vision",
                pattern: "",
                filePath: "",
                version: "v2",
                worker: true,
                workerPath: "misc/general/free/original/images/favicon.ico",
                options: {},
            };
            expect(obj).toEqual(expectedObj);
        });
        it("should get obj from url - worker path with zone - fullpath with depth 1", async () => {
            const url = "https://cdn.twist.vision/v2/fyndnp/wrkr/robots.txt";
            const obj = urlToObj(url, {
                isCustomDomain: true,
            });
            const expectedObj = {
                transformations: [],
                cloudName: undefined,
                zone: "fyndnp",
                baseUrl: "https://cdn.twist.vision",
                pattern: "",
                filePath: "",
                version: "v2",
                worker: true,
                workerPath: "robots.txt",
                options: {},
            };
            expect(obj).toEqual(expectedObj);
        });
        // ref -> https://fynd-f7.sentry.io/issues/3515703764/?project=6193211&referrer=slack
        it("should get obj from url - worker path with zone - fullpath with depth > 1", async () => {
            const url =
                "https://cdn.twist.vision/v2/fyprod/wrkr/misc/general/free/original/images/favicon.ico";
            const obj = urlToObj(url, {
                isCustomDomain: true,
            });
            const expectedObj = {
                transformations: [],
                cloudName: undefined,
                zone: "fyprod",
                baseUrl: "https://cdn.twist.vision",
                pattern: "",
                filePath: "",
                version: "v2",
                worker: true,
                workerPath: "misc/general/free/original/images/favicon.ico",
                options: {},
            };
            expect(obj).toEqual(expectedObj);
        });

        it("should get obj from url with options if available", async () => {
            const url =
                "https://cdn.twist.vision/v2/feelzz/erase.bg(shadow:true)~t.merge(m:underlay,i:eU44YkFJOHlVMmZrWVRDOUNTRm1D,b:screen,r:true)/MZZKB3e1hT48o0NYJ2Kxh.jpeg?dpr=2.5&f_auto=true";

            const obj = urlToObj(url, {
                isCustomDomain: true,
            });
            const expectedObj = {
                baseUrl: "https://cdn.twist.vision",
                filePath: "MZZKB3e1hT48o0NYJ2Kxh.jpeg",
                pattern:
                    "erase.bg(shadow:true)~t.merge(m:underlay,i:eU44YkFJOHlVMmZrWVRDOUNTRm1D,b:screen,r:true)",
                version: "v2",
                cloudName: undefined,
                zone: "feelzz",
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
                worker: false,
                workerPath: "",
            };
            expect(obj).toEqual(expectedObj);
        });
        it("should get failure while retrieving obj from url with invalid options", async () => {
            const url =
                "https://cdn.twist.vision/v2/erase.bg(shadow:true)~t.merge(m:underlay,i:eU44YkFJOHlVMmZrWVRDOUNTRm1D,b:screen,r:true)/MZZKB3e1hT48o0NYJ2Kxh.jpeg?dpr=5.5&f_auto=true";
            expect(() =>
                urlToObj(url, {
                    isCustomDomain: true,
                }),
            ).toThrowError(PDKIllegalQueryParameterError);
        });
        it("should generate url from obj with options if available", async () => {
            const obj = {
                baseUrl: "https://cdn.twist.vision",
                isCustomDomain: true,
                filePath: "__playground/playground-default.jpeg",
                version: "v2",
                zone: "z-slug",
                options: { dpr: 2.5, f_auto: true },
                transformations: [{}],
            };
            let generatedUrl = objToUrl(obj);
            expect(generatedUrl).toBe(
                "https://cdn.twist.vision/v2/z-slug/original/__playground/playground-default.jpeg?dpr=2.5&f_auto=true",
            );
        });
        it("should get failure while retrieving url from obj with cloudname", async () => {
            const obj = {
                baseUrl: "https://cdn.twist.vision",
                isCustomDomain: true,
                filePath: "__playground/playground-default.jpeg",
                version: "v2",
                zone: "z-slug",
                cloudName: "red-scene-95b6ea",
                options: { dpr: 2.5, f_auto: true },
                transformations: [{}],
            };
            expect(() => objToUrl(obj)).toThrowError(PDKIllegalArgumentError);
        });
        it("should get failure while retrieving url from obj with invalid options", async () => {
            const obj = {
                baseUrl: "https://cdn.twist.vision",
                isCustomDomain: true,
                filePath: "__playground/playground-default.jpeg",
                version: "v2",
                zone: "z-slug",
                options: { dpr: 2.5, f_auto: "abc" },
                transformations: [{}],
            };
            expect(() => objToUrl(obj)).toThrowError(PDKIllegalQueryParameterError);
        });
        // presets variable support
        it("should get obj from url - 1", async () => {
            const url =
                "https://cdn.twist.vision/v2/t.rotate(a:102)~p:preset1(a:100,b:2.1,c:test)/__playground/playground-default.jpeg";
            const obj = urlToObj(url, {
                isCustomDomain: true,
            });

            expect(obj.transformations).toEqual([
                {
                    plugin: "t",
                    name: "rotate",
                    values: [
                        {
                            key: "a",
                            value: "102",
                        },
                    ],
                },
                {
                    plugin: "p",
                    name: "preset1",
                    values: [
                        {
                            key: "a",
                            value: "100",
                        },
                        {
                            key: "b",
                            value: "2.1",
                        },
                        {
                            key: "c",
                            value: "test",
                        },
                    ],
                },
            ]);
            expect(obj.zone).toBeUndefined();
            expect(obj.baseUrl).toBe("https://cdn.twist.vision");
            expect(obj.pattern).toBe("t.rotate(a:102)~p:preset1(a:100,b:2.1,c:test)");
            expect(obj.version).toBe("v2");
            expect(obj.filePath).toBe("__playground/playground-default.jpeg");
        });
        it("should get obj from url - 1", async () => {
            const url =
                "https://cdn.twist.vision/v2/t.rotate(a:102)~p:preset1/__playground/playground-default.jpeg";
            const obj = urlToObj(url, {
                isCustomDomain: true,
            });

            expect(obj.transformations).toEqual([
                {
                    plugin: "t",
                    name: "rotate",
                    values: [
                        {
                            key: "a",
                            value: "102",
                        },
                    ],
                },
                {
                    plugin: "p",
                    name: "preset1",
                },
            ]);
            expect(obj.zone).toBeUndefined();
            expect(obj.baseUrl).toBe("https://cdn.twist.vision");
            expect(obj.pattern).toBe("t.rotate(a:102)~p:preset1");
            expect(obj.version).toBe("v2");
            expect(obj.filePath).toBe("__playground/playground-default.jpeg");
        });
        it("should get obj from url - 2", async () => {
            const url =
                "https://cdn.twist.vision/v2/t.rotate(a:102)~p:preset1()/__playground/playground-default.jpeg";
            const obj = urlToObj(url, {
                isCustomDomain: true,
            });

            expect(obj.transformations).toEqual([
                {
                    plugin: "t",
                    name: "rotate",
                    values: [
                        {
                            key: "a",
                            value: "102",
                        },
                    ],
                },
                {
                    plugin: "p",
                    name: "preset1",
                },
            ]);
            expect(obj.zone).toBeUndefined();
            expect(obj.baseUrl).toBe("https://cdn.twist.vision");
            expect(obj.pattern).toBe("t.rotate(a:102)~p:preset1()");
            expect(obj.version).toBe("v2");
            expect(obj.filePath).toBe("__playground/playground-default.jpeg");
        });
        it("should get obj from url - 3", async () => {
            const url =
                "https://cdn.twist.vision/v2/t.rotate(a:102)~p:preset1(a:12/__playground/playground-default.jpeg";
            const obj = urlToObj(url, {
                isCustomDomain: true,
            });

            expect(obj.transformations).toEqual([
                {
                    plugin: "t",
                    name: "rotate",
                    values: [
                        {
                            key: "a",
                            value: "102",
                        },
                    ],
                },
                {
                    plugin: "p",
                    name: "preset1",
                    values: [
                        {
                            key: "a",
                            value: "12",
                        },
                    ],
                },
            ]);
            expect(obj.zone).toBeUndefined();
            expect(obj.baseUrl).toBe("https://cdn.twist.vision");
            expect(obj.pattern).toBe("t.rotate(a:102)~p:preset1(a:12");
            expect(obj.version).toBe("v2");
            expect(obj.filePath).toBe("__playground/playground-default.jpeg");
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
                isCustomDomain: true,
                zone: "z-slug",
                version: "v2",
                transformations: transformations,
                baseUrl: "https://cdn.twist.vision",
                filePath: "__playground/playground-default.jpeg",
            };
            let generatedUrl = objToUrl(obj);
            expect(generatedUrl).toBe(
                "https://cdn.twist.vision/v2/z-slug/t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()~p:preset1/__playground/playground-default.jpeg",
            );
        });
        it("should generate url from obj - 1", async () => {
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
                    values: [
                        {
                            key: "i",
                            value: "general",
                        },
                    ],
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
                isCustomDomain: true,
                zone: "z-slug",
                version: "v2",
                transformations: transformations,
                baseUrl: "https://cdn.twist.vision",
                filePath: "__playground/playground-default.jpeg",
            };
            let generatedUrl = objToUrl(obj);
            expect(generatedUrl).toBe(
                "https://cdn.twist.vision/v2/z-slug/t.resize(h:200,w:100,fill:999)~erase.bg(i:general)~t.extend()~p:preset1/__playground/playground-default.jpeg",
            );
        });
        it("should throw error if worker is true but workerPath is not defined", async () => {
            const transformations = [];
            const obj = {
                isCustomDomain: true,
                zone: "z-slug",
                version: "v2",
                transformations: transformations,
                baseUrl: "https://cdn.twist.vision",
                filePath: "__playground/playground-default.jpeg",
                worker: true,
            };
            expect(() => objToUrl(obj)).toThrowError("key workerPath should be a defined");
        });
        it("should generate url from obj when empty", async () => {
            const transformations = [];
            const obj = {
                isCustomDomain: true,
                zone: "z-slu1",
                version: "v2",
                transformations: transformations,
                baseUrl: "https://cdn.twist.vision",
                filePath: "__playground/playground-default.jpeg",
            };
            let generatedUrl = objToUrl(obj);
            expect(generatedUrl).toBe(
                "https://cdn.twist.vision/v2/z-slu1/original/__playground/playground-default.jpeg",
            );
        });
        it("should generate url from obj undefined", async () => {
            const obj = {
                isCustomDomain: true,
                zone: "z-slug",
                version: "v2",
                baseUrl: "https://cdn.twist.vision",
                filePath: "__playground/playground-default.jpeg",
            };
            let generatedUrl = objToUrl(obj);
            expect(generatedUrl).toBe(
                "https://cdn.twist.vision/v2/z-slug/original/__playground/playground-default.jpeg",
            );
        });
        it("should generate url from obj  empty object", async () => {
            const obj = {
                isCustomDomain: true,
                zone: "z-slug",
                version: "v2",
                transformations: [{}],
                baseUrl: "https://cdn.twist.vision",
                filePath: "__playground/playground-default.jpeg",
            };
            let generatedUrl = objToUrl(obj);
            expect(generatedUrl).toBe(
                "https://cdn.twist.vision/v2/z-slug/original/__playground/playground-default.jpeg",
            );
        });
        it("should generate url from obj  empty object", async () => {
            const obj = {
                isCustomDomain: true,
                zone: "z-slug",
                version: "v2",
                transformations: [{}],
                baseUrl: "https://cdn.twist.vision",
                filePath: "__playground/playground-default.jpeg",
            };
            let generatedUrl = objToUrl(obj);
            expect(generatedUrl).toBe(
                "https://cdn.twist.vision/v2/z-slug/original/__playground/playground-default.jpeg",
            );
        });
        it("should throw error to generate url from obj if filePath not defined", async () => {
            const obj = {
                isCustomDomain: true,
                zone: "z-slug",
                version: "v2",
                transformations: [{}],
                baseUrl: "https://cdn.twist.vision",
                filePath: "",
            };
            expect(() => objToUrl(obj)).toThrowError(PDKIllegalArgumentError);
        });
        it("should generate url from obj - 1", async () => {
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
                    values: [
                        {
                            key: "a",
                            value: "200",
                        },
                        {
                            key: "b",
                            value: "1.2",
                        },
                        {
                            key: "c",
                            value: "test",
                        },
                    ],
                },
            ];
            const obj = {
                isCustomDomain: true,
                zone: "z-slug",
                version: "v2",
                transformations: transformations,
                baseUrl: "https://cdn.twist.vision",
                filePath: "__playground/playground-default.jpeg",
            };
            let generatedUrl = objToUrl(obj);
            expect(generatedUrl).toBe(
                "https://cdn.twist.vision/v2/z-slug/t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()~p:preset1(a:200,b:1.2,c:test)/__playground/playground-default.jpeg",
            );
        });
        it("should generate url from obj - 1", async () => {
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
                    values: [],
                },
            ];
            const obj = {
                isCustomDomain: true,
                zone: "z-slug",
                version: "v2",
                transformations: transformations,
                baseUrl: "https://cdn.twist.vision",
                filePath: "__playground/playground-default.jpeg",
            };
            let generatedUrl = objToUrl(obj);
            expect(generatedUrl).toBe(
                "https://cdn.twist.vision/v2/z-slug/t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()~p:preset1/__playground/playground-default.jpeg",
            );
        });
        it("obj to url then same url to obj - wrkr - 1", () => {
            const url = "https://cdn.twist.vision/v2/wrkr/image.jpeg";
            const obj = urlToObj(url, {
                isCustomDomain: true,
            });
            const expectedObj = {
                transformations: [],
                cloudName: undefined,
                zone: undefined,
                baseUrl: "https://cdn.twist.vision",
                pattern: "",
                filePath: "",
                version: "v2",
                worker: true,
                workerPath: "image.jpeg",
                options: {},
            };
            expect(obj).toEqual(expectedObj);
            const generatedUrl = objToUrl({ ...obj, isCustomDomain: true });
            expect(generatedUrl).toBe(url);
        });
        it("obj to url then same url to obj - wrkr - 2", () => {
            const url =
                "https://cdn.twist.vision/v2/abcdef/wrkr/misc/general/free/original/images/favicon.ico";
            const obj = urlToObj(url, {
                isCustomDomain: true,
            });
            const expectedObj = {
                transformations: [],
                cloudName: undefined,
                zone: "abcdef",
                baseUrl: "https://cdn.twist.vision",
                pattern: "",
                filePath: "",
                version: "v2",
                worker: true,
                workerPath: "misc/general/free/original/images/favicon.ico",
                options: {},
            };
            expect(obj).toEqual(expectedObj);
            const generatedUrl = objToUrl({
                ...obj,
                isCustomDomain: true,
            });
            expect(generatedUrl).toBe(url);
        });
    });
});
