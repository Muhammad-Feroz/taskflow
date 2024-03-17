interface ButtonProps {
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
  onClick: () => void;
  className?: string;
}

export default function Button({ children, type, onClick, className }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${className}`}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  type: 'button',
  className: '',
} as Partial<ButtonProps>