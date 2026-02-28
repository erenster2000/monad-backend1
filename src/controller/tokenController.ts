import { type Request, type Response } from 'express';
import { getLatestTweets } from '../services/twitter.js';
import { getTopicFromTweets } from '../services/ai.js';
import { generateImage } from '../services/image.js';

export const createTokenMetadata = async (req: Request, res: Response) => {
    const { twitterUsername } = req.body;

    if (!twitterUsername) {
        return res.status(400).json({ error: 'Twitter username is required.' });
    }

    try {
        const tweets = await getLatestTweets(twitterUsername);

        if (tweets.length === 0) {
            return res.status(404).json({ error: 'No tweets found for this user or account is private.' });
        }

        const { firstWord: topic, fullResponse } = await getTopicFromTweets(tweets);
        const imageUrl = await generateImage(fullResponse);

        const metadata = {
            name: `Monad Token for ${twitterUsername}`,
            description: `A unique token generated based on the analysis of the latest tweets from @${twitterUsername}. The central theme is: ${topic}.`,
            image: imageUrl,
            attributes: [
                {
                    trait_type: "Topic",
                    value: topic
                },
                {
                    trait_type: "Source Account",
                    value: `@${twitterUsername}`
                }
            ]
        };

        return res.status(200).json(metadata);

    } catch (error) {
        console.error('Error creating token metadata:', error);
        res.status(500).json({ error: 'Failed to generate token metadata.' });
    }
};