import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

dotenv.config();

const AUTH_TOKEN = process.env.TWITTER_AUTH_TOKEN;

if (!AUTH_TOKEN) {
    throw new Error('TWITTER_AUTH_TOKEN is not defined in the .env file. Please provide a valid token.');
}

export const getLatestTweets = async (username: string): Promise<string[]> => {
    if (!username) {
        throw new Error('Username is required.');
    }

    let browser;
    try {
        browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        // Oturum token'ını cookie olarak ayarla
        await page.setCookie({
            name: 'auth_token',
            value: AUTH_TOKEN,
            domain: '.x.com',
            path: '/',
            secure: true,
            httpOnly: true,
            sameSite: 'None'
        });

        // Kullanıcının profiline git
        await page.goto(`https://x.com/${username}`, { waitUntil: 'networkidle2', timeout: 25000 });

        try {
            // Tweet'leri içeren ana yapının (article) yüklenmesini bekle
            await page.waitForSelector('article[data-testid="tweet"]', { timeout: 20000 });
            console.log(`Tweet articles found for @${username}. Scraping...`);
        } catch (e) {
            console.error(`Timeout: Could not find tweet articles for @${username}. The account may be private, suspended, or the auth_token is invalid/expired.`);
            await page.screenshot({ path: 'puppeteer_error.png', fullPage: true });
            return [];
        }

        // Sayfayı birkaç kez kaydırarak daha fazla tweet yükle
        for (let i = 0; i < 3; i++) {
            await page.evaluate('window.scrollBy(0, window.innerHeight)');
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1 saniye bekle
        }

        // Tweet metinlerini çek
        const tweets = await page.evaluate(() => {
            const tweetArticles = document.querySelectorAll('article[data-testid="tweet"]');
            const texts: string[] = [];
            
            tweetArticles.forEach(article => {
                const tweetTextElement = article.querySelector('div[data-testid="tweetText"]');
                if (tweetTextElement) {
                    texts.push((tweetTextElement as HTMLElement).innerText);
                }
            });
            return texts;
        });
        console.log(tweets);

        if (tweets.length === 0) {
            console.log(`Scraping finished, but no tweet texts were extracted for @${username}.`);
            await page.screenshot({ path: 'puppeteer_no_tweets.png', fullPage: true });
        }

        return tweets.slice(0, 20);

    } catch (error: any) {
        console.error(`An unexpected error occurred while scraping @${username} with puppeteer:`, error.message);
        return [];
    } finally {
        if (browser) {
            await browser.close();
        }
    }
};