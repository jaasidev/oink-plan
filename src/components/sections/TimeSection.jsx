import { ButtonTime } from "../buttons/ButtonTime";
import { useDrop } from "../../hooks/useDrop";
export function TimeSection() {
    const time = useDrop()
    return (
        <div className="flex overflow-y-auto gap-1 py-2">
            {
                time.map((value, index) => {
                    return <ButtonTime key={index}>{value.time}</ButtonTime>
                })
            }
        </div>
    )
}