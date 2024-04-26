import OpenAI from "openai";

const apiKey = process.env.OPENAI_API;

const openai = new OpenAI({ apiKey });

export default openai;
