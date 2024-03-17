export default function Loader() {
  return (
    <div className="flex h-screen justify-center items-center">
      <svg
        className="animate-spin h-20 w-20 text-indigo-600"
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
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.004 8.004 0 014.708 4.708M16.92 7.083A8.004 8.004 0 0119.292 16.92"
        ></path>
      </svg>
    </div>
  )
}