"use client"

export function NavigationButton(props: {text: string, selected: boolean, onClcik: (value: string) => void}) {
    const { text, selected, onClcik } = props

    return (
        <p className={`${selected ? ' bg-gray-300' : 'hover:bg-slate-100'} px-2 mx-2 rounded-md py-1`} onClick={() => onClcik(text)}>{text}</p>
    )
}