export default function handler(req, res) {
    res.status(200).json({
        status: 'ok',
        message: 'Serverless function running on Vercel',
        timestamp: new Date().toISOString()
    });
}