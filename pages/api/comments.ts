import type { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'
import { faunaClient } from '@/lib/fauna'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const query: any = await faunaClient.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('comments'))),
        q.Lambda(comment => q.Get(comment))
      )
    )

    const data = query.data.map((entry: any) => entry.data).reverse()

    res.status(200).json(data)
  }

  if (req.method === 'POST') {
    const data = req.body

    await faunaClient.query(q.Create(q.Collection('comments'), { data }))

    res.status(201).json({ message: 'created new entry' })
  }
}
