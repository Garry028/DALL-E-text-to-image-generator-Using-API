import { Configuration, OpenAIApi } from "openai";
import { writeFileSync } from "fs";
import fetch from "node-fetch";

const configuration = new Configuration({
    apiKey: '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',
});

const openai = new OpenAIApi(configuration);
const prompt = "a ship sailing through a river of stars and galaxies";

const result = await openai.createImage({
    prompt,
    n: 1,
    size: "1024x1024",
    user: "Garry007"
});

const url = result.data.data[0].url;
console.log(url);

// save img to disk
const imgResult = await fetch(url);
const blob = await imgResult.blob();
const buffer = Buffer.from(await blob.arrayBuffer());
writeFileSync(`./img/${Date.now()}.png`, buffer);