import { Link } from "react-router-dom";

interface NotesCardProps {
  id: number;
  title: string;
  href: string;
  description: string;
  date: string;
  datetime: string;
  author: {
    name: string;
    role: string;
    imageUrl: string;
    href: string;
  };
  category: {
    title: string;
    href: string;
  };
}

export default function NotesCard({
  id,
  title,
  description,
  date,
  datetime,
  category,
  author,
  href
}: NotesCardProps) {
  return (
    <Link to={href} key={id} className="flex flex-col items-start justify-between border p-4 rounded cursor-pointer hover:bg-indigo-100 hover:text-white">
      <div className="max-w-xl">
        <div className="flex items-center gap-x-4 text-xs">
          <time dateTime={datetime} className="text-gray-500">
            {date}
          </time>
          <Link
            to={category.href}
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          >
            {category.title}
          </Link>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <span className="absolute inset-0" />
            {title}
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{description}</p>
        </div>
        <div className="relative mt-8 flex items-center gap-x-4">
          <img src={author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-100" />
          <div className="text-sm leading-6">
            <p className="font-semibold text-gray-900">
              <Link to={author.href}>
                <span className="absolute inset-0" />
                {author.name}
              </Link>
            </p>
            <p className="text-gray-600">{author.role}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

NotesCard.defaultProps = {
  id: 1,
  title: 'Boost your conversion rate',
  href: '#',
  description:
    'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
  date: 'Mar 16, 2020',
  datetime: '2020-03-16',
  category: { title: 'Marketing', href: '#' },
  author: {
    name: 'Paul York',
    role: 'Marketing',
    imageUrl:
      'https://images.unsplash.com/photo-1556740730-958f4aa9f5f2?auto=format&fit=crop&w=32&h=32&q=80',
    href: '#',
  },
} as NotesCardProps