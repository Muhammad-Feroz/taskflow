import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'
import { UsersIcon } from '@heroicons/react/24/outline';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface StatsCardProps {
  name: string;
  stat: string;
  icon: React.ElementType;
  change: string;
  changeType: 'increase' | 'decrease';
}

export default function StatsCard(props:StatsCardProps) {
  const { name, stat, change, changeType } = props
  return (
    <div>
      <dl>
          <div
            className="relative flex flex-col justify-center overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-8"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <props.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{stat}</p>
              <p
                className={classNames(
                  changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                  'ml-2 flex items-baseline text-sm font-semibold'
                )}
              >
                {changeType === 'increase' ? (
                  <ArrowUpIcon className="h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
                ) : (
                  <ArrowDownIcon className="h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
                )}

                <span className="sr-only"> {changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                {change}
              </p>
              {/* <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    View all<span className="sr-only"> {name} stats</span>
                  </a>
                </div>
              </div> */}
            </dd>
          </div>
      </dl>
    </div>
  )
}

StatsCard.defaultProps = {
  name: 'Total Subscribers',
  stat: '71,897',
  icon: UsersIcon,
  change: '122%',
  changeType: 'increase',
} as Partial<StatsCardProps>