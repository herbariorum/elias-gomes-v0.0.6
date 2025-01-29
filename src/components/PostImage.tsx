import Image from "next/image";



export function PostImage( { images }: { images: string[]}) {
    return  (
        <div className="mt-1 text-center md:text-justify md:pl-20 md:pr-20">
            <h1 className="font-bold text-3xl  mb-7 border-b pb-5">{images.length} photos</h1>
            <div className="flex flex-wrap pl-20 md:pl-20">
                {images.map((image: string) => (
                    
                    <Image
                        key={image.split('/').pop()?.split('.').shift()}
                        src={image}
                        alt=""
                        width={64}
                        height={64}
                        className="w-56 h-44 mr-1 mb-1"
                    />
                ))}
            </div>
          
        </div>
    )
}