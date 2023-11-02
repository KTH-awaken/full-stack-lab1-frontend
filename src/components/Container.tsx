import { ReactNode } from 'react'

const Container = ({children}:{children:ReactNode}) => {
  return (
    <section className='max-w-[1000px] m-auto p-2'>
        {children}
    </section>
  )
}

export default Container