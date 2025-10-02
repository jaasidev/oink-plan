export function BrokerListItem({ url, imageUrl, label }) {
  return (
    <li>
      <a
        href={url}
        className='font-semibold text-lg flex items-center flex-row mt-2 pl-2'
      >
        <img src={imageUrl} alt={`logo de ${label}`} width='32' height='32' />

        {label}
      </a>
    </li>
  )
}
