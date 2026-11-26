const { tavily } = require('@tavily/core');
const fs = require('fs');
const envData = fs.readFileSync('.env', 'utf-8');
const TAVILY_API_KEY = envData.match(/TAVILY_API_KEY=(.*)/)[1].trim();

if (!TAVILY_API_KEY) {
  console.error("TAVILY_API_KEY nêo encontrada no arquivo .env.");
  process.exit(1);
}

const client = tavily({ apiKey: TAVILY_API_KEY });

const queries = [
  "Dia das Mêes 2026 tendências marketing digital inteligência artificial educaçêo online Brasil",
  "campanhas Dia das Mêes concorrentes educaçêo IA automaçêo estratégias marketing 2025",
  "mêes empreendedoras dores desejos equilíbrio tempo carreira família IA produtividade",
  "melhores hooks anúncios Dia das Mêes empreendedoras tecnologia IA empoderamento feminino",
  "conteúdo viral Dia das Mêes redes sociais instagram 2025 2026 mêes profissionais"
];

async function runSearches() {
  const results = {};
  for (const query of queries) {
    console.log(`Buscando: ${query}`);
    try {
      const response = await client.search(query, {
        searchDepth: "advanced",
        maxResults: 5
      });
      results[query] = response.results.map(r => ({ title: r.title, content: r.content }));
    } catch (e) {
      console.error(`Erro ao buscar "${query}": ${e.message}`);
    }
  }

  fs.writeFileSync('tavily_c0047_results.json', JSON.stringify(results, null, 2));
  console.log('Resultados salvos em tavily_c0047_results.json');
}

runSearches();
