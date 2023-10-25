import puppeteer from 'puppeteer';
import TelegramBot from 'node-telegram-bot-api';

const token = process.env.TOKEN;

async function getVideoSrc(url) {
	const browser = await puppeteer.launch({});
	const page = await browser.newPage();
	await page.goto(url);
	await page.waitForSelector('video');
	const videoSrc = await page.$eval('video', (video) => video.src);

	await browser.close();
	return videoSrc;
}

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
	const chatId = msg.chat.id;
	const textMessage = msg.text;

	console.log(msg);
	const videoURL = await getVideoSrc(textMessage);
	bot.sendMessage(chatId, videoURL);
});
