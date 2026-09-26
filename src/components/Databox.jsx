import React from 'react'

const Databox = ({header, data}) => {
  return (
    <div className='flex flex-col border border-(--line) w-full rounded-lg p-4 bg-(--surface)'>
        <span className='text-(--text-secondary)'>{header}</span>
        <span className={`text-(--${header.includes('PR') ? 'accent' : 'text'}) text-2xl`}>{data}</span>
    </div>
  )
}

export default Databox