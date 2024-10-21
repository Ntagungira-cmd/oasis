import Image from 'next/image'

const Loader = () => {
  return (
    <div className="loader">
      <Image 
        src="/icons/loader.svg"
        alt="loader"
        width={35}
        height={35}
        className="animate-spin"
        priority={true}
        placeholder = 'empty'
      />
    </div>
  )
}

export default Loader