import * as React from "react"
import { mutate } from "swr"

export default function RatingBox() {
  const [stars, setStars] = React.useState(5)
  const [hoverIndex, setHoverIndex] = React.useState<boolean | number>(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [hasSubmitted, setHasSubmitted] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)

  const nameRef = React.useRef<HTMLInputElement>(null)
  const messageRef = React.useRef<HTMLTextAreaElement>(null)

  const handleRating = (rating: number) => setStars(rating)
  const handleMouseEnter = (rating: number) => setHoverIndex(rating)
  const handleMouseLeave = () => setHoverIndex(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const name = nameRef.current?.value.trim()
    const message = messageRef.current?.value

    const data = { stars, name, message, date: new Date() }

    setIsSubmitting(true)

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!res.ok) {
        throw new Error()
      }

      setHasSubmitted(true)
      mutate("/api/comments")
    } catch (error) {
      setHasError(true)
    }

    setIsSubmitting(false)
  }

  if (hasSubmitted) {
    return (
      <h2 className="text-center my-12 text-xl font-bold text-green-800">
        Danke für deinen Eintrag 😘
      </h2>
    )
  }

  return (
    <div className="my-12 border-2 border-gray-200 p-10 rounded-lg shadow-sm bg-white">
      <h2 className="text-center text-xl font-bold text-gray-800 mb-6">
        Wie findstes hier?
      </h2>
      <div className="flex justify-center space-x-4 text-yellow-500 mb-10">
        {[...Array(5)].map((e, i) => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-10 w-10 hover:opacity-100 ${
              stars >= i + 1 || (hoverIndex && hoverIndex >= i)
                ? "opacity-100"
                : "opacity-30"
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
            key={i}
            onClick={() => handleRating(i + 1)}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor="name" className="block mb-1 font-medium">
          Dein Name*
        </label>
        <input
          type="text"
          id="name"
          className="block w-full rounded border-gray-300"
          required
          ref={nameRef}
        />

        <label htmlFor="message" className="block mt-6 mb-1 font-medium">
          Deine Nachricht*
        </label>
        <textarea
          id="message"
          rows={4}
          className="block w-full rounded border-gray-300"
          required
          ref={messageRef}
        />

        <button
          type="submit"
          className={`${
            isSubmitting && "cursor-not-allowed"
          } w-full inline-flex items-center justify-center bg-green-700 text-white mt-6 font-bold p-3 rounded hover:bg-green-800 disabled:opacity-70`}
          disabled={isSubmitting ? true : false}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>{" "}
              Wird gesendet...
            </>
          ) : (
            "Abschicken"
          )}
        </button>
        {hasError && (
          <p className="text-red-600 mt-6 text-center font-medium">
            Da ist leider was schief gelaufen...
          </p>
        )}
      </form>
    </div>
  )
}
