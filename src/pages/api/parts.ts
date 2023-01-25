import { NextApiRequest, NextApiResponse } from 'next';
import gql from 'graphql-tag';
import { fetchGQLData } from '@/pages/_app';

export const FIND_BESTSELLERS = gql`
    query {
        parts (sortBy: ID_ASC ){
            _id
            id
            name
            price
            image{
                link
            }
        }
    }
`;
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // TODO: zwraca json z odpwoiedziami z graphqla

      const xd = await fetchGQLData(FIND_BESTSELLERS);

      res.status(200).json( xd.data.parts);
      break;
    case 'POST':
      // TODO: pod metodami typu POST zawsze tworzysz cos, czyli w tym wypadku upubliczniasz nowa czesc
      // const data: { url: string } = JSON.parse(req.body);


      // if (!data.url) {
      //   res.status(400).end();
      // return
      // }
      // res.status(200).json({ kacper: 'gra w wowa' });
      res.status(200).json( {});
      // const response = await fetch(data.url);
      // res.status(response.status).end(await response.blob());
      break;
    default:
      // Method not allowed
      res.status(405).end();
      break;
  }
};
