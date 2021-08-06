import Layout from '@/components/Layout'
import RatingBox from '@/components/RatingBox'
import Comments from '@/components/Comments'

export default function Home() {
  return (
    <Layout>
      <div className='text-center max-w-prose mx-auto text-gray-900'>
        <h1 className='text-4xl font-bold text-gray-800 mb-4'>✨ Juten Tach! ✨</h1>
        <p>
          Schön, dass du gerade bei uns bist und auf unserem Klo sitzt! Wir hoffen du genießt deinen
          Aufenthalt und es ist noch genug Klopapier da...
        </p>
        <p className='mt-3'>
          Falls es bei dir n bisschen länger dauert, nutz doch die Zeit und hinterlass uns ne kleine
          Nachricht in unserem digitalen Gästebuch.
        </p>
      </div>
      <RatingBox />
      <Comments />
    </Layout>
  )
}
