import { Configuration, OpenAIApi } from "openai";
import { writeFileSync } from "fs";
import fetch from "node-fetch";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const configuration = new Configuration({
    apiKey:process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const prompt = "Astronut sitting in front of tajmahal";

const result = await openai.createImage({
    prompt,
    n: 1,
    size: "1024x1024",
    user: "Garry007"
});

const url = result.data.data[0].url;
// console.log(url);

// save img to disk
const imgResult = await fetch(url);
const blob = await imgResult.blob();
const buffer = Buffer.from(await blob.arrayBuffer());
writeFileSync(`./img/${Date.now()}.png`, buffer);