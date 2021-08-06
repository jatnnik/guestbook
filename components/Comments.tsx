import * as React from 'react'
import { useState } from 'react'
import useSWR from 'swr'

type CommentProps = {
  stars: number
  name: string
  message: string
  date: string
}

const Comment = ({ stars, name, message, date }: CommentProps) => {
  console.log(typeof date)

  return (
    <div className='p-8 border-2 border-gray-200 shadow-sm rounded-lg mb-4 bg-white'>
      <div className='flex space-x-2 text-yellow-500 mb-4'>
        {[...Array(5)].map((e, i) => (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className={`h-5 w-5 ${i + 1 <= stars ? 'opacity-100' : 'opacity-30'}`}
            viewBox='0 0 20 20'
            fill='currentColor'
            key={i}
          >
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
          </svg>
        ))}
      </div>
      <p className='font-bold text-lg text-gray-800'>{name}</p>
      <p className='text-gray-500'>
        {new Date(date).toLocaleDateString('de-DE', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })}
      </p>
      <p className='text-gray-800 mt-2'>{message}</p>
    </div>
  )
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Comments() {
  const { data: comments, error } = useSWR<CommentProps[]>('/api/comments', fetcher)
  const [showAll, setShowAll] = useState(false)

  if (error) {
    return (
      <p className='text-center'>
        Upps...beim Laden der letzten Nachrichten ist ein Fehler aufgetreten
      </p>
    )
  }

  return (
    <div>
      <h2 className='text-center text-xl font-bold text-gray-800 mb-6'>Letzte Nachrichten</h2>
      {comments && comments.length == 0 && <p className='text-center'>Gibt noch nüscht</p>}
      {comments ? (
        <>
          {comments.slice(0, showAll ? comments.length : 3).map((comment, i) => (
            <Comment
              key={i}
              stars={comment.stars}
              name={comment.name}
              message={comment.message}
              date={comment.date}
            />
          ))}
          {comments.length > 3 && (
            <div className='text-center'>
              <button
                className='mt-4 text-sm border-2 border-gray-200 px-4 py-3 rounded font-medium'
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? 'Weniger' : 'Alle'} anzeigen
              </button>
            </div>
          )}
        </>
      ) : (
        <p className='text-center'>Wird geladen...</p>
      )}
    </div>
  )
}
