import React from 'react'
import { getValidStringComponent } from 'components/util/getValidStringComponent'
import clsx from 'clsx'

export function XXXL({ children, isBold, tag: Tag = 'div', color, ...props }) {

    const innerText = getValidStringComponent(children)
    const TEXT_STYLE = clsx(
        "text-8xl",
        { "font-extrabold": isBold },
        { 'text-white-100': color === 'secondary' }
    )

    return (
        <Tag className={`${TEXT_STYLE} ${props.className ? props.className : ''}`} {...props}>
            {innerText}
        </Tag>
    )
}


