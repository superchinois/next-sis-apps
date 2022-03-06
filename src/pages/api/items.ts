// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import {Tag} from '../../types/Tags';

type Data = Tag;

const tagData = {
  itemcode: "722006",
  itemname: "BARQUETTE CHARCUTIERE 500CC x 250",
  side: "",
  cbcss: "ean13",
  cbtype: "ean13",
  pu_ht: "12.36",
  barcode:"3000010210120",
  pu_ttc: "13.99",
  pack_description: "au pack",
  ppack_ttc: "50.00",
  volumic_description: "au litre",
  volumic_price: "1.23",
  description_price: "description",
  unite_vente:"à l'unité",
  vendu: "à l'unité"
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json([tagData]);
}
