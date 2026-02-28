import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const POLLINATIONS_API_KEY = process.env.POLLINATIONS_API_KEY;

// API anahtarının .env dosyasında tanımlı olup olmadığını kontrol et
if (!POLLINATIONS_API_KEY) {
    console.warn('Warning: POLLINATIONS_API_KEY is not defined in .env file. The API may not work without authentication.');
}

/**
 * Generates an image using the pollinations.ai API and returns it as a Base64 Data URL.
 *
 * @param topic The topic to generate an image for.
 * @returns A Base64 Data URL string of the generated image.
 */
export const generateImage = async (topic: string): Promise<string> => {
    console.log(`Requesting image from pollinations.ai for topic: ${topic}`);

    try {
        // Sanatsal sonuçlar için prompt'u zenginleştir
        const prompt = encodeURIComponent(`${topic}, cinematic, hyperrealistic, 8k, high detail`);
        
        // API endpoint'ini oluştur. API anahtarı bir query parametresi olarak ekleniyor.
        // Dokümantasyon eksik olduğu için bu bir varsayımdır.
        const url = `https://gen.pollinations.ai/image/meme of ${prompt}?key=${POLLINATIONS_API_KEY}&model=flux`;

        // Axios ile GET isteği at. Dönen verinin binary (arraybuffer) olmasını belirt.
        const response = await axios.get(url, {
        });
        return url;

    } catch (error) {
        console.error('Error calling pollinations.ai API:', error);
        throw new Error('Failed to generate image using pollinations.ai API.');
    }
};