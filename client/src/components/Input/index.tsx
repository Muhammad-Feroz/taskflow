interface InputProps {
  label?: string;
  type: string;
  id: string;
  name: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export default function Input({ label, type, id, name, required, value, onChange, placeholder, className }: InputProps) {
  return (
    <div>
      {
        label && (
          <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
            {label}
          </label>
        )
      }
      <div className="mt-2">
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
        />
      </div>
    </div>
  )
}

Input.defaultProps = {
  type: 'text',
  required: false,
  placeholder: '',
  className: '',
} as Partial<InputProps>