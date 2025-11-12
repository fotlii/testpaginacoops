const axios = require('axios');
const cheerio = require('cheerio');

// Tags de Steam: Cooperativo local (1685), Roguelike (3871), Roguelite (41068)
// Categoría de Steam: Totalmente compatible con mando (28)
const TAGS = '1685,3871,41068';
const CATEGORY_CONTROLLER = '28';

const handler = async (req, res) => {
  try {
    const steamSearchUrl = `https://store.steampowered.com/search/results/?query&tags=${TAGS}&category2=${CATEGORY_CONTROLLER}&l=spanish&cc=es&infinite=1`;
    
    console.log(`[Backend] Buscando en Steam: ${steamSearchUrl}`);

    const response = await axios.get(steamSearchUrl, {
      headers: { 'Accept': 'text/html', 'User-Agent': 'Mozilla/5.0' }
    });
    
    const $ = cheerio.load(response.data.results_html);
    const games = [];

    $('a.search_result_row').each((i, el) => {
        const appId = $(el).data('ds-appid');
        if (!appId) return;

        const title = $(el).find('span.title').text();
        const coverUrl = $(el).find('div.search_capsule img').attr('src');
        const releaseDateText = $(el).find('div.search_released').text();
        
        const priceEl = $(el).find('div.search_price');
        let finalPriceText = priceEl.text().trim();
        let discountPercent = null;
        let isFree = false;

        if (priceEl.find('span[style*="text-decoration: line-through"]').length > 0) {
            finalPriceText = priceEl.contents().filter((_, node) => node.type === 'text').last().text().trim();
            const discountText = priceEl.find('.search_discount span').text().trim();
            discountPercent = parseInt(discountText.replace('-', '').replace('%', ''), 10) || null;
        } else if (finalPriceText.toLowerCase().includes('gratis')) {
            isFree = true;
            finalPriceText = "0";
        }

        const price = {
            final: isFree ? 0 : parseFloat(finalPriceText.replace(/[^0-9,-]/g, '').replace(',', '.')) || null,
            currency: 'EUR',
            discountPercent: discountPercent,
            isFree: isFree,
        };

        games.push({
            appId: appId,
            title: title,
            coverUrl: coverUrl,
            price: price,
            releaseDate: new Date(releaseDateText).toISOString(),
            shortDescription: `Juego con tags de Roguelike y Cooperativo Local. Lanzado el ${releaseDateText}.`,
            longDescription: '',
            screenshots: [],
            movies: [],
            tags: [],
            genres: [],
        });
    });

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(games);

  } catch (error) {
    console.error('[Backend] Error en búsqueda de Steam:', error.message);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

module.exports = handler;
