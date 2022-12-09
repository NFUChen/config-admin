import axios from '../../utils/axios';

export async function lineNameChecker({ params }) {
  const response = await axios.get('all_lines');
  if (!response.data.all_lines.includes(params.lineName)) {
    throw new Response('Not Found', { status: 404 });
  }
  return null;
}
