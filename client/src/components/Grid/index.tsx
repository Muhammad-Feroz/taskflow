interface GridProps {
  columns: number;
  gap: number;
  className?: string;
  children: React.ReactNode;
}

export default function Grid({ columns, gap, className, children }: GridProps) {
  const classNames = `grid grid-cols-${columns} gap-${gap} ${className}`
  return (
    <div className={classNames}>
      {children}
    </div>
  )
}

Grid.defaultProps = {
  columns: 3,
  gap: 5,
  className: '',
} as Partial<GridProps>