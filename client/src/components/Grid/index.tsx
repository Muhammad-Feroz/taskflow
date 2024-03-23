interface GridProps {
  columns: number;
  gap: number;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function Grid({ columns, gap, className, children, style }: GridProps) {
  const classNames = `grid grid-cols-${columns} gap-${gap} ${className || ''}`
  return (
    <div className={classNames} style={style}>
      {children}
    </div>
  )
}

Grid.defaultProps = {
  columns: 3,
  gap: 5,
  className: '',
} as Partial<GridProps>