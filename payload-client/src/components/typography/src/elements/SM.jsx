import React from 'react'
import { getValidStringComponent } from 'components/util/getValidStringComponent'
import clsx from 'clsx'

export function SM({ children, isBold, tag: Tag = 'div', ...props }) {

    const innerText = getValidStringComponent(children)
    const TEXT_STYLE = clsx(
        "text-xl",
        { "font-semibold": isBold }
    )

    return (
        <Tag className={TEXT_STYLE} {...props}>
            {innerText}
        </Tag>
    )
}