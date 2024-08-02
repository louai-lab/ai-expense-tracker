import Image from "next/image"

interface Props {
    image: React.ComponentType<any>,
    caption: string,
    total: number
}

export default function CardInfo({ image: Icon, caption, total }: Props) {
    return (
        <div className="w-full flex items-center justify-between p-10 border-2 rounded-lg lg:w-[300px]">
            <div>
                <h1 className="font-semibold">{caption}</h1>
                <h1 className="text-3xl font-bold">${total}</h1>
            </div>

            <div>
                <Icon className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
            </div>
        </div>
    )
}