// Public, published content only. Never add an API token to the browser bundle.
const projectId = '6g5kthfo';
const dataset = 'production';
const apiVersion = '2026-09-25';

const query = `{
  "settings": *[_type == "siteSettings"][0]{
    heroIntro, availability, contactTitle, contactBody,
    linkedinUrl, githubUrl, email,
    "curriculumEnUrl": curriculumEn.asset->url,
    "curriculumEsUrl": curriculumEs.asset->url
  },
  "projects": *[_type == "project"] | order(sortOrder asc){
    "id": slug.current, name, category, objective, contribution,
    technologies, websiteUrl, "imageUrl": coverImage.asset->url, imageAlt
  }
}`;

export async function fetchPortfolioContent(signal) {
  const endpoint = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`;
  const response = await fetch(endpoint, { signal });
  if (!response.ok) throw new Error(`Sanity request failed: ${response.status}`);
  const { result } = await response.json();
  if (!result || !Array.isArray(result.projects)) throw new Error('Invalid Sanity response');
  return result;
}
