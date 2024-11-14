type Props = {
  date: Date;
};

export default function FormattedDate({ date }: Props) {
  return (
    <time class="section-heading" datetime={date.toISOString()}>
      {date.toLocaleDateString('ca-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })}
    </time>
  );
}
