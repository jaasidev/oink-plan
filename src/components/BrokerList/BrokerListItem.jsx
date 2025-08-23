export function BrokerListItem({url, imageUrl, label}){
    <li className="flex items-center gap-3">
        <img src={imageUrl} alt={`logo de ${label}`} width='32' height='32'/>
        <a href={url}>
            {label}
        </a>
    </li>
}