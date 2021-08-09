import type { GetServerSideProps } from 'next'
import Layout from '@/components/Layout'
import RatingBox from '@/components/RatingBox'
import Comments from '@/components/Comments'

type HomeProps = {
  authenticated: boolean
}

const Authenticated = () => (
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

const Unauthenticated = () => (
  <Layout>
    <div className='text-center max-w-prose mx-auto text-gray-900'>
      <h1 className='text-4xl font-bold text-gray-800 mb-4'>
        Sorry, aber das geht nur wenn du bei uns zuhause bist
      </h1>
    </div>
  </Layout>
)

export default function Home({ authenticated }: HomeProps) {
  if (!authenticated) {
    return <Unauthenticated />
  }

  return <Authenticated />
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { token } = context.query

  if (!token || token !== process.env.TOKEN) {
    return {
      props: {
        authenticated: false,
      },
    }
  }

  return {
    props: {
      authenticated: true,
    },
  }
}
