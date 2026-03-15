import { BrokerListItem } from "./BrokerListItem"
export function BrokerList(){
    return (
        <>
        <li className="menu-title text-2xl mt-14 pl-0 dark:text-white ">
            Lista de Brokers
        </li>
        <BrokerListItem label='Quotex' url='#' imageUrl='/img/quotex.png' />
        </>
    )
}