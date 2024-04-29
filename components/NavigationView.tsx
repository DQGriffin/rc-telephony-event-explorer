"use client"

import { useState } from "react"
import { NavigationButton } from "./NavigationButton"

export function NavigationView(props: {options: string[], label: string, onClick?: (value: string) => void}) {
    const { options, label, onClick } = props
    const [selectedValue, setSelectedValue] = useState('')

    function handleClick(value: string) {
        setSelectedValue(value)
        if (onClick) {
            onClick(value)
        }
    }

    return (
        <div className="inline-block h-screen min-w-72 align-top overflow-y-auto bg-slate-50 text-slate-900">
            <p className=" text-sm font-medium m-2">{label}</p>
            {options.map((option) => (
                <NavigationButton
                    key={option}
                    text={option}
                    selected={option === selectedValue}
                    onClcik={handleClick}
                />
            ))}
        </div>
    )
}